import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import "./login.css";

const Login = () => {
  const [cookies, setCookie] = useCookies(["token", "user"]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    try {
      const response = await axios.post(
        "http://localhost:2000/api/user/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response) {
        toast.success("Login successful", {
          position: "top-right",
          autoClose: 3000,
        });
      }

      const { token, user } = response.data;
      setCookie("token", token, { path: "/" });
      setCookie("user", user, { path: "/" });

      // Role-based redirection
      switch (user.role) {
        case "TourManager":
          navigate("/tour-admin");
          break;
        case "HotelManager":
          navigate("/hotel-admin");
          break;
        case "Admin":
          navigate("/admin");
          break;
        case "Customer":
          navigate("/");
          break;
        default:
          navigate("/");
      }

      setFormData({ email: "", password: "" });
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Login failed! Please check your credentials.", {
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

      <ToastContainer position="top-right" autoClose={3000} />
      <section
        className={`login-section min-vh-100 ${isLoaded ? "fade-in" : ""}`}
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="container h-100 d-flex justify-content-center align-items-center">
          <div
            className="card glassmorphism text-black p-4 p-md-5"
            style={{ borderRadius: "20px", maxWidth: "900px" }}>
            <div className="row align-items-center">
              <div className="col-lg-6 order-2 order-lg-1">
                <h1 className="text-center fw-bold mb-4 section-title">
                  Sign In
                </h1>
                <form onSubmit={handleSubmit} className="px-3">
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
                  <div className="d-grid mb-4">
                    <button
                      type="submit"
                      className="btn btn-gradient btn-lg rounded-pill py-2 fw-bold">
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Sign In
                    </button>
                  </div>
                  <div className="text-center mb-3">
                    <Link
                      to="/forgot-password"
                      className="text-primary fw-medium">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="text-center mb-4">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary fw-medium">
                      Sign Up
                    </Link>
                  </div>
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
    </>
  );
};

export default Login;
