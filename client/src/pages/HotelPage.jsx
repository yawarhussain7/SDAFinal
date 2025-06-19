import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHotelDetail, setRoomList } from "../redux/hotelSlice.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

// Inline styles (unchanged)
const styles = {
  hotelPage: {
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    minHeight: "100vh",
    paddingTop: "3rem",
    fontFamily: "'Inter', sans-serif",
  },
  heroSection: {
    background:
      "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)",
    padding: "120px 0 80px",
    position: "relative",
    overflow: "hidden",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
  },
  heroTitle: {
    fontSize: "3.5rem",
    fontWeight: 800,
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "1.5rem",
    lineHeight: 1.2,
  },
  heroSubtitle: {
    color: "#e9ecef",
    fontSize: "1.25rem",
    fontWeight: 400,
    marginBottom: "3rem",
    opacity: 0.9,
  },
  filterContainer: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "20px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    padding: "2rem",
  },
  filterLabel: {
    color: "#ffffff",
    fontWeight: 600,
    marginBottom: "0.5rem",
  },
  filterInput: {
    background: "rgba(255, 255, 255, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "12px",
    color: "#ffffff",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease",
  },
  filterButton: {
    borderRadius: "12px",
    fontWeight: 600,
    padding: "12px 30px",
    transition: "all 0.3s ease",
  },
  hotelCard: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    transition: "all 0.4s ease",
    border: "none",
  },
  hotelImage: {
    height: "250px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    overflow: "hidden",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(45deg, rgba(0,0,0,0.1) 0%, transparent 100%)",
  },
  ratingBadge: {
    position: "absolute",
    top: "15px",
    left: "15px",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: "25px",
    padding: "8px 15px",
    fontSize: "0.9rem",
    fontWeight: 600,
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    zIndex: 2,
  },
  priceTag: {
    fontSize: "1.5rem",
    fontWeight: 800,
    background: "linear-gradient(135deg, #f28b82 0%, #cf6679 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  amenityItem: {
    fontSize: "0.9rem",
    color: "#6c757d",
    marginBottom: "5px",
  },
  ctaSection: {
    background:
      "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)",
    padding: "80px 0",
    position: "relative",
    overflow: "hidden",
  },
  ctaTitle: {
    fontSize: "2.5rem",
    fontWeight: 800,
    color: "#ffffff",
    marginBottom: "1rem",
  },
  ctaSubtitle: {
    color: "#e9ecef",
    fontSize: "1.25rem",
    fontWeight: 400,
    marginBottom: "3rem",
    opacity: 0.9,
  },
  responsiveHeroTitle: {
    fontSize: "2.5rem",
  },
  responsiveHeroSubtitle: {
    fontSize: "1rem",
  },
  responsiveHotelImage: {
    height: "200px",
  },
};

// Note: Wrap this component in an ErrorBoundary in the parent component (e.g., App.jsx) to handle rendering errors gracefully.
// Example ErrorBoundary:
// class ErrorBoundary extends React.Component {
//   state = { hasError: false };
//   static getDerivedStateFromError(error) { return { hasError: true }; }
//   componentDidCatch(error, errorInfo) { console.error("Error caught:", error, errorInfo); }
//   render() {
//     if (this.state.hasError) {
//       return <div style={{ textAlign: "center", padding: "5rem 0", color: "#dc3545" }}>
//         Something went wrong. Please try again later.
//       </div>;
//     }
//     return this.props.children;
//   }
// }

