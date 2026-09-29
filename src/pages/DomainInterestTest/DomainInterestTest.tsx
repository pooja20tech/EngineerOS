import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Compass,
  ClipboardCheck,
  Map,
  Brain,
  MessageSquare,
  User,
  BriefcaseBusiness,
  TrendingUp,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

import "./DomainInterestTest.css";

type Domain =
  | "Software Development"
  | "Web Development"
  | "AI Engineering"
  | "Machine Learning"
  | "Data Science"
  | "Cybersecurity"
  | "Cloud & DevOps";

interface Option {
  text: string;
  domains: Domain[];
}

interface Question {
  question: string;
  description: string;
  options: Option[];
}

const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Career & Domain Exploration",
    path: "/careers",
    icon: Compass,
  },
  {
    name: "Domain Interest Test",
    path: "/domain-test",
    icon: ClipboardCheck,
  },
  {
    name: "Career Roadmap",
    path: "/roadmap",
    icon: Map,
  },
  {
    name: "Aptitude Test",
    path: "/aptitude",
    icon: Brain,
  },
  {
    name: "Soft Skills Assessment",
    path: "/soft-skills",
    icon: MessageSquare,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    name: "Placement Prediction",
    path: "/placement",
    icon: BriefcaseBusiness,
  },
  {
    name: "Progress Tracking",
    path: "/progress",
    icon: TrendingUp,
  },
  {
    name: "AI Tutor / Assistant",
    path: "/ai-tutor",
    icon: Sparkles,
  },
];

