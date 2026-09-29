import ScrollToTop from "./components/landing/ScrollToTop";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import CareerExplorer from "./pages/Careers/CareerExplorer";
import Dashboard from "./pages/Dashboard";
import DomainInterestTest from "./pages/DomainInterestTest/DomainInterestTest";
import Progress from "./pages/Progress/Progress";
import AITutor from "./pages/AITutor/AITutor";

import CareerRoadmap from "./pages/CareerRoadmap/CareerRoadmap";
import Aptitude from "./pages/Aptitude/Aptitude";
import SoftSkills from "./pages/SoftSkills/SoftSkills";

import Placement from "./pages/Placement";

import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>

    <ScrollToTop />
      <Routes>

        {/* LANDING */}
        <Route
          path="/"
          element={<Landing />}
        />

        {/* LOGIN / SIGN UP */}
        <Route
          path="/auth"
          element={<Auth />}
        />

        {/* CAREER & DOMAIN EXPLORER
            Full screen — NO sidebar */}
        <Route
          path="/careers"
          element={<CareerExplorer standalone />}
        />

        {/* DOMAIN INTEREST TEST
            It has its OWN sidebar */}
        <Route
          path="/domain-test"
          element={<DomainInterestTest />}
        />

        {/* ENGINEEROS PAGES
            MainLayout provides the sidebar */}
        <Route element={<MainLayout />}>

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route path="/ai-tutor" element={<AITutor />} />

          <Route path="/progress" element={<Progress />} />

          {/* PROFILE */}
          <Route
            path="/profile"
            element={<Profile />}
          />

          {/* CAREER ROADMAP */}
          <Route
            path="/roadmap"
            element={<CareerRoadmap />}
          />

          {/* APTITUDE */}
          <Route
            path="/aptitude"
            element={<Aptitude />}
          />

          {/* SOFT SKILLS */}
          <Route
            path="/soft-skills"
            element={<SoftSkills />}
          />

          {/* PLACEMENT */}
          <Route
            path="/placement"
            element={<Placement />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;