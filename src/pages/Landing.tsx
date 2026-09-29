
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Code2,
  Compass,
  GraduationCap,
  Map,
  Menu,
  Play,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  Users,
  X,
  Cloud,
  ShieldCheck,
  Smartphone,
  Database,
  Blocks,
  Palette,
  Gamepad2,
  Cpu,
  Monitor,
} from "lucide-react";

import "./Landing.css";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const goToLogin = () => {
  navigate("/auth");
};

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setMenuOpen(false);
  };

  const features = [
    {
      title: "Career & Domain Exploration",
      description:
        "Explore computer-related domains, roles, skills and career directions.",
      icon: Compass,
      color: "purple",
    },
    {
      title: "Domain Interest Test",
      description:
        "Discover which technical domains align with your interests and preferences.",
      icon: Target,
      color: "blue",
    },
    {
      title: "Career Roadmap",
      description:
        "Follow a structured path of skills, projects and milestones.",
      icon: Map,
      color: "cyan",
    },
    {
      title: "Aptitude Assessment",
      description:
        "Evaluate your logical, quantitative and problem-solving abilities.",
      icon: Brain,
      color: "green",
    },
    {
      title: "Soft Skills Assessment",
      description:
        "Understand communication, teamwork and other professional skills.",
      icon: Users,
      color: "yellow",
    },
    {
      title: "Placement Prediction",
      description:
        "Use your profile and assessment data to understand placement readiness.",
      icon: BriefcaseBusiness,
      color: "orange",
    },
    {
      title: "Progress Tracking",
      description:
        "Track your learning journey, milestones and areas that need improvement.",
      icon: TrendingUp,
      color: "purple",
    },
    {
      title: "AI Assistant",
      description:
        "Get AI-powered guidance throughout your engineering career journey.",
      icon: Sparkles,
      color: "blue",
    },
  ];

  const domains = [
    { name: "Web Development", icon: Code2 },
    { name: "Software Engineering", icon: Monitor },
    { name: "Artificial Intelligence", icon: Brain },
    { name: "Machine Learning", icon: Cpu },
    { name: "Data Science", icon: Database },
    { name: "Data Engineering", icon: Database },
    { name: "Cybersecurity", icon: ShieldCheck },
    { name: "Cloud Computing", icon: Cloud },
    { name: "DevOps", icon: Code2 },
    { name: "Mobile App Development", icon: Smartphone },
    { name: "Blockchain", icon: Blocks },
    { name: "UI/UX Design", icon: Palette },
    { name: "Game Development", icon: Gamepad2 },
    { name: "IoT", icon: Cpu },
    { name: "AR / VR", icon: Monitor },
  ];

  return (
    <div className="landing">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="landing-background">
        <div className="background-purple" />
        <div className="background-blue" />
        <div className="background-grid" />
        <div className="background-stars" />
      </div>


      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="landing-navbar">
        <div className="navbar-inner">

          <button
            className="brand"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="brand-icon">
              <GraduationCap size={21} />
            </div>

            <div className="brand-text">
              <strong>
                Engineer<span>OS</span>
              </strong>

              <small>ENGINEERING OPERATING SYSTEM</small>
            </div>
          </button>


          <nav className="desktop-nav">
            <button onClick={() => scrollTo("how-it-works")}>
              How it works
            </button>

            <button onClick={() => scrollTo("features")}>
              Features
            </button>

            <button onClick={() => scrollTo("domains")}>
              Domains
            </button>

            <button onClick={() => scrollTo("journey")}>
              Your journey
            </button>
          </nav>


          <div className="navbar-actions">
            <button
              className="login-link"
              onClick={goToLogin}
            >
              Log in
            </button>

            <button
              className="nav-cta"
              onClick={goToLogin}
            >
              Get started
              <ArrowRight size={15} />
            </button>
          </div>


          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

        </div>


        {menuOpen && (
          <div className="mobile-nav">

            <button onClick={() => scrollTo("how-it-works")}>
              How it works
            </button>

            <button onClick={() => scrollTo("features")}>
              Features
            </button>

            <button onClick={() => scrollTo("domains")}>
              Domains
            </button>

            <button onClick={() => scrollTo("journey")}>
              Your journey
            </button>

            <button
              className="mobile-login"
              onClick={goToLogin}
            >
              Get started
              <ArrowRight size={15} />
            </button>

          </div>
        )}
      </header>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero">

        <div className="hero-inner">

          <div className="hero-content">



            <h1>
              Know what to{" "}
              <span className="white-text">learn.</span>

              <br />

              <span className="gradient-text">
                Know where
              </span>

              <br />

              <span className="gradient-text">
                you're going.
              </span>
            </h1>


            <p className="hero-description">
              EngineerOS helps engineering students understand where
              they stand, discover career directions, build a roadmap,
              track their progress and prepare for placements — all
              in one connected platform.
            </p>


            <div className="hero-buttons">

              <button
                className="primary-button"
                onClick={goToLogin}
              >
                Start your journey
                <ArrowRight size={17} />
              </button>


              <button
                className="secondary-button"
                onClick={() => scrollTo("how-it-works")}
              >
                <span className="play-circle">
                  <Play size={11} fill="currentColor" />
                </span>

                See how it works
              </button>

            </div>


            <div className="hero-trust">

              <div>
                <Check size={14} />
                Built for engineering students
              </div>

              <div>
                <Check size={14} />
                Personalized guidance
              </div>

              <div>
                <Check size={14} />
                One connected journey
              </div>

            </div>

          </div>


          {/* =================================================
              HERO STUDENT
          ================================================= */}

          <div className="hero-visual">

            <div className="hero-glow" />

            <div className="student-ring" />

            <img
              src="/student.png"
              alt="Engineering student"
              className="student-image"
            />


            {/* FLOATING CARD 1 */}

            <div className="floating-card card-learn">

              <div className="floating-icon blue">
                <Code2 size={18} />
              </div>

              <div>
                <small>LEARN</small>
                <strong>Skills</strong>
              </div>

            </div>


            {/* FLOATING CARD 2 */}

            <div className="floating-card card-domain">

              <div className="floating-icon purple">
                <Compass size={18} />
              </div>

              <div>
                <small>EXPLORE</small>
                <strong>Domains</strong>
              </div>

            </div>


            {/* FLOATING CARD 3 */}

            <div className="floating-card card-progress">

              <div className="floating-icon green">
                <TrendingUp size={18} />
              </div>

              <div>
                <small>TRACK</small>
                <strong>Progress</strong>
              </div>

            </div>


            {/* FLOATING CARD 4 */}

            <div className="floating-card card-placement">

              <div className="floating-icon cyan">
                <Check size={18} />
              </div>

              <div>
                <small>PREPARE</small>
                <strong>For Placements</strong>
              </div>

            </div>


            <div className="hero-orbit" />

          </div>

        </div>

      </section>


      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section
        id="how-it-works"
        className="section how-section"
      >

        <div className="section-container">

          <div className="section-heading centered">

            <span className="eyebrow">
              HOW IT WORKS
            </span>

            <h2>
              From confusion to a
              <span> clear direction.</span>
            </h2>

            <p>
              Your journey inside EngineerOS is connected. Complete your profile once and use that information throughout the platform.
            </p>

          </div>


          <div className="steps-grid">

            <div className="step-card">

              <span className="step-number">
                01
              </span>

              <div className="step-icon">
                <UserRound size={21} />
              </div>

              <h3>
                Complete your profile
              </h3>

              <p>
                Add your academic details, skills, projects,
                internships, certifications and career goals.
                Your profile becomes the foundation of EngineerOS.
              </p>

            </div>


            <div className="step-card">

              <span className="step-number">
                02
              </span>

              <div className="step-icon">
                <Target size={21} />
              </div>

              <h3>
                Understand where you stand
              </h3>

              <p>
                Explore domains, discover your interests and
                take aptitude and soft-skill assessments to
                understand your current position.
              </p>

            </div>


            <div className="step-card">

              <span className="step-number">
                03
              </span>

              <div className="step-icon">
                <Map size={21} />
              </div>

              <h3>
                Follow your roadmap
              </h3>

              <p>
                Build a structured career path, track your
                progress and use your profile and assessments
                to prepare for placement opportunities.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section
        id="features"
        className="section features-section"
      >

        <div className="section-container">

          <div className="section-heading centered">

            <span className="eyebrow">
              ENGINEEROS
            </span>

            <h2>
              Everything you need.
            </h2>

            <p>
             Discover your direction, understand your current skills, follow a roadmap and prepare for your engineering career.
            </p>

          </div>


          <div className="feature-grid">

            {features.map((feature) => {

              const Icon = feature.icon;

              return (
                <div
                  className="feature-card"
                  key={feature.title}
                >

                  <div
                    className={`feature-icon ${feature.color}`}
                  >
                    <Icon size={20} />
                  </div>

                  <h3>
                    {feature.title}
                  </h3>

                  <p>
                    {feature.description}
                  </p>

                  <ChevronRight
                    className="feature-arrow"
                    size={17}
                  />

                </div>
              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          YOUR JOURNEY
      ===================================================== */}

      <section
        id="journey"
        className="journey-section"
      >

        <div className="journey-inner">

          <div className="journey-copy">

            <span className="eyebrow">
              YOUR ENGINEERING JOURNEY
            </span>

            <h2>
              One profile.
              <br />

              One direction.
              <br />

              <span>
                Continuous progress.
              </span>
            </h2>

            <p>
              Your profile becomes the foundation of EngineerOS.
              Once completed, the same information can support
              your career exploration, roadmap, progress and
              placement preparation.
            </p>


            <div className="journey-list">

              <div>
                <span>01</span>

                <div>
                  <strong>Profile first</strong>

                  <small>
                    Save your academic and career information once.
                  </small>
                </div>
              </div>


              <div>
                <span>02</span>

                <div>
                  <strong>Assess yourself</strong>

                  <small>
                    Understand your interests, aptitude and soft skills.
                  </small>
                </div>
              </div>


              <div>
                <span>03</span>

                <div>
                  <strong>Know what to do next</strong>

                  <small>
                    Identify gaps and follow a structured roadmap.
                  </small>
                </div>
              </div>


              <div>
                <span>04</span>

                <div>
                  <strong>Prepare for placements</strong>

                  <small>
                    Use your profile and assessments for placement readiness.
                  </small>
                </div>
              </div>

            </div>

          </div>


          {/* JOURNEY CARD */}

          <div className="journey-dashboard">

            <div className="dashboard-top">

              <div>
                <small>ENGINEEROS JOURNEY</small>

                <h3>
                  Your progress
                </h3>
              </div>

              <span className="active-pill">
                Active
              </span>

            </div>


            <div className="journey-progress-list">

              <div className="journey-progress-item active">

                <div className="journey-progress-icon">
                  <UserRound size={18} />
                </div>

                <div>
                  <strong>Profile</strong>
                  <small>
                    Academic & career information
                  </small>
                </div>

                <span className="complete">
                  Complete
                </span>

              </div>


              <div className="journey-progress-item">

                <div className="journey-progress-icon">
                  <Compass size={18} />
                </div>

                <div>
                  <strong>Career direction</strong>
                  <small>
                    Explore domains & roles
                  </small>
                </div>

                <span>
                  Next
                </span>

              </div>


              <div className="journey-progress-item">

                <div className="journey-progress-icon">
                  <Map size={18} />
                </div>

                <div>
                  <strong>Career roadmap</strong>
                  <small>
                    Skills, projects & milestones
                  </small>
                </div>

                <span>
                  In progress
                </span>

              </div>


              <div className="journey-progress-item">

                <div className="journey-progress-icon">
                  <BriefcaseBusiness size={18} />
                </div>

                <div>
                  <strong>Placement readiness</strong>
                  <small>
                    Assess & improve
                  </small>
                </div>

                <span>
                  Next
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          DOMAINS
      ===================================================== */}

      <section
        id="domains"
        className="section domains-section"
      >

        <div className="section-container">

          <div className="section-heading centered">

            <span className="eyebrow">
              EXPLORE YOUR DIRECTION
            </span>

            <h2>
              Find your direction in 
              <span> Technology </span>
            </h2>

            <p>
              Discover technical domains, understand career
              paths and find the skills you need to build your future.
            </p>

          </div>


          <div className="domain-list">

            {domains.map((domain) => {

              const Icon = domain.icon;

              return (
                <div
                  className="domain-pill"
                  key={domain.name}
                >

                  <span className="domain-dot">
                    <Icon size={13} />
                  </span>

                  {domain.name}

                </div>
              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="final-cta">

        <div className="final-glow" />

        <div className="final-content">

          <span className="eyebrow">
            YOUR CAREER CLARITY STARTS HERE
          </span>

          <h2>
            Know what to learn.
            <br />

            <span>
              Know where you're going.
            </span>
          </h2>

          <p>
            Build your profile, explore your direction,
            follow your roadmap and prepare for your future
            with EngineerOS.
          </p>

          <button
            className="primary-button large"
            onClick={goToLogin}
          >
            Start your journey
            <ArrowRight size={18} />
          </button>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="landing-footer">

        <div className="footer-inner">

          <div className="footer-brand">

            <div className="brand-icon small">
              <GraduationCap size={17} />
            </div>

            <div>
              <strong>
                Engineer<span>OS</span>
              </strong>

              <small>
                ENGINEERING OPERATING SYSTEM
              </small>
            </div>

          </div>


          <p>
            Your engineering journey, connected.
          </p>


          <span>
            © {new Date().getFullYear()} EngineerOS
          </span>

        </div>

      </footer>

    </div>
  );
};

export default Landing;