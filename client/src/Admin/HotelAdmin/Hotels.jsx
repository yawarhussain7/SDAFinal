/*
import React, { useState } from "react";
import axios from "axios";
import CompanyAdd from "./CompanyAdd";
import RoomAdd from "./RoomAdd";
import "./hotels.css";

const Hotels = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: "",
    facilities: [],
    rooms: [
      {
        roomType: "",
        pricePerNight: "",
        numberOfGuest: "",
        numberOfBeds: "",
      },
    ],
    loading: false,
  });

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const showNotification = (message, type) => {
    const notification = document.createElement("div");
    notification.className = `hotel-notification ${type}`;
    notification.innerHTML =
      type === "success"
        ? `<i class='bi bi-check-circle'></i> ${message}`
        : `<i class='bi bi-exclamation-circle'></i> ${message}`;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
      setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, loading: true });

    const data = new FormData();
    data.append("name", formData.name);
    data.append("location", formData.location);
    data.append("rating", formData.rating);
    data.append("manager", "USER_ID_HERE"); // Replace later
    formData.facilities.forEach((f) => data.append("facilities[]", f));
    formData.rooms.forEach((room, i) => {
      data.append(`rooms[${i}][roomType]`, room.roomType);
      data.append(`rooms[${i}][pricePerNight]`, room.pricePerNight);
      data.append(`rooms[${i}][numberOfGuest]`, room.numberOfGuest);
      data.append(`rooms[${i}][numberOfBeds]`, room.numberOfBeds);
    });
    images.forEach((img) => data.append("images", img));

    try {
      await axios.post("http://localhost:2000/api/hotel/add", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      setFormData({
        name: "",
        location: "",
        rating: "",
        facilities: [],
        rooms: [
          {
            roomType: "",
            pricePerNight: "",
            numberOfGuest: "",
            numberOfBeds: "",
          },
        ],
        loading: false,
      });
      setImages([]);
      setPreviewImages([]);
      showNotification("Hotel saved successfully!", "success");
    } catch (err) {
      console.error(err);
      showNotification("Error saving hotel", "error");
      setFormData({ ...formData, loading: false });
    }
  };

  return (
    <div className="hotels-container">
      <div
        className="hotel-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
          Hotel Management
        </h1>
        <div
          className="hotel-header-actions"
          style={{ display: "flex", gap: "10px" }}>
          <button className="hotel-btn-secondary">
            <i className="bi bi-list"></i> View All Hotels
          </button>
          <button className="hotel-btn-primary">
            <i className="bi bi-plus"></i> Add New Hotel
          </button>
        </div>
      </div>
      <CompanyAdd
        formData={formData}
        setFormData={setFormData}
        images={images}
        setImages={setImages}
        previewImages={previewImages}
        setPreviewImages={setPreviewImages}
        handleSubmit={handleSubmit}
      />
      <RoomAdd formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default Hotels; */
