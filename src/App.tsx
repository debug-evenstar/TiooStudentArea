import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginScreen from "./pages/Auth/Login";
import ForgetPasswordScreen from "./pages/Auth/ForgetPass";
import DashboardHomePage from "./pages/Dashboard/Home";
import ResetPasswordScreen from "./pages/Auth/ResetPass";
import SignupScreen from "./pages/Auth/Signup";
import SubjectDetails from "./pages/Dashboard/SubjectDetails";
import VerifyEmailScreen from "./pages/Auth/VerifyEmail";
import CompleteSignupScreen from "./pages/Auth/CompleteSigup";
import ScrollToTop from "./utils/scrollTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* auth routes */}
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<SignupScreen />} />
        <Route path="/forget" element={<ForgetPasswordScreen />} />
        <Route path="/reset" element={<ResetPasswordScreen />} />
        <Route path="/verify-email" element={<VerifyEmailScreen />} />
        <Route path="/complete-signup" element={<CompleteSignupScreen />} />
        {/* dasboard routes */}
        <Route path="/home" element={<DashboardHomePage />} />
        <Route path="/home/subjects/:id" element={<SubjectDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
