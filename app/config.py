import os
from dotenv import load_dotenv

load_dotenv()

# Sentinel used as the development fallback. Production refuses to boot with it.
INSECURE_DEFAULT_SECRET = "dev-secret-change-in-production"


class BaseConfig:
    SECRET_KEY = os.getenv("SECRET_KEY", INSECURE_DEFAULT_SECRET)
    SITE_NAME = os.getenv("SITE_NAME", "wildan.iot")
    OWNER_NAME = os.getenv("OWNER_NAME", "Wildan Alfa Raezel")
    OWNER_EMAIL = os.getenv("OWNER_EMAIL", "wildanraezel@gmail.com")
    OWNER_LOCATION = os.getenv("OWNER_LOCATION", "Wates, Yogyakarta")

    # Contact-form SMTP. Leave empty to disable the endpoint (returns 503
    # and the UI shows a "email me directly" message instead).
    SMTP_HOST = os.getenv("SMTP_HOST", "")
    SMTP_PORT = os.getenv("SMTP_PORT", "587")
    SMTP_USER = os.getenv("SMTP_USER", "")
    SMTP_PASS = os.getenv("SMTP_PASS", "")
    CONTACT_TO = os.getenv("CONTACT_TO", "")  # defaults to OWNER_EMAIL


class DevelopmentConfig(BaseConfig):
    DEBUG = True
    TESTING = False


class ProductionConfig(BaseConfig):
    DEBUG = False
    TESTING = False


class TestingConfig(BaseConfig):
    TESTING = True


config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "testing": TestingConfig,
}
