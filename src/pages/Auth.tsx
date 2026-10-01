import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ================================
  // SIGNUP / LOGIN
  // ================================

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      // ==========================================
      // SIGNUP
      // ==========================================

      if (isSignup) {
        const firstName = String(
          formData.get("firstName") || ""
        ).trim();

        const lastName = String(
          formData.get("lastName") || ""
        ).trim();

        const email = String(
          formData.get("email") || ""
        ).trim();

        const password = String(
          formData.get("password") || ""
        );

        const confirmPassword = String(
          formData.get("confirmPassword") || ""
        );

        // Password confirmation
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          setLoading(false);
          return;
        }

        // Call FastAPI signup
        const response = await fetch(
          "https://engineeros-api.onrender.com/auth/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName,
              lastName,
              email,
              password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.detail || "Unable to create account."
          );
          setLoading(false);
          return;
        }

        // ==========================================
        // IMPORTANT:
        // Signup creates the account only.
        // It does NOT log the user in automatically.
        // ==========================================

        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("profileCompleted");
        localStorage.removeItem("user");

        // Switch to Login form
        setIsSignup(false);

        // ==========================================
        // LOGIN
        // ==========================================
      } else {
        const email = String(
          formData.get("email") || ""
        ).trim();

        const password = String(
          formData.get("password") || ""
        );

        // Call FastAPI login
        const response = await fetch(
          "https://engineeros-api.onrender.com/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.detail || "Invalid email or password."
          );
          setLoading(false);
          return;
        }

        // Save JWT token only after successful LOGIN
        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "isLoggedIn",
          "true"
        );

        // Save user information
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        // Check whether profile is completed
        const profileCompleted =
          localStorage.getItem(
            "profileCompleted"
          );

        if (profileCompleted === "true") {
          navigate("/dashboard");
        } else {
          navigate("/profile");
        }
      }
    } catch (error) {
      console.error(
        "Authentication error:",
        error
      );

      setError(
        "Unable to connect to the server. Make sure FastAPI is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`auth-page ${
        isSignup ? "signup-mode" : ""
      }`}
    >

      {/* =========================================
          BRAND
      ========================================= */}

      <Link to="/" className="auth-brand">
        <span className="auth-brand-icon">
          E
        </span>

        <span className="auth-brand-name">
          <strong>EngineerOS</strong>

          <small>
            ENGINEERING OPERATING SYSTEM
          </small>
        </span>
      </Link>


      {/* =========================================
          AUTH CONTAINER
      ========================================= */}

      <div className="auth-container">

        {/* =======================================
            SIGN IN FORM
        ======================================= */}

        <div className="auth-form-panel signin-panel">

          <div className="auth-form">

            <div className="auth-heading">
              <span>WELCOME BACK</span>

              <h1>Sign In</h1>

              <p>
                Continue your engineering journey.
              </p>
            </div>


            <form onSubmit={handleSubmit}>

              <div className="auth-input-group">

                <label htmlFor="signin-email">
                  Email address
                </label>

                <input
                  id="signin-email"
                  name="email"
                  type="email"
                  placeholder="student@example.com"
                  required
                />

              </div>


              <div className="auth-input-group">

                <div className="auth-password-label">

                  <label htmlFor="signin-password">
                    Password
                  </label>

                  <button type="button">
                    Forgot password?
                  </button>

                </div>

                <input
                  id="signin-password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />

              </div>


              {/* ERROR */}

              {error && !isSignup && (
                <div className="auth-error">
                  {error}
                </div>
              )}


              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                {loading
                  ? "Signing In..."
                  : "Sign In"}

                <span>→</span>
              </button>

            </form>


            <div className="auth-mobile-switch">

              <span>
                Don't have an account?
              </span>

              <button
                type="button"
                onClick={() => {
                  setError("");
                  setIsSignup(true);
                }}
              >
                Sign Up
              </button>

            </div>

          </div>

        </div>


        {/* =======================================
            SIGN UP FORM
        ======================================= */}

        <div className="auth-form-panel signup-panel">

          <div className="auth-form">

            <div className="auth-heading">

              <span>
                START YOUR JOURNEY
              </span>

              <h1>Create Account</h1>

              <p>
                Build your personalized engineering
                journey.
              </p>

            </div>


            <form onSubmit={handleSubmit}>

              <div className="auth-name-row">

                <div className="auth-input-group">

                  <label htmlFor="first-name">
                    First name
                  </label>

                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    required
                  />

                </div>


                <div className="auth-input-group">

                  <label htmlFor="last-name">
                    Last name
                  </label>

                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    required
                  />

                </div>

              </div>


              <div className="auth-input-group">

                <label htmlFor="signup-email">
                  Email address
                </label>

                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  placeholder="student@example.com"
                  required
                />

              </div>


              <div className="auth-input-group">

                <label htmlFor="signup-password">
                  Password
                </label>

                <input
                  id="signup-password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  minLength={8}
                  required
                />

              </div>


              <div className="auth-input-group">

                <label htmlFor="confirm-password">
                  Confirm password
                </label>

                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  minLength={8}
                  required
                />

              </div>


              <label className="auth-terms">

                <input
                  type="checkbox"
                  required
                />

                <span>
                  I agree to the{" "}

                  <button type="button">
                    Terms of Service
                  </button>

                  {" "}and{" "}

                  <button type="button">
                    Privacy Policy
                  </button>

                </span>

              </label>


              {/* ERROR */}

              {error && isSignup && (
                <div className="auth-error">
                  {error}
                </div>
              )}


              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}

                <span>→</span>
              </button>

            </form>


            <div className="auth-mobile-switch">

              <span>
                Already have an account?
              </span>

              <button
                type="button"
                onClick={() => {
                  setError("");
                  setIsSignup(false);
                }}
              >
                Sign In
              </button>

            </div>

          </div>

        </div>


        {/* =======================================
            ANIMATED WELCOME PANEL
        ======================================= */}

        <div className="auth-overlay">

          <div className="overlay-content overlay-signin">

            <div className="overlay-icon">
              E
            </div>

            <span className="overlay-label">
              ENGINEEROS
            </span>

            <h2>
              Your engineering
              <br />
              journey starts here.
            </h2>

            <p>
              Discover your path, build your skills
              and prepare for your future.
            </p>

            <button
              type="button"
              onClick={() => {
                setError("");
                setIsSignup(true);
              }}
              className="overlay-button"
            >
              Create Account
              <span>→</span>
            </button>

          </div>


          <div className="overlay-content overlay-signup">

            <div className="overlay-icon">
              E
            </div>

            <span className="overlay-label">
              WELCOME BACK
            </span>

            <h2>
              Continue building
              <br />
              your future.
            </h2>

            <p>
              Pick up where you left off and
              continue your engineering journey.
            </p>

            <button
              type="button"
              onClick={() => {
                setError("");
                setIsSignup(false);
              }}
              className="overlay-button"
            >
              Sign In
              <span>→</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}