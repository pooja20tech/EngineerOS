import os

from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")

if not MONGODB_URI:
    raise RuntimeError("MONGODB_URI is not set in .env")

client = MongoClient(MONGODB_URI)

# Database
db = client["EngineerOS"]

# Collections
students_collection = db["students"]
users_collection = db["users"]


def test_database_connection():
    try:
        client.admin.command("ping")
        return True
    except Exception as e:
        print("MongoDB connection error:", e)
        return False