const questions: Question[] = [
  {
    question: "What would you most enjoy building?",
    description:
      "Imagine you have a free weekend to build something.",
    options: [
      {
        text: "A complete software application",
        domains: ["Software Development"],
      },
      {
        text: "An interactive website or web app",
        domains: ["Web Development"],
      },
      {
        text: "An AI assistant that can understand users",
        domains: ["AI Engineering"],
      },
      {
        text: "A model that predicts future outcomes",
        domains: ["Machine Learning"],
      },
    ],
  },

  {
    question: "Which problem sounds most interesting?",
    description:
      "Choose the type of problem you would enjoy solving.",
    options: [
      {
        text: "Finding useful patterns in a large dataset",
        domains: ["Data Science", "Machine Learning"],
      },
      {
        text: "Finding and fixing security vulnerabilities",
        domains: ["Cybersecurity"],
      },
      {
        text: "Making an application reliable at large scale",
        domains: ["Cloud & DevOps", "Software Development"],
      },
      {
        text: "Creating an intelligent application using AI",
        domains: ["AI Engineering"],
      },
    ],
  },

  {
    question: "Which activity sounds most enjoyable?",
    description:
      "Think about what you would naturally like doing.",
    options: [
      {
        text: "Writing and improving code",
        domains: ["Software Development"],
      },
      {
        text: "Designing interactive user experiences",
        domains: ["Web Development"],
      },
      {
        text: "Experimenting with AI models",
        domains: ["AI Engineering", "Machine Learning"],
      },
      {
        text: "Analyzing data and creating visualizations",
        domains: ["Data Science"],
      },
    ],
  },

  {
    question: "What would you rather investigate?",
    description:
      "Choose the investigation that interests you most.",
    options: [
      {
        text: "How a cyber attack happened",
        domains: ["Cybersecurity"],
      },
      {
        text: "Why a machine learning model failed",
        domains: ["Machine Learning"],
      },
      {
        text: "Why a website or application is slow",
        domains: ["Web Development", "Cloud & DevOps"],
      },
      {
        text: "Why an AI system gave a wrong answer",
        domains: ["AI Engineering"],
      },
    ],
  },

  {
    question: "Which technology would you like to explore?",
    description:
      "Pick the one that makes you most curious.",
    options: [
      {
        text: "React and modern web technologies",
        domains: ["Web Development"],
      },
      {
        text: "Large Language Models and AI agents",
        domains: ["AI Engineering"],
      },
      {
        text: "Neural networks and prediction models",
        domains: ["Machine Learning"],
      },
      {
        text: "Cloud platforms and containers",
        domains: ["Cloud & DevOps"],
      },
    ],
  },

  {
    question: "What type of work sounds satisfying?",
    description:
      "There is no right or wrong answer.",
    options: [
      {
        text: "Turning requirements into working software",
        domains: ["Software Development"],
      },
      {
        text: "Finding insights hidden inside data",
        domains: ["Data Science"],
      },
      {
        text: "Protecting systems from attackers",
        domains: ["Cybersecurity"],
      },
      {
        text: "Automating deployment and infrastructure",
        domains: ["Cloud & DevOps"],
      },
    ],
  },

  {
    question: "Which project would you choose?",
    description:
      "Pick the project you would be most excited to try.",
    options: [
      {
        text: "Build an e-commerce website",
        domains: ["Web Development", "Software Development"],
      },
      {
        text: "Build a recommendation system",
        domains: ["Machine Learning", "Data Science"],
      },
      {
        text: "Build a vulnerability scanner",
        domains: ["Cybersecurity"],
      },
      {
        text: "Build an AI-powered study assistant",
        domains: ["AI Engineering"],
      },
    ],
  },

  {
    question: "What do you enjoy working with most?",
    description:
      "Choose the environment that sounds interesting.",
    options: [
      {
        text: "Code, algorithms and software architecture",
        domains: ["Software Development"],
      },
      {
        text: "Data, statistics and visualizations",
        domains: ["Data Science"],
      },
      {
        text: "Networks, systems and security",
        domains: ["Cybersecurity"],
      },
      {
        text: "Servers, cloud infrastructure and automation",
        domains: ["Cloud & DevOps"],
      },
    ],
  },

  {
    question: "What kind of result would make you happiest?",
    description:
      "Think about the outcome of your project.",
    options: [
      {
        text: "People using an application I built",
        domains: ["Software Development", "Web Development"],
      },
      {
        text: "A model accurately predicting something",
        domains: ["Machine Learning"],
      },
      {
        text: "An AI system solving a real user problem",
        domains: ["AI Engineering"],
      },
      {
        text: "A dashboard revealing useful business insights",
        domains: ["Data Science"],
      },
    ],
  },

  {
    question: "Which challenge would you rather solve?",
    description:
      "Pick the challenge you would investigate first.",
    options: [
      {
        text: "A system needs to handle millions of users",
        domains: ["Cloud & DevOps", "Software Development"],
      },
      {
        text: "A company needs protection from cyber attacks",
        domains: ["Cybersecurity"],
      },
      {
        text: "A company wants intelligent automation",
        domains: ["AI Engineering", "Machine Learning"],
      },
      {
        text: "A company wants to understand its customer data",
        domains: ["Data Science"],
      },
    ],
  },

  {
    question: "Which learning topic attracts you most?",
    description:
      "Choose what you would willingly spend time learning.",
    options: [
      {
        text: "APIs, backend systems and databases",
        domains: ["Software Development", "Web Development"],
      },
      {
        text: "Prompting, LLMs and AI agents",
        domains: ["AI Engineering"],
      },
      {
        text: "Probability, statistics and machine learning",
        domains: ["Machine Learning", "Data Science"],
      },
      {
        text: "Networking, encryption and ethical hacking",
        domains: ["Cybersecurity"],
      },
    ],
  },

  {
    question: "Where do you see yourself spending more time?",
    description:
      "Choose the environment that feels most interesting.",
    options: [
      {
        text: "Building and improving applications",
        domains: ["Software Development", "Web Development"],
      },
      {
        text: "Experimenting with intelligent systems",
        domains: ["AI Engineering", "Machine Learning"],
      },
      {
        text: "Working with data and finding insights",
        domains: ["Data Science"],
      },
      {
        text: "Managing systems, infrastructure or security",
        domains: ["Cloud & DevOps", "Cybersecurity"],
      },
    ],
  },
];

