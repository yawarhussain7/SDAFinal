import React, { useState } from "react";
import "./settings.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Settings() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password && form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const updatedField = {};
    if (form.name) updatedField.name = form.name;
    if (form.email) updatedField.email = form.email;
    if (form.password) updatedField.password = form.password;

    try {
      const response = await axios.patch(
        "http://localhost:2000/api/user/update",
        updatedField,
        {
          withCredentials: true,
        }
      );

      toast.success("User updated successfully!");
      console.log(response.data);
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "24px" }}>Settings</h1>
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="settings-row">
          <div className="settings-col">
            <label>Name</label>
            <input
              type="text"
              placeholder="Admin Name"
              value={form.name}
              onChange={handleChange}
              name="name"
            />
          </div>
          <div className="settings-col">
            <label>Email</label>
            <input
              type="email"
              placeholder="admin@email.com"
              value={form.email}
              onChange={handleChange}
              name="email"
            />
          </div>
        </div>
        <div className="settings-row">
          <div className="settings-col">
            <label>Password</label>
            <input
              type="password"
              placeholder="New Password"
              value={form.password}
              onChange={handleChange}
              name="password"
            />
          </div>
          <div className="settings-col">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
            />
          </div>
        </div>
        <div className="settings-actions">
          <button type="submit" className="settings-save-btn">
            Save Changes
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
