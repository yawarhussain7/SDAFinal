import React from "react";
import "./hotels.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const hotels = [
  {
    image: "/images/serena.jpg",
    name: "Serena Hotel",
    location: "Islamabad",
    price: 180,
    rating: 4.9,
    amenities: ["Free WiFi", "Pool", "Spa"],
    guests: "2-4 Guests",
  },
  {
    image: "/images/shangrila.jpg",
    name: "Shangrila Resort",
    location: "Skardu",
    price: 200,
    rating: 4.9,
    amenities: ["Free WiFi", "Mountain Views", "Restaurant"],
    guests: "2-4 Guests",
  },
  {
    image: "/images/pearl.jpg",
    name: "Pearl Continental Hotel",
    location: "Lahore",
    price: 150,
    rating: 4.8,
    amenities: ["Free WiFi", "Pool", "Spa"],
    guests: "2-4 Guests",
  },
];

const Hotels = () => {
  return (
    <section className="hotels-section">
      <h2 className="hotels-title">Popular Hotels & Accommodations</h2>
      <p className="hotels-desc">
        Discover the perfect place to stay during your journey through Pakistan,
        from luxurious hotels to serene mountain retreats.
      </p>
      <div className="hotels-grid">
        {hotels.map((hotel, index) => (
          <div className="hotel-card" key={index}>
            <div
              className="hotel-img"
              style={{ backgroundImage: `url(${hotel.image})` }}>
              <div className="hotel-rating-badge">
                <i className="bi bi-star-fill" /> {hotel.rating}
              </div>
            </div>
            <div className="hotel-info">
              <div className="hotel-title-row">
                <span className="hotel-name">{hotel.name}</span>
                <span className="hotel-price">
                  From ${hotel.price}
                  <span className="hotel-price-night">/night</span>
                </span>
              </div>
              <div className="hotel-location">
                <i className="bi bi-geo-alt" /> {hotel.location}
              </div>
              <div className="hotel-amenities">
                {hotel.amenities.map((amenity, idx) => (
                  <span className="hotel-amenity" key={idx}>
                    <i
                      className={
                        amenity === "Free WiFi"
                          ? "bi bi-wifi"
                          : amenity === "Pool"
                          ? "bi bi-water"
                          : amenity === "Spa"
                          ? "bi bi-droplet"
                          : amenity === "Mountain Views"
                          ? "bi bi-image"
                          : amenity === "Restaurant"
                          ? "bi bi-egg-fried"
                          : "bi bi-dot"
                      }></i>{" "}
                    {amenity}
                  </span>
                ))}
              </div>
              <div className="hotel-guests">
                <i className="bi bi-people" /> {hotel.guests}
              </div>
              <button className="hotel-btn btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
      <button className="hotels-all-btn btn">View All Hotels</button>
    </section>
  );
};

export default Hotels;
