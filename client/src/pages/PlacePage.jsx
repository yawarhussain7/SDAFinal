import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPlace } from "../redux/placeSlice";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const places = [
  {
    id: 1,
    image: "/images/hunza.jpg",
    region: "Gilgit-Baltistan",
    name: "Hunza Valley",
    desc: "A mountainous valley known for its breathtaking landscapes and rich cultural heritage.",
    rating: 4.9,
    reviews: 1250,
    difficulty: "Easy",
    bestTime: "Apr-Oct",
  },
  {
    id: 2,
    image: "/images/swat.jpg",
    region: "Khyber Pakhtunkhwa",
    name: "Swat Valley",
    desc: 'Known as the "Switzerland of the East" for its snow-capped mountains and lush green meadows.',
    rating: 4.8,
    reviews: 980,
    difficulty: "Moderate",
    bestTime: "May-Sep",
  },
  {
    id: 3,
    image: "/images/lahorefort.jpg",
    region: "Lahore, Punjab",
    name: "Lahore Fort",
    desc: "A historic fortress and UNESCO World Heritage site representing the rich Mughal heritage.",
    rating: 4.7,
    reviews: 2100,
    difficulty: "Easy",
    bestTime: "Nov-Mar",
  },
  {
    id: 4,
    image: "/images/mohenjo.jpg",
    region: "Sindh",
    name: "Mohenjo-daro",
    desc: "One of the world's earliest major urban settlements, dating back to the Indus Valley Civilization.",
    rating: 4.6,
    reviews: 750,
    difficulty: "Easy",
    bestTime: "Nov-Feb",
  },
  {
    id: 5,
    image: "/images/fairymeadows.jpg",
    region: "Gilgit-Baltistan",
    name: "Fairy Meadows",
    desc: "A lush green plateau at the base of Nanga Parbat, offering spectacular views of the mountain.",
    rating: 4.9,
    reviews: 650,
    difficulty: "Hard",
    bestTime: "Jun-Sep",
  },
  {
    id: 6,
    image: "/images/badshahi.jpg",
    region: "Lahore, Punjab",
    name: "Badshahi Mosque",
    desc: "One of the largest mosques in the world, showcasing magnificent Mughal architecture.",
    rating: 4.8,
    reviews: 1800,
    difficulty: "Easy",
    bestTime: "Oct-Mar",
  },
];

const activities = [
  {
    image: "/images/trekking.jpg",
    name: "Trekking & Hiking",
    icon: "bi-boots",
    description: "Explore mountain trails and scenic routes",
  },
  {
    image: "/images/culture.jpg",
    name: "Cultural Tours",
    icon: "bi-building",
    description: "Discover rich history and traditions",
  },
  {
    image: "/images/wildlife.jpg",
    name: "Wildlife Safaris",
    icon: "bi-binoculars",
    description: "Experience diverse flora and fauna",
  },
  {
    image: "/images/mountain.jpg",
    name: "Mountain Climbing",
    icon: "bi-mountain",
    description: "Challenge yourself with peak adventures",
  },
];

const stats = [
  { number: "50+", label: "Destinations", icon: "bi-geo-alt" },
  { number: "10K+", label: "Happy Travelers", icon: "bi-people" },
  { number: "15+", label: "Years Experience", icon: "bi-award" },
  { number: "24/7", label: "Support", icon: "bi-headset" },
];

