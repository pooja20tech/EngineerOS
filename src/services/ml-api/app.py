from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import joblib
import os
import time

from dotenv import load_dotenv
from google import genai


from database import (
    students_collection,
    users_collection,
    test_database_connection
)

from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta, timezone

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not configured")

gemini_client = genai.Client(api_key=GEMINI_API_KEY)



# ============================================================
# AUTHENTICATION
# ============================================================

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

if not JWT_SECRET_KEY:
    raise RuntimeError("JWT_SECRET_KEY is not configured")

JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

# ============================================================
# JWT AUTHENTICATION
# ============================================================

security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            JWT_SECRET_KEY,
            algorithms=[JWT_ALGORITHM]
        )

        email = payload.get("sub")

        if not email:
            raise HTTPException(
                status_code=401,
                detail="Invalid authentication token"
            )

        return email.strip().lower()

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=401,
            detail="Token has expired. Please login again."
        )

    except jwt.JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication token"
        )


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(password: str, password_hash: str):
    return pwd_context.verify(password, password_hash)


def create_access_token(email: str):
    expire = datetime.now(timezone.utc) + timedelta(
        hours=JWT_EXPIRATION_HOURS
    )

    payload = {
        "sub": email,
        "exp": expire
    }

    return jwt.encode(
        payload,
        JWT_SECRET_KEY,
        algorithm=JWT_ALGORITHM
    )


# ============================================================
# APP
# ============================================================

