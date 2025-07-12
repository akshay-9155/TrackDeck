import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import RoomList from "../pages/RoomList";
import Chat from "../pages/Chat";
import Navbar from "../components/Navbar";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Footer from "../components/Footer";
import RoomSeekerDetails from "../pages/RoomSeekerDetails";
import ListRoom from "../pages/listRoom";
import UnderDevelopment from "../pages/UnderDevelopment";
import RequireAuth from "./RequireAuth";
import Unauthorized from "../pages/Unauthorized";
import About from "../pages/About";
import PrivacyPolicy from "../pages/Terms";
import PreferredRoommates from "../pages/PreferredRoommates";

const AppRoutes = () => {
  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <Navbar />
      <main className=" h-full w-full">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<PrivacyPolicy />} />

          {/* Private Routes */}
          <Route element={<RequireAuth allowedRoles={["seeker"]} />}>
            <Route path="/preferredRoommates" element={<PreferredRoommates />} />
            <Route path="/roomseekerdetails" element={<RoomSeekerDetails />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["owner"]} />}>
            <Route path="/listRoom" element={<ListRoom />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["owner", "seeker"]} />}>
            <Route path="/rooms" element={<RoomList />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
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
