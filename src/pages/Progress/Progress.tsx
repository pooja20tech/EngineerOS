import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Circle,
  GraduationCap,
  Target,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";
import { roadmapData } from "../CareerRoadmap/roadmapData";
import { getStudentData, saveStudentData } from "../../utils/studentData";
import type { RoadmapData } from "../CareerRoadmap/roadmapData";
import "./Progress.css";

type Assessment = {
  completed?: boolean;
  overall?: number;
  completedAt?: string;
  [key: string]: unknown;
};

type Profile = {
  name?: string;
  email?: string;
  cgpa?: string;
  ssc?: string;
  hsc?: string;
  projects?: string;
  internships?: string;
  certifications?: string;
  targetDomain?: string;
  targetRole?: string;
  [key: string]: unknown;
};

type RoadmapStatus = "done" | "learning" | "skip" | "not-started";

type RoadmapProgress = Record<string, RoadmapStatus>;

type StudentData = {
  profile?: Profile;
  aptitude?: Assessment;
  softSkills?: Assessment;
  roadmapProgress?: RoadmapProgress;
};

const getRoadmapStorageKey = (): string => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const email = String(user?.email || "")
      .trim()
      .toLowerCase();

    if (email) {
      return `engineerOSRoadmapProgress:${email}`;
    }

    return "engineerOSRoadmapProgress";
  } catch (error) {
    console.error("Error getting roadmap storage key:", error);
    return "engineerOSRoadmapProgress";
  }
};

const readData = (): StudentData => {
  try {
    const savedData = getStudentData() as StudentData;
    const roadmapStorageKey = getRoadmapStorageKey();

    const roadmapProgress = JSON.parse(
      localStorage.getItem(roadmapStorageKey) || "{}"
    ) as RoadmapProgress;

    return {
      ...(savedData || {}),
      roadmapProgress,
    };
  } catch (error) {
    console.error("Error reading student progress:", error);
    return {};
  }
};

const bounded = (value: unknown, max = 100) =>
  Math.max(0, Math.min(max, Number(value) || 0));

const dateLabel = (value?: string) =>
  value && !Number.isNaN(Date.parse(value))
    ? new Date(value).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Not completed";

function MetricBar({
  label,
  value,
  suffix = "%",
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div className="pt-bar-row">
      <div className="pt-bar-label">
        <span>{label}</span>
        <strong>
          {value.toFixed(0)}
          {suffix}
        </strong>
      </div>

      <div className="pt-bar-track">
        <div style={{ width: `${bounded(value)}%` }} />
      </div>
    </div>
  );
}

