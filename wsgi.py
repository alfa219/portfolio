import os
from pathlib import Path
from app import create_app

env = os.getenv("FLASK_ENV", "development")
app = create_app(env)

if __name__ == "__main__":
    is_dev = env == "development"
    # Content and translations live in JSON. The i18n loader caches per process,
    # and Werkzeug's reloader only watches .py by default — so tell it to also
    # restart when any app/**/*.json changes, otherwise edits won't show up.
    extra_files = [str(p) for p in Path(__file__).parent.glob("app/**/*.json")] if is_dev else None
    app.run(host="0.0.0.0", port=5000, debug=is_dev, extra_files=extra_files)
