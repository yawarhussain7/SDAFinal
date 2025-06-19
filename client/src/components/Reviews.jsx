import React from "react";
import "./reviews.css";

const reviews = [
  {
    name: "Sarah Johnson",
    avatar: "/images/review1.jpg",
    subtitle: "Visited Hunza Valley",
    text: "Our trip to Hunza Valley was absolutely incredible! The hotel Travelars recommended was perfect and the views were breathtaking. Will definitely book through them again.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    avatar: "/images/review2.jpg",
    subtitle: "Cultural Tour in Lahore",
    text: "The cultural tour of Lahore exceeded all expectations. The guides were knowledgeable and the historical sites were fascinating. Travelars made it all so easy to arrange!",
    rating: 5,
  },
  {
    name: "Aisha Khan",
    avatar: "/images/review3.jpg",
    subtitle: "Stayed in Islamabad",
    text: "From booking to check-out, everything was smooth and hassle-free. The Serena Hotel in Islamabad was luxurious and the staff were incredibly welcoming. Can't wait for our next trip!",
    rating: 5,
  },
];

export default function Reviews() {
  return (
    <section className="reviews-section">
      <h2 className="reviews-title">
        What Our <span className="reviews-title-highlight">Customers</span> Say
      </h2>
      <div className="reviews-grid">
        {reviews.map((r, i) => (
          <div className="review-card" key={i}>
            <div className="review-stars">
              {[...Array(r.rating)].map((_, j) => (
                <i className="bi bi-star-fill" key={j}></i>
              ))}
            </div>
            <div className="review-text">"{r.text}"</div>
            <div className="review-user-row">
              {r.avatar && r.avatar.startsWith("/") ? (
                <img src={r.avatar} alt={r.name} className="review-avatar-img" />
              ) : (
                <div className="review-avatar">{r.avatar}</div>
              )}
              <div>
                <div className="review-user-name">{r.name}</div>
                <div className="review-user-subtitle">{r.subtitle}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 