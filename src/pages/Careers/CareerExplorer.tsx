import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CareerExplorer.css";

interface Domain {
  id: string;
  icon: string;
  title: string;
  description: string;
  skills: string[];
  roles: string[];
}

const domains: Domain[] = [
  {
    id: "software-development",
    icon: "💻",
    title: "Software Development",
    description:
      "Design, build, test and maintain software applications used by people and businesses.",
    skills: ["Java", "DSA", "OOP", "Git", "Databases", "System Design"],
    roles: [
      "Software Engineer",
      "Backend Developer",
      "Full Stack Developer",
      "Application Developer",
    ],
  },
  {
    id: "web-development",
    icon: "🌐",
    title: "Web Development",
    description:
      "Build websites and web applications that users interact with every day.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Databases"],
    roles: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Web Developer",
    ],
  },
  {
    id: "ai-engineering",
    icon: "🤖",
    title: "AI Engineering",
    description:
      "Build practical AI-powered applications using machine learning, LLMs and intelligent systems.",
    skills: ["Python", "LLMs", "RAG", "AI Agents", "APIs", "Cloud"],
    roles: [
      "AI Engineer",
      "Generative AI Engineer",
      "AI Application Developer",
      "LLM Engineer",
    ],
  },
  {
    id: "machine-learning",
    icon: "🧠",
    title: "Machine Learning",
    description:
      "Build systems that learn patterns from data and use them to make predictions or decisions.",
    skills: [
      "Python",
      "Statistics",
      "Machine Learning",
      "Deep Learning",
      "TensorFlow",
      "Data Processing",
    ],
    roles: [
      "Machine Learning Engineer",
      "ML Developer",
      "AI Engineer",
      "Research Engineer",
    ],
  },
  {
    id: "data-science",
    icon: "📊",
    title: "Data Science",
    description:
      "Use data, statistics and machine learning to discover patterns and support decisions.",
    skills: [
      "Python",
      "SQL",
      "Statistics",
      "Pandas",
      "Visualization",
      "Machine Learning",
    ],
    roles: [
      "Data Scientist",
      "Data Analyst",
      "ML Engineer",
      "Business Intelligence Analyst",
    ],
  },
  {
    id: "cybersecurity",
    icon: "🔐",
    title: "Cybersecurity",
    description:
      "Protect applications, networks, systems and data from security threats.",
    skills: [
      "Networking",
      "Linux",
      "Cryptography",
      "Ethical Hacking",
      "Web Security",
      "Security Tools",
    ],
    roles: [
      "Security Engineer",
      "Cybersecurity Analyst",
      "Penetration Tester",
      "Security Consultant",
    ],
  },
  {
    id: "cloud-devops",
    icon: "☁️",
    title: "Cloud & DevOps",
    description:
      "Build, deploy, automate and operate reliable applications and cloud infrastructure.",
    skills: [
      "Linux",
      "Git",
      "Docker",
      "CI/CD",
      "Cloud",
      "Kubernetes",
    ],
    roles: [
      "DevOps Engineer",
      "Cloud Engineer",
      "Site Reliability Engineer",
      "Cloud Developer",
    ],
  },
];

const reasons = [
  {
    icon: "💡",
    title: "Build real things",
    text: "Turn ideas and problems into software, systems, products and technologies that people can actually use.",
  },
  {
    icon: "🧩",
    title: "Solve problems",
    text: "Engineering gives you a structured way to break difficult problems into smaller problems and solve them.",
  },
  {
    icon: "🌍",
    title: "Work across industries",
    text: "Engineering skills can be used in technology, healthcare, finance, education, automotive, energy and many other industries.",
  },
  {
    icon: "🚀",
    title: "Create the future",
    text: "Engineers work on technologies that are changing how people live, work, communicate and solve problems.",
  },
  {
    icon: "💼",
    title: "Many career paths",
    text: "Engineering is not one job. You can move toward software, AI, data, cybersecurity, cloud and many other fields.",
  },
  {
    icon: "🌐",
    title: "Global opportunities",
    text: "Technical skills can be used by companies and teams across different industries and countries.",
  },
  {
    icon: "📈",
    title: "Keep growing",
    text: "Technology changes continuously, giving engineers opportunities to keep learning and developing new skills.",
  },
  {
    icon: "❤️",
    title: "Make an impact",
    text: "Engineering can help solve practical problems in areas such as healthcare, education, accessibility and sustainability.",
  },
];

