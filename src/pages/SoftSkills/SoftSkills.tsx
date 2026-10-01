import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Users,
} from "lucide-react";

import {
  saveSoftSkillsResult,
} from "../../utils/studentData";

import "./SoftSkills.css";

type Skill =
  | "communication"
  | "teamwork"
  | "leadership"
  | "problemSolving"
  | "adaptability"
  | "timeManagement";

interface Option {
  text: string;
  scores: Partial<Record<Skill, number>>;
}

interface Question {
  id: number;
  skill: Skill;
  question: string;
  options: Option[];
}

const QUESTION_BANK: Question[] = [
  {
    id: 1,
    skill: "communication",
    question:
      "A teammate misunderstands your explanation. What would you do?",
    options: [
      {
        text: "Repeat the same explanation louder.",
        scores: {
          communication: 1,
        },
      },
      {
        text: "Ignore the misunderstanding.",
        scores: {
          communication: 0,
        },
      },
      {
        text: "Try explaining it using a simpler example.",
        scores: {
          communication: 3,
        },
      },
      {
        text: "Ask someone else to explain it.",
        scores: {
          communication: 2,
        },
      },
    ],
  },

  {
    id: 2,
    skill: "teamwork",
    question:
      "Your team is behind schedule. What would you most likely do?",
    options: [
      {
        text: "Focus only on your own work.",
        scores: {
          teamwork: 1,
        },
      },
      {
        text: "Discuss the situation with the team and coordinate tasks.",
        scores: {
          teamwork: 3,
        },
      },
      {
        text: "Wait for the team leader to solve it.",
        scores: {
          teamwork: 2,
        },
      },
      {
        text: "Blame the person responsible for the delay.",
        scores: {
          teamwork: 0,
        },
      },
    ],
  },

  {
    id: 3,
    skill: "leadership",
    question:
      "Your team has no clear plan for a project. What would you do?",
    options: [
      {
        text: "Wait until someone else creates a plan.",
        scores: {
          leadership: 1,
        },
      },
      {
        text: "Create a possible plan and discuss it with the team.",
        scores: {
          leadership: 3,
        },
      },
      {
        text: "Take complete control without asking others.",
        scores: {
          leadership: 1,
        },
      },
      {
        text: "Leave the project to another teammate.",
        scores: {
          leadership: 0,
        },
      },
    ],
  },

  {
    id: 4,
    skill: "problemSolving",
    question:
      "You encounter a technical problem you have never seen before.",
    options: [
      {
        text: "Immediately give up.",
        scores: {
          problemSolving: 0,
        },
      },
      {
        text: "Search for information, understand the problem and test solutions.",
        scores: {
          problemSolving: 3,
        },
      },
      {
        text: "Wait for someone to solve it.",
        scores: {
          problemSolving: 1,
        },
      },
      {
        text: "Try random solutions without understanding the issue.",
        scores: {
          problemSolving: 2,
        },
      },
    ],
  },

  {
    id: 5,
    skill: "adaptability",
    question:
      "Your project suddenly requires a technology you have never used.",
    options: [
      {
        text: "Refuse to work with it.",
        scores: {
          adaptability: 0,
        },
      },
      {
        text: "Learn the basics and gradually adapt.",
        scores: {
          adaptability: 3,
        },
      },
      {
        text: "Ask the team to remove the requirement.",
        scores: {
          adaptability: 1,
        },
      },
      {
        text: "Use it without learning anything about it.",
        scores: {
          adaptability: 2,
        },
      },
    ],
  },

  {
    id: 6,
    skill: "timeManagement",
    question:
      "You have three assignments due in the same week.",
    options: [
      {
        text: "Work on whichever one feels easiest.",
        scores: {
          timeManagement: 1,
        },
      },
      {
        text: "Plan tasks according to urgency and deadlines.",
        scores: {
          timeManagement: 3,
        },
      },
      {
        text: "Wait until the deadline approaches.",
        scores: {
          timeManagement: 0,
        },
      },
      {
        text: "Work randomly on all three.",
        scores: {
          timeManagement: 2,
        },
      },
    ],
  },

  {
    id: 7,
    skill: "communication",
    question:
      "During a presentation, someone asks a question you do not know.",
    options: [
      {
        text: "Pretend you know the answer.",
        scores: {
          communication: 0,
        },
      },
      {
        text: "Say you are unsure and explain how you would find the answer.",
        scores: {
          communication: 3,
        },
      },
      {
        text: "Ignore the question.",
        scores: {
          communication: 1,
        },
      },
      {
        text: "Ask someone else immediately.",
        scores: {
          communication: 2,
        },
      },
    ],
  },

  {
    id: 8,
    skill: "teamwork",
    question:
      "A teammate has a different opinion about your approach.",
    options: [
      {
        text: "Reject their idea immediately.",
        scores: {
          teamwork: 0,
        },
      },
      {
        text: "Listen and compare both approaches.",
        scores: {
          teamwork: 3,
        },
      },
      {
        text: "Avoid discussing it.",
        scores: {
          teamwork: 1,
        },
      },
      {
        text: "Let them decide without discussion.",
        scores: {
          teamwork: 2,
        },
      },
    ],
  },

  {
    id: 9,
    skill: "leadership",
    question:
      "A team member is struggling with their task.",
    options: [
      {
        text: "Ignore them.",
        scores: {
          leadership: 0,
        },
      },
      {
        text: "Help them understand the problem while keeping them responsible for their work.",
        scores: {
          leadership: 3,
        },
      },
      {
        text: "Complete the task for them.",
        scores: {
          leadership: 1,
        },
      },
      {
        text: "Immediately report them.",
        scores: {
          leadership: 2,
        },
      },
    ],
  },

  {
    id: 10,
    skill: "problemSolving",
    question:
      "Your first solution does not work.",
    options: [
      {
        text: "Stop trying.",
        scores: {
          problemSolving: 0,
        },
      },
      {
        text: "Analyse why it failed and try another approach.",
        scores: {
          problemSolving: 3,
        },
      },
      {
        text: "Repeat the same solution several times.",
        scores: {
          problemSolving: 1,
        },
      },
      {
        text: "Ask someone else to solve everything.",
        scores: {
          problemSolving: 2,
        },
      },
    ],
  },

  {
    id: 11,
    skill: "adaptability",
    question:
      "Your project requirements change near the deadline.",
    options: [
      {
        text: "Refuse to change anything.",
        scores: {
          adaptability: 0,
        },
      },
      {
        text: "Understand the change and adjust your plan.",
        scores: {
          adaptability: 3,
        },
      },
      {
        text: "Complain but continue with the old plan.",
        scores: {
          adaptability: 1,
        },
      },
      {
        text: "Make changes without understanding the new requirement.",
        scores: {
          adaptability: 2,
        },
      },
    ],
  },

  {
    id: 12,
    skill: "timeManagement",
    question:
      "You have an important exam and a project deadline approaching.",
    options: [
      {
        text: "Ignore one until the last day.",
        scores: {
          timeManagement: 0,
        },
      },
      {
        text: "Create a schedule and divide your available time.",
        scores: {
          timeManagement: 3,
        },
      },
      {
        text: "Study only when you feel motivated.",
        scores: {
          timeManagement: 1,
        },
      },
      {
        text: "Switch randomly between both tasks.",
        scores: {
          timeManagement: 2,
        },
      },
    ],
  },
];

