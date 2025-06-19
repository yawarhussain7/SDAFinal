import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./navbar.css";

function MobileNavbar({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="mobile-navbar-overlay"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}>
          <button className="mobile-navbar-close" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
          <nav className="mobile-navbar-menu">
            <Link to="/" onClick={onClose} className="nav-link">
              Home
            </Link>
            <Link to="/places" onClick={onClose} className="nav-link">
              Places
            </Link>
            <Link to="/hotels" onClick={onClose} className="nav-link">
              Hotels
            </Link>
            <Link to="/blogs" onClick={onClose} className="nav-link">
              Blogs
            </Link>
            <Link to="/packages" onClick={onClose} className="nav-link">
              Packages
            </Link>
            <Link to="/contact" onClick={onClose} className="nav-link">
              Contact Us
            </Link>
            <div className="mobile-navbar-socials">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Facebook">
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
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Twitter">
                <svg
                  className="social-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                    fill="#ffe9c7"
                  />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Instagram">
                <svg
                  className="social-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16 2H8a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V8a6 6 0 0 0-6-6zm-4 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm5.5-11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                    fill="#a0522d"
                  />
                </svg>
              </a>
              <Link
                to="/login"
                className="login-icon"
                title="Sign In"
                onClick={onClose}>
                <svg
                  className="login-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    fill="#b07d3c"
                  />
                </svg>
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

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

      <nav className="navbar navbar-expand-lg fixed-top navbar-transparent shadow-sm">
        <div className="container-fluid px-3">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img
              src="/logo.png"
              alt="Travelars Logo"
              style={{ height: "32px", width: "32px", objectFit: "contain" }}
            />
            <span
              className="fw-bold text-white"
              style={{ fontSize: "1.25rem", letterSpacing: "0.5px" }}>
              Travelars
            </span>
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen(true)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/places">
                  Places
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/hotels">
                  Hotels
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/blogs">
                  Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/packages">
                  Packages
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Facebook">
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
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Twitter">
                <svg
                  className="social-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                    fill="#ffe9c7"
                  />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Instagram">
                <svg
                  className="social-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16 2H8a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V8a6 6 0 0 0-6-6zm-4 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm5.5-11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                    fill="#a0522d"
                  />
                </svg>
              </a>
              <Link to="/login" className="login-icon" title="Sign In">
                <svg
                  className="login-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    fill="#b07d3c"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <MobileNavbar open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
