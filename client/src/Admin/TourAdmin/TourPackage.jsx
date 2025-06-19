import React, { useEffect, useState } from "react";
import "./tourpackages.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TourPackages() {
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    companyName: "",
    packageType: "",
    price: "",
    destination: "",
    travelDate: "",
    duration: "",
    numberOfPeople: "",
    rating: "",
    description: "",
    facilities: [],
    image: null,
    preview: null,
  });

  const fetchCompanyData = async () => {
    try {
      const response = await fetch(
        "http://localhost:2000/api/get/ownerCompany",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setData(result.data);
      setFormData((prev) => ({
        ...prev,
        companyName: result.data?.BusinessName || "",
      }));
    } catch (e) {
      console.error("Error fetching company data:", e);
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const updatedFacilities = checked
          ? [...prev.facilities, value]
          : prev.facilities.filter((item) => item !== value);
        return { ...prev, facilities: updatedFacilities };
      });
    } else if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("❌ Please upload an image.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("companyName", formData.companyName);
    formDataToSend.append("packageType", formData.packageType);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("destination", formData.destination);
    formDataToSend.append("travelDate", formData.travelDate);
    formDataToSend.append("duration", formData.duration);
    formDataToSend.append("numberOfPeople", formData.numberOfPeople);
    formDataToSend.append("rating", formData.rating);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("facilities", JSON.stringify(formData.facilities));
    formDataToSend.append("image", formData.image);

    try {
      const response = await axios.post(
        "http://localhost:2000/api/package/add",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success("✅ Package added successfully!");
    } catch (error) {
      console.error("Error:", error);
      const msg =
        error.response?.data?.message ||
        "❌ Failed to add package. Please try again.";
      toast.error(msg);
    }
  };

  return (
    <div className="tourpackage-container">
      <h1 style={{ marginBottom: "24px" }}>Add New Tour Package</h1>
      <form className="tourpackage-form" onSubmit={handleSubmit}>
        <div className="tourpackage-col">
          <label>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            readOnly
          />
        </div>

        <div className="tourpackage-row">
          <div className="tourpackage-col">
            <label>Package Type</label>
            <input
              type="text"
              placeholder="e.g. Beach Vacation, Mountain Trek"
              name="packageType"
              value={formData.packageType}
              onChange={handleChange}
              required
            />
          </div>
          <div className="tourpackage-col">
            <label>Price</label>
            <input
              type="number"
              placeholder="Price in USD"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="tourpackage-row">
          <div className="tourpackage-col">
            <label>Destination</label>
            <input
              type="text"
              placeholder="e.g. Bali, Paris"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
            />
          </div>
          <div className="tourpackage-col">
            <label>Travel Date</label>
            <input
              type="date"
              name="travelDate"
              value={formData.travelDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="tourpackage-row">
          <div className="tourpackage-col">
            <label>Duration (Days)</label>
            <input
              type="number"
              name="duration"
              placeholder="Number of days"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>
          <div className="tourpackage-col">
            <label>Number of People</label>
            <input
              type="number"
              name="numberOfPeople"
              placeholder="Max number of people"
              value={formData.numberOfPeople}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="tourpackage-row">
          <div className="tourpackage-col">
            <label>Rating</label>
            <input
              type="number"
              step="0.1"
              max="5"
              min="0"
              placeholder="Rating out of 5"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
            />
          </div>
          <div className="tourpackage-col">
            <label>Package Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
            />
            <div className="tourpackage-image-placeholder">
              {formData.preview ? (
                <img
                  src={formData.preview}
                  alt="Preview"
                  className="image-preview"
                />
              ) : (
                <i
                  className="bi bi-image"
                  style={{ fontSize: "2.5rem", color: "#b0b7c3" }}></i>
              )}
            </div>
          </div>
        </div>

        <div className="tourpackage-row">
          <div className="tourpackage-col-full">
            <label>Description</label>
            <textarea
              placeholder="Describe the tour package"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="tourpackage-row">
          <div className="tourpackage-col-full">
            <label>Facilities</label>
            <div className="tourpackage-facilities">
              {[
                "WiFi",
                "Breakfast",
                "Swimming Pool",
                "Spa",
                "Gym",
                "Tour Guide",
                "Transportation",
                "All Meals",
              ].map((facility) => (
                <label key={facility}>
                  <input
                    type="checkbox"
                    value={facility}
                    checked={formData.facilities.includes(facility)}
                    onChange={handleChange}
                  />
                  {facility}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="tourpackage-actions">
          <button type="submit" className="tourpackage-save-btn">
            Save Tour Package
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
