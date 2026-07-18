import json
import re
import smtplib
import time
from collections import defaultdict, deque
from email.message import EmailMessage
from pathlib import Path
from flask import Blueprint, current_app, g, jsonify, render_template, redirect, make_response, request, url_for
from app import i18n

main_bp = Blueprint("main", __name__)

DATA_DIR = Path(__file__).parent.parent / "data"


def load_json(filename: str):
    # Localized content: for lang "id", prefer "<name>.id.json" when it exists;
    # the plain "<name>.json" is the English (default) version.
    lang = getattr(g, "lang", i18n.DEFAULT)
    if lang != i18n.DEFAULT:
        localized = DATA_DIR / filename.replace(".json", f".{lang}.json")
        if localized.exists():
            with open(localized, encoding="utf-8") as f:
                return json.load(f)
    with open(DATA_DIR / filename, encoding="utf-8") as f:
        return json.load(f)


@main_bp.route("/")
def index():
    return render_template(
        "index.html",
        projects=load_json("projects.json"),
        skills=load_json("skills.json"),
        languages=load_json("languages.json"),
        education=load_json("education.json"),
        experience=load_json("experience.json"),
        certifications=load_json("certifications.json"),
        achievements=load_json("achievements.json"),
        posts=load_json("posts.json"),
        testimonials=load_json("testimonials.json"),
    )


EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

# Simple in-memory per-IP rate limit (per worker process).
_RATE: dict = defaultdict(deque)
RATE_MAX = 3
RATE_WINDOW = 15 * 60  # seconds


@main_bp.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json(silent=True) or {}

    # Honeypot: hidden field humans never fill; bots do.
    if data.get("website"):
        return jsonify(ok=True)

    name = (data.get("name") or "").strip()[:200]
    email = (data.get("email") or "").strip()[:200]
    subject = (data.get("subject") or "").strip()[:200]
    message = (data.get("message") or "").strip()[:5000]
    if not name or not message or not EMAIL_RE.match(email):
        return jsonify(ok=False, error="invalid"), 400

    ip = (request.headers.get("X-Forwarded-For") or request.remote_addr or "?").split(",")[0].strip()
    now = time.time()
    q = _RATE[ip]
    while q and now - q[0] > RATE_WINDOW:
        q.popleft()
    if len(q) >= RATE_MAX:
        return jsonify(ok=False, error="rate_limited"), 429

    cfg = current_app.config
    host = cfg.get("SMTP_HOST")
    user = cfg.get("SMTP_USER")
    password = cfg.get("SMTP_PASS")
    if not (host and user and password):
        return jsonify(ok=False, error="not_configured"), 503

    q.append(now)

    msg = EmailMessage()
    msg["Subject"] = f"[Portfolio] {subject or 'New message'} — {name}"
    msg["From"] = user
    msg["To"] = cfg.get("CONTACT_TO") or cfg["OWNER_EMAIL"]
    msg["Reply-To"] = f"{name} <{email}>"
    msg.set_content(f"{message}\n\n— {name} <{email}>")
    try:
        with smtplib.SMTP(host, int(cfg.get("SMTP_PORT") or 587), timeout=15) as s:
            s.starttls()
            s.login(user, password)
            s.send_message(msg)
    except Exception:
        current_app.logger.exception("contact: send failed")
        return jsonify(ok=False, error="send_failed"), 502
    return jsonify(ok=True)


@main_bp.route("/lang/<code>")
def set_lang(code):
    code = i18n.resolve(code)
    target = request.args.get("next") or url_for("main.index")
    if not target.startswith("/"):
        target = url_for("main.index")
    resp = make_response(redirect(target))
    # Persist for 1 year
    resp.set_cookie("lang", code, max_age=31536000, samesite="Lax")
    return resp
