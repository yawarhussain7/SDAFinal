import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    role: "Customer",
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:2000/api/user/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("Registration successful! Start your journey!", {
        position: "top-right",
        autoClose: 3000,
      });
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        role: "Customer",
      });
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message || "Registration failed. Try again.";
      toast.error(msg, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      {/* Bootstrap CSS */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <section
        className={`login-section min-vh-100 ${isLoaded ? "fade-in" : ""}`}
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}>
        <div className="container h-100 d-flex justify-content-center align-items-center">
          <div
            className="card glassmorphism text-black p-4 p-md-5"
            style={{ borderRadius: "20px", maxWidth: "900px" }}>
            <div className="row align-items-center">
              <div className="col-lg-6 order-2 order-lg-1">
                <h1 className="text-center fw-bold mb-4 section-title">
                  Sign Up
                </h1>
                <form onSubmit={handleSubmit} className="px-3">
                  {/* Name */}
                  <div className="mb-4">
                    <div className="form-floating">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Full Name"
                        aria-label="Full Name"
                      />
                      <label htmlFor="name">Full Name</label>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <div className="form-floating">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Email"
                        aria-label="Email"
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <div className="form-floating">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Password"
                        aria-label="Password"
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-4">
                    <div className="form-floating">
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className="form-control"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Confirm Password"
                        aria-label="Confirm Password"
                      />
                      <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="mb-4">
                    <label className="form-label fw-medium d-block">
                      Gender
                    </label>
                    <div className="d-flex gap-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="genderMale"
                          value="Male"
                          checked={formData.gender === "Male"}
                          onChange={handleChange}
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="genderMale">
                          Male
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="genderFemale"
                          value="Female"
                          checked={formData.gender === "Female"}
                          onChange={handleChange}
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="genderFemale">
                          Female
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="mb-4">
                    <label className="form-label fw-medium d-block">Role</label>
                    <div className="d-flex flex-wrap gap-3">
                      {["Customer", "Admin", "TourManager", "HotelManager"].map(
                        (role) => (
                          <div className="form-check" key={role}>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="role"
                              id={`role${role}`}
                              value={role}
                              checked={formData.role === role}
                              onChange={handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`role${role}`}>
                              {role.replace(/([A-Z])/g, " $1").trim()}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid mb-4">
                    <button
                      type="submit"
                      className="btn btn-gradient btn-lg rounded-pill py-2 fw-bold">
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Sign Up
                    </button>
                  </div>

                  {/* Sign In Link */}
                  <div className="text-center mb-3">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary fw-medium">
                      Sign In
                    </Link>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="text-center mb-3">
                    <p className="text-muted mb-2">Or continue with</p>
                    <div className="d-flex justify-content-center gap-3">
                      <button type="button" className="social-login-btn">
                        <svg
                          className="social-svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.02.68-2.33 1.09-3.71 1.09-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4.01 20.65 7.58 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.58 1 4.01 3.35 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                      </button>
                      <button type="button" className="social-login-btn">
                        <svg
                          className="social-svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z"
                            fill="#b07d3c"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-6 d-none d-lg-flex order-1 order-lg-2">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop"
                  className="img-fluid rounded-3"
                  alt="Travel Destination"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS to match Login page */}
      <style jsx>{`
        .login-section {
          position: relative;
          overflow: hidden;
          background-attachment: fixed;
        }
        .login-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 32, 39, 0.5);
          z-index: 1;
        }
        .container {
          position: relative;
          z-index: 2;
        }
        .glassmorphism {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        .section-title {
          position: relative;
          display: inline-block;
          color: #2b6777;
        }
        .section-title::after {
          content: "";
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: linear-gradient(135deg, #b07d3c, #a0522d);
          border-radius: 2px;
        }
        .form-control {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 0.75rem;
          transition: all 0.3s ease;
        }
        .form-control:focus {
          border-color: #b07d3c;
          box-shadow: 0 0 0 0.2rem rgba(176, 125, 60, 0.25);
        }
        .form-floating > label {
          color: #6c757d;
          transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
        }
        .form-floating > .form-control:focus ~ label,
        .form-floating > .form-control:not(:placeholder-shown) ~ label {
          color: #b07d3c;
        }
        .btn-gradient {
          background: linear-gradient(135deg, #b07d3c, #a0522d);
          border: none;
          transition: all 0.3s ease;
        }
        .btn-gradient:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(176, 125, 60, 0.3);
        }
        .text-primary {
          color: #b07d3c !important;
          transition: color 0.3s;
        }
        .text-primary:hover {
          color: #a0522d !important;
        }
        .social-login-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        .social-login-btn:hover {
          background: #b07d3c;
          transform: scale(1.1);
        }
        .social-login-btn:hover .social-svg path {
          fill: #fffbe9;
        }
        .social-svg {
          width: 20px;
          height: 20px;
        }
        .fade-in {
          animation: fadeIn 1s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 991px) {
          .login-section {
            padding: 2rem 0;
          }
          .card {
            padding: 2rem !important;
          }
        }
        .form-check-input:checked {
          background-color: #b07d3c;
          border-color: #b07d3c;
        }
        .form-check-label {
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Signup;
