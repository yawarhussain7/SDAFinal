import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import img1 from "../assets/francesca-saraco-_dS27XGgRyQ-unsplash.jpg";
import img2 from "../assets/vojtech-bruzek-Yrxr3bsPdS0-unsplash.jpg";

const HotelDetail = () => {
  const hotel = {
    name: "Grand Ocean Resort",
    description:
      "Experience unparalleled luxury at Grand Ocean Resort, nestled along the pristine shores of the Pacific. Our resort offers world-class amenities, breathtaking ocean views, and exceptional service to ensure a memorable stay.",
    facilities: [
      "Infinity Pool",
      "Spa & Wellness Center",
      "Gourmet Dining",
      "Fitness Center",
      "Private Beach Access",
      "High-Speed Wi-Fi",
    ],
    rooms: [
      {
        type: "Deluxe Suite",
        description: "Spacious suite with ocean views and a private balcony.",
        price: "$250/night",
        image: img1,
      },
      {
        type: "Luxury Villa",
        description:
          "Private villa with a personal pool and premium amenities.",
        price: "$450/night",
        image:
          "https://images.unsplash.com/photo-1512916194211-3c8a8a56f8b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        type: "Standard Room",
        description: "Cozy room with modern comforts and garden views.",
        price: "$150/night",
        image: img2,
      },
    ],
  };

  return (
    <div className="font-sans bg-gray-100">
      {/* Hero Section */}
      <div className="container py-5 mt-5">
        <div className="row g-4">
          <div className="col-lg-9">
            <img
              src={img1}
              alt="Hotel Main View"
              className="img-fluid shadow-md"
              style={{
                height: "350px",
                objectFit: "cover",
                width: "100%",
                borderRadius: "16px",
              }}
            />
          </div>
          <div className="col-lg-3 d-flex flex-column gap-4">
            <img
              src={img2}
              alt="Hotel Cabana View"
              className="img-fluid shadow-md"
              style={{
                height: "165px",
                objectFit: "cover",
                borderRadius: "16px",
              }}
            />
            <div
              className="bg-dark shadow-md d-flex align-items-center justify-content-center"
              style={{
                height: "165px",
                borderRadius: "16px",
              }}>
              <p className="text-white fs-5">
                Placeholder for Additional Image
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Details Section */}
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <h1 className="display-4 fw-bold text-dark mb-3">{hotel.name}</h1>
            <div className="d-flex mb-5">
              <span className="border-bottom border-warning border-4 w-25"></span>
            </div>
            <p className="text-secondary fs-5 mb-5">{hotel.description}</p>
          </div>
        </div>
        <div className="card border-0 shadow-sm">
          <div className="card-body p-5">
            <h2 className="h3 fw-bold text-dark mb-4">
              Amenities & Facilities
            </h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
              {hotel.facilities.map((facility, index) => (
                <div key={index} className="col">
                  <div className="card border-0 shadow-sm h-100 text-center bg-white hover:shadow-md transition-shadow duration-300">
                    <div className="card-body p-4">
                      <i className="bi bi-star-fill display-6 text-warning mb-3"></i>
                      <h4 className="h5 fw-semibold text-dark mb-2">
                        {facility}
                      </h4>
                      <p className="text-secondary small">
                        Enjoy our {facility.toLowerCase()} for a luxurious
                        experience.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rooms Section */}
      <div className="container py-5">
        <h2 className="h2 fw-bold text-dark mb-5">Explore Our Rooms</h2>
        <div className="row g-4">
          {hotel.rooms.map((room, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img
                  src={room.image}
                  alt={room.type}
                  className="card-img-top"
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column p-4">
                  <h3 className="h5 fw-semibold text-dark mb-3">{room.type}</h3>
                  <p className="text-secondary mb-3">{room.description}</p>
                  <p className="text-warning fw-bold mb-4">{room.price}</p>
                  <button className="btn btn-dark mt-auto rounded-pill px-4 py-2 hover:bg-gray-800 transition-colors duration-200">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="container py-5 bg-white rounded-lg shadow-sm">
        <h2 className="h2 fw-bold text-dark mb-5">
          Why Choose Grand Ocean Resort
        </h2>
        <div className="row g-4">
          <div className="col-lg-3 col-md-6 text-center">
            <i className="bi bi-cash-coin display-4 text-warning mb-3"></i>
            <h3 className="h5 fw-semibold text-dark">Best Price Guarantee</h3>
            <p className="text-secondary">
              Secure the best rates by booking directly with us.
            </p>
          </div>
          <div className="col-lg-3 col-md-6 text-center">
            <i className="bi bi-geo-alt-fill display-4 text-warning mb-3"></i>
            <h3 className="h5 fw-semibold text-dark">Prime Location</h3>
            <p className="text-secondary">
              Situated in the heart of the Pacific coast.
            </p>
          </div>
          <div className="col-lg-3 col-md-6 text-center">
            <i className="bi bi-clock-history display-4 text-warning mb-3"></i>
            <h3 className="h5 fw-semibold text-dark">24/7 Concierge</h3>
            <p className="text-secondary">
              Round-the-clock support for your needs.
            </p>
          </div>
          <div className="col-lg-3 col-md-6 text-center">
            <i className="bi bi-award display-4 text-warning mb-3"></i>
            <h3 className="h5 fw-semibold text-dark">Award-Winning Service</h3>
            <p className="text-secondary">
              Recognized for excellence in hospitality.
            </p>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="container py-5">
        <h2 className="h2 fw-bold text-dark mb-5">Our Location</h2>
        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            <div
              className="bg-secondary-subtle d-flex align-items-center justify-content-center"
              style={{ height: "400px" }}>
              <p className="text-dark fs-5">
                Interactive Map Placeholder (Integrate Google Maps API here)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-dark text-white py-5">
        <div className="container text-center">
          <h2 className="display-5 fw-bold mb-4">Book Your Dream Stay Today</h2>
          <p className="text-light fs-5 mb-5">
            Indulge in luxury and comfort at Grand Ocean Resort.
          </p>
          <button className="btn btn-warning rounded-pill px-5 py-3 fw-semibold hover:bg-yellow-600 transition-colors duration-200">
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
