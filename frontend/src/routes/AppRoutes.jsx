import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import OfferLetter from "../pages/OfferLetter";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AIScreening from "../pages/AIScreening";
import Jobs from "../pages/Jobs";
import MyApplications from "../pages/MyApplications";
import ResumeDashboard from "../pages/ResumeDashboard";
import RecommendedJobs from "../pages/RecommendedJobs";
import CandidateDashboard from "../pages/CandidateDashboard";
import ScheduleInterview from "../pages/ScheduleInterview";
import RecruiterDashboard from "../pages/RecruiterDashboard";
import CreateJob from "../pages/CreateJob";
import MyJobs from "../pages/MyJobs";
import MockInterview from "../pages/MockInterview";
import EditJob from "../pages/EditJob";
import JobApplicants from "../pages/JobApplicants";
import AIRanking from "../pages/AIRanking";
import Analytics from "../pages/Analytics";
import InterviewKit from "../pages/InterviewKit";
import MyInterviews from "../pages/MyInterviews";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
<Route
  path="/offer-letter/:id"
  element={
    <ProtectedRoute>
      <RoleRoute role="recruiter">
        <OfferLetter />
      </RoleRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/mock-interview"
  element={
    <ProtectedRoute>
      <MockInterview />
    </ProtectedRoute>
  }
/>
<Route
  path="/schedule-interview"
  element={
    <ProtectedRoute>
      <RoleRoute role="recruiter">
        <ScheduleInterview />
      </RoleRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/my-interviews"
  element={
    <ProtectedRoute>
      <MyInterviews />
    </ProtectedRoute>
  }
/>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* CANDIDATE ROUTES */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute role="candidate">
              <CandidateDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume"
        element={
          <ProtectedRoute>
            <RoleRoute role="candidate">
              <ResumeDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-applications"
        element={
          <ProtectedRoute>
            <RoleRoute role="candidate">
              <MyApplications />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/recommended-jobs"
        element={
          <ProtectedRoute>
            <RoleRoute role="candidate">
              <RecommendedJobs />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* RECRUITER ROUTES */}

      <Route
        path="/recruiter-dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute role="recruiter">
              <RecruiterDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />
<Route
  path="/ai-screening"
  element={
    <ProtectedRoute>
      <RoleRoute role="recruiter">
        <AIScreening />
      </RoleRoute>
    </ProtectedRoute>
  }
/>
      <Route
        path="/create-job"
        element={
          <ProtectedRoute>
            <RoleRoute role="recruiter">
              <CreateJob />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-jobs"
        element={
          <ProtectedRoute>
            <RoleRoute role="recruiter">
              <MyJobs />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-job/:id"
        element={
          <ProtectedRoute>
            <RoleRoute role="recruiter">
              <EditJob />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/job-applicants/:id"
        element={
          <ProtectedRoute>
            <RoleRoute role="recruiter">
              <JobApplicants />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/ai-ranking/:id"
        element={
          <ProtectedRoute>
            <RoleRoute role="recruiter">
              <AIRanking />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <RoleRoute role="recruiter">
              <Analytics />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/interview-kit/:id"
        element={
          <ProtectedRoute>
            <RoleRoute role="recruiter">
              <InterviewKit />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}