app = FastAPI(
    title="EngineerOS Placement Prediction API",
    description="AI-powered placement prediction and career readiness report",
    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "https://engineer-os-tawny.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# LOAD FINAL ML MODEL
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(
    BASE_DIR,
    "placement_prediction.pkl"
)

model = joblib.load(MODEL_PATH)

print("✅ EngineerOS ML model loaded successfully")


# ============================================================
# FINAL ENGINEEROS RULES
# ============================================================

# IMPORTANT:
# These weights are used ONLY for report/readiness/
# feature-contribution explanation.
# They DO NOT change ML probability.

FEATURE_WEIGHTS = {
    "CGPA": 12,
    "AptitudeTestScore": 18,
    "Internships": 18,
    "Projects": 20,
    "SoftSkillsRating": 12,
    "PlacementTraining": 8,
    "Workshops/Certifications": 5,
    "ExtracurricularActivities": 4,
    "HSC_Marks": 2,
    "SSC_Marks": 1
}


# ============================================================
# MINIMUM ELIGIBILITY CRITERIA
# ============================================================

ELIGIBILITY_CRITERIA = {
    "CGPA": {
        "threshold": 6.5,
        "operator": ">=",
        "unit": "/10"
    },
    "SSC_Marks": {
        "threshold": 60,
        "operator": ">=",
        "unit": "%"
    },
    "HSC_Marks": {
        "threshold": 60,
        "operator": ">=",
        "unit": "%"
    }
}


# ============================================================
# HELPER
# ============================================================

def safe_float(value, default=0.0):

    if value is None:
        return default

    if isinstance(value, str) and value.strip() == "":
        return default

    try:
        return float(value)

    except (ValueError, TypeError):
        return default


# ============================================================
# CHECK ELIGIBILITY
# ============================================================

def check_eligibility(data):

    results = {}
    failed = []

    for feature, rule in ELIGIBILITY_CRITERIA.items():

        value = safe_float(data.get(feature), 0)

        passed = value >= rule["threshold"]

        results[feature] = {
            "value": value,
            "minimum_required": rule["threshold"],
            "operator": rule["operator"],
            "unit": rule["unit"],
            "status": "Passed" if passed else "Failed"
        }

        if not passed:
            failed.append(feature)

    return results, failed


# ============================================================
# WEIGHTED READINESS SCORE
# ============================================================

def calculate_readiness_score(data):

    score = 0.0

    # CGPA
    cgpa = safe_float(data.get("CGPA"))
    score += min(cgpa / 10, 1) * 12

    # Aptitude
    aptitude = safe_float(data.get("AptitudeTestScore"))
    score += min(aptitude / 100, 1) * 18

    # Internships
    internships = safe_float(data.get("Internships"))
    score += min(internships / 3, 1) * 18

    # Projects
    projects = safe_float(data.get("Projects"))
    score += min(projects / 5, 1) * 20

    # Soft Skills
    soft_skills = safe_float(data.get("SoftSkillsRating"))
    score += min(soft_skills / 5, 1) * 12

    # Placement Training
    if str(
        data.get("PlacementTraining", "")
    ).strip().lower() == "yes":
        score += 8

    # Certifications
    certifications = safe_float(
        data.get("Workshops/Certifications")
    )
    score += min(certifications / 5, 1) * 5

    # Extracurricular
    if str(
        data.get("ExtracurricularActivities", "")
    ).strip().lower() == "yes":
        score += 4

    # HSC
    hsc = safe_float(data.get("HSC_Marks"))
    score += min(hsc / 100, 1) * 2

    # SSC
    ssc = safe_float(data.get("SSC_Marks"))
    score += min(ssc / 100, 1) * 1

    return round(score, 2)


# ============================================================
# READINESS LABEL
# ============================================================

def get_readiness(score):

    if score >= 75:
        return "High Readiness"

    elif score >= 50:
        return "Moderate Readiness"

    else:
        return "Needs Improvement"


# ============================================================
# FEATURE CONTRIBUTIONS
# ============================================================

def generate_feature_contributions(data):

    contributions = {}

    # CGPA
    contributions["CGPA"] = round(
        min(safe_float(data.get("CGPA")) / 10, 1) * 12,
        2
    )

    # Aptitude
    contributions["AptitudeTestScore"] = round(
        min(
            safe_float(data.get("AptitudeTestScore")) / 100,
            1
        ) * 18,
        2
    )

    # Internships
    contributions["Internships"] = round(
        min(safe_float(data.get("Internships")) / 3, 1) * 18,
        2
    )

    # Projects
    contributions["Projects"] = round(
        min(safe_float(data.get("Projects")) / 5, 1) * 20,
        2
    )

    # Soft Skills
    contributions["SoftSkillsRating"] = round(
        min(
            safe_float(data.get("SoftSkillsRating")) / 5,
            1
        ) * 12,
        2
    )

    # Placement Training
    contributions["PlacementTraining"] = (
        8
        if str(
            data.get("PlacementTraining", "")
        ).strip().lower() == "yes"
        else 0
    )

    # Certifications
    contributions["Workshops/Certifications"] = round(
        min(
            safe_float(
                data.get("Workshops/Certifications")
            ) / 5,
            1
        ) * 5,
        2
    )

    # Extracurricular
    contributions["ExtracurricularActivities"] = (
        4
        if str(
            data.get("ExtracurricularActivities", "")
        ).strip().lower() == "yes"
        else 0
    )

    # HSC
    contributions["HSC_Marks"] = round(
        min(safe_float(data.get("HSC_Marks")) / 100, 1) * 2,
        2
    )

    # SSC
    contributions["SSC_Marks"] = round(
        min(safe_float(data.get("SSC_Marks")) / 100, 1) * 1,
        2
    )

    return contributions


# ============================================================
# SKILL DISTRIBUTION DATA
# ============================================================

def generate_skill_distribution(data):

    return {
        "CGPA": round(
            min(safe_float(data.get("CGPA")) / 10, 1) * 100,
            2
        ),

        "Aptitude": round(
            min(
                safe_float(data.get("AptitudeTestScore")) / 100,
                1
            ) * 100,
            2
        ),

        "Soft Skills": round(
            min(
                safe_float(data.get("SoftSkillsRating")) / 5,
                1
            ) * 100,
            2
        ),

        "Projects": round(
            min(
                safe_float(data.get("Projects")) / 5,
                1
            ) * 100,
            2
        ),

        "Internships": round(
            min(
                safe_float(data.get("Internships")) / 3,
                1
            ) * 100,
            2
        ),

        "Certifications": round(
            min(
                safe_float(
                    data.get("Workshops/Certifications")
                ) / 5,
                1
            ) * 100,
            2
        )
    }


# ============================================================
# STRENGTHS
# ============================================================

def generate_strengths(data):

    strengths = []

    cgpa = safe_float(data.get("CGPA"))

    if cgpa >= 8:
        strengths.append(
            f"Strong academic performance with CGPA {cgpa}/10."
        )

    elif cgpa >= 7.5:
        strengths.append(
            f"Good academic performance with CGPA {cgpa}/10."
        )

    internships = safe_float(data.get("Internships"))

    if internships >= 2:
        strengths.append(
            f"Good practical exposure with {int(internships)} internships."
        )

    projects = safe_float(data.get("Projects"))

    if projects >= 2:
        strengths.append(
            f"Good project experience with {int(projects)} projects."
        )

    aptitude = safe_float(
        data.get("AptitudeTestScore")
    )

    if aptitude >= 75:
        strengths.append(
            f"Strong aptitude performance at {aptitude}%."
        )

    soft_skills = safe_float(
        data.get("SoftSkillsRating")
    )

    if soft_skills >= 4:
        strengths.append(
            f"Strong soft-skills rating of {soft_skills}/5."
        )

    certifications = safe_float(
        data.get("Workshops/Certifications")
    )

    if certifications >= 2:
        strengths.append(
            f"Good learning profile with {int(certifications)} "
            "workshops/certifications."
        )

    if str(
        data.get("PlacementTraining", "")
    ).strip().lower() == "yes":

        strengths.append(
            "Placement training completed."
        )

    if str(
        data.get("ExtracurricularActivities", "")
    ).strip().lower() == "yes":

        strengths.append(
            "Participates in extracurricular activities."
        )

    if not strengths:
        strengths.append(
            "Continue developing your academic, technical "
            "and professional profile."
        )

    return strengths


# ============================================================
# AREAS TO IMPROVE
# ============================================================

def generate_improvements(data):

    improvements = []

    cgpa = safe_float(data.get("CGPA"))

    if cgpa < 7.5:
        improvements.append(
            "Work on improving your CGPA."
        )

    internships = safe_float(data.get("Internships"))

    if internships < 2:
        improvements.append(
            "Gain more relevant internship experience."
        )

    projects = safe_float(data.get("Projects"))

    if projects < 2:
        improvements.append(
            "Build more relevant technical projects."
        )

    aptitude = safe_float(
        data.get("AptitudeTestScore")
    )

    if aptitude < 75:
        improvements.append(
            "Improve aptitude and problem-solving skills."
        )

    soft_skills = safe_float(
        data.get("SoftSkillsRating")
    )

    if soft_skills < 4:
        improvements.append(
            "Improve communication, teamwork and other soft skills."
        )

    certifications = safe_float(
        data.get("Workshops/Certifications")
    )

    if certifications < 2:
        improvements.append(
            "Add relevant workshops or certifications."
        )

    if str(
        data.get("PlacementTraining", "")
    ).strip().lower() != "yes":

        improvements.append(
            "Consider completing placement training."
        )

    if str(
        data.get("ExtracurricularActivities", "")
    ).strip().lower() != "yes":

        improvements.append(
            "Participate in extracurricular activities."
        )

    ssc = safe_float(data.get("SSC_Marks"))

    if ssc < 60:
        improvements.append(
            "SSC marks are below the minimum eligibility requirement."
        )

    hsc = safe_float(data.get("HSC_Marks"))

    if hsc < 60:
        improvements.append(
            "HSC marks are below the minimum eligibility requirement."
        )

    return improvements


# ============================================================
# NEXT STEPS
# ============================================================

def generate_next_steps(data, failed):

    steps = []

    if "CGPA" in failed:
        steps.append(
            "Focus on improving your CGPA to at least 6.5."
        )

    if "SSC_Marks" in failed:
        steps.append(
            "SSC marks are below the minimum 60% eligibility criterion."
        )

    if "HSC_Marks" in failed:
        steps.append(
            "HSC marks are below the minimum 60% eligibility criterion."
        )

    if safe_float(data.get("AptitudeTestScore")) < 75:
        steps.append(
            "Practice aptitude questions regularly."
        )

    if safe_float(data.get("Projects")) < 2:
        steps.append(
            "Build at least one more strong technical project."
        )

    if safe_float(data.get("Internships")) < 2:
        steps.append(
            "Look for relevant internship opportunities."
        )

    if safe_float(data.get("SoftSkillsRating")) < 4:
        steps.append(
            "Work on communication, teamwork and professional skills."
        )

    if safe_float(
        data.get("Workshops/Certifications")
    ) < 2:
        steps.append(
            "Complete relevant certifications or workshops."
        )

    if not steps:
        steps.append(
            "Continue building technical skills, projects and "
            "domain-specific experience."
        )

    return steps


# ============================================================
# HOME
# ============================================================

@app.get("/")
def home():

    return {
        "message": "EngineerOS Placement Prediction API is running",
        "model": "Logistic Regression",
        "features": [
            "CGPA",
            "Internships",
            "Projects",
            "Workshops/Certifications",
            "AptitudeTestScore",
            "SoftSkillsRating",
            "ExtracurricularActivities",
            "PlacementTraining",
            "SSC_Marks",
            "HSC_Marks"
        ]
    }

@app.get("/db-test")
def database_test():

    connected = test_database_connection()

    if not connected:
        raise HTTPException(
            status_code=500,
            detail="MongoDB connection failed"
        )

    return {
        "status": "success",
        "message": "EngineerOS connected to MongoDB successfully",
        "database": "EngineerOS",
        "collection": "students"
    }



# ============================================================
# SIGNUP
# ============================================================

@app.post("/auth/signup")
def signup(data: dict):

    first_name = str(data.get("firstName", "")).strip()
    last_name = str(data.get("lastName", "")).strip()
    email = str(data.get("email", "")).strip().lower()
    password = str(data.get("password", ""))

    if not first_name or not last_name:
        raise HTTPException(
            status_code=400,
            detail="First name and last name are required"
        )

    if not email:
        raise HTTPException(
            status_code=400,
            detail="Email is required"
        )

    if len(password) < 8:
        raise HTTPException(
            status_code=400,
            detail="Password must contain at least 8 characters"
        )

    existing_user = users_collection.find_one({
        "email": email
    })

    if existing_user:
        raise HTTPException(
            status_code=409,
            detail="An account with this email already exists"
        )

    password_hash = hash_password(password)

    user = {
        "firstName": first_name,
        "lastName": last_name,
        "email": email,
        "passwordHash": password_hash,
        "createdAt": datetime.now(timezone.utc)
    }

    users_collection.insert_one(user)

    # Create corresponding student document
    students_collection.update_one(
        {"email": email},
        {
            "$setOnInsert": {
                "email": email,
                "profile": {
                    "name": f"{first_name} {last_name}",
                    "email": email
                }
            }
        },
        upsert=True
    )

    token = create_access_token(email)

    return {
        "status": "success",
        "message": "Account created successfully",
        "token": token,
        "user": {
            "firstName": first_name,
            "lastName": last_name,
            "email": email
        }
    }


# ============================================================
# LOGIN
# ============================================================

@app.post("/auth/login")
def login(data: dict):

    email = str(data.get("email", "")).strip().lower()
    password = str(data.get("password", ""))

    if not email or not password:
        raise HTTPException(
            status_code=400,
            detail="Email and password are required"
        )

    user = users_collection.find_one({
        "email": email
    })

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        password,
        user["passwordHash"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(email)

    return {
        "status": "success",
        "message": "Login successful",
        "token": token,
        "user": {
            "firstName": user["firstName"],
            "lastName": user["lastName"],
            "email": user["email"]
        }
    }




@app.post("/students")
def create_student(
    data: dict,
    current_user: str = Depends(get_current_user)
):
    try:
        # Never trust the email sent by the frontend.
        # The authenticated email comes from the verified JWT.
        email = current_user

        data["email"] = current_user

        if not email:
            raise HTTPException(
                status_code=400,
                detail="Authenticated user email is missing"
            )

        result = students_collection.update_one(
            {"email": email},
            {
                "$set": {
                    "profile": data
                }
            },
            upsert=True
        )

        return {
            "status": "success",
            "message": "Student profile saved successfully",
            "email": email,
            "student_id": str(result.upserted_id)
            if result.upserted_id
            else None
        }

    except HTTPException:
        raise

    except Exception as e:
        print("Student save error:", repr(e))

        raise HTTPException(
            status_code=500,
            detail="Failed to save student profile"
        )


# ============================================================
# CURRENT LOGGED-IN STUDENT
# ============================================================

@app.get("/students/me")
def get_current_student(
    current_user: str = Depends(get_current_user)
):
    try:
        student = students_collection.find_one(
            {"email": current_user},
            {"_id": 0}
        )

        if not student:
            raise HTTPException(
                status_code=404,
                detail="Student profile not found"
            )

        return {
            "status": "success",
            "student": student
        }

    except HTTPException:
        raise

    except Exception as e:
        print("Current student fetch error:", repr(e))

        raise HTTPException(
            status_code=500,
            detail="Failed to fetch student profile"
        )


# ============================================================
# STUDENT FETCH BY EMAIL - JWT PROTECTED
# ============================================================

@app.get("/students/{email}")
def get_student(
    email: str,
    current_user: str = Depends(get_current_user)
):
    try:
        email = email.strip().lower()

        # A logged-in user can only access their own student record.
        if email != current_user:
            raise HTTPException(
                status_code=403,
                detail="You are not authorized to access this student's data"
            )

        student = students_collection.find_one(
            {"email": current_user},
            {"_id": 0}
        )

        if not student:
            raise HTTPException(
                status_code=404,
                detail="Student not found"
            )

        return {
            "status": "success",
            "student": student
        }

    except HTTPException:
        raise

    except Exception as e:
        print("Student fetch error:", repr(e))

        raise HTTPException(
            status_code=500,
            detail="Failed to fetch student"
        )


# ============================================================
# APTITUDE - JWT PROTECTED
# ============================================================

@app.patch("/students/{email}/aptitude")
def save_aptitude(
    email: str,
    data: dict,
    current_user: str = Depends(get_current_user)
):
    try:
        email = email.strip().lower()

        if email != current_user:
            raise HTTPException(
                status_code=403,
                detail="You are not authorized to update this student's data"
            )

        student = students_collection.find_one(
            {"email": current_user}
        )

        if not student:
            raise HTTPException(
                status_code=404,
                detail="Student not found"
            )

        students_collection.update_one(
            {"email": current_user},
            {
                "$set": {
                    "aptitude": data
                }
            }
        )

        return {
            "status": "success",
            "message": "Aptitude result saved successfully",
            "email": current_user
        }

    except HTTPException:
        raise

    except Exception as e:
        print("Aptitude save error:", repr(e))

        raise HTTPException(
            status_code=500,
            detail="Failed to save aptitude result"
        )


# ============================================================
# SOFT SKILLS - JWT PROTECTED
# ============================================================

@app.patch("/students/{email}/soft-skills")
def save_soft_skills(
    email: str,
    data: dict,
    current_user: str = Depends(get_current_user)
):
    try:
        email = email.strip().lower()

        if email != current_user:
            raise HTTPException(
                status_code=403,
                detail="You are not authorized to update this student's data"
            )

        student = students_collection.find_one(
            {"email": current_user}
        )

        if not student:
            raise HTTPException(
                status_code=404,
                detail="Student not found"
            )

        students_collection.update_one(
            {"email": current_user},
            {
                "$set": {
                    "softSkills": data
                }
            }
        )

        return {
            "status": "success",
            "message": "Soft skills result saved successfully",
            "email": current_user
        }

    except HTTPException:
        raise

    except Exception as e:
        print("Soft skills save error:", repr(e))

        raise HTTPException(
            status_code=500,
            detail="Failed to save soft skills result"
        )


# ============================================================
# ROADMAP - JWT PROTECTED
# ============================================================

@app.patch("/students/{email}/roadmap")
def save_roadmap_progress(
    email: str,
    data: dict,
    current_user: str = Depends(get_current_user)
):
    try:
        email = email.strip().lower()

        if email != current_user:
            raise HTTPException(
                status_code=403,
                detail="You are not authorized to update this student's data"
            )

        student = students_collection.find_one(
            {"email": current_user}
        )

        if not student:
            raise HTTPException(
                status_code=404,
                detail="Student not found"
            )

        roadmap_progress = data.get(
            "roadmapProgress",
            {}
        )

        students_collection.update_one(
            {"email": current_user},
            {
                "$set": {
                    "roadmapProgress": roadmap_progress
                }
            }
        )

        return {
            "status": "success",
            "message": "Roadmap progress saved successfully",
            "email": current_user
        }

    except HTTPException:
        raise

    except Exception as e:
        print("Roadmap save error:", repr(e))

        raise HTTPException(
            status_code=500,
            detail="Failed to save roadmap progress"
        )


# ============================================================
# PREDICTION
# ============================================================

@app.post("/predict")
def predict(data: dict):

    # ========================================================
    # 1. REQUIRED FIELDS
    # ========================================================

    required_fields = [
        "CGPA",
        "Internships",
        "Projects",
        "Workshops/Certifications",
        "AptitudeTestScore",
        "SoftSkillsRating",
        "ExtracurricularActivities",
        "PlacementTraining",
        "SSC_Marks",
        "HSC_Marks"
    ]

    missing_fields = [
        field
        for field in required_fields
        if data.get(field) is None
        or data.get(field) == ""
    ]

    if missing_fields:

        raise HTTPException(
            status_code=400,
            detail={
                "message": "Required fields are missing",
                "missing_fields": missing_fields
            }
        )


    # ========================================================
    # 2. ELIGIBILITY CHECK
    # ========================================================

    eligibility_results, failed = check_eligibility(data)

    eligible = len(failed) == 0


    # ========================================================
    # 3. PREPARE ML DATA
    # ========================================================

    model_data = {

        "CGPA":
            safe_float(data.get("CGPA")),

        "Internships":
            safe_float(data.get("Internships")),

        "Projects":
            safe_float(data.get("Projects")),

        "Workshops/Certifications":
            safe_float(
                data.get("Workshops/Certifications")
            ),

        "AptitudeTestScore":
            safe_float(
                data.get("AptitudeTestScore")
            ),

        # Frontend sends Soft Skills as a percentage (0-100).
        # The ML model was trained with SoftSkillsRating on a 0-5 scale.
        "SoftSkillsRating":
            safe_float(
                data.get("SoftSkillsRating")
            ) / 20,

        "ExtracurricularActivities":
            str(
                data.get(
                    "ExtracurricularActivities",
                    "no"
                )
            ).strip().lower(),

        "PlacementTraining":
            str(
                data.get(
                    "PlacementTraining",
                    "no"
                )
            ).strip().lower(),

        "SSC_Marks":
            safe_float(
                data.get("SSC_Marks")
            ),

        "HSC_Marks":
            safe_float(
                data.get("HSC_Marks")
            )
    }


    student = pd.DataFrame([model_data])

    # Use the normalized ML-scale Soft Skills value for
    # readiness and report calculations as well.
    normalized_data = {
        **data,
        "SoftSkillsRating": model_data["SoftSkillsRating"],
    }


    # ========================================================
    # 4. DEFAULT ML VALUES
    # ========================================================

    probability = None
    ml_prediction = None


    # ========================================================
    # 5. RUN ML ONLY IF ELIGIBLE
    # ========================================================

    if eligible:

        try:

            print("MODEL INPUT:", student.to_dict(orient="records")[0])

            raw_prediction = model.predict(student)[0]

            probability = (
                float(
                    model.predict_proba(student)[0][1]
                ) * 100
            )

            print("MODEL RAW PREDICTION:", raw_prediction)
            print("MODEL PLACEMENT PROBABILITY:", probability)

            # Model target was encoded as:
            # 0 = Not Placed
            # 1 = Placed

            try:
                ml_prediction = int(raw_prediction)

            except (ValueError, TypeError):

                if str(raw_prediction).strip().lower() in [
                    "placed",
                    "1",
                    "true"
                ]:
                    ml_prediction = 1

                else:
                    ml_prediction = 0


        except Exception as e:

            print(
                "MODEL ERROR:",
                repr(e)
            )

            raise HTTPException(
                status_code=500,
                detail={
                    "message": "ML model prediction failed",
                    "error": str(e)
                }
            )


    # ========================================================
    # 6. FINAL PREDICTION
    # ========================================================

    if not eligible:

        final_prediction = "Not Eligible"

    else:

        if probability >= 60:

            final_prediction = "Likely to be Placed"

        else:

            final_prediction = "Less Likely to be Placed"


    # ========================================================
    # 7. READINESS
    # ========================================================

    readiness_score = calculate_readiness_score(normalized_data)

    readiness = get_readiness(
        readiness_score
    )


    # ========================================================
    # 8. REPORT CONTENT
    # ========================================================

    strengths = generate_strengths(normalized_data)

    improvements = generate_improvements(normalized_data)

    next_steps = generate_next_steps(
        normalized_data,
        failed
    )


    # ========================================================
    # 9. GRAPH DATA
    # ========================================================

    feature_contributions = (
        generate_feature_contributions(normalized_data)
    )

    skill_distribution = (
        generate_skill_distribution(normalized_data)
    )


    # ========================================================
    # 10. ELIGIBILITY MESSAGE
    # ========================================================

    if eligible:

        eligibility_message = (
            "All mandatory minimum eligibility criteria "
            "are satisfied."
        )

    else:

        failed_names = ", ".join(failed)

        eligibility_message = (
            f"The student does not meet the minimum "
            f"eligibility criteria for: {failed_names}."
        )


    # ========================================================
    # 11. COMPLETE REPORT
    # ========================================================

    return {

        # ----------------------------------------------------
        # Prediction
        # ----------------------------------------------------

        "prediction": final_prediction,

        "placement_probability":
            round(probability, 2)
            if probability is not None
            else None,

        "ml_prediction":
            ml_prediction,

        # ----------------------------------------------------
        # Eligibility
        # ----------------------------------------------------

        "eligible": eligible,

        "eligibility_status":
            "Eligible" if eligible else "Not Eligible",

        "eligibility_message":
            eligibility_message,

        "failed_criteria":
            failed,

        "minimum_eligibility_criteria": {
            "CGPA": "≥ 6.5 / 10",
            "SSC_Marks": "≥ 60%",
            "HSC_Marks": "≥ 60%"
        },

        "eligibility_details":
            eligibility_results,

        # ----------------------------------------------------
        # Readiness
        # ----------------------------------------------------

        "readiness_score":
            readiness_score,

        "readiness":
            readiness,

        # ----------------------------------------------------
        # Report
        # ----------------------------------------------------

        "strengths":
            strengths,

        "areas_to_improve":
            improvements,

        "recommended_next_steps":
            next_steps,

        # ----------------------------------------------------
        # Graph Data
        # ----------------------------------------------------

        "feature_contributions":
            feature_contributions,

        "skill_distribution":
            skill_distribution,

        # ----------------------------------------------------
        # Business Weights
        # ----------------------------------------------------

        "feature_weights":
            FEATURE_WEIGHTS,

        # ----------------------------------------------------
        # Profile
        # ----------------------------------------------------

        "scales": {
            "CGPA": "0-10",
            "SSC_Marks": "0-100%",
            "HSC_Marks": "0-100%",
            "AptitudeTestScore": "0-100%",
            "SoftSkillsScore": "0-100%",
            "SoftSkillsRating": "0-5 (ML model scale)",
            "Internships": "count",
            "Projects": "count",
            "Workshops/Certifications": "count",
        },

        "profile": {
            "CGPA":
                model_data["CGPA"],

            "Internships":
                model_data["Internships"],

            "Projects":
                model_data["Projects"],

            "Workshops/Certifications":
                model_data[
                    "Workshops/Certifications"
                ],

            "AptitudeTestScore":
                model_data[
                    "AptitudeTestScore"
                ],

            # Percentage score shown to the student.
            "SoftSkillsScore":
                safe_float(
                    data.get("SoftSkillsRating")
                ),

            # 0-5 value actually used by the ML model.
            "SoftSkillsRating":
                model_data[
                    "SoftSkillsRating"
                ],

            "ExtracurricularActivities":
                model_data[
                    "ExtracurricularActivities"
                ],

            "PlacementTraining":
                model_data[
                    "PlacementTraining"
                ],

            "SSC_Marks":
                model_data["SSC_Marks"],

            "HSC_Marks":
                model_data["HSC_Marks"]
        }
    }

# ============================================================
# AI TUTOR
# ============================================================

# ============================================================
# AI TUTOR
# ============================================================

import time


@app.post("/ai-tutor")
def ai_tutor(data: dict):
    try:
        question = data.get("question", "").strip()

        if not question:
            raise HTTPException(
                status_code=400,
                detail="Question is required"
            )

        prompt = f"""
You are EngineerOS AI Tutor, an AI assistant designed specifically
for engineering students.

Your job is to help students understand:
- Programming
- DSA
- Web development
- Java
- Python
- AI and ML
- Computer engineering subjects
- Projects
- Interview preparation
- Placement preparation
- Career and technical skills

Student question:
{question}

Instructions:
1. Explain concepts clearly and simply.
2. Give examples whenever useful.
3. For programming questions, provide correct code when needed.
4. Explain the code instead of only giving the answer.
5. If the student is confused, break the concept into small steps.
6. Keep the response practical and useful for an engineering student.
7. Do not unnecessarily repeat the question.
"""

        # --------------------------------------------------------
        # TRY GEMINI
        # --------------------------------------------------------

        max_retries = 3

        for attempt in range(max_retries):
            try:
                response = gemini_client.models.generate_content(
                    model="gemini-3.5-flash",
                    contents=prompt
                )

                return {
                    "status": "success",
                    "answer": response.text
                }

            except Exception as gemini_error:

                error_text = str(gemini_error)

                print(
                    f"Gemini attempt {attempt + 1}/{max_retries} failed:"
                )
                print(error_text)

                # Retry temporary 503 / 429 errors
                if (
                    "503" in error_text
                    or "UNAVAILABLE" in error_text
                    or "429" in error_text
                    or "RESOURCE_EXHAUSTED" in error_text
                ):

                    if attempt < max_retries - 1:
                        wait_time = 2 ** attempt

                        print(
                            f"Retrying Gemini in {wait_time} seconds..."
                        )

                        time.sleep(wait_time)
                        continue

                # If it is not a temporary error,
                # immediately stop retrying.
                raise

        raise Exception(
            "Gemini service is temporarily unavailable"
        )

    except HTTPException:
        raise

    except Exception as e:
        print(
            "Gemini AI Tutor error:",
            repr(e)
        )

        raise HTTPException(
            status_code=503,
            detail=(
                "Gemini AI Tutor is temporarily unavailable. "
                "Please try again in a moment."
            )
        )