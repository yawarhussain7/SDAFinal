import React, { useEffect, useState } from "react";
import axios from "axios";
import "./packagePage.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPackageDetail } from "../redux/packageSlice";

export default function PackagePage() {
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [companyNames, setCompanyNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const packagesPerPage = 9;
  const [sortOption, setSortOption] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    destination: "",
    priceRange: 10000,
    company: "",
  });

  // Fetch companies
  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:2000/api/get/company", {
        withCredentials: true,
      });
      setCompanyNames(res.data.data || []);
    } catch (err) {
      setError("Failed to fetch companies. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch packages
  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:2000/api/package/get");
      setPackages(response.data.packages || []);
    } catch (error) {
      setError("Failed to fetch packages. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
    fetchPackages();
  }, []);

  // Handle filter changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Handle filter submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:2000/api/packages/filter",
        filters,
        { withCredentials: true }
      );
      if (response.data.success) {
        setPackages(response.data.filteredPackages || []);
        setCurrentPage(1);
      }
    } catch (error) {
      setError("Failed to apply filters. Please try again.");
      console.error("Filter error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Clear filters
  const handleClear = async () => {
    setFilters({
      destination: "",
      priceRange: 10000,
      company: "",
    });
    setSelectedCompany("");
    await fetchPackages();
  };

  // Handle sort change
  const handleSortChange = async (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:2000/api/packages/sort",
        { sortOption: selectedOption },
        { withCredentials: true }
      );
      if (response.data.success) {
        setPackages(response.data.sortedPackages || []);
        setCurrentPage(1);
      }
    } catch (error) {
      setError("Failed to sort packages. Please try again.");
      console.error("Sort error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Navigate to package details
  const handleDetail = (p) => {
    dispatch(setPackageDetail(p));
    navigate(`/package/${p.destination}`);
  };

  // Handle company filter
  const handleCompanyFilter = (company) => {
    setSelectedCompany(company);
    setCurrentPage(1);
  };

  // Process packages with company assignment
  const allPackages = packages.flatMap((pkg) => {
    const items = Array.isArray(pkg.package) ? pkg.package : [pkg];
    return items
      .filter(
        (item) => !selectedCompany || item.companyName === selectedCompany
      )
      .map((item) => ({
        ...item,
        companyName:
          item.companyName ||
          pkg.companyName ||
          companyNames.find((c) => c.BusinessName === item.companyName)
            ?.BusinessName ||
          "Unknown Company",
      }));
  });

  const indexOfLast = currentPage * packagesPerPage;
  const indexOfFirst = indexOfLast - packagesPerPage;
  const currentPackages = allPackages.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(allPackages.length / packagesPerPage);

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

      <style>{`
        :root {
          --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          --dark-gradient: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
          --glass-bg: rgba(255, 255, 255, 0.1);
          --glass-border: rgba(255, 255, 255, 0.2);
        }

        * {
          font-family: 'Inter', sans-serif;
        }

        body {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
        }

        .hero-section {
          background: var(--dark-gradient);
          position: relative;
          overflow: hidden;
          padding: 120px 0 80px;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%);
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .hero-subtitle {
          color: #e9ecef;
          font-size: 1.25rem;
          font-weight: 400;
          margin-bottom: 3rem;
          opacity: 0.9;
        }

        .glass-card {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .filter-input {
          background: rgba(255, 255, 255, 0.15) !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          border-radius: 12px !important;
          color: white !important;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .filter-input::placeholder {
          color: rgba(255, 255, 255, 0.7) !important;
        }

        .filter-input:focus {
          background: rgba(255, 255, 255, 0.2) !important;
          border-color: #4facfe !important;
          box-shadow: 0 0 0 0.2rem rgba(79, 172, 254, 0.25) !important;
          color: white !important;
        }

        .btn-gradient-primary {
          background: var(--accent-gradient);
          border: none;
          border-radius: 12px;
          font-weight: 600;
          padding: 12px 30px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
          color: white;
        }

        .btn-gradient-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(79, 172, 254, 0.4);
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

        .package-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.4s ease;
          border: none;
          height: 100%;
        }

        .package-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .package-img {
          height: 250px;
          background-size: cover;
          background-position: center;
          position: relative;
          overflow: hidden;
        }

        .package-img::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(0,0,0,0.1) 0%, transparent 100%);
        }

        .rating-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 25px;
          padding: 8px 15px;
          font-size: 0.9rem;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .price-tag {
          font-size: 1.5rem;
          font-weight: 800;
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .package-type {
          background: linear-gradient(135deg, #667eea20, #764ba220);
          color: #667eea;
          padding: 6px 15px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          display: inline-block;
        }

        .facility-item {
          font-size: 0.9rem;
          color: #6c757d;
          margin-bottom: 5px;
        }

        .facility-icon {
          color: #28a745;
          margin-right: 8px;
        }

        .btn-view-details {
          background: var(--primary-gradient);
          border: none;
          border-radius: 12px;
          font-weight: 600;
          padding: 12px;
          transition: all 0.3s ease;
          color: white;
          width: 100%;
        }

        .btn-view-details:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          color: white;
        }

        .pagination-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          margin-top: 3rem;
        }

        .page-btn {
          width: 45px;
          height: 45px;
          border-radius: 12px;
          border: 2px solid #e9ecef;
          background: white;
          color: #6c757d;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .page-btn:hover {
          border-color: #667eea;
          color: #667eea;
          transform: translateY(-2px);
        }

        .page-btn.active {
          background: var(--primary-gradient);
          border-color: transparent;
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .cta-section {
          background: var(--dark-gradient);
          padding: 80px 0;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(circle at 70% 30%, rgba(120, 119, 198, 0.2) 0%, transparent 50%);
          pointer-events: none;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #212529;
          margin-bottom: 1rem;
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
          border-color: #667eea;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
        }

        .main-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .company-box {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 10px 20px;
          font-size: 0.95rem;
          font-weight: 600;
          color: #212529;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .company-box:hover {
          background: var(--primary-gradient);
          color: white;
          transform: translateY(-2px);
        }

        .company-box.active {
          background: var(--primary-gradient);
          color: white;
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .company-box-container {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: center;
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .package-card {
            margin-bottom: 2rem;
          }

          .company-box {
            font-size: 0.9rem;
            padding: 8px 15px;
          }
        }
      `}</style>

      <div className="packagepage-root">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container hero-content">
            <div className="row justify-content-center text-center">
              <div className="col-lg-10">
                <h1 className="hero-title">Discover Amazing Tour Packages</h1>
                <p className="hero-subtitle">
                  Explore curated travel packages from top tour companies across
                  Pakistan's most breathtaking destinations.
                </p>

                {/* Filter Panel */}
                <form onSubmit={handleSubmit} className="glass-card p-4 p-md-5">
                  <div className="row g-4 mb-4">
                    <div className="col-md-4">
                      <label className="form-label text-white fw-semibold mb-2">
                        Destination
                      </label>
                      <div className="position-relative">
                        <i
                          className="bi bi-search position-absolute"
                          style={{
                            left: "15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "rgba(255,255,255,0.7)",
                          }}></i>
                        <input
                          name="destination"
                          value={filters.destination}
                          onChange={handleChange}
                          className="form-control filter-input ps-5"
                          placeholder="All Destinations"
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label text-white fw-semibold mb-2">
                        Price Range
                      </label>
                      <input
                        name="priceRange"
                        type="range"
                        min="10000"
                        max="200000"
                        value={filters.priceRange}
                        onChange={handleChange}
                        className="form-range mb-2"
                        style={{ accentColor: "#4facfe" }}
                      />
                      <div className="d-flex justify-content-between">
                        <span className="text-white-50 small">
                          Rs {filters.priceRange.toLocaleString()}
                        </span>
                        <span className="text-white-50 small">Rs 200,000</span>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label text-white fw-semibold mb-2">
                        Company
                      </label>
                      <input
                        name="company"
                        value={filters.company}
                        onChange={handleChange}
                        className="form-control filter-input"
                        placeholder="Any Company"
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-gradient-primary"
                      disabled={loading}>
                      <i className="bi bi-search me-2"></i>
                      Apply Filters
                    </button>
                    <button
                      type="button"
                      className="btn btn-glass"
                      onClick={handleClear}
                      disabled={loading}>
                      Clear Filters
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="main-section">
          <div className="container">
            {loading && (
              <div
                style={{
                  border: "4px solid #f3f3f3",
                  borderTop: "4px solid #667eea",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  animation: "spin 1s linear infinite",
                  margin: "20px auto",
                }}></div>
            )}
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
            {error && (
              <div
                style={{
                  color: "#dc3545",
                  textAlign: "center",
                  margin: "20px 0",
                }}>
                {error}
              </div>
            )}

            <div className="row align-items-center mb-5">
              <div className="col-md-8">
                <h2 className="section-title">
                  {allPackages.length} Packages Found
                </h2>
                <p className="text-muted fs-5">
                  Discover your perfect adventure
                </p>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-center">
                  <i className="bi bi-funnel me-2 text-muted"></i>
                  <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className="form-select sort-select"
                    disabled={loading}>
                    <option value="">Select Sort Option</option>
                    <option value="priceLowHigh">Price: Low to High</option>
                    <option value="priceHighLow">Price: High to Low</option>
                    <option value="ratingHighLow">Rating: High to Low</option>
                    <option value="ratingLowHigh">Rating: Low to High</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Company Names Section */}
            <div className="company-box-container">
              <div
                className={`company-box ${
                  selectedCompany === "" ? "active" : ""
                }`}
                onClick={() => handleCompanyFilter("")}>
                All
              </div>
              {companyNames.map((company, index) => (
                <div
                  key={index}
                  className={`company-box ${
                    selectedCompany === company.BusinessName ? "active" : ""
                  }`}
                  onClick={() => handleCompanyFilter(company.BusinessName)}>
                  {company.BusinessName}
                </div>
              ))}
            </div>

            {/* Packages Grid */}
            <div className="row g-4 mb-5">
              {currentPackages.length > 0 ? (
                currentPackages.map((item, index) => (
                  <div className="col-lg-4 col-md-6" key={index}>
                    <div className="card package-card h-100">
                      <div
                        className="package-img"
                        style={{
                          backgroundImage: `url(${
                            item.image
                              ? `http://localhost:2000/${item.image.replace(
                                  "\\",
                                  "/"
                                )}`
                              : "https://via.placeholder.com/400x250"
                          })`,
                        }}>
                        <div className="rating-badge">
                          <i className="bi bi-star-fill text-warning me-1"></i>
                          {item.rating || "N/A"}
                          <i className="bi bi-people-fill text-muted ms-2 me-1"></i>
                          {item.numberOfPeople || 1}
                        </div>
                      </div>

                      <div className="card-body p-4 d-flex flex-column">
                        <div className="d-flex align-items-center mb-3">
                          <i
                            className="bi bi-building"
                            style={{ color: "#667eea" }}></i>

                          <span className="ms-2 fw-semibold">
                            {item.companyName || "Unknown"}
                          </span>
                        </div>

                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <span className="package-type">
                            {item.packageType || "Standard"} Tour
                          </span>
                          <div className="text-end">
                            <div className="price-tag">
                              Rs {item.price?.toLocaleString() || "N/A"}
                            </div>
                            <small className="text-muted">per person</small>
                          </div>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                          <i
                            className="bi bi-geo-alt-fill"
                            style={{ color: "#667eea" }}></i>
                          <span className="ms-2 fw-semibold">
                            {item.destination || "Unknown"}
                          </span>
                        </div>

                        <div className="mb-4 flex-grow-1">
                          {item.facilities?.slice(0, 4).map((facility, i) => (
                            <div key={i} className="facility-item">
                              <i className="bi bi-check-circle-fill facility-icon"></i>
                              {facility}
                            </div>
                          ))}
                          {item.facilities?.length > 4 && (
                            <small className="text-primary fw-semibold">
                              +{item.facilities.length - 4} more facilities
                            </small>
                          )}
                        </div>

                        <button
                          className="btn btn-view-details mt-auto"
                          onClick={() => handleDetail(item)}
                          disabled={loading}>
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-5">
                  No packages available for the selected filters.
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <button
                  className="btn page-btn"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1 || loading}>
                  <i className="bi bi-chevron-left"></i>
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`btn page-btn ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                    disabled={loading}>
                    {i + 1}
                  </button>
                ))}

                <button
                  className="btn page-btn"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages || loading}>
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="cta-section">
          <div className="container text-center">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <h2 className="display-5 fw-bold text-white mb-4">
                  Can't Find the Perfect Package?
                </h2>
                <p className="lead text-white-50 mb-5">
                  Contact our travel experts who can help you customize your
                  dream tour experience.
                </p>

                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <button className="btn btn-gradient-primary btn-lg">
                    Contact Us
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                  <button className="btn btn-glass btn-lg">
                    View All Companies
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
