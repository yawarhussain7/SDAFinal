import React from "react";
import "./destinations.css";

const destinations = [
  {
    image: "/images/hunza.jpg",
    region: "Gilgit-Baltistan",
    name: "Hunza Valley",
    desc: "A mountainous valley known for its breathtaking landscapes and rich culture.",
    rating: 4.9,
  },
  {
    image: "/images/swat.jpg",
    region: "Khyber Pakhtunkhwa",
    name: "Swat Valley",
    desc: 'Known as the "Switzerland of the East" for its snow-capped mountains and lush scenery.',
    rating: 4.8,
  },
  {
    image: "/images/lahorefort.jpg",
    region: "Lahore, Punjab",
    name: "Lahore Fort",
    desc: "A historic fortress and UNESCO World Heritage site representing the rich Mughal heritage.",
    rating: 4.7,
  },
  {
    image: "/images/mohenjo.jpg",
    region: "Sindh",
    name: "Mohenjo-daro",
    desc: "One of the world's earliest major urban settlements, dating back to the Indus Valley Civilization.",
    rating: 4.6,
  },
];

export default function Destinations() {
  return (
    <section className="dest-section">
      <h2 className="dest-title">Famous Destinations in Pakistan</h2>
      <p className="dest-desc">
        Explore some of the most breathtaking places Pakistan has to offer, from majestic mountains to historic landmarks.
      </p>
      <div className="dest-grid">
        {destinations.map((d, i) => (
          <div className="dest-card" key={i}>
            <div
              className="dest-img"
              style={{ backgroundImage: `url(${d.image})` }}
            >
              <div className="dest-gradient" />
              <div className="dest-info">
                <div className="dest-region">
                  <i className="bi bi-geo-alt-fill" /> {d.region}
                </div>
                <div className="dest-name">{d.name}</div>
                <div className="dest-desc-text">{d.desc}</div>
                <div className="dest-bottom">
                  <span className="dest-rating">
                    <i className="bi bi-star-fill" /> {d.rating} Rating
                  </span>
                  <button className="dest-btn">Explore More</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="dest-all-btn">Explore All Destinations</button>
    </section>
  );
} 