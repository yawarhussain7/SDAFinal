import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./destination.css";
import TourPackage from "./TourPackage.jsx";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/package/owner",
          { withCredentials: true }
        );
        console.log(response.data);
        if (response.data.success) {
          setDestinations(response.data.data);
        } else {
          toast.error("No packages found.");
        }
      } catch (e) {
        console.error("Error fetching packages:", e.message);
        toast.error("Failed to load destinations.");
      }
    };

    fetchPackages();
  }, []);

  const handlePreview = (packageData) => {
    setSelectedPackage(packageData);
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setSelectedPackage(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:2000/api/package/delete/owner/${id}`,
        { withCredentials: true }
      );
      console.log(response.data);
      setDestinations(destinations.filter((dest) => dest._id !== id));
      toast.success("Package deleted successfully.");
    } catch (e) {
      console.error("Error deleting package:", e.message);
      toast.error("Failed to delete package.");
    }
  };

  return (
    <div>
      <div className="destinations-header">
        <h1>Destinations</h1>
        <button
          className="destinations-add-btn"
          onClick={() => {
            <TourPackage />;
          }}>
          <i className="bi bi-plus-circle"></i> Add Destination
        </button>
      </div>

      <div className="destinations-table-wrapper">
        <table className="destinations-table">
          <thead>
            <tr>
              <th>Package Name</th>
              <th>Package Type</th>
              <th>Rating</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations && destinations.length > 0 ? (
              destinations.map((dest) => (
                <tr key={dest._id}>
                  <td>{dest.destination || "N/A"}</td>
                  <td>{dest.packageType || "N/A"}</td>
                  <td>{dest.rating || "N/A"}</td>
                  <td>{dest.price || "N/A"}</td>
                  <td>
                    <button
                      className="destinations-action-btn"
                      title="Preview"
                      onClick={() => handlePreview(dest)}>
                      <i className="bi bi-eye"></i> Preview
                    </button>

                    <button
                      className="destinations-action-btn destinations-action-danger"
                      title="Delete"
                      onClick={() => handleDelete(dest._id)}>
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No destinations available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedPackage && (
        <div className={`preview-form ${showPreview ? "show-preview" : ""}`}>
          <div className="preview-form-header">
            <h2>Package Details</h2>
            <button className="close-preview-btn" onClick={handleClosePreview}>
              <i className="bi bi-x-circle"></i> Close
            </button>
          </div>
          {selectedPackage.image && (
            <div className="preview-image-container">
              <img
                src={
                  selectedPackage.image.startsWith("data:")
                    ? selectedPackage.image
                    : `http://localhost:2000/${selectedPackage.image.replace(
                        /\\/g,
                        "/"
                      )}`
                }
                alt="Package Preview"
                className="preview-image"
              />
            </div>
          )}

          <div className="preview-form-content">
            <p>
              <strong>Package Name:</strong>{" "}
              {selectedPackage.packageName || "N/A"}
            </p>
            <p>
              <strong>Destination:</strong>{" "}
              {selectedPackage.destination || "N/A"}
            </p>
            <p>
              <strong>Package Type:</strong>{" "}
              {selectedPackage.packageType || "N/A"}
            </p>
            <p>
              <strong>Rating:</strong> {selectedPackage.rating || "N/A"}
            </p>
            <p>
              <strong>Price:</strong> {selectedPackage.price || "N/A"}
            </p>
            <p>
              <strong>Number of People:</strong>{" "}
              {selectedPackage.numberOfPeople || "N/A"}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {selectedPackage.description || "N/A"}
            </p>
            <p>
              <strong>Travel Date:</strong>{" "}
              {selectedPackage.travelDate
                ? new Date(selectedPackage.travelDate).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              <strong>Duration:</strong> {selectedPackage.duration || "N/A"}{" "}
              days
            </p>
            <p>
              <strong>Facilities:</strong>{" "}
              {Array.isArray(selectedPackage.facilities)
                ? selectedPackage.facilities.join(", ")
                : "N/A"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
