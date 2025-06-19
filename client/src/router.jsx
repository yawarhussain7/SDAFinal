import React from "react";
import { Routes, Route, useLocation } from "react-router";
import Home from "./pages/Home";
import HotelPage from "./pages/HotelPage";
import PackagePage from "./pages/PackagePage";
import PlacePage from "./pages/PlacePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PlaceDetail from "./components/PlaceDetail.jsx";
import HotelDetail from "./components/HotelDetail.jsx";
import PackageDetail from "./components/PackageDetail.jsx";
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
        <Route path="/hotels" element={<HotelPage />} />
        <Route path="/packages" element={<PackagePage />} />
        <Route path="/places" element={<PlacePage />} />
        <Route path="/" element={<Home />} />
        <Route path="/place-detail" element={<PlaceDetail />} />
        <Route path="/hotel/:hotelId" element={<HotelDetail />} />
        <Route path="/package/:id" element={<PackageDetail />} />
      </Routes>
      {!hideNavFooter && <Footer />}
    </div>
  );
};

export default Router;
