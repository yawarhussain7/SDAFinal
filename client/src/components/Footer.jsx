import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-main">
        <div className="footer-col brand">
          <h2 className="footer-logo-text">Travelars</h2>
          <p className="footer-desc">
            Discover Pakistan's breathtaking beauty and rich cultural heritage with Travelars, your trusted companion for memorable journeys.
          </p>
          <div className="footer-socials">
            <a href="#"><i className="bi bi-facebook"></i></a>
            <a href="#"><i className="bi bi-instagram"></i></a>
            <a href="#"><i className="bi bi-twitter"></i></a>
          </div>
        </div>
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Hotels</a></li>
            <li><a href="#">Tourist Places</a></li>
            <li><a href="#">Tour Packages</a></li>
            <li><a href="#">Blogs</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Information</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Become a Partner</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Contact Us</h3>
          <ul className="footer-contact">
            <li><i className="bi bi-geo-alt"></i> Blue Area, Islamabad, Pakistan 44000</li>
            <li><i className="bi bi-telephone"></i> +92 312 1234567</li>
            <li><i className="bi bi-envelope"></i> info@travelars.pk</li>
          </ul>
          <div className="footer-newsletter">
            <strong>Subscribe to Newsletter</strong>
            <form>
              <input type="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Travelars. All rights reserved.
      </div>
    </footer>
  );
} 