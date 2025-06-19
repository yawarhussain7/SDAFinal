import React, { useState } from "react";
import "./hotels.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: "",
    facilities: [],
    loading: false,
  });

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        facilities: checked
          ? [...prevData.facilities, value]
          : prevData.facilities.filter((f) => f !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (
      !formData.name.trim() ||
      !formData.location.trim() ||
      !formData.rating
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    setFormData((prev) => ({ ...prev, loading: true }));

    const data = new FormData();
    data.append("name", formData.name);
    data.append("location", formData.location);
    data.append("rating", formData.rating);
    formData.facilities.forEach((f) => data.append("facilities[]", f));
    images.forEach((image) => data.append("images", image));

    try {
      const response = await fetch("http://localhost:2000/api/hotel/add", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Hotel added successfully!");
        setFormData({
          name: "",
          location: "",
          rating: "",
          facilities: [],
          loading: false,
        });
        setImages([]);
        setPreviewImages([]);
      } else {
        toast.error(result.message || "Something went wrong");
        setFormData((prev) => ({ ...prev, loading: false }));
      }
    } catch (error) {
      console.error("Error submitting hotel data:", error);
      toast.error("Failed to submit hotel");
      setFormData((prev) => ({ ...prev, loading: false }));
    }
  };

  const renderRatingStars = () => {
    const rating = parseInt(formData.rating) || 0;
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i + 1}
        className={`rating-star ${i + 1 <= rating ? "active" : ""}`}
        onClick={() => setFormData({ ...formData, rating: (i + 1).toString() })}
        style={{ cursor: "pointer", fontSize: "1.2rem" }}>
        <i className="bi bi-star-fill"></i>
      </span>
    ));
  };

  return (
    <div
      className="dashboard-card"
      style={{
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        marginBottom: "20px",
      }}>
      <div
        className="dashboard-card-header"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
        }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          <i className="bi bi-building"></i> Add Hotel Details
        </h2>
      </div>

      <form
        className="hotel-form"
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Hotel Basic Info */}
        <div className="form-section">
          <h3 className="section-title">Basic Information</h3>
          <div className="hotel-row">
            <div className="hotel-col">
              <label>Hotel Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter hotel name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="hotel-col">
              <label>Location</label>
              <input
                type="text"
                name="location"
                placeholder="City, Country"
                value={formData.location}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          </div>
          <div className="hotel-row">
            <div className="hotel-col">
              <label>Rating</label>
              <div className="rating-stars-container">
                {renderRatingStars()}
              </div>
              <input
                type="hidden"
                name="rating"
                value={formData.rating}
                required
              />
            </div>
          </div>
        </div>

        {/* Hotel Facilities */}
        <div className="form-section">
          <h3 className="section-title">Facilities & Amenities</h3>
          <div className="hotel-facilities">
            {[
              "WiFi",
              "Breakfast",
              "Swimming Pool",
              "Spa",
              "Gym",
              "Parking",
              "Restaurant",
              "Room Service",
              "Air Conditioning",
              "Bar",
              "Business Center",
              "Pet Friendly",
            ].map((facility) => (
              <label
                key={facility}
                className="facility-checkbox"
                style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <input
                  type="checkbox"
                  name="facilities"
                  value={facility}
                  checked={formData.facilities.includes(facility)}
                  onChange={handleChange}
                />
                <span className="checkbox-custom"></span>
                <span>{facility}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Hotel Images */}
        <div className="form-section">
          <h3 className="section-title">Hotel Images</h3>
          <div className="file-upload-container">
            <label
              className="file-upload-label"
              style={{ display: "block", cursor: "pointer" }}>
              <div
                className="upload-icon"
                style={{ fontSize: "2rem", color: "#6c757d" }}>
                <i className="bi bi-cloud-arrow-up"></i>
              </div>
              <div className="upload-text">
                Click or drag images here to upload
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </label>
          </div>
          <div className="preview-images">
            {previewImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Preview ${idx}`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="hotel-btn-primary"
          disabled={formData.loading}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#a0522d",
            color: "#fff",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}>
          {formData.loading ? "Saving..." : "Save Hotel"}
        </button>
      </form>

      {/* ToastContainer must be mounted once */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CompanyAdd;