const skills = [
  {
    icon: "🧩",
    title: "Problem Solving",
    text: "Break complex problems into smaller, manageable parts and find practical solutions.",
  },
  {
    icon: "🔎",
    title: "Critical Thinking",
    text: "Question assumptions, compare alternatives and use evidence to make technical decisions.",
  },
  {
    icon: "🎨",
    title: "Creativity",
    text: "Think of new approaches and design solutions for problems that do not have obvious answers.",
  },
  {
    icon: "💬",
    title: "Communication",
    text: "Explain technical ideas clearly to teammates, users, clients and non-technical people.",
  },
  {
    icon: "🤝",
    title: "Teamwork",
    text: "Work effectively with developers, designers, managers and engineers from other disciplines.",
  },
  {
    icon: "⭐",
    title: "Leadership",
    text: "Take ownership of tasks, coordinate work and help a team move toward a common goal.",
  },
  {
    icon: "💻",
    title: "Technology Skills",
    text: "Learn programming languages, development tools, frameworks, platforms and new technologies.",
  },
  {
    icon: "🔬",
    title: "Attention to Detail",
    text: "Identify small errors and maintain accuracy when designing, coding, testing and deploying systems.",
  },
  {
    icon: "📊",
    title: "Analytical Thinking",
    text: "Understand data, identify patterns and use evidence to support technical decisions.",
  },
];

const futureAreas = [
  {
    icon: "🤖",
    title: "Artificial Intelligence",
    text: "AI is increasingly being used to build intelligent applications, analyze information and automate complex tasks.",
    tag: "Growing field",
  },
  {
    icon: "🦾",
    title: "Robotics & Automation",
    text: "Software, AI, electronics and mechanical engineering are coming together to create smarter automated systems.",
    tag: "Growing field",
  },
  {
    icon: "☁️",
    title: "Cloud Computing",
    text: "Organizations increasingly depend on cloud platforms to build, deploy and scale their digital products.",
    tag: "High demand",
  },
  {
    icon: "🔐",
    title: "Cybersecurity",
    text: "As more systems become connected, protecting applications, networks and data becomes increasingly important.",
    tag: "High demand",
  },
  {
    icon: "📱",
    title: "Digital Products",
    text: "Mobile applications, web platforms and software products continue to transform how people interact with services.",
    tag: "Growing field",
  },
  {
    icon: "🚗",
    title: "Autonomous Systems",
    text: "AI, computer vision and robotics are enabling machines and vehicles to perform increasingly complex tasks.",
    tag: "Emerging",
  },
  {
    icon: "🧬",
    title: "Bioinformatics",
    text: "Computing and data science are increasingly being used to understand biological and medical information.",
    tag: "Emerging",
  },
  {
    icon: "⚛️",
    title: "Quantum Computing",
    text: "Quantum computing is exploring new approaches to solving certain classes of computational problems.",
    tag: "Research",
  },
];



interface CareerExplorerProps {
  standalone?: boolean;
}

