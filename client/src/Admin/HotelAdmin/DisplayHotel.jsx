import React, { useEffect, useState } from "react";
import {
  Building,
  MapPin,
  Star,
  Users,
  Bed,
  Calendar,
  Search,
  Grid,
  List,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddRoom from "./AddRoom";
import axios from "axios";

const API_BASE_URL = "http://localhost:2000"; // Use environment variable

const HotelDisplay = () => {
  const [hotels, setHotels] = useState([]);
  const [visibleRoomForm, setVisibleRoomForm] = useState(null);
  const [hotelRooms, setHotelRooms] = useState({});
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingRooms, setIsLoadingRooms] = useState({});
  const [roomFetchErrors, setRoomFetchErrors] = useState({});
  const [retryCounts, setRetryCounts] = useState({});

  // Normalize image path (remove 'Uploads\' and convert backslashes to forward slashes)
  const normalizeImagePath = (imagePath) => {
    if (!imagePath) return null;
    // Remove 'Uploads\' or 'Uploads/' prefix and normalize slashes
    return imagePath
      .replace(/^Uploads[\\/]/, "") // Remove 'Uploads\' or 'Uploads/'
      .replace(/\\/g, "/"); // Convert backslashes to forward slashes
  };

  // Fetch hotels data
  const handleHotelData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/get/hotel`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Hotel Data:", data.hotels);
      console.log("Hotel IDs:", data.hotels?.map((hotel) => hotel._id) || []);
      setHotels(data.hotels || []);

      const loadingState = data.hotels.reduce((acc, hotel) => {
        acc[hotel._id] = true;
        return acc;
      }, {});
      setIsLoadingRooms(loadingState);
      setRoomFetchErrors({});
      setRetryCounts({});

      fetchAllRooms(data.hotels);
    } catch (error) {
      console.error("Failed to fetch hotels:", error);
      toast.error(`Failed to load hotels: ${error.message}`);
    }
  };

  // Fetch rooms for all hotels
  const fetchAllRooms = async (hotels) => {
    try {
      const roomsPromises = hotels.map(async (hotel) => {
        const retryCount = retryCounts[hotel._id] || 0;
        if (retryCount >= 3) {
          console.warn(`Max retries reached for hotel ${hotel._id}`);
          setRoomFetchErrors((prev) => ({
            ...prev,
            [hotel._id]: "Max retry attempts reached",
          }));
          return { hotelId: hotel._id, rooms: [] };
        }

        try {
          setIsLoadingRooms((prev) => ({ ...prev, [hotel._id]: true }));
          setRoomFetchErrors((prev) => ({ ...prev, [hotel._id]: null }));
          const response = await axios.get(
            `${API_BASE_URL}/api/get/rooms/${hotel._id}`,
            {
              withCredentials: true,
            }
          );
          console.log(`Rooms for hotel ${hotel._id}:`, response.data.rooms);
          return { hotelId: hotel._id, rooms: response.data.rooms || [] };
        } catch (error) {
          console.error(`Failed to fetch rooms for hotel ${hotel._id}:`, error);
          const errorMessage = error.response?.data?.message || error.message;
          setRoomFetchErrors((prev) => ({
            ...prev,
            [hotel._id]: errorMessage,
          }));
          setRetryCounts((prev) => ({ ...prev, [hotel._id]: retryCount + 1 }));
          toast.error(
            `Failed to load rooms for ${hotel.name || "hotel"}: ${errorMessage}`
          );
          return { hotelId: hotel._id, rooms: [] };
        } finally {
          setIsLoadingRooms((prev) => ({ ...prev, [hotel._id]: false }));
        }
      });

      const roomsResults = await Promise.all(roomsPromises);
      const roomsData = roomsResults.reduce((acc, { hotelId, rooms }) => {
        acc[hotelId] = rooms;
        return acc;
      }, {});
      console.log("Rooms Data:", roomsData);
      setHotelRooms(roomsData);
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
      toast.error("Failed to load rooms");
    }
  };

  // Delete a hotel
  const deleteHotel = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/delete/hotel/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      toast.success("Hotel deleted successfully");
      handleHotelData();
    } catch (error) {
      console.error("Delete hotel failed:", error);
      toast.error("Failed to delete hotel");
    }
  };

  // Delete a room
  const deleteRoom = async (hotelId, roomId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/delete/room/${hotelId}/${roomId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      toast.success("Room deleted successfully");
      fetchAllRooms(hotels);
    } catch (error) {
      console.error("Room deletion failed:", error);
      toast.error("Failed to delete room");
    }
  };

  // Filter hotels based on search term
  const filteredHotels = hotels.filter(
    (hotel) =>
      (hotel.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (hotel.location?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    handleHotelData();
  }, []);

  return (
    <div className="min-vh-100 bg-light">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Header */}
      <header
        className="bg-white border-bottom sticky-top shadow-sm"
        style={{ zIndex: 40 }}>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between py-3">
            <div className="d-flex align-items-center gap-3">
              <div className="p-2 bg-primary rounded-circle">
                <Building className="text-white" size={24} />
              </div>
              <div>
                <h1 className="h2 mb-0 text-dark fw-bold">Hotel Management</h1>
                <p className="text-muted small mb-0">Professional Dashboard</p>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3">
              <div className="position-relative">
                <Search
                  className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search hotels..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control ps-5 py-2 rounded-pill"
                  style={{ width: "260px" }}
                  aria-label="Search hotels"
                />
              </div>

              <div
                className="btn-group"
                role="group"
                aria-label="View mode toggle">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`btn btn-sm rounded-start ${
                    viewMode === "grid" ? "btn-primary" : "btn-outline-primary"
                  }`}
                  aria-pressed={viewMode === "grid"}
                  title="Grid view">
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`btn btn-sm rounded-end ${
                    viewMode === "list" ? "btn-primary" : "btn-outline-primary"
                  }`}
                  aria-pressed={viewMode === "list"}
                  title="List view">
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-5">
        {/* Stats Overview */}
        <div className="row g-4 mb-5">
          {[
            {
              label: "Total Hotels",
              value: hotels.length,
              icon: Building,
              color: "primary",
            },
            {
              label: "Total Rooms",
              value: Object.values(hotelRooms).reduce(
                (total, rooms) => total + rooms.length,
                0
              ),
              icon: Bed,
              color: "success",
            },
            {
              label: "Avg Rating",
              value:
                hotels.length > 0
                  ? (
                      hotels.reduce(
                        (sum, hotel) => sum + (hotel.rating || 0),
                        0
                      ) / hotels.length
                    ).toFixed(1)
                  : "0.0",
              icon: Star,
              color: "warning",
            },
            {
              label: "Active",
              value: hotels.length,
              icon: Users,
              color: "danger",
            },
          ].map((stat, index) => (
            <div key={index} className="col-md-3">
              <div className="card h-100 border-0 shadow-sm transition-all hover:shadow-md">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted small mb-1">{stat.label}</p>
                    <h3 className="mb-0">{stat.value}</h3>
                  </div>
                  <div
                    className={`p-3 bg-${stat.color} bg-opacity-10 rounded-circle`}>
                    <stat.icon className={`text-${stat.color}`} size={24} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hotels List */}
        {filteredHotels.length === 0 ? (
          <div className="card border-0 shadow-sm text-center p-5">
            <div
              className="mx-auto bg-light rounded-circle d-flex align-items-center justify-content-center mb-4"
              style={{ width: "96px", height: "96px" }}>
              <Building className="text-muted" size={48} />
            </div>
            <h3 className="h4 mb-2">No Hotels Found</h3>
            <p
              className="text-muted mb-0 mx-auto"
              style={{ maxWidth: "500px" }}>
              {searchTerm
                ? `No hotels match "${searchTerm}". Try adjusting your search.`
                : "Get started by adding your first hotel to the management system."}
            </p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid" ? "row g-4" : "d-flex flex-column gap-4"
            }>
            {filteredHotels.map((hotel) => (
              <div
                key={hotel._id}
                className="card border-0 shadow-sm overflow-hidden transition-all hover:shadow-lg">
                {/* Hotel Header */}
                <div className="bg-dark text-white position-relative overflow-hidden">
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25"></div>
                  <div className="position-relative p-4 p-lg-5">
                    <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between gap-4">
                      <div className="d-flex align-items-start gap-4">
                        <div className="p-3 bg-white bg-opacity-20 rounded-3">
                          <Building size={32} />
                        </div>
                        <div>
                          <h2 className="h3 mb-2 fw-bold">
                            {hotel.name || "Unnamed Hotel"}
                          </h2>
                          <div className="d-flex flex-wrap align-items-center gap-3 text-light">
                            <div className="d-flex align-items-center gap-1">
                              <MapPin size={16} />
                              <span className="small">
                                {hotel.location || "Unknown Location"}
                              </span>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                              <Star className="text-warning" size={16} />
                              <span className="small fw-medium">
                                {hotel.rating?.toFixed(1) || "N/A"}
                              </span>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                              <Calendar size={16} />
                              <span className="small">
                                {new Date(hotel.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex flex-wrap gap-3">
                        <button
                          onClick={() =>
                            setVisibleRoomForm(
                              visibleRoomForm === hotel._id ? null : hotel._id
                            )
                          }
                          className="btn btn-primary px-4 py-2 rounded-pill fw-medium d-flex align-items-center gap-2 shadow-sm hover-lift"
                          aria-label={
                            visibleRoomForm === hotel._id
                              ? "Hide room form"
                              : "Add new room"
                          }>
                          {visibleRoomForm === hotel._id ? (
                            <>
                              <X size={16} />
                              <span>Hide Form</span>
                            </>
                          ) : (
                            <>
                              <Plus size={16} />
                              <span>Add Room</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => deleteHotel(hotel._id)}
                          className="btn btn-danger px-4 py-2 rounded-pill fw-medium d-flex align-items-center gap-2 shadow-sm hover-lift"
                          aria-label={`Delete hotel ${hotel.name}`}>
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hotel Content */}
                <div className="p-4 p-lg-5">
                  {/* Rooms */}
                  <div>
                    <h3 className="h5 fw-semibold mb-3 d-flex align-items-center gap-2">
                      <div
                        className="rounded-circle bg-primary"
                        style={{ width: "8px", height: "8px" }}></div>
                      <span>Rooms ({hotelRooms[hotel._id]?.length || 0})</span>
                    </h3>

                    {isLoadingRooms[hotel._id] ? (
                      <div className="text-center py-3">
                        <div
                          className="spinner-border text-primary"
                          role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="text-muted mt-2">Loading rooms...</p>
                      </div>
                    ) : roomFetchErrors[hotel._id] ? (
                      <div className="text-center py-3">
                        <p className="text-danger">
                          Failed to load rooms: {roomFetchErrors[hotel._id]}
                        </p>
                        {retryCounts[hotel._id] < 3 && (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => fetchAllRooms([hotel])}
                            aria-label={`Retry loading rooms for ${hotel.name}`}>
                            Retry
                          </button>
                        )}
                      </div>
                    ) : hotelRooms[hotel._id]?.length > 0 ? (
                      <div className="row g-3">
                        {hotelRooms[hotel._id].map((room, index) => {
                          const imagePath = normalizeImagePath(room.image);
                          console.log(
                            `Room ${room._id || index}: image = ${
                              room.image
                            }, normalized = ${imagePath}, URL = ${
                              imagePath
                                ? `${API_BASE_URL}/Uploads/${imagePath}`
                                : "N/A"
                            }`
                          );
                          return (
                            <div
                              key={room._id || index}
                              className="col-md-6 col-lg-4">
                              <div className="card h-100 border-0 shadow-sm position-relative overflow-hidden transition-all hover:shadow-md">
                                <div className="card-body">
                                  <div className="d-flex align-items-start justify-content-between mb-3">
                                    <div>
                                      <h4 className="h5 fw-semibold mb-1">
                                        {room.roomType || "Unknown Room"}
                                      </h4>
                                      <p className="h4 fw-bold text-primary mb-0">
                                        ${room.pricePerNight || "N/A"}
                                        <span className="small fw-normal text-muted">
                                          /night
                                        </span>
                                      </p>
                                    </div>
                                    <button
                                      className="btn btn-sm btn-link text-danger"
                                      onClick={() =>
                                        deleteRoom(hotel._id, room._id)
                                      }
                                      aria-label={`Delete room ${room.roomType}`}>
                                      <Trash2 size={16} />
                                    </button>
                                  </div>

                                  <div className="d-flex flex-wrap align-items-center gap-3 small text-muted">
                                    <div className="d-flex align-items-center gap-1">
                                      <Users size={16} />
                                      <span>
                                        {room.numberOfGuest || 0} guests
                                      </span>
                                    </div>
                                    <div className="d-flex align-items-center gap-1">
                                      <Bed size={16} />
                                      <span>{room.numberOfBeds || 0} beds</span>
                                    </div>
                                  </div>

                                  <div className="mt-3">
                                    {imagePath ? (
                                      <div className="ratio ratio-16x9 rounded overflow-hidden">
                                        <img
                                          src={`${API_BASE_URL}/Uploads/${imagePath}`}
                                          alt={`Room ${
                                            room.roomType || "Image"
                                          }`}
                                          className="object-cover w-100 h-100"
                                          loading="lazy"
                                          onError={(e) => {
                                            console.error(
                                              `Failed to load image: ${API_BASE_URL}/Uploads/${imagePath}`
                                            );
                                            e.target.src =
                                              "https://via.placeholder.com/300x200?text=No+Image";
                                          }}
                                        />
                                      </div>
                                    ) : (
                                      <div className="text-center text-muted small">
                                        No image available for this room.
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-muted">
                        No rooms available for this hotel.
                      </p>
                    )}
                  </div>

                  {/* Add Room Form */}
                  {visibleRoomForm === hotel._id && (
                    <div className="mt-5">
                      <AddRoom
                        hotelId={hotel._id}
                        onRoomAdded={() => fetchAllRooms(hotels)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HotelDisplay;
