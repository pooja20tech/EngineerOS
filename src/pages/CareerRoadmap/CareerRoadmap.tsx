import React, { useEffect, useMemo, useState } from "react";
import {
  Check,
  Clock3,
  X,
  ChevronDown,
  ChevronUp,
  Circle,
} from "lucide-react";

import {
  domainList,
  roadmapData,
} from "./roadmapData";

import type {
  NodeStatus,
  RoadmapTopic,
} from "./roadmapData";

import "./CareerRoadmap.css";

const getRoadmapStorageKey = (): string => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    const email = String(user?.email || "")
      .trim()
      .toLowerCase();

    return email
      ? `engineerOSRoadmapProgress:${email}`
      : "engineerOSRoadmapProgress";
  } catch {
    return "engineerOSRoadmapProgress";
  }
};

const CareerRoadmap: React.FC = () => {
  const [selectedDomain, setSelectedDomain] =
    useState("machine-learning");

  const [selectedTopic, setSelectedTopic] =
    useState<RoadmapTopic | null>(null);

  const [showDomains, setShowDomains] =
    useState(false);

  const [statuses, setStatuses] =
    useState<Record<string, NodeStatus>>(() => {
      try {
        return JSON.parse(
          localStorage.getItem(getRoadmapStorageKey()) || "{}"
        );
      } catch {
        return {};
      }
    });

  // Load the authenticated student's roadmap progress from MongoDB.
  useEffect(() => {
    const loadRoadmapProgress = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn(
            "Authentication token not found. Using local roadmap progress."
          );
          return;
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

          console.warn(
            "Roadmap session expired. Please login again."
          );
          return;
        }

        if (response.status === 404) {
          return;
        }

        if (!response.ok) {
          throw new Error(
            "Failed to fetch student roadmap data from MongoDB."
          );
        }

        const responseData = await response.json();
        const student = responseData?.student;

        if (!student) {
          return;
        }

        const mongoRoadmapProgress =
          student?.roadmapProgress;

        if (
          mongoRoadmapProgress &&
          typeof mongoRoadmapProgress === "object"
        ) {
          setStatuses(mongoRoadmapProgress);

          localStorage.setItem(
            getRoadmapStorageKey(),
            JSON.stringify(mongoRoadmapProgress)
          );

          console.log(
            "Roadmap progress loaded from MongoDB successfully."
          );
        }
      } catch (error) {
        console.error(
          "Roadmap MongoDB fetch error:",
          error
        );
      }
    };

    loadRoadmapProgress();
  }, []);

  const roadmap = roadmapData[selectedDomain];

  const getStatus = (id: string): NodeStatus => {
    return (
      statuses[`${selectedDomain}-${id}`] ||
      "not-started"
    );
  };

  const updateStatus = async (
    id: string,
    status: NodeStatus
  ) => {
    const key = `${selectedDomain}-${id}`;

    const updated = {
      ...statuses,
      [key]: status,
    };

    // Keep the UI responsive and preserve local fallback storage.
    setStatuses(updated);
    localStorage.setItem(
      getRoadmapStorageKey(),
      JSON.stringify(updated)
    );

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Your login session is missing. Please login again."
        );
      }

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      const email = user?.email;

      if (!email) {
        throw new Error(
          "Logged-in user information was not found. Please login again."
        );
      }

      const response = await fetch(
        `https://engineeros-api.onrender.com/students/${encodeURIComponent(
          email
        )}/roadmap`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            roadmapProgress: updated,
          }),
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
          "You are not authorized to save this roadmap progress."
        );
      }

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => null);

        throw new Error(
          errorData?.detail ||
            "Failed to save roadmap progress to MongoDB."
        );
      }

      console.log(
        "Roadmap progress saved to MongoDB successfully."
      );
    } catch (error) {
      console.error(
        "Roadmap MongoDB save error:",
        error
      );
   
    }
  };

  const allTopics = useMemo(() => {
    const result: RoadmapTopic[] = [];

    roadmap.sections.forEach((section) => {
      result.push(section.main);

      section.left?.forEach((item) =>
        result.push(item)
      );

      section.right?.forEach((item) =>
        result.push(item)
      );
    });

    return result;
  }, [roadmap]);

  const completed = allTopics.filter(
    (topic) =>
      getStatus(topic.id) === "done"
  ).length;

  const learning = allTopics.filter(
    (topic) =>
      getStatus(topic.id) === "learning"
  ).length;

  const progress = allTopics.length
    ? Math.round(
        (completed / allTopics.length) * 100
      )
    : 0;

  return (
    <div className="career-roadmap-page">

      {/* HEADER */}

      <header className="roadmap-header">

        <div>
          <span className="roadmap-eyebrow">
            ENGINEEROS • CAREER ROADMAP
          </span>

          <h1>{roadmap.title}</h1>

          <p>
            {roadmap.description}
          </p>
        </div>

        <div className="roadmap-progress-card">

          <div className="progress-top">
            <span>Your Progress</span>
            <strong>{progress}%</strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="progress-stats">

            <span>
              <Check size={14} />
              {completed} Done
            </span>

            <span>
              <Clock3 size={14} />
              {learning} Learning
            </span>

            <span>
              {allTopics.length} Topics
            </span>

          </div>

        </div>

      </header>


      {/* DOMAIN */}

      <div className="domain-selector">

        <button
          className="domain-selector-button"
          onClick={() =>
            setShowDomains((value) => !value)
          }
        >

          <div>
            <small>
              SELECT ROADMAP
            </small>

            <strong>
              {
                domainList.find(
                  (d) =>
                    d.id === selectedDomain
                )?.title
              }
            </strong>
          </div>

          {showDomains ? (
            <ChevronUp />
          ) : (
            <ChevronDown />
          )}

        </button>


        {showDomains && (
          <div className="domain-dropdown">

            {domainList.map((domain) => (

              <button
                key={domain.id}
                className={
                  selectedDomain === domain.id
                    ? "domain-option active"
                    : "domain-option"
                }
                onClick={() => {
                  setSelectedDomain(
                    domain.id
                  );
                  setSelectedTopic(null);
                  setShowDomains(false);
                }}
              >

                <div>

                  <strong>
                    {domain.title}
                  </strong>

                  <span>
                    {domain.description}
                  </span>

                </div>

                {selectedDomain === domain.id && (
                  <Check size={17} />
                )}

              </button>

            ))}

          </div>
        )}

      </div>


      {/* ROADMAP */}

      <main className="roadmap-container">

        <div className="roadmap-title-area">

          <span>
            LEARNING PATH
          </span>

          <h2>
            Follow the path step by step
          </h2>

          <p>
            Click any topic to understand what
            it means, why it matters and what
            you should learn.
          </p>

        </div>


        <div className="roadmap">

          {/* CENTRAL SPINE */}

          <div className="roadmap-spine" />


          {roadmap.sections.map(
            (section, index) => (

              <React.Fragment
                key={section.id}
              >

                {/* SECTION */}

                <section
                  className="roadmap-section"
                >

                  {/* LEFT */}

                  <div className="roadmap-side left">

                    {section.left?.map(
                      (topic) => (

                        <TopicCard
                          key={topic.id}
                          topic={topic}
                          status={getStatus(
                            topic.id
                          )}
                          onClick={() =>
                            setSelectedTopic(
                              topic
                            )
                          }
                        />

                      )
                    )}

                  </div>


                  {/* CENTER */}

                  <div className="roadmap-center">

                    <button
                      className={`main-roadmap-node ${getStatus(
                        section.main.id
                      )}`}
                      onClick={() =>
                        setSelectedTopic(
                          section.main
                        )
                      }
                    >

                      <div className="main-node-status">

                        {getStatus(
                          section.main.id
                        ) === "done" ? (
                          <Check size={15} />
                        ) : (
                          <Circle size={13} />
                        )}

                      </div>

                      <div>

                        <small>
                          {section.category}
                        </small>

                        <strong>
                          {section.main.title}
                        </strong>

                      </div>

                    </button>

                  </div>


                  {/* RIGHT */}

                  <div className="roadmap-side right">

                    {section.right?.map(
                      (topic) => (

                        <TopicCard
                          key={topic.id}
                          topic={topic}
                          status={getStatus(
                            topic.id
                          )}
                          onClick={() =>
                            setSelectedTopic(
                              topic
                            )
                          }
                        />

                      )
                    )}

                  </div>

                </section>


                {/* CONTINUE LINE */}

                {index <
                  roadmap.sections.length - 1 && (
                  <div className="roadmap-arrow">
                    <span />
                  </div>
                )}

              </React.Fragment>

            )
          )}

        </div>

      </main>


      {/* DRAWER */}

      {selectedTopic && (

        <>

          <div
            className="drawer-backdrop"
            onClick={() =>
              setSelectedTopic(null)
            }
          />

          <aside className="roadmap-drawer">

            <button
              className="drawer-close"
              onClick={() =>
                setSelectedTopic(null)
              }
            >
              <X size={20} />
            </button>


            <span className="drawer-category">
              {selectedTopic.category}
            </span>


            <h2>
              {selectedTopic.title}
            </h2>


            <div className="drawer-section">

              <h3>
                What is it?
              </h3>

              <p>
                {selectedTopic.description}
              </p>

            </div>


            <div className="drawer-section">

              <h3>
                Why is it important?
              </h3>

              <p>
                {selectedTopic.importance}
              </p>

            </div>


            <div className="drawer-example">

              <span>
                REAL-WORLD EXAMPLE
              </span>

              <p>
                {selectedTopic.example}
              </p>

            </div>


            <div className="drawer-section">

              <h3>
                What you should learn
              </h3>

              <ul>

                {selectedTopic.topics.map(
                  (item) => (
                    <li key={item}>
                      {item}
                    </li>
                  )
                )}

              </ul>

            </div>


            <div className="drawer-progress">

              <h3>
                Your Progress
              </h3>

              <div className="status-buttons">

                <button
                  className={
                    getStatus(
                      selectedTopic.id
                    ) === "learning"
                      ? "status-button active learning"
                      : "status-button"
                  }
                  onClick={() =>
                    updateStatus(
                      selectedTopic.id,
                      "learning"
                    )
                  }
                >
                  <Clock3 size={15} />
                  Learning
                </button>


                <button
                  className={
                    getStatus(
                      selectedTopic.id
                    ) === "done"
                      ? "status-button active done"
                      : "status-button"
                  }
                  onClick={() =>
                    updateStatus(
                      selectedTopic.id,
                      "done"
                    )
                  }
                >
                  <Check size={15} />
                  Done
                </button>


                <button
                  className={
                    getStatus(
                      selectedTopic.id
                    ) === "skip"
                      ? "status-button active skip"
                      : "status-button"
                  }
                  onClick={() =>
                    updateStatus(
                      selectedTopic.id,
                      "skip"
                    )
                  }
                >
                  <X size={15} />
                  Skip
                </button>

              </div>

            </div>

          </aside>

        </>

      )}

    </div>
  );
};


interface TopicCardProps {
  topic: RoadmapTopic;
  status: NodeStatus;
  onClick: () => void;
}


const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  status,
  onClick,
}) => {

  return (
    <button
      className={`roadmap-topic-card ${status}`}
      onClick={onClick}
    >

      <div className="topic-status">

        {status === "done" ? (
          <Check size={13} />
        ) : status === "learning" ? (
          <Clock3 size={13} />
        ) : (
          <Circle size={11} />
        )}

      </div>

      <div>

        <small>
          {topic.category}
        </small>

        <strong>
          {topic.title}
        </strong>

      </div>

    </button>
  );
};


export default CareerRoadmap;