import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Navbar from "../components/Navbar";
import NotFound from "../pages/NotFound";
import Footer from "../components/Footer";
import UnderDevelopment from "../pages/UnderDevelopment";
import RequireAuth from "./RequireAuth";
import Unauthorized from "../pages/Unauthorized";
import About from "../pages/About";
import AdminDashboard from "../pages/AdminDashboard";
import Terms from "../pages/Terms";
import UserDashboard from "../pages/UserDashboard";
import ScrollToTop from "../components/ScrollToTop";

const AppRoutes = () => {
  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <ScrollToTop/>
      <Navbar />
      <main className=" h-full w-full">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />

          {/* Private Routes */}
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["user"]} />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
          </Route>

          {/* Under Development */}
          <Route path="/underDevelopment" element={<UnderDevelopment />} />

          {/* Unauthorized */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Catch All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
