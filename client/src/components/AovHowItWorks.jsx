import React from "react";
import "./aov.css";

const steps = [
  {
    icon: "bi-search",
    color: "#bcdbe6",
    title: "Search",
    desc: "Find your perfect destination or accommodation using our search filters."
  },
  {
    icon: "bi-geo-alt",
    color: "#ffb366",
    title: "Select",
    desc: "Choose from our curated selection of hotels and tour packages."
  },
  {
    icon: "bi-calendar-event",
    color: "#fff3c2",
    title: "Book",
    desc: "Secure your reservation with our easy booking system and payment options."
  },
  {
    icon: "bi-people",
    color: "#bcdbe6",
    title: "Enjoy",
    desc: "Experience the beauty of Pakistan with memories that last a lifetime."
  }
];

export default function AovHowItWorks() {
  return (
    <section className="aov-hiw-section">
      <h2 className="aov-hiw-title">How It Works</h2>
      <p className="aov-hiw-desc">Follow these simple steps to book your perfect Pakistan getaway with Travelars.</p>
      <div className="aov-hiw-row">
        {steps.map((step, i) => (
          <div className="aov-hiw-step" key={i}>
            <div className="aov-hiw-icon" style={{ background: step.color }}>
              <i className={`bi ${step.icon}`}></i>
            </div>
            <div className="aov-hiw-step-title">{step.title}</div>
            <div className="aov-hiw-step-desc">{step.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
} 