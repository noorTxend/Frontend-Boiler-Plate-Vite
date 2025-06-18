import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./styles/index.css";
import Signin from "./layouts/pages/LoginPage";
import ProtectedRoute from "./protectedRoutes/ProtectedRoutes";
import Step1 from "./layouts/registration/steps/Step1";
import Step2 from "./layouts/registration/steps/Step2";
import Step3 from "./layouts/registration/steps/Step3";
import useFetchProfile from "./services/userProfile";
import PlanParticipantDashboard from "./layouts/pages/dashboards/PlanParticipantDashboard";
import ReminderDashboard from "./layouts/pages/RemindersDashboard";
import AdministratorsDashboard from "./layouts/pages/AdministratorsDashboard";
import SponsorDashboard from "./layouts/pages/SponsorsDashboard";
import Dashboard from "./layouts/pages/dashboards/Dashboard";
import PlanAdministratorDashboard from "./layouts/pages/dashboards/PlanAdministratorDashboard";
import PlanSponsorDashboard from "./layouts/pages/dashboards/PlanSponsorDashboard";
import ParticipantsDashboard from "./layouts/pages/ParticipantsDashboard";
import ForgotPasswordPage from "./layouts/pages/ForgotPasswordPage";
import ConfirmOtp from "./layouts/pages/ConfirmOtp";
import ResetPasswordPage from "./layouts/pages/ResetPasswordPage";
import UploadedDocuments from "./layouts/pages/UploadedDocuments";

const App = () => {
  const location = useLocation();
  const shouldFetchProfile = ![
    "/sign-in",
    "/forgot-password",
    "/confirm-otp",
    "/reset-password",
    "/start-rollover",
    "/tpa-create-account",
    "/ps-create-account",
    "/ps-confirmation",
    "/pa-setup-user",
  ].includes(location.pathname);
  //  console.log("hello world ");
  const data = shouldFetchProfile ? useFetchProfile() : null;
  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/confirm-otp" element={<ConfirmOtp />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/administrator/:id"
            element={<PlanAdministratorDashboard data={data} />}
          />
          <Route
            path="/sponsor/:id"
            element={<PlanSponsorDashboard data={data} />}
          />
          <Route
            path="/participant/:id"
            element={<PlanParticipantDashboard data={data} />}
          />
          <Route
            path="/reminders"
            element={<ReminderDashboard data={data} />}
          />
          <Route
            path="/administrators"
            element={<AdministratorsDashboard data={data} />}
          />
          <Route path="/sponsors" element={<SponsorDashboard data={data} />} />
          <Route
            path="/participants"
            element={<ParticipantsDashboard data={data} />}
          />
          <Route
            path="/documents"
            element={<UploadedDocuments data={data} />}
          />
        </Route>

        <Route path="/start-rollover" element={<Step1 />} />
        <Route path="/tpa-create-account" element={<Step2 />} />
        <Route path="/ps-create-account" element={<Step2 />} />
        <Route path="/pa-create-account" element={<Step2 />} />
        <Route path="/ps-confirmation" element={<Step3 />} />
        <Route path="/pa-setup-user" element={<Step3 />} />
      </Routes>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default App;
