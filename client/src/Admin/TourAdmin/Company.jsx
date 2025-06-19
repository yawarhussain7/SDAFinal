import React, { useEffect, useState } from "react";

const Company = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCompanyData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:2000/api/get/ownerCompany",
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setData(result.data);
      setError(null);
    } catch (e) {
      console.error("Error fetching company data:", e);
      setError("Failed to load company data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this company? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await fetch("http://localhost:2000/api/delete/ownerCompany", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(null);
      alert("Company deleted successfully.");
    } catch (e) {
      console.error("Error deleting company:", e);
      alert("Failed to delete company. Please try again.");
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  if (loading) {
    return (
      <div className="company-layout">
        <div className="company-header">
          <h1 className="company-title">Company Management</h1>
          <p className="company-subtitle">
            Manage your registered business information
          </p>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading company data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="company-layout">
        <div className="company-header">
          <h1 className="company-title">Company Management</h1>
          <p className="company-subtitle">
            Manage your registered business information
          </p>
        </div>
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3 className="error-title">Unable to Load Data</h3>
          <p className="error-message">{error}</p>
          <button className="retry-btn" onClick={fetchCompanyData}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="company-layout">
        <div className="company-header">
          <h1 className="company-title">Company Management</h1>
          <p className="company-subtitle">
            Manage your registered business information
          </p>
        </div>
        <div className="no-data-container">
          <div className="no-data-icon">🏢</div>
          <h3 className="no-data-title">No Company Registered</h3>
          <p className="no-data-message">
            You haven't registered a company yet. Register your business to get
            started.
          </p>
          <button className="register-btn">Register Company</button>
        </div>
      </div>
    );
  }

  return (
    <div className="company-layout">
      {/* Header Section */}
      <div className="company-header">
        <div className="header-content">
          <h1 className="company-title">Company Management</h1>
          <p className="company-subtitle">
            Manage your registered business information
          </p>
        </div>
        <div className="header-actions">
          <button className="refresh-btn" onClick={fetchCompanyData}>
            <span className="btn-icon">🔄</span>
            Refresh
          </button>
        </div>
      </div>

      {/* Company Info Card */}
      <div className="company-card">
        <div className="card-header">
          <div className="card-title-section">
            <h2 className="card-title">Registered Company</h2>
            <div
              className={`status-badge ${data.verificationStatus?.toLowerCase()}`}>
              <span className="status-dot"></span>
              {data.verificationStatus || "Pending"}
            </div>
          </div>
          <div className="card-actions">
            <button className="delete-btn" onClick={handleDelete}>
              <span className="btn-icon">🗑️</span>
              Delete
            </button>
          </div>
        </div>

        <div className="card-content">
          {/* Business Information Section */}
          <div className="info-section">
            <h3 className="section-title">Business Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label className="info-label">Business Name</label>
                <div className="info-value primary">{data.BusinessName}</div>
              </div>
              <div className="info-item">
                <label className="info-label">Registration Number</label>
                <div className="info-value">{data.RegistrationNumber}</div>
              </div>
              <div className="info-item full-width">
                <label className="info-label">Physical Address</label>
                <div className="info-value">{data.PhysicalAddress}</div>
              </div>
              <div className="info-item">
                <label className="info-label">Business Phone</label>
                <div className="info-value">
                  <a
                    href={`tel:${data.BusinessPhone}`}
                    className="contact-link">
                    {data.BusinessPhone}
                  </a>
                </div>
              </div>
              <div className="info-item">
                <label className="info-label">Business Email</label>
                <div className="info-value">
                  <a
                    href={`mailto:${data.BusinessEmail}`}
                    className="contact-link">
                    {data.BusinessEmail}
                  </a>
                </div>
              </div>
              <div className="info-item">
                <label className="info-label">Website</label>
                <div className="info-value">
                  {data.website ? (
                    <a
                      href={data.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="website-link">
                      {data.website}
                    </a>
                  ) : (
                    <span className="no-data">Not provided</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Owner Information Section */}
          <div className="info-section">
            <h3 className="section-title">Owner Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label className="info-label">Full Name</label>
                <div className="info-value primary">{data.OwnerFullName}</div>
              </div>
              <div className="info-item">
                <label className="info-label">Phone Number</label>
                <div className="info-value">
                  <a href={`tel:${data.OwnerPhone}`} className="contact-link">
                    {data.OwnerPhone}
                  </a>
                </div>
              </div>
              <div className="info-item">
                <label className="info-label">Email Address</label>
                <div className="info-value">
                  <a
                    href={`mailto:${data.OwnerEmail}`}
                    className="contact-link">
                    {data.OwnerEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .company-layout {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
        }

        .company-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding: 2rem;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .header-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2d3748;
          margin: 0 0 0.5rem 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .company-subtitle {
          color: #718096;
          font-size: 1.1rem;
          margin: 0;
        }

        .refresh-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .refresh-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .company-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .card-title-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .card-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0;
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: capitalize;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #48bb78;
        }

        .card-actions {
          display: flex;
          gap: 1rem;
        }

        .edit-btn,
        .delete-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .edit-btn {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .delete-btn {
          background: rgba(239, 68, 68, 0.9);
          color: white;
        }

        .edit-btn:hover,
        .delete-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .card-content {
          padding: 2rem;
        }

        .info-section {
          margin-bottom: 3rem;
        }

        .info-section:last-child {
          margin-bottom: 0;
        }

        .section-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e2e8f0;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .info-item.full-width {
          grid-column: 1 / -1;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .info-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #718096;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .info-value {
          font-size: 1.1rem;
          font-weight: 500;
          color: #2d3748;
          padding: 1rem;
          background: #f7fafc;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .info-value.primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-weight: 600;
        }

        .info-value:hover {
          border-color: #cbd5e0;
          transform: translateY(-1px);
        }

        .contact-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }

        .contact-link:hover {
          text-decoration: underline;
        }

        .website-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }

        .website-link:hover {
          text-decoration: underline;
        }

        .no-data {
          color: #a0aec0;
          font-style: italic;
        }

        .loading-container,
        .error-container,
        .no-data-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .loading-text,
        .error-message,
        .no-data-message {
          color: #718096;
          font-size: 1.1rem;
          margin: 1rem 0;
        }

        .error-icon,
        .no-data-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .error-title,
        .no-data-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3748;
          margin: 0;
        }

        .retry-btn,
        .register-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 10px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .retry-btn:hover,
        .register-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        @media (max-width: 768px) {
          .company-layout {
            padding: 1rem;
          }

          .company-header {
            flex-direction: column;
            gap: 1rem;
            padding: 1.5rem;
          }

          .header-content h1 {
            font-size: 2rem;
          }

          .card-header {
            flex-direction: column;
            gap: 1rem;
            padding: 1.5rem;
          }

          .card-actions {
            width: 100%;
            justify-content: space-between;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .card-content {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Company;
