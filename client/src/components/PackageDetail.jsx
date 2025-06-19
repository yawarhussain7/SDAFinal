import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function PackageDetail() {
  const navigate = useNavigate();
  const { packageDetail } = useSelector((state) => state.package);

  if (!packageDetail || Object.keys(packageDetail).length === 0) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center  bg-light">
        <div className="text-center">
          <div className="mb-4">
            <i
              className="bi bi-exclamation-triangle text-warning"
              style={{ fontSize: "4rem" }}></i>
          </div>
          <h3 className="text-muted">No Package Details Found</h3>
          <p className="text-secondary">
            The requested package information is not available.
          </p>
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/packages")}>
            <i className="bi bi-arrow-left me-2"></i>
            Back to Packages
          </button>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    // Add booking logic here
    console.log("Booking package:", packageDetail.id);
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Back Button Section - Below existing navbar */}
      <div className="bg-white py-3 shadow-sm">
        <div className="container">
          <button
            className="btn btn-outline-primary d-flex align-items-center gap-2"
            onClick={() => navigate("/packages")}>
            <i className="bi bi-arrow-left"></i>
            Back to Packages
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5">
        <div className="row g-5">
          {/* Image Section */}
          <div className="col-lg-7">
            <div className="position-relative">
              <img
                src={`http://localhost:2000/${packageDetail.image?.replace(
                  "\\",
                  "/"
                )}`}
                alt={packageDetail.packageType || "Tour Package"}
                className="img-fluid rounded-4 shadow-lg w-100"
                style={{
                  height: "500px",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.02)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              />

              {/* Overlay Badge */}
              <div className="position-absolute top-0 start-0 m-3">
                <span className="badge bg-primary fs-6 px-3 py-2 rounded-pill shadow">
                  <i className="bi bi-star-fill me-1"></i>
                  Premium Package
                </span>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="col-lg-5">
            <div className="h-100 d-flex flex-column">
              {/* Company Badge */}
              <div className="mb-3">
                <span className="badge bg-success fs-6 px-3 py-2 rounded-pill">
                  <i className="bi bi-building me-2"></i>
                  {packageDetail.companyName || "Premium Tours"}
                </span>
              </div>

              {/* Title */}
              <h1 className="display-4 fw-bold text-primary mb-4">
                {packageDetail.packageType} Tour
              </h1>

              {/* Meta Information */}
              <div className="row g-3 mb-4">
                <div className="col-sm-6">
                  <div className="d-flex align-items-center text-muted">
                    <i className="bi bi-geo-alt-fill text-primary me-2 fs-5"></i>
                    <div>
                      <small className="d-block text-muted">Destination</small>
                      <span className="fw-semibold text-dark">
                        {packageDetail.destination}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="d-flex align-items-center text-muted">
                    <i className="bi bi-calendar-event-fill text-primary me-2 fs-5"></i>
                    <div>
                      <small className="d-block text-muted">Duration</small>
                      <span className="fw-semibold text-dark">
                        {packageDetail.duration || "5 Days"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4 flex-grow-1">
                <h5 className="text-secondary mb-3">Package Description</h5>
                <p className="text-muted lh-lg">
                  {packageDetail.description ||
                    "Experience an unforgettable journey with our carefully curated tour package."}
                </p>
              </div>

              {/* Features */}
              <div className="mb-4">
                <h6 className="text-secondary mb-3">Package Includes</h6>
                <div className="row g-2">
                  <div className="col-6">
                    <small className="d-flex align-items-center text-success">
                      <i className="bi bi-check-circle-fill me-2"></i>
                      Accommodation
                    </small>
                  </div>
                  <div className="col-6">
                    <small className="d-flex align-items-center text-success">
                      <i className="bi bi-check-circle-fill me-2"></i>
                      Transportation
                    </small>
                  </div>
                  <div className="col-6">
                    <small className="d-flex align-items-center text-success">
                      <i className="bi bi-check-circle-fill me-2"></i>
                      Meals
                    </small>
                  </div>
                  <div className="col-6">
                    <small className="d-flex align-items-center text-success">
                      <i className="bi bi-check-circle-fill me-2"></i>
                      Tour Guide
                    </small>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              {/* Pricing and Booking */}
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div>
                  <small className="text-muted d-block">Price per person</small>
                  <h2 className="text-primary fw-bold mb-0">
                    Rs. {packageDetail.price?.toLocaleString() || "0"}
                  </h2>
                  <small className="text-success">
                    <i className="bi bi-shield-check me-1"></i>
                    Best Price Guaranteed
                  </small>
                </div>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-primary btn-lg"
                    onClick={() => console.log("Add to wishlist")}>
                    <i className="bi bi-heart"></i>
                  </button>
                  <button
                    className="btn btn-primary btn-lg px-4"
                    onClick={handleBooking}>
                    <i className="bi bi-calendar-check me-2"></i>
                    Book Now
                  </button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-4 pt-3 border-top">
                <div className="row g-3 text-center">
                  <div className="col-4">
                    <div className="text-warning">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <small className="text-muted">5.0 Rating</small>
                  </div>
                  <div className="col-4">
                    <div className="text-primary">
                      <i className="bi bi-people-fill fs-5"></i>
                    </div>
                    <small className="text-muted">1000+ Travelers</small>
                  </div>
                  <div className="col-4">
                    <div className="text-success">
                      <i className="bi bi-award-fill fs-5"></i>
                    </div>
                    <small className="text-muted">Certified</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="row g-4">
                  <div className="col-md-3 text-center">
                    <div className="text-primary mb-2">
                      <i className="bi bi-clock-fill fs-1"></i>
                    </div>
                    <h6 className="fw-semibold">Flexible Timing</h6>
                    <small className="text-muted">
                      Choose your preferred schedule
                    </small>
                  </div>
                  <div className="col-md-3 text-center">
                    <div className="text-success mb-2">
                      <i className="bi bi-shield-check-fill fs-1"></i>
                    </div>
                    <h6 className="fw-semibold">Safe & Secure</h6>
                    <small className="text-muted">100% secure booking</small>
                  </div>
                  <div className="col-md-3 text-center">
                    <div className="text-info mb-2">
                      <i className="bi bi-headset fs-1"></i>
                    </div>
                    <h6 className="fw-semibold">24/7 Support</h6>
                    <small className="text-muted">Always here to help</small>
                  </div>
                  <div className="col-md-3 text-center">
                    <div className="text-warning mb-2">
                      <i className="bi bi-arrow-clockwise fs-1"></i>
                    </div>
                    <h6 className="fw-semibold">Easy Cancellation</h6>
                    <small className="text-muted">
                      Cancel anytime before 24hrs
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
