import React, { useState } from "react";
import axios from "axios";

const PlaceForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    desc: "",
    placeDetail: "",
    rating: "",
    reviews: "",
    price: "",
    difficulty: "",
    bestTime: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [bannerImageFile, setBannerImageFile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  const toggleForm = () => setShowForm(!showForm);
  const closeForm = () => setShowForm(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleBannerImageChange = (e) => {
    setBannerImageFile(e.target.files[0]);
  };

  const countWords = (str) => {
    return str.trim().split(/\s+/).filter(Boolean).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (countWords(formData.desc) > 20) {
      setError("Description must not be more than 20 words.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (imageFile) data.append("image", imageFile);
    if (bannerImageFile) data.append("bannerImage", bannerImageFile);

    try {
      await axios.post("http://localhost:3000/places", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Place added successfully!");

      // Reset
      setFormData({
        name: "",
        region: "",
        desc: "",
        placeDetail: "",
        rating: "",
        reviews: "",
        price: "",
        difficulty: "",
        bestTime: "",
      });
      setImageFile(null);
      setBannerImageFile(null);

      closeForm(); // Hide form after submit
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <button onClick={toggleForm} className="btn btn-success mb-4">
        {showForm ? "Hide Form" : "Add Place"}
      </button>

      {showForm && (
        <div className="card p-4 position-relative">
          {/* Close Icon */}
          <span
            className="position-absolute top-0 end-0 m-2 fs-3"
            style={{ cursor: "pointer" }}
            onClick={closeForm}
            title="Close form">
            &times;
          </span>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Input Fields */}
            {[
              "name",
              "region",
              "rating",
              "reviews",
              "price",
              "difficulty",
              "bestTime",
            ].map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label fw-bold">
                  {field.toUpperCase()}
                </label>
                <input
                  type={field === "rating" ? "number" : "text"}
                  name={field}
                  required
                  className="form-control rounded-pill px-4 py-2"
                  value={formData[field]}
                  onChange={handleChange}
                />
              </div>
            ))}

            {/* Description */}
            <div className="mb-3">
              <label className="form-label fw-bold">
                DESCRIPTION (Max 20 Words)
              </label>
              <textarea
                name="desc"
                className="form-control"
                rows="3"
                required
                value={formData.desc}
                onChange={handleChange}></textarea>
            </div>

            {/* Place Detail */}
            <div className="mb-3">
              <label className="form-label fw-bold">PLACE DETAIL</label>
              <textarea
                name="placeDetail"
                className="form-control"
                rows="5"
                required
                value={formData.placeDetail}
                onChange={handleChange}></textarea>
            </div>

            {/* Image Uploads */}
            <div className="mb-3">
              <label className="form-label fw-bold">Main Cover Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                required
                className="form-control"
                onChange={handleImageChange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">Hero Banner Image</label>
              <input
                type="file"
                name="bannerImage"
                accept="image/*"
                required
                className="form-control"
                onChange={handleBannerImageChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary px-4 py-2 rounded-pill">
              Submit Place
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlaceForm;
