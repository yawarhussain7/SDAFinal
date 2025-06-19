import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RoomForm({ hotelId }) {
  const [formData, setFormData] = useState({
    roomType: "",
    pricePerNight: "",
    numberOfGuest: "",
    numberOfBeds: "",
    image: null,
  });

  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const data = new FormData();
    data.append("roomType", formData.roomType);
    data.append("pricePerNight", formData.pricePerNight);
    data.append("numberOfGuest", formData.numberOfGuest);
    data.append("numberOfBeds", formData.numberOfBeds);
    data.append("image", formData.image);

    try {
      const response = await axios.post(
        `http://localhost:2000/api/add/room/${hotelId}`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Room added successfully!", { position: "top-center" });
      console.log("Room added:", response.data);
    } catch (err) {
      toast.error("Failed to add room: " + err.message, {
        position: "top-center",
      });
    }

    // Reset
    setFormData({
      roomType: "",
      pricePerNight: "",
      numberOfGuest: "",
      numberOfBeds: "",
      image: null,
    });
    setValidated(false);
    form.reset();
  };

  return (
    <div className="container my-5">
      <ToastContainer />
      <div
        className="card shadow-lg rounded-4 border-0 p-4"
        style={{
          maxWidth: "500px",
          margin: "auto",
          backgroundColor: "#f8f9fa",
        }}>
        <h3 className="text-center mb-4 text-dark">Room Details Form</h3>

        <form
          noValidate
          className={validated ? "was-validated" : ""}
          onSubmit={handleSubmit}>
          {/* Room Type */}
          <div className="mb-3">
            <label className="form-label">Room Type</label>
            <input
              type="text"
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className="form-control"
              required
            />
            <div className="invalid-feedback">Please enter the room type.</div>
          </div>

          {/* Price Per Night */}
          <div className="mb-3">
            <label className="form-label">Price Per Night ($)</label>
            <input
              type="number"
              name="pricePerNight"
              value={formData.pricePerNight}
              onChange={handleChange}
              className="form-control"
              min="0"
              required
            />
            <div className="invalid-feedback">Enter a valid price.</div>
          </div>

          {/* Number of Guests */}
          <div className="mb-3">
            <label className="form-label">Number of Guests</label>
            <input
              type="number"
              name="numberOfGuest"
              value={formData.numberOfGuest}
              onChange={handleChange}
              className="form-control"
              min="1"
              required
            />
            <div className="invalid-feedback">
              At least 1 guest is required.
            </div>
          </div>

          {/* Number of Beds */}
          <div className="mb-3">
            <label className="form-label">Number of Beds</label>
            <input
              type="number"
              name="numberOfBeds"
              value={formData.numberOfBeds}
              onChange={handleChange}
              className="form-control"
              min="1"
              required
            />
            <div className="invalid-feedback">At least 1 bed is required.</div>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="form-label">Image Upload</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="form-control"
              required
            />
            <div className="invalid-feedback">Please upload an image.</div>
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button type="submit" className="btn btn-dark rounded-3">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoomForm;
