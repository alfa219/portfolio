from flask import Flask, g, request
from whitenoise import WhiteNoise
from .config import config, INSECURE_DEFAULT_SECRET
from . import i18n


def create_app(env: str = "development") -> Flask:
    app = Flask(__name__)
    app.config.from_object(config[env])

    if env == "production":
        if app.config.get("SECRET_KEY") in (None, "", INSECURE_DEFAULT_SECRET):
            raise RuntimeError(
                "SECRET_KEY is unset or still the insecure development default. "
                "Set a strong random SECRET_KEY (e.g. `python -c \"import secrets; "
                "print(secrets.token_hex(32))\"`) before running in production."
            )
        app.wsgi_app = WhiteNoise(
            app.wsgi_app,
            root="app/static/",
            prefix="static",
            max_age=31536000,
        )

    @app.before_request
    def detect_lang():
        # Priority: ?lang=... query → cookie → default
        candidate = request.args.get("lang") or request.cookies.get("lang")
        g.lang = i18n.resolve(candidate)
        g.t = i18n.load(g.lang)
        g.supported_langs = i18n.SUPPORTED

    @app.context_processor
    def inject_i18n():
        return {
            "lang": getattr(g, "lang", i18n.DEFAULT),
            "t": getattr(g, "t", i18n.load(i18n.DEFAULT)),
            "supported_langs": i18n.SUPPORTED,
        }

    from .routes.main import main_bp
    app.register_blueprint(main_bp)

    return app
