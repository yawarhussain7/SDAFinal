import React from "react";
import "./settings.css";

export default function Settings() {
  return (
    <div>
      <h1 style={{ marginBottom: "24px" }}>Settings</h1>
      <form className="settings-form">
        <div className="settings-row">
          <div className="settings-col">
            <label>Name</label>
            <input type="text" placeholder="Admin Name" />
          </div>
          <div className="settings-col">
            <label>Email</label>
            <input type="email" placeholder="admin@email.com" />
          </div>
        </div>
        <div className="settings-row">
          <div className="settings-col">
            <label>Password</label>
            <input type="password" placeholder="New Password" />
          </div>
          <div className="settings-col">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm Password" />
          </div>
        </div>
        <div className="settings-actions">
          <button type="submit" className="settings-save-btn">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
