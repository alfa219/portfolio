import json
from pathlib import Path
from flask import Blueprint, Response, g, render_template, redirect, make_response, request, url_for
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


@main_bp.route("/robots.txt")
def robots():
    body = f"User-agent: *\nAllow: /\n\nSitemap: {request.url_root}sitemap.xml\n"
    return Response(body, mimetype="text/plain")


@main_bp.route("/sitemap.xml")
def sitemap():
    body = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"  <url><loc>{request.url_root}</loc></url>\n"
        "</urlset>\n"
    )
    return Response(body, mimetype="application/xml")


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
