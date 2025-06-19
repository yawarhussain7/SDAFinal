import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Bookings from "./Bookings";
import Customers from "./Customers";
import Settings from "./Settings";
import Company from "./Company";
import RoomAdd from "./DisplayHotel";
import CompanyAdd from "./AddCompany";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

const SIDEBAR_ITEMS = [
  { key: "add-company", label: "Add Hotel", icon: "bi-building" },
  { key: "customers", label: "Hotel Verification", icon: "bi-buildings" },
  { key: "company", label: "Hotel ", icon: "bi-buildings" },
  { key: "add-room", label: "Add Room", icon: "bi-door-open" },

  { key: "bookings", label: "Bookings", icon: "bi-calendar" },

  { key: "settings", label: "Settings", icon: "bi-gear" },
];

export default function DashboardLayout() {
  const [active, setActive] = useState("add-company");
  const navigate = useNavigate();
  const [cookies, , removeCookies] = useCookies(["token", "user"]);
  const [data, setData] = useState({});

  useEffect(() => {
    const user = cookies.user;
    const token = cookies.token;

    if (!token || !user) {
      navigate("/login");
    } else {
      setData(user);
    }
  }, [cookies, navigate]);

  const handleLogout = () => {
    removeCookies("token", { path: "/" });
    removeCookies("user", { path: "/" });

    // Clear user data from state
    setData({});

    // Redirect to login page
    navigate("/login", { replace: true });

    // After navigating, ensure back button doesn't work
    window.history.replaceState(null, "", "/login");
    window.onpopstate = () => {
      window.history.go(1); // Prevent going back
    };
  };

  function renderContent() {
    switch (active) {
      case "customers":
        return <Customers />;
      case "bookings":
        return <Bookings />;
      case "company":
        return <Company />;

      case "add-company":
        return <CompanyAdd />;
      case "add-room":
        return <RoomAdd />;
      case "settings":
        return <Settings />;
      default:
        return null;
    }
  }

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
      <main className="dashboard-main">{renderContent()}</main>
    </div>
  );
}
