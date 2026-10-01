import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  GraduationCap,
  Briefcase,
  Compass,
  Save,
  ArrowRight,
} from "lucide-react";

import {
  getStudentData,
  saveStudentData,
} from "../utils/studentData";

import "./profile.css";

interface ProfileFormData {
  name: string;
  email: string;
  branch: string;
  year: string;
  semester: string;
  college: string;
  cgpa: string;
  ssc: string;
  hsc: string;
  internships: string;
  projects: string;
  certifications: string;
  targetDomain: string;
  targetRole: string;
}

const emptyProfile: ProfileFormData = {
  name: "",
  email: "",
  branch: "",
  year: "",
  semester: "",
  college: "",
  cgpa: "",
  ssc: "",
  hsc: "",
  internships: "",
  projects: "",
  certifications: "",
  targetDomain: "",
  targetRole: "",
};

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState<ProfileFormData>(emptyProfile);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* =========================================================
     GET CURRENT LOGGED-IN USER
  ========================================================= */

  const getLoggedInUser = () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      return user;
    } catch {
      return {};
    }
  };

  /* =========================================================
     LOAD PROFILE
  ========================================================= */

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = getLoggedInUser();

        const token = localStorage.getItem("token");

        if (!token || !user?.email) {
          console.error("User is not authenticated.");
          navigate("/auth");
          return;
        }

        /*
          IMPORTANT:
          Email comes from the authenticated user.
          We do NOT ask the frontend to decide which
          student's profile should be loaded.
        */

        const response = await fetch(
          "https://engineeros-api.onrender.com/students/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        /*
          If profile does not exist yet,
          that's okay — show empty form.
        */

        if (response.status === 404) {
          setFormData({
            ...emptyProfile,
            email: user.email,
            name:
              `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          });

          setLoading(false);
          return;
        }

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("isLoggedIn");

          navigate("/auth");
          return;
        }

        if (!response.ok) {
          throw new Error(
            "Failed to load profile from server."
          );
        }

        const student = await response.json();

        /*
          Backend profile data
        */

        const profile = student?.profile || student;

        const loadedProfile: ProfileFormData = {
          ...emptyProfile,
          ...profile,

          // Always use authenticated email
          email: user.email,
        };

        setFormData(loadedProfile);

        /*
          Keep local cache for other frontend components.
          This is user-specific.
        */

        saveStudentData({
          ...getStudentData(),
          profile: loadedProfile,
        });
      } catch (error) {
        console.error(
          "Profile loading error:",
          error
        );

        /*
          If server loading fails, try local data.
        */

        const localData = getStudentData();
        const user = getLoggedInUser();

        if (localData?.profile) {
          setFormData({
            ...emptyProfile,
            ...localData.profile,
            email: user?.email || localData.profile.email,
          });
        } else {
          setFormData({
            ...emptyProfile,
            email: user?.email || "",
            name:
              `${user?.firstName || ""} ${
                user?.lastName || ""
              }`.trim(),
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  /* =========================================================
     HANDLE INPUT CHANGES
  ========================================================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =========================================================
     SAVE PROFILE
  ========================================================= */

  const handleSave = async () => {
    try {
      setSaving(true);

      const token = localStorage.getItem("token");
      const user = getLoggedInUser();

      if (!token || !user?.email) {
        alert(
          "Your session has expired. Please login again."
        );

        navigate("/auth");
        return;
      }

      /*
        IMPORTANT:
        Never trust the email typed by the frontend.

        The backend gets the authenticated email from
        the JWT and uses that as the actual owner.
      */

      const profileToSave: ProfileFormData = {
        ...formData,
        email: user.email,
      };

      /* =====================================================
         1. SAVE TO BACKEND / MONGODB
      ===================================================== */

      const response = await fetch(
        "https://engineeros-api.onrender.com/students",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(profileToSave),
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");

        alert(
          "Your session has expired. Please login again."
        );

        navigate("/auth");
        return;
      }

      if (!response.ok) {
        const errorData =
          await response.json().catch(() => null);

        throw new Error(
          errorData?.detail ||
            "Failed to save profile to server."
        );
      }

      const result = await response.json();

      console.log(
        "Profile successfully saved:",
        result
      );

      /* =====================================================
         2. SAVE USER-SPECIFIC LOCAL DATA
      ===================================================== */

      const currentData = getStudentData();

      saveStudentData({
        ...currentData,
        profile: profileToSave,
      });

      /* =====================================================
         3. MARK PROFILE AS COMPLETED
      ===================================================== */

      localStorage.setItem(
        "profileCompleted",
        "true"
      );

      /* =====================================================
         4. UPDATE FORM WITH SAVED DATA
      ===================================================== */

      setFormData(profileToSave);

      /* =====================================================
         5. GO TO DASHBOARD
      ===================================================== */

      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Profile save error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Unable to save profile."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     LOADING SCREEN
  ========================================================= */

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div
            style={{
              padding: "60px",
              textAlign: "center",
            }}
          >
            Loading your profile...
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="profile-page">

      <div className="profile-container">

        {/* HEADER */}

        <div className="profile-header">

          <div>

            <p className="profile-eyebrow">
              ENGINEEROS
            </p>

            <h1>Your Profile</h1>

            <p>
              Manage your personal, academic and
              career information.
            </p>

          </div>

          <div className="profile-progress">

            <span>Profile</span>

            <strong>
              {formData.name ? "Saved" : "Setup"}
            </strong>

          </div>

        </div>


        {/* ==================================================
            PERSONAL INFORMATION
        ================================================== */}

        <section className="profile-section">

          <div className="section-title">

            <div className="section-icon">
              <User size={20} />
            </div>

            <div>

              <h2>
                Personal Information
              </h2>

              <p>
                Your basic information
              </p>

            </div>

          </div>


          <div className="profile-grid">

            <div className="input-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />

            </div>


            <div className="input-group">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                readOnly
                placeholder="Your registered email"
              />

            </div>

          </div>

        </section>


        {/* ==================================================
            ACADEMIC INFORMATION
        ================================================== */}

        <section className="profile-section">

          <div className="section-title">

            <div className="section-icon">
              <GraduationCap size={20} />
            </div>

            <div>

              <h2>
                Academic Information
              </h2>

              <p>
                Your educational background
              </p>

            </div>

          </div>


          <div className="profile-grid">

            <div className="input-group">

              <label>
                Branch
              </label>

              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                placeholder="e.g. Computer Engineering"
              />

            </div>


            <div className="input-group">

              <label>
                Year
              </label>

              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
              >

                <option value="">
                  Select year
                </option>

                <option value="1st Year">
                  1st Year
                </option>

                <option value="2nd Year">
                  2nd Year
                </option>

                <option value="3rd Year">
                  3rd Year
                </option>

                <option value="4th Year">
                  4th Year
                </option>

              </select>

            </div>


            <div className="input-group">

              <label>
                Semester
              </label>

              <input
                type="text"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                placeholder="e.g. 7"
              />

            </div>


            <div className="input-group">

              <label>
                College
              </label>

              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="Enter your college"
              />

            </div>


            <div className="input-group">

              <label>
                CGPA
              </label>

              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                name="cgpa"
                value={formData.cgpa}
                onChange={handleChange}
                placeholder="e.g. 8.25"
              />

            </div>


            <div className="input-group">

              <label>
                SSC Percentage
              </label>

              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                name="ssc"
                value={formData.ssc}
                onChange={handleChange}
                placeholder="e.g. 92"
              />

            </div>


            <div className="input-group">

              <label>
                HSC Percentage
              </label>

              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                name="hsc"
                value={formData.hsc}
                onChange={handleChange}
                placeholder="e.g. 75"
              />

            </div>

          </div>

        </section>


        {/* ==================================================
            EXPERIENCE & ACHIEVEMENTS
        ================================================== */}

        <section className="profile-section">

          <div className="section-title">

            <div className="section-icon">
              <Briefcase size={20} />
            </div>

            <div>

              <h2>
                Experience & Achievements
              </h2>

              <p>
                Your practical experience
              </p>

            </div>

          </div>


          <div className="profile-grid">

            <div className="input-group">

              <label>
                Internships
              </label>

              <input
                type="number"
                min="0"
                name="internships"
                value={formData.internships}
                onChange={handleChange}
                placeholder="Number of internships"
              />

            </div>


            <div className="input-group">

              <label>
                Projects
              </label>

              <input
                type="number"
                min="0"
                name="projects"
                value={formData.projects}
                onChange={handleChange}
                placeholder="Number of projects"
              />

            </div>


            <div className="input-group full-width">

              <label>
                Certifications / Workshops
              </label>

              <input
                type="number"
                min="0"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                placeholder="Number of certifications / workshops"
              />

            </div>

          </div>

        </section>


        {/* ==================================================
            CAREER DIRECTION
        ================================================== */}

        <section className="profile-section career-section">

          <div className="section-title">

            <div className="section-icon">
              <Compass size={20} />
            </div>

            <div>

              <div className="title-with-badge">

                <h2>
                  Career Direction
                </h2>

                <span>
                  Optional
                </span>

              </div>

              <p>
                You can update your career direction
                anytime.
              </p>

            </div>

          </div>


          <div className="career-note">

            <Compass size={18} />

            <span>
              Not sure about your career yet?
              That's okay. You can explore
              EngineerOS and update these fields
              later.
            </span>

          </div>


          <div className="profile-grid">

            <div className="input-group">

              <label>
                Target Domain
              </label>

              <input
                type="text"
                name="targetDomain"
                value={formData.targetDomain}
                onChange={handleChange}
                placeholder="e.g. Web Development, AI/ML"
              />

            </div>


            <div className="input-group">

              <label>
                Target Role
              </label>

              <input
                type="text"
                name="targetRole"
                value={formData.targetRole}
                onChange={handleChange}
                placeholder="e.g. Software Engineer"
              />

            </div>

          </div>

        </section>


        {/* ==================================================
            SAVE
        ================================================== */}

        <div className="profile-footer">

          <p>
            Changes will be used across
            EngineerOS, including Placement
            Prediction.
          </p>


          <button
            type="button"
            className="save-profile-btn"
            onClick={handleSave}
            disabled={saving}
          >

            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save Changes"}

            {!saving && (
              <ArrowRight size={18} />
            )}

          </button>

        </div>

      </div>

    </div>
  );
};

export default Profile;