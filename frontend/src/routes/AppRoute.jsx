// src/routes/AppRoute.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Navbar from "../components/Navbar";
import NotFound from "../pages/NotFound";
import Footer from "../components/Footer";
import UnderDevelopment from "../pages/UnderDevelopment";
import Unauthorized from "../pages/Unauthorized";
import About from "../pages/About";
import AdminDashboard from "../pages/AdminDashboard";
import Terms from "../pages/Terms";
import UserDashboard from "../pages/UserDashboard";
import ScrollToTop from "../components/ScrollToTop";
import RequireAuth from "./RequireAuth";
import ChangePassword from "../pages/ChangePassword";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import VerifyEmail from "../pages/VerifyEmail";
import VerifyEmailPending from "../pages/VerifyEmailPending";

const AppRoutes = () => {
  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <ScrollToTop />
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Content */}
      <main
        style={{
          flex: "1 0 auto",
          paddingTop: "64px", // height of AppBar (default MUI AppBar height)
          paddingBottom: "68px", // space for footer
          background: "linear-gradient(135deg, #1a2a44, #0d1b2a, #10302E)",
        }}
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/verify-email-pending" element={<VerifyEmailPending />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset/:token" element={<ResetPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />

          {/* Private Routes */}
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["user"]} />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>

          {/* Under Development */}
          <Route path="/underDevelopment" element={<UnderDevelopment />} />

          {/* Unauthorized */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Catch All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Fixed Footer */}
      <Footer />
    </Router>
  );
};

export default AppRoutes;