export default function PlacePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleExplore = (place) => {
    dispatch(setPlace(place));
    navigate("/place-detail");
  };

  const handleBrowsePackages = () => {
    navigate("/packages");
  };

  const handleContact = () => {
    navigate("/contact");
  };

  const regions = [
    "All",
    "Gilgit-Baltistan",
    "Khyber Pakhtunkhwa",
    "Lahore, Punjab",
    "Sindh",
  ];

  const filteredPlaces =
    filter === "All"
      ? places
      : places.filter((place) => place.region === filter);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "success";
      case "Moderate":
        return "warning";
      case "Hard":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Hero Section */}
      <section
        className="position-relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0d2a2e 0%, #21747b 50%, #2c6777 100%)",
          minHeight: "70vh",
        }}>
        <div
          className="position-absolute w-100 h-100"
          style={{
            background:
              'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3,
          }}></div>

        <div className="container position-relative h-100 d-flex align-items-center">
          <div className="row w-100 align-items-center">
            <div className="col-lg-8 text-white">
              <div className="mb-4">
                <span className="badge bg-light text-primary fs-6 px-3 py-2 rounded-pill mb-3">
                  <i className="bi bi-geo-alt-fill me-2"></i>
                  Explore Pakistan
                </span>
              </div>

              <h1 className="display-3 fw-bold mb-4 text-white">
                Discover the Beauty of
                <span className="text-warning d-block">Pakistan</span>
              </h1>

              <p
                className="lead mb-5 text-white-50"
                style={{ fontSize: "1.3rem" }}>
                Explore stunning landscapes, rich cultural heritage, and
                unforgettable experiences across Pakistan's most beautiful
                destinations.
              </p>

              {/* Stats Row */}
              <div className="row g-4 mb-5">
                {stats.map((stat, index) => (
                  <div key={index} className="col-6 col-md-3">
                    <div className="text-center">
                      <div className="text-warning mb-2">
                        <i className={`${stat.icon} fs-3`}></i>
                      </div>
                      <h3 className="fw-bold text-white mb-1">{stat.number}</h3>
                      <small className="text-white-50">{stat.label}</small>
                    </div>
                  </div>
                ))}
              </div>

              <div className="d-flex gap-3 flex-wrap">
                <button
                  className="btn btn-warning btn-lg px-4 py-3 rounded-pill fw-semibold"
                  onClick={handleBrowsePackages}>
                  <i className="bi bi-search me-2"></i>
                  Explore Destinations
                </button>
                <button className="btn btn-outline-light btn-lg px-4 py-3 rounded-pill">
                  <i className="bi bi-play-fill me-2"></i>
                  Watch Video
                </button>
              </div>
            </div>

            <div className="col-lg-4 d-none d-lg-block">
              <div className="text-center">
                <div className="position-relative d-inline-block">
                  <div
                    className="bg-white bg-opacity-10 rounded-circle p-5"
                    style={{ width: "300px", height: "300px" }}>
                    <div className="bg-white bg-opacity-20 rounded-circle p-4 h-100 d-flex align-items-center justify-content-center">
                      <i
                        className="bi bi-geo-alt text-warning"
                        style={{ fontSize: "6rem" }}></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-4 bg-white shadow-sm">
        <div className="container">
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {regions.map((region) => (
              <button
                key={region}
                className={`btn ${
                  filter === region ? "btn-primary" : "btn-outline-primary"
                } rounded-pill px-4`}
                onClick={() => setFilter(region)}>
                {region}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Places Grid Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-primary mb-3">
              Featured Destinations
            </h2>
            <p className="lead text-muted">
              Discover Pakistan's most stunning locations
            </p>
          </div>

          <div className="row g-4">
            {filteredPlaces.map((place, index) => (
              <div key={place.id} className="col-lg-4 col-md-6">
                <div
                  className={`card border-0 h-100 shadow-sm ${
                    hoveredCard === index ? "shadow-lg" : ""
                  }`}
                  style={{
                    transition: "all 0.3s ease",
                    transform:
                      hoveredCard === index
                        ? "translateY(-10px)"
                        : "translateY(0)",
                  }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}>
                  <div className="position-relative overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="card-img-top"
                      style={{
                        height: "250px",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                    />

                    {/* Overlay badges */}
                    <div className="position-absolute top-0 start-0 m-3">
                      <span
                        className={`badge bg-${getDifficultyColor(
                          place.difficulty
                        )} rounded-pill px-3 py-2`}>
                        {place.difficulty}
                      </span>
                    </div>

                    <div className="position-absolute top-0 end-0 m-3">
                      <span className="badge bg-white text-dark rounded-pill px-3 py-2">
                        <i className="bi bi-star-fill text-warning me-1"></i>
                        {place.rating}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <div
                      className={`position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center ${
                        hoveredCard === index ? "d-flex" : "d-none"
                      }`}
                      style={{ background: "rgba(0,0,0,0.7)" }}>
                      <button
                        className="btn btn-warning btn-lg rounded-pill px-4"
                        onClick={() => handleExplore(place)}>
                        <i className="bi bi-eye me-2"></i>
                        Explore More
                      </button>
                    </div>
                  </div>

                  <div className="card-body d-flex flex-column">
                    <div className="mb-2">
                      <small className="text-primary fw-semibold">
                        <i className="bi bi-geo-alt me-1"></i>
                        {place.region}
                      </small>
                    </div>

                    <h5 className="card-title fw-bold text-dark mb-2">
                      {place.name}
                    </h5>
                    <p className="card-text text-muted flex-grow-1">
                      {place.desc}
                    </p>

                    <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                      <div className="d-flex align-items-center gap-3">
                        <small className="text-muted">
                          <i className="bi bi-calendar3 me-1"></i>
                          {place.bestTime}
                        </small>
                        <small className="text-muted">
                          <i className="bi bi-chat-dots me-1"></i>
                          {place.reviews} reviews
                        </small>
                      </div>

                      <button
                        className="btn btn-outline-primary btn-sm rounded-pill px-3"
                        onClick={() => handleExplore(place)}>
                        <i className="bi bi-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Activities Section */}
      <section className="py-5 bg-primary bg-opacity-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-primary mb-3">
              Popular Activities
            </h2>
            <p className="lead text-muted">
              Experience the best of Pakistan with these adventures
            </p>
          </div>

          <div className="row g-4">
            {activities.map((activity, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <div
                  className="card border-0 text-center h-100 shadow-sm hover-card"
                  style={{
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}>
                  <div className="card-body p-4">
                    <div className="mb-4">
                      <div
                        className="bg-primary bg-opacity-10 rounded-circle mx-auto d-flex align-items-center justify-content-center"
                        style={{ width: "80px", height: "80px" }}>
                        <i className={`${activity.icon} text-primary fs-2`}></i>
                      </div>
                    </div>

                    <h5 className="card-title fw-bold text-dark mb-3">
                      {activity.name}
                    </h5>
                    <p className="card-text text-muted">
                      {activity.description}
                    </p>

                    <button className="btn btn-outline-primary btn-sm rounded-pill mt-3">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-4">
                Ready to Explore Pakistan?
              </h2>
              <p className="lead mb-5 text-white-50">
                Book your adventure today and discover the beauty and culture of
                Pakistan with our expert guides and carefully crafted tour
                packages.
              </p>

              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <button
                  className="btn btn-warning btn-lg px-5 py-3 rounded-pill fw-semibold"
                  onClick={handleBrowsePackages}>
                  <i className="bi bi-compass me-2"></i>
                  Browse Tour Packages
                </button>
                <button
                  className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill"
                  onClick={handleContact}>
                  <i className="bi bi-telephone me-2"></i>
                  Contact Us
                </button>
              </div>

              {/* Trust indicators */}
              <div className="row mt-5 pt-4 border-top border-white border-opacity-25">
                <div className="col-md-4">
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <i className="bi bi-shield-check text-warning fs-4"></i>
                    <span className="fw-semibold">100% Safe</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <i className="bi bi-award text-warning fs-4"></i>
                    <span className="fw-semibold">Award Winning</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <i className="bi bi-headset text-warning fs-4"></i>
                    <span className="fw-semibold">24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional CSS for hover effects */}
      <style jsx>{`
        .hover-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }

        .card-img-top:hover {
          transform: scale(1.05);
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .hero-icon {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
