import React from "react";
import { Routes, Route, useLocation } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import HotelPage from "./pages/HotelPage";
import PackagePage from "./pages/PackagePage";
import PlacePage from "./pages/PlacePage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PlaceDetail from "./components/PlaceDetail.jsx";
import HotelDetail from "./components/HotelDetail.jsx";
import TourAdmin from "./Admin/TourAdmin/DashboardLayout.jsx";
import HotelAdmin from "./Admin/HotelAdmin/DashboardLayout.jsx";
import Dashboard from "./Admin/Admin/Dashboard.jsx";
import PackageDetail from "./components/PackageDetail.jsx";
import RoomList from "./Admin/HotelAdmin/RoomList.jsx";
const Router = () => {
  const location = useLocation();
  // Hide navbar/footer on login and signup
  const hideNavFooter = [
    "/login",
    "/signup",
    "/tour-admin",
    "/hotel-admin",
    "/admin",
  ].includes(location.pathname);
  return (
    <div>
      {!hideNavFooter && <Navbar />}
      <Routes>
        <Route path="/room" element={<RoomList />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hotels" element={<HotelPage />} />
        <Route path="/packages" element={<PackagePage />} />
        <Route path="/places" element={<PlacePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/place-detail" element={<PlaceDetail />} />
        <Route path="/hotel/:hotelId" element={<HotelDetail />} />
        <Route path="/package/:id" element={<PackageDetail />} />
        {/* dashboard here */}
        <Route path="/tour-admin" element={<TourAdmin />} />
        <Route path="/hotel-admin" element={<HotelAdmin />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
      {!hideNavFooter && <Footer />}
    </div>
  );
};

export default Router;
