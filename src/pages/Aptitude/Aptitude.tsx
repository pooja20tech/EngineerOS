import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Trophy,
} from "lucide-react";
import {
  saveAptitudeResult,
} from "../../utils/studentData";

import "./Aptitude.css";

type Category =
  | "quantitative"
  | "logicalReasoning"
  | "verbal"
  | "dataInterpretation";

interface Question {
  id: number;
  category: Category;
  question: string;
  options: string[];
  answer: number;
}

const QUESTION_BANK: Question[] = [
  // ---------------- QUANTITATIVE ----------------

  {
    id: 1,
    category: "quantitative",
    question:
      "A number is increased by 20% and then decreased by 20%. What is the net change?",
    options: [
      "No change",
      "4% decrease",
      "4% increase",
      "2% decrease",
    ],
    answer: 1,
  },

  {
    id: 2,
    category: "quantitative",
    question:
      "If 5 workers complete a task in 12 days, how many days will 10 workers take, assuming equal efficiency?",
    options: ["3 days", "5 days", "6 days", "8 days"],
    answer: 2,
  },

  {
    id: 3,
    category: "quantitative",
    question:
      "What is 25% of 240?",
    options: ["40", "50", "60", "80"],
    answer: 2,
  },

  {
    id: 4,
    category: "quantitative",
    question:
      "A train travels at 60 km/h. How far will it travel in 2.5 hours?",
    options: ["120 km", "150 km", "180 km", "200 km"],
    answer: 1,
  },

  {
    id: 5,
    category: "quantitative",
    question:
      "The average of 10, 20, 30, 40 and 50 is:",
    options: ["25", "30", "35", "40"],
    answer: 1,
  },

  {
    id: 6,
    category: "quantitative",
    question:
      "If x = 8 and y = 12, what is x + y?",
    options: ["18", "20", "22", "24"],
    answer: 1,
  },

  // ---------------- LOGICAL ----------------

  {
    id: 7,
    category: "logicalReasoning",
    question:
      "Find the next number: 2, 4, 8, 16, ?",
    options: ["20", "24", "32", "36"],
    answer: 2,
  },

  {
    id: 8,
    category: "logicalReasoning",
    question:
      "Find the odd one out.",
    options: [
      "Apple",
      "Mango",
      "Carrot",
      "Banana",
    ],
    answer: 2,
  },

  {
    id: 9,
    category: "logicalReasoning",
    question:
      "If all roses are flowers and some flowers fade quickly, which statement is definitely true?",
    options: [
      "All roses fade quickly",
      "Some roses fade quickly",
      "Roses are flowers",
      "No roses fade quickly",
    ],
    answer: 2,
  },

  {
    id: 10,
    category: "logicalReasoning",
    question:
      "Find the next number: 3, 6, 12, 24, ?",
    options: ["30", "36", "42", "48"],
    answer: 3,
  },

  {
    id: 11,
    category: "logicalReasoning",
    question:
      "Book is to Reading as Fork is to:",
    options: [
      "Writing",
      "Eating",
      "Cooking",
      "Drawing",
    ],
    answer: 1,
  },

  {
    id: 12,
    category: "logicalReasoning",
    question:
      "If CAT is coded as DBU, how is DOG coded?",
    options: [
      "EPH",
      "EPG",
      "EOH",
      "FPH",
    ],
    answer: 0,
  },

  // ---------------- VERBAL ----------------

  {
    id: 13,
    category: "verbal",
    question:
      "Choose the synonym of 'Rapid'.",
    options: [
      "Slow",
      "Fast",
      "Weak",
      "Late",
    ],
    answer: 1,
  },

  {
    id: 14,
    category: "verbal",
    question:
      "Choose the antonym of 'Ancient'.",
    options: [
      "Old",
      "Historic",
      "Modern",
      "Past",
    ],
    answer: 2,
  },

  {
    id: 15,
    category: "verbal",
    question:
      "Choose the grammatically correct sentence.",
    options: [
      "She go to college every day.",
      "She goes to college every day.",
      "She going to college every day.",
      "She gone to college every day.",
    ],
    answer: 1,
  },

  {
    id: 16,
    category: "verbal",
    question:
      "What does 'brief' mean?",
    options: [
      "Long",
      "Short",
      "Difficult",
      "Confusing",
    ],
    answer: 1,
  },

  {
    id: 17,
    category: "verbal",
    question:
      "Choose the correctly spelled word.",
    options: [
      "Enviroment",
      "Environment",
      "Envirnoment",
      "Enviornment",
    ],
    answer: 1,
  },

  {
    id: 18,
    category: "verbal",
    question:
      "Complete the sentence: 'Neither the teacher nor the students ___ ready.'",
    options: [
      "was",
      "is",
      "were",
      "has",
    ],
    answer: 2,
  },

  // ---------------- DATA INTERPRETATION ----------------

  {
    id: 19,
    category: "dataInterpretation",
    question:
      "A company has 100 employees. 60 are developers. What percentage are developers?",
    options: [
      "40%",
      "50%",
      "60%",
      "70%",
    ],
    answer: 2,
  },

  {
    id: 20,
    category: "dataInterpretation",
    question:
      "Sales increased from 200 units to 250 units. What was the increase?",
    options: [
      "25 units",
      "40 units",
      "50 units",
      "75 units",
    ],
    answer: 2,
  },

  {
    id: 21,
    category: "dataInterpretation",
    question:
      "A student scored 80, 70 and 90 in three tests. What is the average?",
    options: [
      "70",
      "75",
      "80",
      "85",
    ],
    answer: 2,
  },

  {
    id: 22,
    category: "dataInterpretation",
    question:
      "A product costs ₹500 and is sold for ₹600. What is the profit?",
    options: [
      "₹50",
      "₹75",
      "₹100",
      "₹150",
    ],
    answer: 2,
  },

  {
    id: 23,
    category: "dataInterpretation",
    question:
      "A dataset contains 80 male and 120 female students. What is the total?",
    options: ["180", "190", "200", "220"],
    answer: 2,
  },

  {
    id: 24,
    category: "dataInterpretation",
    question:
      "A project takes 40 hours. If 10 hours are completed, what percentage is complete?",
    options: [
      "20%",
      "25%",
      "30%",
      "40%",
    ],
    answer: 1,
  },
];

