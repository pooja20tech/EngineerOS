import React, { useEffect, useMemo, useState } from "react";
import {
  getStudentData,
  saveStudentData,
} from "../utils/studentData";
import {
  User,
  FolderKanban,
  BriefcaseBusiness,
  Award,
  Compass,
  Map,
  Brain,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Circle,
  TrendingUp,
  Sparkles,
  Target,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

interface ProfileData {
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

interface AptitudeResult {
  completed: boolean;
  quantitative: number;
  logicalReasoning: number;
  verbal: number;
  dataInterpretation: number;
  overall: number;
  completedAt: string;
}

interface SoftSkillsResult {
  completed: boolean;
  communication: number;
  teamwork: number;
  leadership: number;
  problemSolving: number;
  adaptability: number;
  timeManagement: number;
  overall: number;
  completedAt: string;
}

interface StudentData {
  profile?: ProfileData;
  aptitude?: AptitudeResult;
  softSkills?: SoftSkillsResult;
}

const fetchStudentFromDatabase = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return null;
    }

    const response = await fetch(
      "https://engineeros-api.onrender.com/students/me",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      return null;
    }

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch student");
    }

    const result = await response.json();

    return result?.student || null;
  } catch (error) {
    console.error("Dashboard MongoDB fetch error:", error);
    return null;
  }
};

