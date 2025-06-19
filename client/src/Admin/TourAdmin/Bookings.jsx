// Bookings.jsx
import React, { useState } from "react";
import "./bookings.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([
    {
      id: 101,
      customer: "Ali Khan",
      package: "Hunza Valley Tour",
      date: "2024-07-10",
      status: "Confirmed",
    },
    {
      id: 102,
      customer: "Sara Ahmed",
      package: "Skardu Adventure",
      date: "2024-08-15",
      status: "Pending",
    },
    {
      id: 103,
      customer: "John Doe",
      package: "Murree Weekend",
      date: "2024-09-01",
      status: "Cancelled",
    },
  ]);

  const deleteBooking = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "status-badge status-confirmed";
      case "Pending":
        return "status-badge status-pending";
      case "Cancelled":
        return "status-badge status-cancelled";
      default:
        return "status-badge";
    }
  };

  return (
    <div className="container-fluid booking-container">
      {/* Dashboard Header */}
      <div className="row header-section">
        <div className="col-md-8">
          <h1 className="dashboard-title">Bookings Dashboard</h1>
          <p className="dashboard-subtitle">
            Manage all your tour bookings in one place
          </p>
        </div>
        <div className="col-md-4 text-md-end">
          <button className="btn btn-primary new-booking-btn">
            <i className="fas fa-plus-circle me-2"></i>New Booking
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="booking-card">
        {/* Search and Filter Section */}
        <div className="card-header-custom">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="section-title">Current Bookings</h2>
            </div>
            <div className="col-md-6">
              <div className="search-container">
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Search bookings..."
                />
                <i className="fas fa-search search-icon"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="table-responsive">
          <table className="table bookings-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Package</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="booking-id">#{booking.id}</td>
                  <td>{booking.customer}</td>
                  <td>{booking.package}</td>
                  <td>{booking.date}</td>
                  <td>
                    <span className={getStatusClass(booking.status)}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-sm btn-view">
                        <i className="fas fa-eye me-1"></i> View
                      </button>
                      <button
                        className="btn btn-sm btn-delete"
                        onClick={() => deleteBooking(booking.id)}>
                        <i className="fas fa-trash-alt me-1"></i> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination-container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="pagination-info">Showing 1 to 3 of 3 entries</p>
            </div>
            <div className="col-md-6">
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-md-end">
                  <li className="page-item disabled">
                    <a
                      className="page-link"
                      href="#"
                      tabIndex="-1"
                      aria-disabled="true">
                      <i className="fas fa-chevron-left"></i>
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item disabled">
                    <a className="page-link" href="#">
                      <i className="fas fa-chevron-right"></i>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