const CareerExplorer: React.FC<CareerExplorerProps> = ({
  standalone = false,
}) => {
  const [selectedDomain, setSelectedDomain] =
    useState<Domain | null>(null);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const openRoadmap = () => {
    if (!selectedDomain) return;

    window.location.href = `/roadmap?domain=${selectedDomain.id}`;
  };

  return (
    <div className="career-explorer">

      {standalone && (
        <button
          type="button"
          className="engineering-back-btn"
          onClick={goBack}
          aria-label="Go back"
        >
          ← Back
        </button>
      )}

      {/* =====================================================
          01 — INTRO
      ===================================================== */}

      <section className="ce-hero">

        <div className="ce-hero-content">

          <div className="ce-eyebrow">
            ENGINEEROS            </div>

          <h1>
            Engineering.
            <br />

            <span>Build what&apos;s</span>

            <strong>next.</strong>
          </h1>

          <p>
            Engineering is about turning problems into practical solutions.
            Explore engineering careers, understand different technology
            domains, discover the skills they require and find the direction
            that interests you.
          </p>

          <div className="ce-hero-actions">
            <a href="#what-is-engineering">
              Explore Engineering ↓
            </a>

            <a href="#domains" className="secondary-action">
              Explore Domains →
            </a>
          </div>

        </div>

      </section>

      {/* =====================================================
          02 — WHAT IS ENGINEERING
      ===================================================== */}

      <section
        id="what-is-engineering"
        className="ce-section what-engineering"
      >

        <div className="ce-section-title">
          <span>START HERE</span>

          <h2>
            So... what{" "}
            <em>is engineering?</em>
          </h2>
        </div>

        <div className="what-engineering-grid">

          <div className="engineering-photo">

            <img
              src="/engineering-lab.jpg"
              alt="Engineering students working on a project"
            />

            <div className="engineering-photo-card">
              <div className="question-box">?</div>

              <div>
                <strong>
                  Engineering = applied problem-solving
                </strong>

                <span>
                  Math + science + creativity, turned into real things.
                </span>
              </div>
            </div>

          </div>

          <div className="what-engineering-content">

            <h3>
              Engineers are the people who{" "}
              <em>make ideas real.</em>
            </h3>

            <p>
              An engineer takes a problem — &quot;how do we cross this
              river?&quot;, &quot;how do we make this phone last all
              day?&quot;, &quot;how do we get to Mars?&quot; — and uses{" "}
              <b>math, science, and creativity</b> to design a solution,
              build it, test it, and improve it.
            </p>

            <p>
              Engineering exists because almost everything humans use has to
              be <b>designed and built by someone.</b> The clean water in your
              tap, the bridge on your drive to school, the app on your phone,
              the medical device in a hospital — engineers worked on all of
              them.
            </p>

            <p>
              It&apos;s a field for people who like asking{" "}
              <b>&quot;how does that work?&quot;</b> and{" "}
              <b>&quot;how could it be better?&quot;</b>
            </p>

            <div className="industry-block">

              <strong>
                Industries that use engineering:
              </strong>

              <div className="industry-pills">
                <span>🏢 Buildings</span>
                <span>🛣️ Roads</span>
                <span>🌉 Bridges</span>
                <span>🚗 Cars</span>
                <span>✈️ Aircraft</span>
                <span>💻 Technology</span>
                <span>🔋 Renewable energy</span>
                <span>🤖 Robotics</span>
                <span>🩺 Medical devices</span>
                <span>🚀 Space</span>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          03 — WHY ENGINEERING
      ===================================================== */}

      <section className="ce-section reasons-section">

        <div className="ce-number-label">
            WHY IT&apos;S WORTH EXPLORING
        </div>

        <div className="ce-section-title">

          <h2>
            8 reasons students{" "}
            <em>choose engineering.</em>
          </h2>

          <p>
            It&apos;s not just about a job title. Engineering can give you
            different ways to solve problems, build things and create a career
            around technology.
          </p>

        </div>

        <div className="reasons-grid">

          {reasons.map((reason) => (
            <article
              className="reason-card"
              key={reason.title}
            >
              <div className="reason-icon">
                {reason.icon}
              </div>

              <h3>{reason.title}</h3>

              <p>{reason.text}</p>
            </article>
          ))}

        </div>

      </section>

      {/* =====================================================
          04 — BRANCHES
      ===================================================== */}

     

      {/* =====================================================
          05 — SKILLS
      ===================================================== */}

      <section className="ce-section skills-section">

        <div className="ce-section-title">

          <h2>
            Skills engineering{" "}
            <em>employers want.</em>
          </h2>

          <p>
            Technical knowledge is important, but engineering also requires
            problem solving, communication, teamwork and the ability to learn.
          </p>

        </div>

        <div className="skills-grid">

          {skills.map((skill) => (
            <article
              className="skill-card"
              key={skill.title}
            >
              <div className="skill-icon">
                {skill.icon}
              </div>

              <div>
                <h3>{skill.title}</h3>
                <p>{skill.text}</p>
              </div>
            </article>
          ))}

        </div>

      </section>

      {/* =====================================================
          06 — FUTURE
      ===================================================== */}

      <section className="future-section">

        <div className="future-inner">

          <div className="future-label">
             WHAT&apos;S NEXT
          </div>

          <h2>
            The future is being{" "}
            <em>engineered now.</em>
          </h2>

          <p className="future-intro">
            Technology continues to create new engineering opportunities.
            These areas are changing how engineers build products, software,
            infrastructure and intelligent systems.
          </p>

          <div className="future-grid">

            {futureAreas.map((area) => (
              <article
                className="future-card"
                key={area.title}
              >
                <div className="future-icon">
                  {area.icon}
                </div>

                <h3>{area.title}</h3>

                <p>{area.text}</p>

                <span>{area.tag}</span>
              </article>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          07 — COMPUTER ENGINEERING DOMAINS
      ===================================================== */}

      <section
        id="domains"
        className="ce-section domain-section"
      >

        <div className="domain-heading">

          <div>
            <span></span>

            <h2>
              Pick a domain of{" "}
              <em>technology.</em>
            </h2>
          </div>

          <p>
            Not sure whether you should choose software, AI, cybersecurity,
            data or cloud? Explore each domain before choosing your roadmap.
          </p>

        </div>

        <div className="domain-grid">

          {domains.map((domain) => (
            <article
              className="domain-card"
              key={domain.id}
              onClick={() => setSelectedDomain(domain)}
            >

              <div className="domain-icon">
                {domain.icon}
              </div>

              <h3>{domain.title}</h3>

              <p>{domain.description}</p>

              <div className="domain-skills">

                {domain.skills.slice(0, 4).map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}

              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDomain(domain);
                }}
              >
                Explore Domain →
              </button>

            </article>
          ))}

        </div>

      </section>

      {/* =====================================================
          DOMAIN DRAWER
      ===================================================== */}

      {selectedDomain && (

        <div className="domain-overlay">

          <div
            className="domain-backdrop"
            onClick={() => setSelectedDomain(null)}
          />

          <aside className="domain-drawer">

            <button
              className="close-drawer"
              onClick={() => setSelectedDomain(null)}
            >
              ×
            </button>

            <div className="drawer-icon">
              {selectedDomain.icon}
            </div>

            <span className="drawer-label">
              COMPUTER ENGINEERING DOMAIN
            </span>

            <h2>{selectedDomain.title}</h2>

            <p className="drawer-description">
              {selectedDomain.description}
            </p>

            <div className="drawer-section">

              <h3>Core Skills</h3>

              <div className="drawer-pills">
                {selectedDomain.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

            </div>

            <div className="drawer-section">

              <h3>Common Roles</h3>

              <div className="roles-list">
                {selectedDomain.roles.map((role) => (
                  <div key={role}>
                    ✓ {role}
                  </div>
                ))}
              </div>

            </div>

            <div className="drawer-section">

              <h3>Your next step</h3>

              <p>
                Explore this domain in more detail and follow its structured
                learning roadmap.
              </p>

            </div>

            <button
              className="roadmap-button"
              onClick={openRoadmap}
            >
              View Career Roadmap →
            </button>

          </aside>

        </div>

      )}

    </div>
  );
};

export default CareerExplorer;