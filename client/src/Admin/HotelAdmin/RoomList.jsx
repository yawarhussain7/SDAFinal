// RoomList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function RoomList({ hotelId }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/get/rooms/${hotelId}`
        );
        setRooms(response.data.rooms || []);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotelId]);

  if (loading) return <div className="text-center mt-3">Loading rooms...</div>;
  if (rooms.length === 0)
    return <div className="text-center mt-3">No rooms found.</div>;

  return (
    <div className="row mt-3">
      {rooms.map((room) => (
        <div key={room._id} className="col-md-4 mb-4">
          <div className="card shadow border-0 rounded-4">
            <img
              src={`http://localhost:2000/uploads/${room.image}`}
              className="card-img-top rounded-top-4"
              alt={room.roomType}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">{room.roomType}</h5>
              <p className="card-text">
                <strong>Price:</strong> ${room.pricePerNight} / night
                <br />
                <strong>Guests:</strong> {room.numberOfGuest}
                <br />
                <strong>Beds:</strong> {room.numberOfBeds}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RoomList;
