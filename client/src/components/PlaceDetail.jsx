import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./placeDetail.css";

export default function PlaceDetail() {
  const place = useSelector((state) => state.place.placeDetail);
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!place?.id) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <h3 className="text-muted mb-4">No place selected</h3>
          <button
            className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold"
            onClick={() => navigate("/places")}>
            <i className="bi bi-arrow-left me-2"></i>
            Back to Places
          </button>
        </div>
      </div>
    );
  }

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
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <div className="bg-light min-vh-100">
        {/* Hero Section */}
        <section
          className={`hero-section position-relative ${
            isLoaded ? "fade-in" : ""
          }`}
          style={{
            backgroundImage: `url(${place.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "80vh",
          }}>
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>
          <div className="container position-relative d-flex align-items-center h-100">
            <div className="text-white">
              <button
                className="btn glassmorphism text-white mb-4 rounded-pill px-4 py-2"
                onClick={() => navigate("/places")}>
                <i className="bi bi-arrow-left me-2"></i>
                Back to Places
              </button>
              <h1 className="display-2 fw-bold mb-3">{place.name}</h1>
              <div className="d-flex align-items-center gap-3 mb-4">
                <span className="badge bg-primary bg-opacity-75 px-3 py-2 rounded-pill">
                  <i className="bi bi-geo-alt me-1"></i>
                  {place.region}
                </span>
                <span className="badge bg-dark bg-opacity-75 px-3 py-2 rounded-pill">
                  <i className="bi bi-star-fill text-warning me-1"></i>
                  {place.rating} ({place.reviews} reviews)
                </span>
              </div>
              <p
                className="lead fs-4"
                style={{ maxWidth: "600px", opacity: 0.9 }}>
                {place.desc}
              </p>
            </div>
          </div>
        </section>

        {/* Detail Section */}
        <section className="py-5 bg-white">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-8">
                <h2 className="display-5 fw-bold text-primary mb-4 section-title">
                  About {place.name}
                </h2>
                <p className="text-muted fs-5 mb-4" style={{ lineHeight: 1.8 }}>
                  {place.desc} Experience the unique blend of history, culture,
                  and natural beauty that makes {place.name} a must-visit
                  destination. Whether you're seeking adventure or tranquility,
                  this iconic location offers something for every traveler.
                </p>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="card border-0 shadow h-100 p-4">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <i
                          className={`bi bi-speedometer2 fs-3 text-${
                            place.difficulty.toLowerCase() === "easy"
                              ? "success"
                              : place.difficulty.toLowerCase() === "moderate"
                              ? "warning"
                              : "danger"
                          }`}></i>
                        <h5 className="fw-bold mb-0">Difficulty</h5>
                      </div>
                      <p className="text-muted">{place.difficulty}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card border-0 shadow h-100 p-4">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <i className="bi bi-calendar3 fs-3 text-success"></i>
                        <h5 className="fw-bold mb-0">Best Time to Visit</h5>
                      </div>
                      <p className="text-muted">{place.bestTime}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div
                  className="card border-0 shadow p-4 sticky-top"
                  style={{ top: "20px" }}>
                  <h4 className="fw-bold mb-4">Trip Details</h4>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Price</span>
                    <span className="fw-bold fs-4 text-success">
                      {place.price}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Rating</span>
                    <span className="fw-bold">
                      <i className="bi bi-star-fill text-warning me-1"></i>
                      {place.rating}/5
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <span className="text-muted">Reviews</span>
                    <span className="fw-bold">{place.reviews}</span>
                  </div>
                  <button
                    className="btn btn-gradient btn-lg w-100 rounded-pill py-3 fw-bold"
                    onClick={() => navigate("/booking")}>
                    <i className="bi bi-compass me-2"></i>
                    Book This Trip
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section
          className="py-5 position-relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            minHeight: "300px",
          }}>
          <div
            className="position-absolute w-100 h-100"
            style={{
              background:
                'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M50 50c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10zm-20-20c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              opacity: 0.3,
            }}></div>
          <div className="container text-center position-relative text-white">
            <h2 className="display-4 fw-bold mb-4">
              Ready to Explore {place.name}?
            </h2>
            <p className="lead mb-5 fs-5" style={{ opacity: 0.9 }}>
              Book your adventure today and immerse yourself in the wonders of{" "}
              {place.region}.
            </p>
            <div className="d-flex gap-4 justify-content-center flex-wrap">
              <button
                className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-bold shadow-lg"
                onClick={() => navigate("/booking")}>
                <i className="bi bi-compass me-2"></i>
                Book Now
              </button>
              <button
                className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill fw-semibold"
                onClick={() => navigate("/contact")}>
                <i className="bi bi-telephone me-2"></i>
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
