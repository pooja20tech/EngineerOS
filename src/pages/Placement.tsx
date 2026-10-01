import React, { useEffect, useState } from "react";
import {
  getStudentData,
  saveStudentData,
} from "../utils/studentData";

type EligibilityItem = {
  minimum: number;
  actual: number;
  passed: boolean;
};

type PredictionResult = {
  prediction: string;
  placement_probability: number | null;

  eligible: boolean;
  eligibility_status?: string;
  eligibility_message?: string;

  failed_criteria?: string[];

  minimum_eligibility_criteria?: {
    CGPA?: EligibilityItem;
    SSC_Marks?: EligibilityItem;
    HSC_Marks?: EligibilityItem;
  };

  strengths?: string[];
  areas_to_improve?: string[];
  recommended_next_steps?: string[];

  profile?: {
    CGPA?: number;
    Internships?: number;
    Projects?: number;
    "Workshops/Certifications"?: number;
    AptitudeTestScore?: number;
    SoftSkillsRating?: number;
    ExtracurricularActivities?: string;
    PlacementTraining?: string;
    SSC_Marks?: number;
    HSC_Marks?: number;
  };
};

const formatSoftSkillsOutOfFive = (value?: number) => {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return "—";
  }

  // Supports both the old API value (0–100) and the corrected
  // ML-scale value (0–5).
  const scoreOutOfFive =
    value > 5 ? (value / 100) * 5 : value;

  return `${scoreOutOfFive.toFixed(2)} / 5`;
};