const shuffle = <T,>(array: T[]): T[] => {
  return [...array].sort(
    () => Math.random() - 0.5
  );
};

const QUESTIONS_PER_TEST = 16;

const Aptitude: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const [questions, setQuestions] = useState<Question[]>(
    []
  );

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [answers, setAnswers] = useState<
    Record<number, number>
  >({});

  const [result, setResult] = useState<any>(null);

  const startTest = () => {
    const selected = shuffle(
      QUESTION_BANK
    ).slice(0, QUESTIONS_PER_TEST);

    setQuestions(selected);
    setCurrentIndex(0);
    setAnswers({});
    setFinished(false);
    setStarted(true);
  };

  const currentQuestion =
    questions[currentIndex];

  const selectAnswer = (answer: number) => {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: answer,
    }));
  };

  const calculateResult = async () => {
    const scores = {
      quantitative: {
        correct: 0,
        total: 0,
      },
      logicalReasoning: {
        correct: 0,
        total: 0,
      },
      verbal: {
        correct: 0,
        total: 0,
      },
      dataInterpretation: {
        correct: 0,
        total: 0,
      },
    };

    questions.forEach((question) => {
      scores[question.category].total++;

      if (
        answers[question.id] ===
        question.answer
      ) {
        scores[question.category].correct++;
      }
    });

    const percentage = (
      correct: number,
      total: number
    ) =>
      total === 0
        ? 0
        : Math.round(
            (correct / total) * 100
          );

    const quantitative = percentage(
      scores.quantitative.correct,
      scores.quantitative.total
    );

    const logicalReasoning = percentage(
      scores.logicalReasoning.correct,
      scores.logicalReasoning.total
    );

    const verbal = percentage(
      scores.verbal.correct,
      scores.verbal.total
    );

    const dataInterpretation = percentage(
      scores.dataInterpretation.correct,
      scores.dataInterpretation.total
    );

    const overall = Math.round(
      (
        quantitative +
        logicalReasoning +
        verbal +
        dataInterpretation
      ) / 4
    );

    const finalResult = {
      completed: true,
      quantitative,
      logicalReasoning,
      verbal,
      dataInterpretation,
      overall,
      completedAt:
        new Date().toISOString(),
    };

    // Keep the existing localStorage behavior.
    saveAptitudeResult(finalResult);

    // Also save the aptitude result to MongoDB through FastAPI.
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
        `http://127.0.0.1:8000/students/${encodeURIComponent(
          email
        )}/aptitude`,
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
          "You are not authorized to save this aptitude result."
        );
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.detail ||
            "Failed to save aptitude result to MongoDB."
        );
      }

      console.log(
        "Aptitude result saved to MongoDB successfully."
      );
    } catch (error) {
      console.error(
        "Aptitude MongoDB save error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Aptitude result was saved locally, but could not be saved to MongoDB."
      );
    }

    setResult(finalResult);
    setFinished(true);
  };

  const progress = useMemo(() => {
    if (!questions.length) return 0;

    return Math.round(
      ((currentIndex + 1) /
        questions.length) *
        100
    );
  }, [currentIndex, questions.length]);

  /* ---------------- INTRO ---------------- */

  if (!started) {
    return (
      <div className="aptitude-page">

        <div className="assessment-hero">

          <div className="assessment-icon">
            <Trophy size={28} />
          </div>

          <span className="assessment-label">
            ENGINEEROS • ASSESSMENT
          </span>

          <h1>
            Aptitude Assessment
          </h1>

          <p>
            Test your quantitative, logical,
            verbal and data interpretation
            abilities.
          </p>

          <div className="assessment-info">

            <div>
              <strong>16</strong>
              <span>Questions</span>
            </div>

            <div>
              <strong>4</strong>
              <span>Categories</span>
            </div>

            <div>
              <strong>Random</strong>
              <span>Question Set</span>
            </div>

          </div>

          <button
            className="primary-assessment-button"
            onClick={startTest}
          >
            Start Assessment
            <ArrowRight size={18} />
          </button>

          <p className="assessment-note">
            Questions are selected randomly
            from the assessment question bank.
          </p>

        </div>

      </div>
    );
  }

  /* ---------------- RESULT ---------------- */

  if (finished && result) {
    return (
      <div className="aptitude-page">

        <div className="result-container">

          <div className="result-success">
            <CheckCircle2 size={50} />
          </div>

          <span className="assessment-label">
            ASSESSMENT COMPLETE
          </span>

          <h1>
            Your Aptitude Results
          </h1>

          <div className="overall-score">
            <span>Overall Score</span>
            <strong>
              {result.overall}%
            </strong>
          </div>

          <div className="result-grid">

            <ResultCard
              title="Quantitative"
              score={result.quantitative}
            />

            <ResultCard
              title="Logical Reasoning"
              score={result.logicalReasoning}
            />

            <ResultCard
              title="Verbal Ability"
              score={result.verbal}
            />

            <ResultCard
              title="Data Interpretation"
              score={result.dataInterpretation}
            />

          </div>

          <button
            className="primary-assessment-button"
            onClick={() => {
              setStarted(false);
              setFinished(false);
            }}
          >
            Retake Assessment
          </button>

          <p className="saved-message">
            ✓ Your result has been saved and
            will be available to Placement
            Prediction.
          </p>

        </div>

      </div>
    );
  }

  /* ---------------- TEST ---------------- */

  return (
    <div className="aptitude-page">

      <div className="test-container">

        <div className="test-top">

          <div>
            <span>
              QUESTION {currentIndex + 1} OF{" "}
              {questions.length}
            </span>

            <h1>
              {currentQuestion.category ===
                "quantitative"
                ? "Quantitative Ability"
                : currentQuestion.category ===
                  "logicalReasoning"
                ? "Logical Reasoning"
                : currentQuestion.category ===
                  "verbal"
                ? "Verbal Ability"
                : "Data Interpretation"}
            </h1>
          </div>

          <div className="test-time">
            <Clock3 size={16} />
            Assessment
          </div>

        </div>

        <div className="question-progress">
          <div
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="question-card">

          <span className="question-number">
            Question {currentIndex + 1}
          </span>

          <h2>
            {currentQuestion.question}
          </h2>

          <div className="options">

            {currentQuestion.options.map(
              (option, index) => {

                const selected =
                  answers[
                    currentQuestion.id
                  ] === index;

                return (
                  <button
                    key={option}
                    className={
                      selected
                        ? "answer-option selected"
                        : "answer-option"
                    }
                    onClick={() =>
                      selectAnswer(index)
                    }
                  >

                    <span className="option-letter">
                      {String.fromCharCode(
                        65 + index
                      )}
                    </span>

                    <span>
                      {option}
                    </span>

                  </button>
                );
              }
            )}

          </div>

        </div>

        <div className="test-navigation">

          <button
            className="secondary-button"
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
              className="primary-button"
              onClick={calculateResult}
            >
              Submit Test
              <CheckCircle2 size={17} />
            </button>
          ) : (
            <button
              className="primary-button"
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

interface ResultCardProps {
  title: string;
  score: number;
}

const ResultCard: React.FC<
  ResultCardProps
> = ({ title, score }) => {
  return (
    <div className="result-card">

      <span>{title}</span>

      <strong>{score}%</strong>

      <div className="result-bar">
        <div
          style={{
            width: `${score}%`,
          }}
        />
      </div>

    </div>
  );
};

export default Aptitude;