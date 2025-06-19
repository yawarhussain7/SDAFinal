import React, { useState } from "react";
import "./customers.css";
import axios from "axios";

const Customers = () => {
  const [formData, setFormData] = useState({
    BusinessName: "",
    RegistrationNumber: "",
    PhysicalAddress: "",
    BusinessPhone: "",
    BusinessEmail: "",
    website: "",
    OwnerFullName: "",
    OwnerPhone: "",
    OwnerEmail: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(""); // 'pending', 'verified', 'unverified'
  const [submittedOnce, setSubmittedOnce] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" }); // type: 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("Submitting...");
    setSubmittedOnce(true);
    setNotification({ message: "", type: "" }); // Clear old message

    try {
      const response = await axios.post(
        "http://localhost:2000/api/company/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setStatusMessage("Form submitted! Awaiting admin verification...");
      setVerificationStatus("pending");
      setNotification({
        message: "Company registered successfully! Awaiting verification.",
        type: "success",
      });
    } catch (err) {
      console.error(err);
      setStatusMessage("Submission failed. Try again.");
      setVerificationStatus("unverified");
      setNotification({
        message: err?.response?.data?.message || "Error submitting form.",
        type: "error",
      });
    }
  };

  const renderNotification = () => {
    if (!notification.message) return null;

    return (
      <div className={`notification ${notification.type}`}>
        {notification.message}
      </div>
    );
  };

  const renderStatusBar = () => {
    if (!submittedOnce) return null;

    let statusClass = "status-pending";
    let text = "Pending Verification...";
    let icon = "⏳";

    if (verificationStatus === "verified") {
      statusClass = "status-verified";
      text = "Verified";
      icon = "✓";
    } else if (verificationStatus === "unverified") {
      statusClass = "status-unverified";
      text = "Unverified — Please resubmit the form";
      icon = "✗";
    }

    return (
      <div className={`status-indicator ${statusClass}`}>
        <span className="status-indicator-icon">{icon}</span> {text}
      </div>
    );
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Hotel Verification</h2>
        <p>Complete this form to verify your hotel business</p>
      </div>

      {renderNotification()}

      {verificationStatus !== "verified" && (
        <form className="form-sections" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Business Information</h3>
            <div className="form-fields">
              <label>Business/Hotel Name</label>
              <input
                type="text"
                name="BusinessName"
                value={formData.BusinessName}
                onChange={handleChange}
                className="input-field"
                required
              />

              <label>Registration Number</label>
              <input
                type="text"
                name="RegistrationNumber"
                value={formData.RegistrationNumber}
                onChange={handleChange}
                className="input-field"
                required
              />

              <label>Physical Address</label>
              <input
                type="text"
                name="PhysicalAddress"
                value={formData.PhysicalAddress}
                onChange={handleChange}
                className="input-field"
                required
              />

              <div className="form-group">
                <div className="form-item">
                  <label>Business Phone</label>
                  <input
                    type="tel"
                    name="BusinessPhone"
                    value={formData.BusinessPhone}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div className="form-item">
                  <label>Business Email</label>
                  <input
                    type="email"
                    name="BusinessEmail"
                    value={formData.BusinessEmail}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <label>Website (optional)</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="input-field"
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Owner Information</h3>
            <div className="form-fields">
              <label>Owner Full Name</label>
              <input
                type="text"
                name="OwnerFullName"
                value={formData.OwnerFullName}
                onChange={handleChange}
                className="input-field"
                required
              />

              <div className="form-group">
                <div className="form-item">
                  <label>Owner Phone</label>
                  <input
                    type="tel"
                    name="OwnerPhone"
                    value={formData.OwnerPhone}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div className="form-item">
                  <label>Owner Email</label>
                  <input
                    type="email"
                    name="OwnerEmail"
                    value={formData.OwnerEmail}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-submit">
            <button type="submit" className="submit-btn">
              Submit for Verification
            </button>
          </div>
        </form>
      )}

      {renderStatusBar()}
      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </div>
  );
};

export default Customers;

/*const Company = () => {
  const [data, setData] = useState(null); // Use null for initial state

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/get/company', {
          withCredentials: true,
        });
        setData(response.data.data); // Assuming the company data is in response.data.data
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompany();
  }, []);

  return (
    <div>
      <h2>Verified Company Details</h2>
      {data ? (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Business Name</th>
              <th>Registration Number</th>
              <th>Physical Address</th>
              <th>Business Phone</th>
              <th>Business Email</th>
              <th>Owner Name</th>
              <th>Owner Phone</th>
              <th>Owner Email</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.BusinessName}</td>
              <td>{data.RegistrationNumber}</td>
              <td>{data.PhysicalAddress}</td>
              <td>{data.BusinessPhone}</td>
              <td>{data.BusinessEmail}</td>
              <td>{data.OwnerFullName}</td>
              <td>{data.OwnerPhone}</td>
              <td>{data.OwnerEmail}</td>
              <td>{data.website || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading company details...</p>
      )}
    </div>
  );
};
*/