const shuffle = <T,>(array: T[]): T[] =>
  [...array].sort(() => Math.random() - 0.5);

const QUESTIONS_PER_TEST = 8;

const SoftSkills: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const [questions, setQuestions] =
    useState<Question[]>([]);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [answers, setAnswers] =
    useState<Record<number, number>>({});

  const [result, setResult] =
    useState<any>(null);

  const startTest = () => {
    const selected = shuffle(
      QUESTION_BANK
    ).slice(0, QUESTIONS_PER_TEST);

    setQuestions(selected);
    setAnswers({});
    setCurrentIndex(0);
    setFinished(false);
    setStarted(true);
  };

  const currentQuestion =
    questions[currentIndex];

  const selectAnswer = (index: number) => {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: index,
    }));
  };

  const calculateResult = async () => {
    const scores = {
      communication: 0,
      teamwork: 0,
      leadership: 0,
      problemSolving: 0,
      adaptability: 0,
      timeManagement: 0,
    };

    const maximum = {
      communication: 0,
      teamwork: 0,
      leadership: 0,
      problemSolving: 0,
      adaptability: 0,
      timeManagement: 0,
    };

    questions.forEach((question) => {
      const selectedIndex =
        answers[question.id];

      /*
        Every question can contribute
        to one skill.
      */

      Object.entries(
        question.options[0].scores
      ).forEach(([skill]) => {
        maximum[
          skill as keyof typeof maximum
        ] += 3;
      });

      if (
        selectedIndex !== undefined
      ) {
        const selected =
          question.options[selectedIndex];

        Object.entries(
          selected.scores
        ).forEach(([skill, value]) => {
          scores[
            skill as keyof typeof scores
          ] += value || 0;
        });
      }
    });

    const calculatePercentage = (
      skill: keyof typeof scores
    ) => {
      if (maximum[skill] === 0) return 0;

      return Math.round(
        (scores[skill] /
          maximum[skill]) *
          100
      );
    };

    const communication =
      calculatePercentage(
        "communication"
      );

    const teamwork =
      calculatePercentage(
        "teamwork"
      );

    const leadership =
      calculatePercentage(
        "leadership"
      );

    const problemSolving =
      calculatePercentage(
        "problemSolving"
      );

    const adaptability =
      calculatePercentage(
        "adaptability"
      );

    const timeManagement =
      calculatePercentage(
        "timeManagement"
      );

    const overall = Math.round(
      (
        communication +
        teamwork +
        leadership +
        problemSolving +
        adaptability +
        timeManagement
      ) / 6
    );

    const finalResult = {
      completed: true,
      communication,
      teamwork,
      leadership,
      problemSolving,
      adaptability,
      timeManagement,
      overall,
      completedAt:
        new Date().toISOString(),
    };

    saveSoftSkillsResult(
      finalResult
    );

    // Save the same result to MongoDB
    try {
      const token = localStorage.getItem("token");

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      const email = user?.email;

      if (!token || !email) {
        throw new Error(
          "Your login session is missing. Please login again."
        );
      }

      const response = await fetch(
        `https://engineeros-api.onrender.com/students/${encodeURIComponent(
          email
        )}/soft-skills`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(finalResult),
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");

        throw new Error(
          "Your session has expired. Please login again."
        );
      }

      if (response.status === 403) {
        throw new Error(
          "You are not authorized to save this soft skills result."
        );
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.detail ||
            "Failed to save soft skills result to MongoDB."
        );
      }

      console.log(
        "Soft skills result saved to MongoDB successfully."
      );
    } catch (error) {
      console.error(
        "Soft skills MongoDB save error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Soft skills result was saved locally, but could not be saved to MongoDB."
      );
    }

    setResult(finalResult);
    setFinished(true);
  };

  /* INTRO */

  if (!started) {
    return (
      <div className="soft-page">

        <div className="soft-hero">

          <div className="soft-icon">
            <Users size={28} />
          </div>

          <span className="soft-label">
            ENGINEEROS • ASSESSMENT
          </span>

          <h1>
            Soft Skills Assessment
          </h1>

          <p>
            Understand your workplace-oriented
            communication, teamwork, leadership
            and problem-solving skills.
          </p>

          <div className="soft-info">

            <div>
              <strong>8</strong>
              <span>Questions</span>
            </div>

            <div>
              <strong>6</strong>
              <span>Skill Areas</span>
            </div>

            <div>
              <strong>Scenario</strong>
              <span>Based</span>
            </div>

          </div>

          <button
            className="soft-primary"
            onClick={startTest}
          >
            Start Assessment
            <ArrowRight size={18} />
          </button>

          <p className="soft-note">
            Questions are selected randomly
            from the assessment question bank.
          </p>

        </div>

      </div>
    );
  }

  /* RESULT */

  if (finished && result) {
    return (
      <div className="soft-page">

        <div className="soft-result">

          <div className="soft-success">
            <CheckCircle2 size={48} />
          </div>

          <span className="soft-label">
            ASSESSMENT COMPLETE
          </span>

          <h1>
            Your Soft Skills Results
          </h1>

          <div className="soft-overall">
            <span>Overall Score</span>

            <strong>
              {result.overall}%
            </strong>
          </div>

          <div className="soft-grid">

            <SkillCard
              title="Communication"
              score={result.communication}
            />

            <SkillCard
              title="Teamwork"
              score={result.teamwork}
            />

            <SkillCard
              title="Leadership"
              score={result.leadership}
            />

            <SkillCard
              title="Problem Solving"
              score={result.problemSolving}
            />

            <SkillCard
              title="Adaptability"
              score={result.adaptability}
            />

            <SkillCard
              title="Time Management"
              score={result.timeManagement}
            />

          </div>

          <button
            className="soft-primary"
            onClick={() => {
              setStarted(false);
              setFinished(false);
            }}
          >
            Retake Assessment
          </button>

          <p className="soft-saved">
            ✓ Your result has been saved and
            will be available to Placement
            Prediction.
          </p>

        </div>

      </div>
    );
  }

  /* TEST */

  return (
    <div className="soft-page">

      <div className="soft-test">

        <div className="soft-test-top">

          <div>
            <span>
              QUESTION {currentIndex + 1} OF{" "}
              {questions.length}
            </span>

            <h1>
              Workplace Scenario
            </h1>
          </div>

        </div>

        <div className="soft-progress">
          <div
            style={{
              width: `${
                ((currentIndex + 1) /
                  questions.length) *
                100
              }%`,
            }}
          />
        </div>

        <div className="soft-question-card">

          <span className="soft-question-number">
            Question {currentIndex + 1}
          </span>

          <h2>
            {currentQuestion.question}
          </h2>

          <div className="soft-options">

            {currentQuestion.options.map(
              (option, index) => {

                const selected =
                  answers[
                    currentQuestion.id
                  ] === index;

                return (
                  <button
                    key={option.text}
                    className={
                      selected
                        ? "soft-option selected"
                        : "soft-option"
                    }
                    onClick={() =>
                      selectAnswer(index)
                    }
                  >

                    <span>
                      {String.fromCharCode(
                        65 + index
                      )}
                    </span>

                    <p>
                      {option.text}
                    </p>

                  </button>
                );
              }
            )}

          </div>

        </div>

        <div className="soft-navigation">

          <button
            className="soft-secondary"
            disabled={currentIndex === 0}
            onClick={() =>
              setCurrentIndex(
                currentIndex - 1
              )
            }
          >
            <ArrowLeft size={17} />
            Previous
          </button>

          {currentIndex ===
          questions.length - 1 ? (
            <button
              className="soft-primary"
              onClick={calculateResult}
            >
              Submit Assessment
              <CheckCircle2 size={17} />
            </button>
          ) : (
            <button
              className="soft-primary"
              onClick={() =>
                setCurrentIndex(
                  currentIndex + 1
                )
              }
            >
              Next
              <ArrowRight size={17} />
            </button>
          )}

        </div>

      </div>

    </div>
  );
};

interface SkillCardProps {
  title: string;
  score: number;
}

const SkillCard: React.FC<
  SkillCardProps
> = ({ title, score }) => (
  <div className="skill-card">

    <span>{title}</span>

    <strong>{score}%</strong>

    <div className="skill-bar">
      <div
        style={{
          width: `${score}%`,
        }}
      />
    </div>

  </div>
);

export default SoftSkills;