export default function HotelPage() {
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // Added loading state
  const hotelsPerPage = 9;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Fetch hotels with pagination
  const fetchAllHotelPackages = async (page = 1) => {
    setLoading(true); // Set loading to true before fetching
    const controller = new AbortController();
    try {
      const response = await axios.get(
        `http://localhost:2000/api/get/allhotel?skip=${
          (page - 1) * hotelsPerPage
        }&limit=${hotelsPerPage}`,
        { signal: controller.signal }
      );
      console.log("API Response:", response.data); // Debug log
      setHotels(
        Array.isArray(response.data.hotels) ? response.data.hotels : []
      );
      setTotalPages(Math.ceil((response.data.total || 0) / hotelsPerPage));
    } catch (e) {
      if (e.name !== "AbortError") {
        console.error("Error fetching hotels:", e);
        setHotels([]); // Fallback to empty array on error
      }
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
    return () => controller.abort();
  };

  // Fetch hotel details and rooms
  const fetchHotelDetail = async (hotelId) => {
    try {
      const response = await axios.get(
        `http://localhost:2000/api/get/hoteldetail/${hotelId}`
      );
      dispatch(setHotelDetail(response.data.hotel || {}));
      dispatch(
        setRoomList(
          Array.isArray(response.data.rooms) ? response.data.rooms : []
        )
      );
      navigate(`/hotel/${hotelId}`);
    } catch (err) {
      console.error("Error fetching hotel details:", err);
    }
  };

  useEffect(() => {
    fetchAllHotelPackages(currentPage);
  }, [currentPage]);

  // State for filters
  const [filters, setFilters] = useState({
    location: "",
    price: 1000,
    rating: "",
    sort: "price-low-high",
  });

  // Inject styles for pseudo-elements and hover effects
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .hero-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: radial-gradient(circle at 20% 80%, rgba(242, 139, 130, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(207, 102, 121, 0.3) 0%, transparent 50%);
        pointer-events: none;
      }
      .cta-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: radial-gradient(circle at 70% 30%, rgba(242, 139, 130, 0.2) 0%, transparent 50%);
        pointer-events: none;
      }
      .filter-input::placeholder {
        color: rgba(255, 255, 255, 0.7) !important;
      }
      .filter-input:focus {
        background: rgba(255, 255, 255, 0.2) !important;
        border-color: #f28b82 !important;
        box-shadow: 0 0 0 0.2rem rgba(242, 139, 130, 0.25) !important;
        color: white !important;
      }
      .btn-gradient-primary {
        background: linear-gradient(135deg, #f28b82 0%, #cf6679 100%);
        border: none;
        border-radius: 12px;
        font-weight: 600;
        padding: 12px 30px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(242, 139, 130, 0.3);
        color: white;
      }
      .btn-gradient-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(242, 139, 130, 0.4);
        color: white;
      }
      .btn-glass {
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        border-radius: 12px;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
      }
      .btn-glass:hover {
        background: rgba(255, 255, 255, 0.25);
        color: white;
      }
      .package-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      }
      .sort-select {
        border-radius: 12px;
        border: 2px solid #e9ecef;
        padding: 10px 15px;
        font-weight: 500;
        transition: all 0.3s ease;
        background: white;
      }
      .sort-select:focus {
        border-color: #f28b82;
        box-shadow: 0 0 0 0.2rem rgba(242, 139, 130, 0.25);
      }
    `;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle filter submission
  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before fetching
    const controller = new AbortController();
    try {
      const response = await axios.get(
        `http://localhost:2000/api/get/allhotel?skip=0&limit=${hotelsPerPage}&location=${filters.location}&price=${filters.price}&rating=${filters.rating}&sort=${filters.sort}`,
        { signal: controller.signal }
      );
      setHotels(
        Array.isArray(response.data.hotels) ? response.data.hotels : []
      );
      setTotalPages(Math.ceil((response.data.total || 0) / hotelsPerPage));
      setCurrentPage(1);
    } catch (e) {
      if (e.name !== "AbortError") {
        console.error("Error applying filters:", e);
        setHotels([]);
      }
    } finally {
      setLoading(false);
    }
    return () => controller.abort();
  };

  // Handle clear filters
  const handleClear = () => {
    setFilters({
      location: "",
      price: 1000,
      rating: "",
      sort: "price-low-high",
    });
    fetchAllHotelPackages(1);
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "5rem 0", color: "#6c757d" }}>
        Loading hotels...
      </div>
    );
  }

  return (
    <div style={styles.hotelPage}>
      {/* Hero Section */}
      <section className="hero-section" style={styles.heroSection}>
        <div className="container hero-content" style={styles.heroContent}>
          <div className="row justify-content-center text-center">
            <div className="col-lg-10">
              <h1
                className="hero-title"
                style={{
                  ...styles.heroTitle,
                  ...(isMobile ? styles.responsiveHeroTitle : {}),
                }}>
                Discover Your Perfect Stay in Pakistan
              </h1>
              <p
                className="hero-subtitle"
                style={{
                  ...styles.heroSubtitle,
                  ...(isMobile ? styles.responsiveHeroSubtitle : {}),
                }}>
                Explore luxurious hotels, serene resorts, and charming
                guesthouses across Pakistan's breathtaking destinations.
              </p>
              <form
                onSubmit={handleFilterSubmit}
                className="glass-card p-4 p-md-5"
                style={styles.filterContainer}>
                <div className="row g-4 mb-4">
                  <div className="col-md-4">
                    <label
                      className="form-label fw-semibold"
                      style={styles.filterLabel}>
                      Location
                    </label>
                    <div className="position-relative">
                      <i
                        className="bi bi-geo-alt position-absolute"
                        style={{
                          left: "15px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "rgba(255,255,255,0.7)",
                        }}></i>
                      <input
                        type="text"
                        name="location"
                        className="form-control filter-input ps-5"
                        placeholder="All Locations"
                        value={filters.location}
                        onChange={handleFilterChange}
                        style={styles.filterInput}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label
                      className="form-label fw-semibold"
                      style={styles.filterLabel}>
                      Price Range ($)
                    </label>
                    <input
                      type="range"
                      name="price"
                      min="0"
                      max="1000"
                      className="form-range mb-2"
                      value={filters.price}
                      onChange={handleFilterChange}
                      style={{ accentColor: "#f28b82" }}
                    />
                    <div className="d-flex justify-content-between">
                      <span style={{ color: "#e9ecef", fontSize: "0.9rem" }}>
                        $0
                      </span>
                      <span style={{ color: "#e9ecef", fontSize: "0.9rem" }}>
                        ${filters.price}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label
                      className="form-label fw-semibold"
                      style={styles.filterLabel}>
                      Minimum Rating
                    </label>
                    <select
                      name="rating"
                      className="form-control filter-input"
                      value={filters.rating}
                      onChange={handleFilterChange}
                      style={styles.filterInput}>
                      <option value="">Any Rating</option>
                      <option value="4">4+</option>
                      <option value="4.5">4.5+</option>
                      <option value="4.8">4.8+</option>
                    </select>
                  </div>
                </div>
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-gradient-primary"
                    style={styles.filterButton}>
                    <i className="bi bi-search me-2"></i>
                    Apply Filters
                  </button>
                  <button
                    type="button"
                    className="btn btn-glass"
                    onClick={handleClear}
                    style={styles.filterButton}>
                    Clear Filters
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="main-section" style={{ padding: "80px 0" }}>
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-md-8">
              <h2
                className="section-title"
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  color: "#212529",
                }}>
                {hotels.length} Hotels Found
              </h2>
              <p style={{ color: "#6c757d", fontSize: "1.25rem" }}>
                Discover your perfect stay
              </p>
            </div>
            <div className="col-md-4">
              <div className="d-flex align-items-center">
                <i
                  className="bi bi-funnel me-2"
                  style={{ color: "#6c757d" }}></i>
                <select
                  name="sort"
                  className="form-select sort-select"
                  value={filters.sort}
                  onChange={handleFilterChange}>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating-high-low">Rating: High to Low</option>
                  <option value="rating-low-high">Rating: Low to High</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row g-4 mb-5">
            {Array.isArray(hotels) && hotels.length > 0 ? (
              hotels.map((hotel, index) => (
                <div className="col-lg-4 col-md-6" key={hotel._id || index}>
                  <div
                    className="card package-card h-100"
                    style={styles.hotelCard}>
                    <div
                      style={{
                        ...styles.hotelImage,
                        backgroundImage: `url(${hotel.image})`,
                        ...(isMobile ? styles.responsiveHotelImage : {}),
                      }}>
                      <div style={styles.imageOverlay}></div>
                      <div style={styles.ratingBadge}>
                        <i className="bi bi-star-fill text-warning me-1"></i>
                        <span>{hotel.rating}</span>
                        <i className="bi bi-people-fill text-muted ms-2 me-1"></i>
                        <span>{hotel.guests}</span>
                      </div>
                    </div>
                    <div className="card-body p-4 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <span
                          style={{
                            background:
                              "linear-gradient(135deg, #f28b82 20%, #cf6679 20%)",
                            color: "#f28b82",
                            padding: "6px 15px",
                            borderRadius: "20px",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                          }}>
                          Hotel
                        </span>
                        <div className="text-end">
                          <div style={styles.priceTag}>${hotel.price}</div>
                          <small style={{ color: "#6c757d" }}>per night</small>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <i
                          className="bi bi-geo-alt-fill"
                          style={{ color: "#f28b82" }}></i>
                        <span
                          style={{ marginLeft: "0.5rem", fontWeight: "600" }}>
                          {hotel.location}
                        </span>
                      </div>
                      <div className="mb-4 flex-grow">
                        {Array.isArray(hotel.amenities) &&
                          hotel.amenities.map((item, j) => (
                            <div key={j} style={styles.amenityItem}>
                              <i
                                className={
                                  item === "Free WiFi"
                                    ? "bi bi-wifi"
                                    : item === "Pool"
                                    ? "bi bi-water"
                                    : item === "Spa"
                                    ? "bi bi-droplet"
                                    : item === "Mountain Views"
                                    ? "bi bi-image"
                                    : item === "Restaurant"
                                    ? "bi bi-egg-fried"
                                    : item === "Heating"
                                    ? "bi bi-thermometer"
                                    : "bi bi-check-circle-fill"
                                }
                                style={{
                                  color: "#f28b82",
                                  marginRight: "8px",
                                }}></i>
                              {item}
                            </div>
                          ))}
                      </div>
                      <button
                        className="btn btn-gradient-primary mt-auto"
                        onClick={() => fetchHotelDetail(hotel._id)}>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "5rem 0",
                  color: "#6c757d",
                }}>
                No hotels available for the selected filters.
              </div>
            )}
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <nav>
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}>
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages).keys()].map((page) => (
                    <li
                      className={`page-item ${
                        currentPage === page + 1 ? "active" : ""
                      }`}
                      key={page}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(page + 1)}>
                        {page + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section" style={styles.ctaSection}>
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-9">
              <h2
                className="display-5 fw-bold"
                style={{
                  ...styles.ctaTitle,
                  ...(isMobile ? styles.responsiveHeroTitle : {}),
                }}>
                Can't Find Your Perfect Stay?
              </h2>
              <p
                className="lead"
                style={{
                  ...styles.ctaSubtitle,
                  ...(isMobile ? styles.responsiveHeroSubtitle : {}),
                }}>
                Contact our travel experts to customize your dream accommodation
                experience.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <button
                  className="btn btn-gradient-primary btn-lg"
                  style={styles.filterButton}>
                  Contact Us
                  <i className="bi bi-arrow-right ms-2"></i>
                </button>
                <button
                  className="btn btn-glass btn-lg"
                  style={styles.filterButton}>
                  View All Hotels
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
