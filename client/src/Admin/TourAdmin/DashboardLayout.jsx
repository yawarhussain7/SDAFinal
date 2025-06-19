import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import "./dashboard.css";

import TourPackages from "./TourPackage";
import Customers from "./Customers.jsx";
import Destinations from "./Destinations";
import Bookings from "./Bookings.jsx";
import Settings from "./Settings";
import Company from "./Company.jsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SIDEBAR_ITEMS = [
  { key: "tour-packages", label: "Tour Packages", icon: "bi-box" },
  { key: "customers", label: "Company Verification", icon: "bi-people" },
  { key: "destinations", label: "Destinations", icon: "bi-map" },
  { key: "bookings", label: "Bookings", icon: "bi-calendar" },
  { key: "settings", label: "Settings", icon: "bi-gear" },
  { key: "company", label: "Company", icon: "bi-building" },
];

const bookingData = [
  { week: "Week 1", bookings: 30 },
  { week: "Week 2", bookings: 45 },
  { week: "Week 3", bookings: 28 },
  { week: "Week 4", bookings: 55 },
];

export default function DashboardLayout() {
  const [active, setActive] = useState("tour-packages");
  const [cookies, , removeCookie] = useCookies(["token", "user"]);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const user = cookies.user;
    setData(user);

    if (!cookies.token || !user) {
      navigate("/login");
      return;
    }

    if (user.role !== "TourManager") {
      navigate("/unauthorized");
    }
  }, [cookies, navigate]);

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    removeCookie("user", { path: "/" });

    setData({});
    navigate("/login", { replace: true });

    window.history.replaceState(null, "", "/login");
    window.onpopstate = () => {
      window.history.go(1);
    };
  };

  const renderContent = () => {
    switch (active) {
      case "tour-packages":
        return <TourPackages />;
      case "customers":
        return <Customers />;
      case "destinations":
        return <Destinations />;
      case "bookings":
        return <Bookings />;
      case "settings":
        return <Settings />;
      case "company":
        return <Company />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-root">
      <aside className="dashboard-sidebar">
        <div className="dashboard-profile-photo">
          <img src={data.profilePhoto} alt="Profile" />
        </div>
        <h2 className="dashboard-title">{data.name}</h2>
        <nav>
          <ul>
            {SIDEBAR_ITEMS.map((item) => (
              <li
                key={item.key}
                className={active === item.key ? "active" : ""}
                onClick={() => setActive(item.key)}>
                <i className={`bi ${item.icon}`}></i> {item.label}
              </li>
            ))}
          </ul>
        </nav>
        <button className="dashboard-logout-btn" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i> Logout
        </button>
      </aside>

      <main className="dashboard-main">
        {active === "tour-packages" && (
          <>
            <div className="dashboard-overview">
              <div className="overview-card blue">
                <i className="bi bi-building"></i>
                <div>
                  <h4>Company Name</h4>
                  <p>{data.companyName || "Freely Go North"}</p>
                </div>
              </div>
              <div className="overview-card green">
                <i className="bi bi-person-check"></i>
                <div>
                  <h4>Total Users</h4>
                  <p>132</p>
                </div>
              </div>
              <div className="overview-card orange">
                <i className="bi bi-bookmark-check"></i>
                <div>
                  <h4>Total Bookings</h4>
                  <p>85</p>
                </div>
              </div>
              <div className="overview-card purple">
                <i className="bi bi-graph-up-arrow"></i>
                <div>
                  <h4>Weekly Booking Rate</h4>
                  <p>+12%</p>
                </div>
              </div>
            </div>

            <div className="dashboard-chart">
              <h3>Weekly Bookings Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bookingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#0d6efd" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {renderContent()}
      </main>
    </div>
  );
}
