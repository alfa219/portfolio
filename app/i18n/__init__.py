import json
from pathlib import Path
from functools import lru_cache

SUPPORTED = ("en", "id")
DEFAULT = "en"
I18N_DIR = Path(__file__).parent


@lru_cache(maxsize=8)
def load(lang: str) -> dict:
    if lang not in SUPPORTED:
        lang = DEFAULT
    with open(I18N_DIR / f"{lang}.json", encoding="utf-8") as f:
        return json.load(f)


def resolve(lang: str | None) -> str:
    return lang if lang in SUPPORTED else DEFAULT