const Progress: React.FC = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<StudentData>(readData);

  useEffect(() => {
    const refresh = () => {
      setData(readData());
    };

    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);

    const loadStudentDataFromMongoDB = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        if (!token || !user?.email) {
          navigate("/auth");
          return;
        }

        const response = await fetch("http://127.0.0.1:8000/students/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("isLoggedIn");
          navigate("/auth");
          return;
        }

        if (response.status === 404) {
          refresh();
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch student data from MongoDB.");
        }

        const responseData = await response.json();
        const student = responseData?.student || responseData;

        if (!student) {
          throw new Error("Student record not found.");
        }

        const mongoData: StudentData = {
          profile: student.profile,
          aptitude: student.aptitude,
          softSkills: student.softSkills || student.softskills,
          roadmapProgress: student.roadmapProgress || {},
        };

        // Pass structured data safely to saveStudentData
        saveStudentData({
          profile: mongoData.profile,
          aptitude: mongoData.aptitude,
          softSkills: mongoData.softSkills,
        } as Parameters<typeof saveStudentData>[0]);

        if (mongoData.roadmapProgress) {
          localStorage.setItem(
            getRoadmapStorageKey(),
            JSON.stringify(mongoData.roadmapProgress)
          );
        }

        setData(mongoData);

        console.log("Progress data loaded from MongoDB successfully.");
      } catch (error) {
        console.error("Progress MongoDB fetch error:", error);
        refresh();
      }
    };

    loadStudentDataFromMongoDB();

    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, [navigate]);

  const profile = data.profile;

  const aptitude = data.aptitude?.completed ? data.aptitude : undefined;

  const soft = data.softSkills?.completed ? data.softSkills : undefined;

  const roadmapProgress: RoadmapProgress = data.roadmapProgress || {};

  const profileFields = [
    "name",
    "email",
    "branch",
    "year",
    "semester",
    "college",
    "cgpa",
    "ssc",
    "hsc",
    "internships",
    "projects",
    "certifications",
    "targetDomain",
    "targetRole",
  ];

  const filled = profileFields.filter(
    (key) => String(profile?.[key] ?? "").trim() !== ""
  ).length;

  const profilePct = Math.round((filled / profileFields.length) * 100);

  const completedAssessments =
    Number(Boolean(aptitude)) + Number(Boolean(soft));

  const aptitudeMetrics = [
    ["Quantitative", "quantitative"],
    ["Logical reasoning", "logicalReasoning"],
    ["Verbal", "verbal"],
    ["Data interpretation", "dataInterpretation"],
  ] as const;

  const softMetrics = [
    ["Communication", "communication"],
    ["Teamwork", "teamwork"],
    ["Leadership", "leadership"],
    ["Problem solving", "problemSolving"],
    ["Adaptability", "adaptability"],
    ["Time management", "timeManagement"],
  ] as const;

  const softOverall = bounded(soft?.overall) / 20;

  const roadmapStats = useMemo(() => {
    let totalTopics = 0;

    const allRoadmaps = Object.values(roadmapData) as RoadmapData[];

    allRoadmaps.forEach((roadmap: RoadmapData) => {
      roadmap.sections.forEach((section) => {
        totalTopics += 1;
        totalTopics += section.left?.length ?? 0;
        totalTopics += section.right?.length ?? 0;
      });
    });

    const statusValues = Object.values(roadmapProgress) as RoadmapStatus[];

    const doneTopics = statusValues.filter(
      (status) => status === "done"
    ).length;

    const learningTopics = statusValues.filter(
      (status) => status === "learning"
    ).length;

    const skippedTopics = statusValues.filter(
      (status) => status === "skip"
    ).length;

    const progress =
      totalTopics > 0
        ? Math.min(100, Math.round((doneTopics / totalTopics) * 100))
        : 0;

    return {
      totalTopics,
      doneTopics,
      learningTopics,
      skippedTopics,
      progress,
    };
  }, [roadmapProgress]);

  const next = !profile
    ? {
        title: "Complete your profile",
        text: "Add your academic details to make your dashboard useful.",
        path: "/profile",
      }
    : !aptitude
    ? {
        title: "Take your aptitude test",
        text: "Get your first quantitative, logical and verbal skill breakdown.",
        path: "/aptitude",
      }
    : !soft
    ? {
        title: "Assess your soft skills",
        text: "Understand your communication, teamwork and problem-solving strengths.",
        path: "/soft-skills",
      }
    : roadmapStats.progress < 100
    ? {
        title: "Continue your career roadmap",
        text: `${roadmapStats.doneTopics} of ${roadmapStats.totalTopics} roadmap topics completed. Keep building your skills.`,
        path: "/roadmap",
      }
    : {
        title: "Review your career roadmap",
        text: "You have completed your current roadmap. Review your progress and keep improving.",
        path: "/roadmap",
      };

  return (
    <>
      <style>{`
        .pt-performance-card {
          overflow: hidden;
        }

        .pt-performance-intro {
          margin: -6px 0 24px;
          color: #667085;
          font-size: 14px;
          line-height: 1.6;
          max-width: 720px;
        }

        .pt-performance-layout {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 30px;
        }

        .pt-performance-section {
          padding: 20px;
          border: 1px solid #e8e9f2;
          border-radius: 18px;
          background: #fbfbff;
        }

        .pt-performance-section h3 {
          margin: 0 0 20px;
          color: #172033;
          font-size: 16px;
          font-weight: 750;
        }

        .pt-performance-section .pt-bar-row {
          margin-bottom: 17px;
        }

        .pt-performance-section .pt-bar-row:last-child {
          margin-bottom: 0;
        }

        .pt-performance-section .pt-bar-track {
          height: 9px;
          background: #ececf5;
          border-radius: 999px;
          overflow: hidden;
        }

        .pt-performance-section .pt-bar-track > div {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #6d4aff, #9278ff);
          transition: width 0.35s ease;
        }

        .pt-count-bars {
          display: flex;
          flex-direction: column;
          gap: 21px;
        }

        .pt-count-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .pt-count-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #667085;
          font-size: 14px;
        }

        .pt-count-label strong {
          color: #172033;
          font-size: 15px;
        }

        .pt-count-track {
          height: 10px;
          background: #ececf5;
          border-radius: 999px;
          overflow: hidden;
        }

        .pt-count-track > div {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #8b6cff, #b09cff);
          transition: width 0.35s ease;
        }

        .pt-experience-section .pt-text-btn {
          margin-top: 25px;
        }

        .pt-roadmap-progress {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 24px;
          align-items: center;
        }

        .pt-roadmap-progress-main {
          min-width: 0;
        }

        .pt-roadmap-progress-head {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: center;
          margin-bottom: 10px;
        }

        .pt-roadmap-progress-head strong {
          color: #5b3de0;
          font-size: 22px;
        }

        .pt-roadmap-track {
          height: 11px;
          background: #ececf5;
          border-radius: 999px;
          overflow: hidden;
        }

        .pt-roadmap-track > div {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #6d4aff, #9278ff);
          transition: width 0.35s ease;
        }

        .pt-roadmap-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 18px;
          margin-top: 13px;
          color: #667085;
          font-size: 13px;
        }

        .pt-roadmap-stats span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .pt-roadmap-stats strong {
          color: #172033;
        }

        @media (max-width: 800px) {
          .pt-performance-layout {
            grid-template-columns: 1fr;
          }

          .pt-roadmap-progress {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <main className="pt-page">
        <div className="pt-shell">
          <header className="pt-header">
            <div>
              <div className="pt-eyebrow">
                ENGINEEROS / PROGRESS TRACKING
              </div>

              <h1>
                Your progress, <em>at a glance.</em>
              </h1>

              <p>
                A clear view of your profile, assessments and next
                steps. Every number below comes from your saved
                EngineerOS data.
              </p>
            </div>

            <button
              className="pt-outline"
              onClick={() => navigate("/profile")}
            >
              <UserRound size={17} />
              My profile
            </button>
          </header>

          <section
            className="pt-stats"
            aria-label="Progress summary"
          >
            <article className="pt-stat">
              <span className="pt-stat-icon">
                <UserRound size={20} />
              </span>
              <small>Profile complete</small>
              <strong>
                {profilePct}
                <span>%</span>
              </strong>
              <div className="pt-mini-track">
                <i style={{ width: `${profilePct}%` }} />
              </div>
            </article>

            <article className="pt-stat">
              <span className="pt-stat-icon">
                <CheckCircle2 size={20} />
              </span>
              <small>Assessments completed</small>
              <strong>
                {completedAssessments}
                <span> / 2</span>
              </strong>
              <p>Aptitude and soft skills</p>
            </article>

            <article className="pt-stat">
              <span className="pt-stat-icon">
                <GraduationCap size={20} />
              </span>
              <small>Current CGPA</small>
              <strong>
                {profile?.cgpa || "—"}
                <span> / 10</span>
              </strong>
              <p>From your student profile</p>
            </article>

            <article className="pt-stat">
              <span className="pt-stat-icon">
                <BookOpen size={20} />
              </span>
              <small>Projects & internships</small>
              <strong>
                {bounded(profile?.projects, 999)}
                <span>
                  {" "}
                  + {bounded(profile?.internships, 999)}
                </span>
              </strong>
              <p>Saved experience</p>
            </article>
          </section>

          <section className="pt-overview">
            <article className="pt-card pt-profile-card pt-performance-card">
              <div className="pt-card-heading">
                <div>
                  <span className="pt-eyebrow">
                    OVERALL PERFORMANCE
                  </span>
                  <h2>Your performance snapshot</h2>
                </div>
                <TrendingUp size={21} />
              </div>

              <p className="pt-performance-intro">
                A real-time view of your academic, assessment and
                experience metrics from your saved EngineerOS data.
              </p>

              <div className="pt-performance-layout">
                <div className="pt-performance-section">
                  <h3>Academic & assessment</h3>

                  <MetricBar
                    label="CGPA"
                    value={bounded(Number(profile?.cgpa) * 10)}
                  />

                  <MetricBar
                    label="SSC"
                    value={bounded(profile?.ssc)}
                  />

                  <MetricBar
                    label="HSC"
                    value={bounded(profile?.hsc)}
                  />

                  <MetricBar
                    label="Aptitude"
                    value={
                      aptitude
                        ? bounded(aptitude.overall)
                        : 0
                    }
                  />

                  <MetricBar
                    label="Soft skills"
                    value={
                      soft
                        ? bounded(soft.overall)
                        : 0
                    }
                  />
                </div>

                <div className="pt-performance-section pt-experience-section">
                  <h3>Experience & achievements</h3>

                  <div className="pt-count-bars">
                    {[
                      {
                        label: "Internships",
                        value: bounded(
                          profile?.internships,
                          999
                        ),
                      },
                      {
                        label: "Projects",
                        value: bounded(
                          profile?.projects,
                          999
                        ),
                      },
                      {
                        label: "Certifications",
                        value: bounded(
                          profile?.certifications,
                          999
                        ),
                      },
                    ].map((item) => {
                      const maxExperience = Math.max(
                        1,
                        bounded(
                          profile?.internships,
                          999
                        ),
                        bounded(
                          profile?.projects,
                          999
                        ),
                        bounded(
                          profile?.certifications,
                          999
                        )
                      );

                      const width =
                        item.value === 0
                          ? 0
                          : Math.max(
                              8,
                              (item.value /
                                maxExperience) *
                                100
                            );

                      return (
                        <div
                          className="pt-count-row"
                          key={item.label}
                        >
                          <div className="pt-count-label">
                            <span>{item.label}</span>
                            <strong>{item.value}</strong>
                          </div>

                          <div className="pt-count-track">
                            <div
                              style={{
                                width: `${width}%`,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    className="pt-text-btn"
                    onClick={() =>
                      navigate("/profile")
                    }
                  >
                    Update profile
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>

            <article className="pt-card pt-next">
              <span className="pt-eyebrow">
                RECOMMENDED NEXT STEP
              </span>

              <div className="pt-next-icon">
                <Target size={25} />
              </div>

              <h2>{next.title}</h2>
              <p>{next.text}</p>

              <button
                className="pt-primary"
                onClick={() => navigate(next.path)}
              >
                Continue
                <ArrowRight size={17} />
              </button>
            </article>
          </section>

          <section className="pt-section">
            <div className="pt-section-head">
              <div>
                <span className="pt-eyebrow">
                  PERFORMANCE ANALYTICS
                </span>
                <h2>Your skill breakdown</h2>
              </div>

              <p>
                These visualizations update when you complete
                an assessment.
              </p>
            </div>

            <div className="pt-charts">
              <article className="pt-card pt-chart">
                <div className="pt-card-heading">
                  <div>
                    <h3>Aptitude performance</h3>
                    <span>
                      {aptitude
                        ? `Overall ${bounded(
                            aptitude.overall
                          ).toFixed(0)}/100 · ${dateLabel(
                            aptitude.completedAt
                          )}`
                        : "No result saved yet"}
                    </span>
                  </div>

                  <Brain size={21} />
                </div>

                {aptitude ? (
                  <div className="pt-bars">
                    {aptitudeMetrics.map(
                      ([label, key]) => (
                        <MetricBar
                          key={key}
                          label={label}
                          value={bounded(
                            aptitude[key]
                          )}
                        />
                      )
                    )}
                  </div>
                ) : (
                  <div className="pt-empty">
                    <Brain size={31} />
                    <p>
                      Complete your aptitude test to
                      unlock this chart.
                    </p>
                    <button
                      className="pt-outline"
                      onClick={() =>
                        navigate("/aptitude")
                      }
                    >
                      Take aptitude test
                    </button>
                  </div>
                )}
              </article>

              <article className="pt-card pt-chart">
                <div className="pt-card-heading">
                  <div>
                    <h3>Soft skills profile</h3>
                    <span>
                      {soft
                        ? `Overall ${softOverall.toFixed(
                            2
                          )}/5 · ${dateLabel(
                            soft.completedAt
                          )}`
                        : "No result saved yet"}
                    </span>
                  </div>

                  <Users size={21} />
                </div>

                {soft ? (
                  <div className="pt-bars">
                    {softMetrics.map(
                      ([label, key]) => (
                        <MetricBar
                          key={key}
                          label={label}
                          value={bounded(soft[key])}
                        />
                      )
                    )}
                  </div>
                ) : (
                  <div className="pt-empty">
                    <Users size={31} />
                    <p>
                      Complete your soft skills assessment
                      to unlock this chart.
                    </p>
                    <button
                      className="pt-outline"
                      onClick={() =>
                        navigate("/soft-skills")
                      }
                    >
                      Take soft skills test
                    </button>
                  </div>
                )}
              </article>
            </div>
          </section>

          <section className="pt-section">
            <div className="pt-section-head">
              <div>
                <span className="pt-eyebrow">
                  YOUR CHECKPOINTS
                </span>
                <h2>What you've completed</h2>
              </div>
            </div>

            <div className="pt-checkpoints">
              {[
                {
                  title: "Student profile",
                  done: profilePct === 100,
                  detail: `${profilePct}% filled`,
                  path: "/profile",
                },
                {
                  title: "Aptitude test",
                  done: Boolean(aptitude),
                  detail: aptitude
                    ? `${bounded(
                        aptitude.overall
                      ).toFixed(0)}/100`
                    : "Not taken",
                  path: "/aptitude",
                },
                {
                  title: "Soft skills assessment",
                  done: Boolean(soft),
                  detail: soft
                    ? `${softOverall.toFixed(2)}/5`
                    : "Not taken",
                  path: "/soft-skills",
                },
                {
                  title: "Career roadmap",
                  done:
                    roadmapStats.progress === 100 &&
                    roadmapStats.totalTopics > 0,
                  detail:
                    roadmapStats.totalTopics > 0
                      ? `${roadmapStats.progress}% complete · ${roadmapStats.doneTopics}/${roadmapStats.totalTopics} done`
                      : "No roadmap topics found",
                  path: "/roadmap",
                },
              ].map((item) => (
                <button
                  className="pt-checkpoint"
                  key={item.title}
                  onClick={() =>
                    navigate(item.path)
                  }
                >
                  <span
                    className={
                      item.done
                        ? "pt-check-icon is-done"
                        : "pt-check-icon"
                    }
                  >
                    {item.done ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      <Circle size={20} />
                    )}
                  </span>

                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                  </span>

                  <ArrowRight size={17} />
                </button>
              ))}
            </div>

            <div className="pt-card pt-roadmap-progress">
              <div className="pt-roadmap-progress-main">
                <div className="pt-card-heading">
                  <div>
                    <span className="pt-eyebrow">
                      CAREER ROADMAP
                    </span>
                    <h3>
                      {roadmapStats.progress}% complete
                    </h3>
                  </div>

                  <TrendingUp size={21} />
                </div>

                <div className="pt-roadmap-progress-head">
                  <span>
                    {roadmapStats.doneTopics} of{" "}
                    {roadmapStats.totalTopics} topics
                    completed
                  </span>

                  <strong>
                    {roadmapStats.progress}%
                  </strong>
                </div>

                <div className="pt-roadmap-track">
                  <div
                    style={{
                      width: `${roadmapStats.progress}%`,
                    }}
                  />
                </div>

                <div className="pt-roadmap-stats">
                  <span>
                    <CheckCircle2 size={14} />
                    Done{" "}
                    <strong>
                      {roadmapStats.doneTopics}
                    </strong>
                  </span>

                  <span>
                    <Circle size={14} />
                    Learning{" "}
                    <strong>
                      {roadmapStats.learningTopics}
                    </strong>
                  </span>

                  <span>
                    <Circle size={14} />
                    Skipped{" "}
                    <strong>
                      {roadmapStats.skippedTopics}
                    </strong>
                  </span>

                  <span>
                    Total{" "}
                    <strong>
                      {roadmapStats.totalTopics}
                    </strong>
                  </span>
                </div>
              </div>

              <button
                className="pt-primary"
                onClick={() => navigate("/roadmap")}
              >
                Open roadmap
                <ArrowRight size={17} />
              </button>
            </div>

            <p className="pt-note">
              Roadmap completion is calculated only from topics
              marked Done. Learning and Skip are tracked separately.
            </p>
          </section>

          <footer className="pt-footer">
            <TrendingUp size={20} />
            Your progress is built one step at a time.

            <button
              onClick={() => navigate("/roadmap")}
            >
              Explore roadmap
              <ArrowRight size={15} />
            </button>
          </footer>
        </div>
      </main>
    </>
  );
};

export default Progress;