from flask import Flask, g, request
from whitenoise import WhiteNoise
from .config import config
from . import i18n


def create_app(env: str = "development") -> Flask:
    app = Flask(__name__)
    app.config.from_object(config[env])

    if env == "production":
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