const allDomains: Domain[] = [
  "Software Development",
  "Web Development",
  "AI Engineering",
  "Machine Learning",
  "Data Science",
  "Cybersecurity",
  "Cloud & DevOps",
];

const DomainInterestTest: React.FC = () => {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<
    (number | undefined)[]
  >(Array(questions.length).fill(undefined));

  const [finished, setFinished] = useState(false);

  const safeQuestionIndex = Math.min(
    Math.max(currentQuestion, 0),
    questions.length - 1
  );

  const question = questions[safeQuestionIndex];

  /*
    IMPORTANT:
    Initially:
    answered = 0
    progress = 0%
  */

  const answeredCount = answers.filter(
    (answer) => answer !== undefined
  ).length;

  const progress = Math.round(
    (answeredCount / questions.length) * 100
  );

 const selectAnswer = (optionIndex: number) => {
    if (!question || finished) return;

    const updatedAnswers = [...answers];
    updatedAnswers[safeQuestionIndex] = optionIndex;

    setAnswers(updatedAnswers);

    // Last question → show results.
    if (safeQuestionIndex === questions.length - 1) {
      setFinished(true);
      return;
    }

    // Move to the next question exactly once.
    setCurrentQuestion((previous) => previous + 1);
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(undefined));
    setFinished(false);
  };

 const calculateResults = () => {
  const scores: Record<Domain, number> = {
    "Software Development": 0,
    "Web Development": 0,
    "AI Engineering": 0,
    "Machine Learning": 0,
    "Data Science": 0,
    Cybersecurity: 0,
    "Cloud & DevOps": 0,
  };

  answers.forEach((answer, questionIndex) => {
    if (
      answer === undefined ||
      !questions[questionIndex]
    ) {
      return;
    }

    const selectedOption =
      questions[questionIndex].options[answer];

    if (!selectedOption) {
      return;
    }

    selectedOption.domains.forEach((domain) => {
      scores[domain] += 1;
    });
  });

  return scores;
};

  /*
    ==============================
    RESULT SCREEN
    ==============================
  */

  if (finished) {
    const scores = calculateResults();

    const rankedDomains = [...allDomains].sort(
      (a, b) => scores[b] - scores[a]
    );

    const primaryDomain =
  rankedDomains[0] || "Software Development";

    return (
      <div className="dit-layout">

        {/* SIDEBAR */}

        <aside className="dit-sidebar">

          <div className="dit-logo">
            <h1>EngineerOS</h1>
            <div />
          </div>

          <nav className="dit-nav">

            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `dit-nav-link ${
                      isActive
                        ? "active"
                        : ""
                    }`
                  }
                >
                  <Icon size={19} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}

          </nav>

        </aside>

        {/* RESULT */}

        <main className="dit-main">

          <div className="dit-result">

            <div className="result-sparkle">
              <Sparkles size={28} />
            </div>

            <span className="result-eyebrow">
              YOUR DOMAIN INTEREST
            </span>

            <h1>
              Your strongest interest is
            </h1>

            <h2>{primaryDomain}</h2>

            <p className="result-intro">
              Your answers show the strongest
              interest in this engineering domain.
            </p>

            <div className="result-breakdown">

              <h3>Interest Breakdown</h3>

              {rankedDomains.map((domain) => {

                const maxScore = Math.max(
                  ...Object.values(scores),
                  1
                );

                const width =
                  (scores[domain] / maxScore) * 100;

                return (
                  <div
                    className="result-row"
                    key={domain}
                  >

                    <div className="result-row-top">
                      <span>{domain}</span>
                      <strong>
                        {scores[domain]}
                      </strong>
                    </div>

                    <div className="result-bar">
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

            <div className="result-buttons">

              <button
                className="dit-primary-button"
                onClick={() =>
                  navigate("/roadmap")
                }
              >
                Explore Career Roadmap
                <ArrowRight size={18} />
              </button>

              <button
                className="dit-secondary-button"
                onClick={restartTest}
              >
                <RotateCcw size={17} />
                Retake Test
              </button>

            </div>

          </div>

        </main>

      </div>
    );
  }

  /*
    ==============================
    TEST SCREEN
    ==============================
  */

  // Defensive fallback: never render an undefined question.
  if (!question) {
    return (
      <div className="dit-layout">
        <aside className="dit-sidebar">
          <div className="dit-logo">
            <h1>EngineerOS</h1>
            <div />
          </div>

          <nav className="dit-nav">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `dit-nav-link ${isActive ? "active" : ""}`
                  }
                >
                  <Icon size={19} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </aside>

        <main className="dit-main">
          <div className="dit-content">
            <div className="dit-question-card">
              <div className="dit-question-content">
                <h2>Something went wrong.</h2>
                <p>Please restart the domain interest test.</p>

                <button
                  className="dit-primary-button"
                  onClick={restartTest}
                >
                  <RotateCcw size={17} />
                  Restart Test
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dit-layout">

      {/* ================= SIDEBAR ================= */}

      <aside className="dit-sidebar">

        <div className="dit-logo">
          <h1>EngineerOS</h1>
          <div />
        </div>

        <nav className="dit-nav">

          {navigation.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `dit-nav-link ${
                    isActive
                      ? "active"
                      : ""
                  }`
                }
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

        </nav>

      </aside>

      {/* ================= MAIN ================= */}

      <main className="dit-main">

        <div className="dit-content">

          {/* BACK */}

          <button
            className="dit-back"
            onClick={() =>
              navigate("/careers")
            }
          >
            <ArrowLeft size={17} />
            Career & Domain Exploration
          </button>

          {/* HEADER */}

          <div className="dit-header">

            <span className="dit-eyebrow">
              ENGINEEROS · DOMAIN INTEREST TEST
            </span>

            <h1>
              Find the engineering domain
              <span>that interests you.</span>
            </h1>

            <p>
              Answer questions about the type
              of problems, technologies and
              projects you enjoy.
            </p>

          </div>

          {/* PROGRESS */}

          <div className="dit-progress">

            <div className="dit-progress-top">

              <span>
                Question {safeQuestionIndex + 1} of{" "}
                {questions.length}
              </span>

              {/* THIS STARTS AT 0% */}

              <strong>
                {progress}%
              </strong>

            </div>

            <div className="dit-progress-track">

              <div
                className="dit-progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

          {/* QUESTION */}

          <div className="dit-question-card">

            <div className="dit-question-number">
              {String(safeQuestionIndex + 1).padStart(
                2,
                "0"
              )}
            </div>

            <div className="dit-question-content">

              <h2>{question.question}</h2>

              <p>
                {question.description}
              </p>

              <div className="dit-options">

                {question.options.map(
                  (option, index) => {

                    const selected =
                      answers[safeQuestionIndex] ===
                      index;

                    return (
                      <button
                        key={index}
                        className={`dit-option ${
                          selected
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          selectAnswer(index)
                        }
                      >

                        <span className="dit-option-letter">
                          {String.fromCharCode(
                            65 + index
                          )}
                        </span>

                        <span className="dit-option-text">
                          {option.text}
                        </span>

                        {selected && (
                          <CheckCircle2
                            size={20}
                            className="dit-check"
                          />
                        )}

                      </button>
                    );
                  }
                )}

              </div>

            </div>

          </div>

          {/* FOOTER */}

          <div className="dit-footer">

            <span>
              Choose the option that feels
              most interesting to you.
            </span>

            <span>
              There are no right or wrong answers.
            </span>

          </div>

        </div>

      </main>

    </div>
  );
};

export default DomainInterestTest;