const Dashboard: React.FC = () => {

  const [databaseData, setDatabaseData] = useState<StudentData | null>(
    null
  );

  useEffect(() => {
    const loadStudentProfile = async () => {
      const student = await fetchStudentFromDatabase();

      if (!student) {
        return;
      }

      const profile = student.profile || undefined;
      const aptitude = student.aptitude;
      const softSkills = student.softSkills;

      const syncedData: StudentData = {
        profile,
        aptitude,
        softSkills,
      };

      setDatabaseData(syncedData);

      // Keep the current user's local cache synchronized with MongoDB.
      const localData = getStudentData();

      saveStudentData({
        ...localData,
        ...syncedData,
      });
    };

    loadStudentProfile();
  }, []);

  const navigate = useNavigate();

  const data = useMemo(() => getStudentData(), [databaseData]);

  const profile = databaseData?.profile || data.profile;
  const aptitude = databaseData?.aptitude || data.aptitude;
  const softSkills = databaseData?.softSkills || data.softSkills;
  /* =====================================================
     PROFILE COMPLETION
  ===================================================== */

  const profileCompletion = useMemo(() => {
    if (!profile) return 0;

    const fields = [
      profile.name,
      profile.email,
      profile.branch,
      profile.year,
      profile.semester,
      profile.college,
      profile.cgpa,
      profile.ssc,
      profile.hsc,
      profile.internships,
      profile.projects,
      profile.certifications,
      profile.targetDomain,
      profile.targetRole,
    ];

    const completed = fields.filter(
      (field) => String(field ?? "").trim() !== ""
    ).length;

    return Math.round((completed / fields.length) * 100);
  }, [profile]);

  /* =====================================================
     NEXT STEP
  ===================================================== */

  const nextStep = !profile
    ? {
        label: "PROFILE",
        title: "Complete your profile",
        description:
          "Add your academic background and career details to personalize EngineerOS.",
        button: "Complete Profile",
        path: "/profile",
        icon: User,
      }
    : !aptitude?.completed
      ? {
          label: "ASSESSMENT",
          title: "Take your aptitude test",
          description:
            "Measure your quantitative, logical, verbal and data interpretation skills.",
          button: "Start Aptitude Test",
          path: "/aptitude",
          icon: Brain,
        }
      : !softSkills?.completed
        ? {
            label: "ASSESSMENT",
            title: "Complete your soft skills assessment",
            description:
              "Understand your communication, teamwork, leadership and workplace skills.",
            button: "Start Assessment",
            path: "/soft-skills",
            icon: MessageSquare,
          }
        : {
            label: "LEARNING",
            title: "Continue your career roadmap",
            description:
              "Turn your career direction into a structured learning journey.",
            button: "Open Roadmap",
            path: "/roadmap",
            icon: Map,
          };

 

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="dashboard-header">

          <div>
            <span className="dashboard-eyebrow">
              ENGINEEROS · STUDENT DASHBOARD
            </span>

            <h1>
              Welcome back,
              <br />

              <em>{profile?.name?.split(" ")[0] || "Student"}.</em>
            </h1>

            <p>
              Your engineering journey at a glance. See where you are,
              what you have completed and what you should do next.
            </p>
          </div>

          <button
            className="dashboard-profile-btn"
            onClick={() => navigate("/profile")}
          >
            <User size={17} />

            {profile ? "View Profile" : "Complete Profile"}

            <ArrowRight size={15} />
          </button>

        </header>

        {/* =================================================
            QUICK STATS
        ================================================= */}

        <section className="dashboard-stats">

          <article className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              <Award size={20} />
            </div>

            <span>CGPA</span>

            <strong>
              {profile?.cgpa || "—"}

              <small>/10</small>
            </strong>

            <p>Academic performance</p>

          </article>

          <article className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              <FolderKanban size={20} />
            </div>

            <span>PROJECTS</span>

            <strong>
              {profile?.projects || "0"}
            </strong>

            <p>Projects completed</p>

          </article>

          <article className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              <BriefcaseBusiness size={20} />
            </div>

            <span>INTERNSHIPS</span>

            <strong>
              {profile?.internships || "0"}
            </strong>

            <p>Practical experience</p>

          </article>

          <article className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              <Target size={20} />
            </div>

            <span>CAREER DIRECTION</span>

            <strong className="dashboard-domain-value">
              {profile?.targetDomain || "Explore"}
            </strong>

            <p>
              {profile?.targetRole || "Choose your direction"}
            </p>

          </article>

        </section>

        {/* =================================================
            JOURNEY + NEXT STEP
        ================================================= */}

        <section className="dashboard-main-grid">

          {/* JOURNEY */}

          <article className="dashboard-card journey-card">

            <div className="dashboard-card-heading">

              <div>
                <span>YOUR JOURNEY</span>

                <h2>
                  Engineering, one step at a time.
                </h2>
              </div>

              <TrendingUp size={20} />

            </div>

            <div className="journey-progress">

              <div className="journey-line" />

              {/* DISCOVER */}

              <div className="journey-item active">

                <div className="journey-dot">
                  <Compass size={18} />
                </div>

                <strong>Discover</strong>

                <span>
                  Explore domains
                </span>

              </div>

              {/* CHOOSE */}

              <div
                className={`journey-item ${
                  profile?.targetDomain ? "active" : ""
                }`}
              >

                <div className="journey-dot">

                  {profile?.targetDomain ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <Circle size={18} />
                  )}

                </div>

                <strong>Choose</strong>

                <span>
                  Find your direction
                </span>

              </div>

              {/* LEARN */}

              <div className="journey-item">

                <div className="journey-dot">
                  <Map size={18} />
                </div>

                <strong>Learn</strong>

                <span>
                  Follow your roadmap
                </span>

              </div>

              {/* PREPARE */}

              <div className="journey-item">

                <div className="journey-dot">
                  <BriefcaseBusiness size={18} />
                </div>

                <strong>Prepare</strong>

                <span>
                  Build your career
                </span>

              </div>

            </div>

            <button
              className="dashboard-text-btn"
              onClick={() => navigate("/careers")}
            >
              Explore career domains

              <ArrowRight size={16} />
            </button>

          </article>

          {/* NEXT STEP */}

          <article className="dashboard-next-card">

            <div className="dashboard-next-icon">
              <Sparkles size={22} />
            </div>

            <span className="dashboard-next-label">
              RECOMMENDED NEXT STEP
            </span>

            <h2>
              {nextStep.title}
            </h2>

            <p>
              {nextStep.description}
            </p>

            <button
              className="dashboard-primary-btn"
              onClick={() => navigate(nextStep.path)}
            >
              {nextStep.button}

              <ArrowRight size={16} />
            </button>

          </article>

        </section>

        {/* =================================================
            PROGRESS
        ================================================= */}

        <section className="dashboard-section">

          <div className="dashboard-section-heading">

            <div>
              <span>YOUR PROGRESS</span>

              <h2>
                Know where you stand.
              </h2>
            </div>

            <button
              className="dashboard-outline-btn"
              onClick={() => navigate("/progress")}
            >
              View full progress

              <ArrowRight size={15} />
            </button>

          </div>

          <div className="dashboard-progress-grid">

            {/* PROFILE */}

            <article className="progress-item">

              <div className="progress-item-top">

                <div className="progress-item-icon">
                  <User size={18} />
                </div>

                <div>
                  <strong>Profile</strong>

                  <span>
                    {profileCompletion}% complete
                  </span>
                </div>

              </div>

              <div className="dashboard-progress-track">

                <i
                  style={{
                    width: `${profileCompletion}%`,
                  }}
                />

              </div>

            </article>

            {/* APTITUDE */}

            <article className="progress-item">

              <div className="progress-item-top">

                <div className="progress-item-icon">
                  <Brain size={18} />
                </div>

                <div>
                  <strong>Aptitude</strong>

                  <span>
                    {aptitude?.completed
                      ? `${aptitude.overall}/100`
                      : "Not completed"}
                  </span>
                </div>

              </div>

              <div className="dashboard-progress-track">

                <i
                  style={{
                    width: `${
                      aptitude?.completed
                        ? aptitude.overall
                        : 0
                    }%`,
                  }}
                />

              </div>

            </article>

            {/* SOFT SKILLS */}

            <article className="progress-item">

              <div className="progress-item-top">

                <div className="progress-item-icon">
                  <MessageSquare size={18} />
                </div>

                <div>
                  <strong>Soft Skills</strong>

                  <span>
                    {softSkills?.completed
                      ? `${softSkills.overall.toFixed(1)}/5`
                      : "Not completed"}
                  </span>
                </div>

              </div>

              <div className="dashboard-progress-track">

                <i
                  style={{
                    width: `${
                      softSkills?.completed
                        ? softSkills.overall * 20
                        : 0
                    }%`,
                  }}
                />

              </div>

            </article>

          </div>

        </section>

        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <section className="dashboard-section">

          <div className="dashboard-section-heading">

            <div>
              <span>QUICK ACTIONS</span>

              <h2>
                Continue building your profile.
              </h2>
            </div>

          </div>

          <div className="dashboard-actions">

            <button
              onClick={() => navigate("/careers")}
            >
              <Compass size={20} />

              <span>
                <strong>Explore Domains</strong>
                <small>Find your engineering direction</small>
              </span>

              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => navigate("/roadmap")}
            >
              <Map size={20} />

              <span>
                <strong>Career Roadmap</strong>
                <small>See what you should learn next</small>
              </span>

              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => navigate("/domain-test")}
            >
              <Target size={20} />

              <span>
                <strong>Domain Interest Test</strong>
                <small>Understand your interests</small>
              </span>

              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => navigate("/ai-tutor")}
            >
              <Sparkles size={20} />

              <span>
                <strong>AI Tutor</strong>
                <small>Get help with your learning</small>
              </span>

              <ArrowRight size={16} />
            </button>

          </div>

        </section>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="dashboard-footer">

          <Sparkles size={19} />

          <span>
            EngineerOS helps you understand where you are
            and what to do next.
          </span>

          <button
            onClick={() => navigate("/progress")}
          >
            Track progress

            <ArrowRight size={15} />
          </button>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;