export default function Placement() {
  const [formData, setFormData] = useState(() => {
    const studentData = getStudentData();

    const profile = studentData.profile;
    const aptitude = studentData.aptitude;
    const softSkills = studentData.softSkills;

    return {
      CGPA: profile?.cgpa || "",
      Internships: profile?.internships || "",
      Projects: profile?.projects || "",
      Certifications: profile?.certifications || "",

      AptitudeTestScore:
        aptitude?.overall !== undefined
          ? String(aptitude.overall)
          : "",

      SoftSkillsRating:
        softSkills?.overall !== undefined
          ? String(softSkills.overall)
          : "",

      ExtracurricularActivities: "yes",
      PlacementTraining: "yes",

      SSC_Marks: profile?.ssc || "",
      HSC_Marks: profile?.hsc || "",
    };
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /*
   * Fetch the currently authenticated student's data.
   * The backend gets the email from the JWT, so we never
   * select a student by an email supplied by the frontend.
   */
  useEffect(() => {
    const loadStudentDataFromMongoDB = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login again to access Placement Prediction.");
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
          localStorage.removeItem("profileCompleted");

          setError("Your session has expired. Please login again.");
          return;
        }

        if (response.status === 404) {
          setError(
            "Please complete and save your profile before using Placement Prediction."
          );
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch student data from MongoDB.");
        }

        const responseData = await response.json();

        // Supports both { student: {...} } and a direct student object.
        const student = responseData?.student || responseData;

        if (!student) {
          throw new Error("Student record not found.");
        }

        const profile = student.profile || {};
        const aptitude = student.aptitude || {};
        const softSkills = student.softSkills || {};

        const updatedFormData = {
          CGPA:
            profile.cgpa !== undefined ? String(profile.cgpa) : "",
          Internships:
            profile.internships !== undefined
              ? String(profile.internships)
              : "",
          Projects:
            profile.projects !== undefined
              ? String(profile.projects)
              : "",
          Certifications:
            profile.certifications !== undefined
              ? String(profile.certifications)
              : "",
          AptitudeTestScore:
            aptitude.overall !== undefined
              ? String(aptitude.overall)
              : "",
          SoftSkillsRating:
            softSkills.overall !== undefined
              ? String(softSkills.overall)
              : "",
          ExtracurricularActivities: "yes",
          PlacementTraining: "yes",
          SSC_Marks:
            profile.ssc !== undefined ? String(profile.ssc) : "",
          HSC_Marks:
            profile.hsc !== undefined ? String(profile.hsc) : "",
        };

        setFormData(updatedFormData);

        // Save to the new authenticated user's local cache.
        saveStudentData({
          ...getStudentData(),
          profile,
          aptitude,
          softSkills,
        });

        console.log("Placement data loaded from MongoDB successfully.");
      } catch (error) {
        console.error("MongoDB placement data fetch error:", error);

        setError(
          "Unable to load your profile. Please make sure the backend is running."
        );
      }
    };

    loadStudentDataFromMongoDB();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const predictPlacement = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const studentData = {
        CGPA: Number(formData.CGPA),
        Internships: Number(formData.Internships),
        Projects: Number(formData.Projects),

        "Workshops/Certifications": Number(
          formData.Certifications
        ),

        AptitudeTestScore: Number(
          formData.AptitudeTestScore
        ),

        SoftSkillsRating: Number(
          formData.SoftSkillsRating
        ),

        ExtracurricularActivities:
          formData.ExtracurricularActivities.toLowerCase(),

        PlacementTraining:
          formData.PlacementTraining.toLowerCase(),

        SSC_Marks: Number(formData.SSC_Marks),
        HSC_Marks: Number(formData.HSC_Marks),
      };

      const response = await fetch(
        "https://engineeros-api.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
          body: JSON.stringify(studentData),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to generate placement prediction."
        );
      }

      const data = await response.json();

      setResult(data);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect with the placement prediction service. Make sure FastAPI is running on port 8000."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="placement-page">

      {!result ? (
        <AssessmentForm
          formData={formData}
          handleChange={handleChange}
          predictPlacement={predictPlacement}
          loading={loading}
          error={error}
        />
      ) : (
        <PlacementReport
          result={result}
          onNewAssessment={() => setResult(null)}
        />
      )}

      <style>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        .placement-page {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 10% 10%,
              rgba(99, 102, 241, 0.08),
              transparent 30%
            ),
            radial-gradient(
              circle at 90% 20%,
              rgba(139, 92, 246, 0.07),
              transparent 30%
            ),
            #f7f9fc;

          padding: 40px 28px 60px;

          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          color: #111827;
        }

        /* =================================================
           FORM
        ================================================= */

        .assessment-container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .assessment-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .header-badge {
          display: inline-block;
          padding: 8px 18px;
          border-radius: 50px;
          background: #eef2ff;
          border: 1px solid #c7d2fe;
          color: #4f46e5;
          font-size: 14px;
          font-weight: 700;
        }

        .assessment-header h1 {
          margin: 18px 0 8px;
          font-size: 42px;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .assessment-header p {
          margin: 0;
          color: #64748b;
          font-size: 17px;
        }

        .form-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 34px;
          border: 1px solid #e5e7eb;
          box-shadow:
            0 15px 45px rgba(15, 23, 42, 0.06);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 22px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field label {
          font-size: 14px;
          font-weight: 700;
          color: #334155;
        }

        .field input,
        .field select {
          width: 100%;
          height: 48px;
          padding: 0 15px;
          border-radius: 12px;
          border: 1px solid #dbe1ea;
          background: #ffffff;
          color: #111827;
          font-size: 15px;
          outline: none;
        }

        .field input:focus,
        .field select:focus {
          border-color: #6366f1;
          box-shadow:
            0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .predict-button {
          width: 100%;
          margin-top: 30px;
          height: 54px;
          border: none;
          border-radius: 14px;
          background:
            linear-gradient(
              135deg,
              #4f46e5,
              #7c3aed
            );
          color: white;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .predict-button:hover {
          transform: translateY(-2px);
          box-shadow:
            0 12px 28px rgba(79, 70, 229, 0.25);
        }

        .predict-button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none;
        }

        .error-box {
          margin-top: 20px;
          padding: 14px 16px;
          border-radius: 12px;
          background: #fff1f2;
          color: #be123c;
          border: 1px solid #fecdd3;
        }

        /* =================================================
           REPORT
        ================================================= */

        .report {
          max-width: 1250px;
          margin: 0 auto;
        }

        .report-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 25px;
          margin-bottom: 30px;
        }

        .report-header-left {
          flex: 1;
        }

        .report-title {
          margin: 0;
          font-size: 48px;
          line-height: 1.1;
          font-weight: 850;
          letter-spacing: -1.8px;
          color: #0f172a;
        }

        .report-title span {
          color: #5b4ff1;
        }

        .report-subtitle {
          margin: 14px 0 0;
          color: #64748b;
          font-size: 17px;
          line-height: 1.6;
        }

        .generated-card {
          min-width: 220px;
          padding: 18px 20px;
          border-radius: 18px;
          background: #eef2ff;
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .calendar-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }

        .generated-small {
          color: #64748b;
          font-size: 13px;
          margin-bottom: 3px;
        }

        .generated-date {
          font-size: 15px;
          font-weight: 800;
          color: #111827;
        }

        /* =================================================
           TOP REPORT CARDS
        ================================================= */

        .top-report-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 25px;
          margin-bottom: 25px;
        }

        .prediction-card {
          min-height: 350px;
          border-radius: 25px;
          padding: 34px;
          background:
            linear-gradient(
              135deg,
              #f0fdf8,
              #ecfdf5
            );
          border: 1px solid #bbf7d0;
          display: flex;
          align-items: center;
          gap: 32px;
          box-shadow:
            0 12px 35px rgba(15, 23, 42, 0.04);
        }

        .donut-wrapper {
          width: 235px;
          height: 235px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .donut {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

         background:
  conic-gradient(
    var(--progress-color) var(--progress),
    #e5e7eb var(--progress)
  );

          position: relative;
        }

        .donut::after {
          content: "";
          position: absolute;
          width: 170px;
          height: 170px;
          border-radius: 50%;
          background: #f0fdf8;
        }

        .donut-content {
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .probability-number {
          font-size: 48px;
          font-weight: 850;
          color: #0f172a;
          line-height: 1;
        }

        .probability-label {
          margin-top: 10px;
          font-size: 15px;
          font-weight: 700;
          color: #334155;
          line-height: 1.35;
        }

        .prediction-info {
          border-left: 1px solid #b7e8ce;
          padding-left: 32px;
        }

        .prediction-small {
          font-size: 17px;
          color: #172554;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .prediction-main {
          font-size: 43px;
          font-weight: 850;
          color: #16a05c;
          line-height: 1.1;
          margin-bottom: 18px;
        }

        .prediction-main.unlikely {
          color: #dc2626;
        }

        .prediction-text {
          color: #475569;
          line-height: 1.65;
          font-size: 15px;
        }

        .profile-status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 18px;
          padding: 9px 15px;
          border-radius: 50px;
          background: #d1fae5;
          color: #047857;
          font-size: 14px;
          font-weight: 800;
        }

        .profile-status.red {
          background: #fee2e2;
          color: #b91c1c;
        }

        /* =================================================
           STUDENT DETAILS
        ================================================= */

        .student-details {
          min-height: 350px;
          background: #ffffff;
          border-radius: 25px;
          border: 1px solid #e5e7eb;
          padding: 28px;
          box-shadow:
            0 12px 35px rgba(15, 23, 42, 0.04);
        }

        .student-heading {
          display: flex;
          align-items: center;
          gap: 13px;
          padding-bottom: 18px;
          border-bottom: 1px solid #edf0f4;
          margin-bottom: 18px;
        }

        .student-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #ede9fe;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .student-heading h2 {
          margin: 0;
          font-size: 22px;
          font-weight: 800;
          color: #0f172a;
        }

        .student-details-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .student-row {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 15px;
          font-size: 15px;
        }

        .student-label {
          color: #64748b;
        }

        .student-value {
          color: #1e293b;
          font-weight: 650;
        }

        /* =================================================
           ELIGIBILITY
        ================================================= */

        .eligibility-section {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 24px;
          padding: 28px;
          margin-bottom: 25px;
        }

        .section-title {
          margin: 0;
          font-size: 24px;
          font-weight: 800;
          color: #0f172a;
        }

        .section-description {
          margin: 7px 0 22px;
          color: #64748b;
          font-size: 14px;
        }

        .eligibility-message {
          font-weight: 700;
          font-size: 16px;
          color: #15803d;
          margin-bottom: 20px;
        }

        .eligibility-message.failed {
          color: #b91c1c;
        }

        .eligibility-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .eligibility-item {
          background: white;
          border-radius: 17px;
          padding: 20px;
          box-shadow:
            0 5px 18px rgba(15, 23, 42, 0.05);
        }

        .eligibility-name {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 10px;
        }

        .eligibility-min {
          font-size: 16px;
          font-weight: 750;
          margin-bottom: 12px;
          color: #111827;
        }

        .eligibility-status {
          font-weight: 800;
          font-size: 14px;
        }

        .passed {
          color: #16a34a;
        }

        .not-passed {
          color: #dc2626;
        }

        .actual {
          margin-top: 8px;
          font-size: 13px;
          color: #64748b;
        }

        /* =================================================
           LOWER REPORT
        ================================================= */

        .lower-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
          margin-bottom: 22px;
        }

        .report-section {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 22px;
          overflow: hidden;
          box-shadow:
            0 8px 25px rgba(15, 23, 42, 0.045);
        }

        .section-heading {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 21px;
          border-bottom: 1px solid #edf0f4;
        }

        .strength-section {
          border-top: 4px solid #2563eb;
        }

        .strength-section .section-heading {
          background: #eff6ff;
        }

        .improve-section {
          border-top: 4px solid #f59e0b;
        }

        .improve-section .section-heading {
          background: #fffbeb;
        }

        .recommendation-section {
          border-top: 4px solid #22c55e;
        }

        .recommendation-section .section-heading {
          background: #f0fdf4;
        }

        .section-heading-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 21px;
        }

        .blue-icon {
          background: #dbeafe;
          color: #2563eb;
        }

        .orange-icon {
          background: #fef3c7;
          color: #d97706;
        }

        .green-icon {
          background: #dcfce7;
          color: #16a34a;
        }

        .section-heading-text h2 {
          margin: 0;
          font-size: 19px;
          font-weight: 800;
        }

        .section-heading-text p {
          margin: 4px 0 0;
          color: #64748b;
          font-size: 13px;
        }

        .report-list {
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .report-list-item {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          padding: 12px 13px;
          border-radius: 12px;
          background: #f8fafc;
          font-size: 14px;
          color: #334155;
          line-height: 1.5;
        }

        .check-icon {
          width: 22px;
          height: 22px;
          min-width: 22px;
          border-radius: 50%;
          background: #22c55e;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 800;
        }

        .warning-icon {
          width: 22px;
          height: 22px;
          min-width: 22px;
          border-radius: 50%;
          background: #f59e0b;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 800;
        }

        /* =================================================
           RECOMMENDED STEPS
        ================================================= */

        .recommendation-section {
          margin-bottom: 25px;
        }

        .recommendation-list {
          padding: 15px 22px 23px;
          display: flex;
          flex-direction: column;
        }

        .recommendation-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 9px 0;
        }

        .recommendation-number {
          width: 33px;
          height: 33px;
          min-width: 33px;
          border-radius: 50%;
          background: #22c55e;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 14px;
        }

        .recommendation-text {
          color: #334155;
          font-size: 14px;
          line-height: 1.5;
        }

        /* =================================================
           BUTTON
        ================================================= */

        .new-report-container {
          text-align: center;
          margin-top: 25px;
        }

        .new-report-button {
          border: 1px solid #a5b4fc;
          background: white;
          color: #4f46e5;
          border-radius: 13px;
          padding: 13px 24px;
          font-weight: 750;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
        }

        .new-report-button:hover {
          background: #eef2ff;
          transform: translateY(-1px);
        }

        /* =================================================
           RESPONSIVE
        ================================================= */

        @media (max-width: 1050px) {

          .top-report-grid {
            grid-template-columns: 1fr;
          }

          .prediction-card {
            min-height: auto;
          }

        }

        @media (max-width: 800px) {

          .placement-page {
            padding: 22px 15px 45px;
          }

          .report-header {
            flex-direction: column;
          }

          .generated-card {
            width: 100%;
          }

          .lower-grid {
            grid-template-columns: 1fr;
          }

          .eligibility-grid {
            grid-template-columns: 1fr;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 600px) {

          .report-title {
            font-size: 35px;
          }

          .prediction-card {
            flex-direction: column;
            text-align: center;
            padding: 25px 18px;
          }

          .prediction-info {
            border-left: none;
            border-top: 1px solid #b7e8ce;
            padding-left: 0;
            padding-top: 22px;
          }

          .student-row {
            grid-template-columns: 1fr;
            gap: 3px;
          }

          .donut-wrapper {
            width: 205px;
            height: 205px;
          }

          .donut {
            width: 195px;
            height: 195px;
          }

          .donut::after {
            width: 150px;
            height: 150px;
          }

          .probability-number {
            font-size: 40px;
          }

        }

      `}</style>
    </div>
  );
}


/* ============================================================
   ASSESSMENT FORM
============================================================ */

function AssessmentForm({
  formData,
  handleChange,
  predictPlacement,
  loading,
  error,
}: {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  predictPlacement: () => void;
  loading: boolean;
  error: string;
}) {
  return (
    <div className="assessment-container">

      <div className="assessment-header">

        <div className="header-badge">
          Placement Assessment
        </div>

        <h1>Placement Prediction</h1>

        <p>
          Evaluate your profile and understand your current
          placement outlook.
        </p>

      </div>

      <div className="form-card">

        <div className="form-grid">

          <Input
            label="CGPA"
            name="CGPA"
            value={formData.CGPA}
            onChange={handleChange}
            placeholder="From your profile"
            readOnly
          />

          <Input
            label="Internships"
            name="Internships"
            value={formData.Internships}
            onChange={handleChange}
            placeholder="From your profile"
            readOnly
          />

          <Input
            label="Projects"
            name="Projects"
            value={formData.Projects}
            onChange={handleChange}
            placeholder="From your profile"
            readOnly
          />

          <Input
            label="Certifications / Workshops"
            name="Certifications"
            value={formData.Certifications}
            onChange={handleChange}
            placeholder="From your profile"
            readOnly
          />

          <Input
            label="Aptitude Score"
            name="AptitudeTestScore"
            value={formData.AptitudeTestScore}
            displayValue={
              formData.AptitudeTestScore
                ? `${formData.AptitudeTestScore} / 100`
                : ""
            }
            onChange={handleChange}
            placeholder="From your assessment"
            readOnly
          />

          <Input
            label="Soft Skills Score"
            name="SoftSkillsRating"
            value={formData.SoftSkillsRating}
            displayValue={
              formData.SoftSkillsRating
                ? formatSoftSkillsOutOfFive(
                    Number(formData.SoftSkillsRating)
                  )
                : ""
            }
            onChange={handleChange}
            placeholder="From your assessment"
            readOnly
          />

          <Input
            label="SSC Marks"
            name="SSC_Marks"
            value={formData.SSC_Marks}
            onChange={handleChange}
            placeholder="From your profile"
            readOnly
          />

          <Input
            label="HSC Marks"
            name="HSC_Marks"
            value={formData.HSC_Marks}
            onChange={handleChange}
            placeholder="From your profile"
            readOnly
          />

          <SelectInput
            label="Extracurricular Activities"
            name="ExtracurricularActivities"
            value={formData.ExtracurricularActivities}
            onChange={handleChange}
          />

          <SelectInput
            label="Placement Training"
            name="PlacementTraining"
            value={formData.PlacementTraining}
            onChange={handleChange}
          />

        </div>

        <button
          className="predict-button"
          onClick={predictPlacement}
          disabled={loading}
        >
          {loading
            ? "Generating Placement Report..."
            : "Generate Placement Report"}
        </button>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

      </div>

    </div>
  );
}


/* ============================================================
   PLACEMENT REPORT
============================================================ */

function PlacementReport({
  result,
  onNewAssessment,
}: {
  result: PredictionResult;
  onNewAssessment: () => void;
}) {

  const probability =
    result.placement_probability !== null &&
    result.placement_probability !== undefined
      ? Math.round(result.placement_probability)
      : null;

  const likely =
    result.prediction === "Likely to be Placed";
    const probabilityColor =
  probability !== null && probability < 60
    ? "#dc2626"
    : probability !== null && probability < 70
    ? "#f59e0b"
    : "#20c878";

  const profile = result.profile || {};

  const criteria =
    result.minimum_eligibility_criteria || {};

  const today = new Date();

  const formattedDate =
    today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });


  /*
   * The following values are displayed only as
   * student profile information.
   * They do NOT change the ML probability.
   */

  const technicalLevel =
    (Number(profile.Projects || 0) >= 3 &&
      Number(profile["Workshops/Certifications"] || 0) >= 3)
      ? "Strong"
      : Number(profile.Projects || 0) >= 2
      ? "Good"
      : "Developing";


  return (
    <div className="report">

      {/* ==================================================
          REPORT HEADER
      ================================================== */}

      <div className="report-header">

        <div className="report-header-left">

          <h1 className="report-title">
            Placement <span>Prediction</span> Report
          </h1>

          <p className="report-subtitle">
            Your profile has been analysed using academic,
            technical and extracurricular information to
            generate your placement assessment.
          </p>

        </div>


        <div className="generated-card">

          <div className="calendar-icon">
            📅
          </div>

          <div>
            <div className="generated-small">
              Generated On
            </div>

            <div className="generated-date">
              {formattedDate}
            </div>
          </div>

        </div>

      </div>


      {/* ==================================================
          TOP SECTION
      ================================================== */}

      <div className="top-report-grid">


        {/* ================= PREDICTION ================= */}

        <div className="prediction-card">

          <div className="donut-wrapper">

            {probability !== null ? (

              <div
                className="donut"
                style={
  {
    "--progress": `${probability}%`,
    "--progress-color": probabilityColor,
  } as React.CSSProperties
}
              >

                <div className="donut-content">

                  <div className="probability-number">
                    {probability}%
                  </div>

                  <div className="probability-label">
                    Placement
                    <br />
                    Probability
                  </div>

                </div>

              </div>

            ) : (

              <div className="donut">
                <div className="donut-content">

                  <div className="probability-number">
                    —
                  </div>

                  <div className="probability-label">
                    Probability
                    <br />
                    Not Available
                  </div>

                </div>
              </div>

            )}

          </div>


          <div className="prediction-info">

            <div className="prediction-small">
              Your Placement Outlook
            </div>

            <div
              className={`prediction-main ${
                !likely ? "unlikely" : ""
              }`}
            >
              {likely
                ? "Likely to be Placed"
                : "Less Likely to be Placed"}
            </div>

            <div className="prediction-text">

              {likely
                ? "Your current profile shows a positive placement outlook. Continue building your technical skills and preparing consistently for upcoming opportunities."
                : "Your current profile has some areas that can be strengthened. Focus on the recommended actions below to build a stronger placement profile."}

            </div>


            <div
              className={`profile-status ${
                !likely ? "red" : ""
              }`}
            >

              {likely ? "✓" : "!"}

              {likely
                ? " Positive Profile"
                : " Profile Needs Improvement"}

            </div>

          </div>

        </div>


        {/* ================= STUDENT DETAILS ================= */}

        <div className="student-details">

          <div className="student-heading">

            <div className="student-icon">
              👤
            </div>

            <h2>
              Student Details
            </h2>

          </div>


          <div className="student-details-list">

            <StudentRow
              label="CGPA"
              value={
                profile.CGPA !== undefined
                  ? `${profile.CGPA} / 10`
                  : "—"
              }
            />

            <StudentRow
              label="10th Percentage"
              value={
                profile.SSC_Marks !== undefined
                  ? `${profile.SSC_Marks}%`
                  : "—"
              }
            />

            <StudentRow
              label="12th Percentage"
              value={
                profile.HSC_Marks !== undefined
                  ? `${profile.HSC_Marks}%`
                  : "—"
              }
            />

            <StudentRow
              label="Internship Experience"
              value={
                profile.Internships !== undefined
                  ? `${profile.Internships}`
                  : "—"
              }
            />

            <StudentRow
              label="Projects Completed"
              value={
                profile.Projects !== undefined
                  ? `${profile.Projects}`
                  : "—"
              }
            />

            <StudentRow
              label="Technical Profile"
              value={technicalLevel}
            />

            <StudentRow
              label="Aptitude Score"
              value={
                profile.AptitudeTestScore !== undefined
                  ? `${profile.AptitudeTestScore} / 100`
                  : "—"
              }
            />

            <StudentRow
              label="Soft Skills"
              value={formatSoftSkillsOutOfFive(
                profile.SoftSkillsRating
              )}
            />

          </div>

        </div>

      </div>


      {/* ==================================================
          ELIGIBILITY
      ================================================== */}

      <div className="eligibility-section">

        <h2 className="section-title">
          Minimum Placement Eligibility
        </h2>

        <p className="section-description">
          Your academic eligibility status based on the
          required criteria.
        </p>


        <div
          className={`eligibility-message ${
            !result.eligible ? "failed" : ""
          }`}
        >

          {result.eligible
            ? "✓ All minimum eligibility criteria are satisfied."
            : "Some minimum eligibility criteria need attention."}

        </div>


        <div className="eligibility-grid">

          <EligibilityCard
            title="CGPA"
            minimum="≥ 6.5 / 10"
            actual={
              profile.CGPA !== undefined
                ? `${profile.CGPA} / 10`
                : "—"
            }
            passed={
              criteria.CGPA?.passed ??
              Number(profile.CGPA || 0) >= 6.5
            }
          />

          <EligibilityCard
            title="SSC Marks"
            minimum="≥ 60%"
            actual={
              profile.SSC_Marks !== undefined
                ? `${profile.SSC_Marks}%`
                : "—"
            }
            passed={
              criteria.SSC_Marks?.passed ??
              Number(profile.SSC_Marks || 0) >= 60
            }
          />

          <EligibilityCard
            title="HSC Marks"
            minimum="≥ 60%"
            actual={
              profile.HSC_Marks !== undefined
                ? `${profile.HSC_Marks}%`
                : "—"
            }
            passed={
              criteria.HSC_Marks?.passed ??
              Number(profile.HSC_Marks || 0) >= 60
            }
          />

        </div>

      </div>


      {/* ==================================================
          STRENGTHS + AREAS TO IMPROVE
      ================================================== */}

      <div className="lower-grid">


        {/* ================= STRENGTHS ================= */}

        <div className="report-section strength-section">

          <div className="section-heading">

            <div className="section-heading-icon blue-icon">
              ★
            </div>

            <div className="section-heading-text">

              <h2>
                Your Strengths
              </h2>

              <p>
                Areas where you currently perform well
              </p>

            </div>

          </div>


          <div className="report-list">

            {(result.strengths?.length
              ? result.strengths
              : [
                  "Good academic performance",
                  "Strong project experience",
                  "Positive aptitude performance",
                  "Good internship exposure",
                ]
            ).map((item, index) => (

              <div
                className="report-list-item"
                key={index}
              >

                <span className="check-icon">
                  ✓
                </span>

                <span>
                  {item}
                </span>

              </div>

            ))}

          </div>

        </div>


        {/* ================= AREAS TO IMPROVE ================= */}

        <div className="report-section improve-section">

          <div className="section-heading">

            <div className="section-heading-icon orange-icon">
              🎯
            </div>

            <div className="section-heading-text">

              <h2>
                Areas to Improve
              </h2>

              <p>
                Focus on these areas to strengthen your profile
              </p>

            </div>

          </div>


          <div className="report-list">

            {(result.areas_to_improve?.length
              ? result.areas_to_improve
              : [
                  "Gain more relevant internship experience",
                  "Improve problem-solving practice",
                  "Build stronger technical projects",
                  "Increase certification exposure",
                ]
            ).map((item, index) => (

              <div
                className="report-list-item"
                key={index}
              >

                <span className="warning-icon">
                  !
                </span>

                <span>
                  {item}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* ==================================================
          RECOMMENDED NEXT STEPS
      ================================================== */}

      <div className="report-section recommendation-section">

        <div className="section-heading">

          <div className="section-heading-icon green-icon">
            💡
          </div>

          <div className="section-heading-text">

            <h2>
              Recommended Next Steps
            </h2>

            <p>
              Personalized actions to strengthen your
              placement profile
            </p>

          </div>

        </div>


        <div className="recommendation-list">

          {(result.recommended_next_steps?.length
            ? result.recommended_next_steps
            : [
                "Complete a relevant domain-specific internship.",
                "Build an additional project in your target domain.",
                "Improve communication and interview skills.",
                "Complete relevant certification courses.",
                "Practice aptitude and problem-solving regularly.",
                "Participate in hackathons and technical activities.",
              ]
          ).map((step, index) => (

            <div
              className="recommendation-item"
              key={index}
            >

              <div className="recommendation-number">
                {index + 1}
              </div>

              <div className="recommendation-text">
                {step}
              </div>

            </div>

          ))}

        </div>

      </div>


      {/* ==================================================
          NEW REPORT
      ================================================== */}

      <div className="new-report-container">

        <button
          className="new-report-button"
          onClick={onNewAssessment}
        >
          ← Generate New Report
        </button>

      </div>

    </div>
  );
}


/* ============================================================
   STUDENT ROW
============================================================ */

function StudentRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="student-row">

      <div className="student-label">
        {label}
      </div>

      <div className="student-value">
        {value}
      </div>

    </div>
  );
}


/* ============================================================
   ELIGIBILITY CARD
============================================================ */

function EligibilityCard({
  title,
  minimum,
  actual,
  passed,
}: {
  title: string;
  minimum: string;
  actual: string;
  passed: boolean;
}) {
  return (
    <div className="eligibility-item">

      <div className="eligibility-name">
        {title}
      </div>

      <div className="eligibility-min">
        Minimum: {minimum}
      </div>

      <div
        className={`eligibility-status ${
          passed ? "passed" : "not-passed"
        }`}
      >
        {passed
          ? "✓ Passed"
          : "✕ Not Met"}
      </div>

      <div className="actual">
        Your value: {actual}
      </div>

    </div>
  );
}


/* ============================================================
   INPUT
============================================================ */

function Input({
  label,
  name,
  value,
  displayValue,
  onChange,
  placeholder,
  readOnly = false,
}: {
  label: string;
  name: string;
  value: string;
  displayValue?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  placeholder: string;
  readOnly?: boolean;
}) {
  return (
    <div className="field">

      <label>
        {label}
      </label>

      <input
        type={displayValue !== undefined ? "text" : "number"}
        name={name}
        value={displayValue ?? value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
      />

    </div>
  );
}


/* ============================================================
   SELECT
============================================================ */

function SelectInput({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}) {
  return (
    <div className="field">

      <label>
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
      >

        <option value="yes">
          Yes
        </option>

        <option value="no">
          No
        </option>

      </select>

    </div>
  );
}