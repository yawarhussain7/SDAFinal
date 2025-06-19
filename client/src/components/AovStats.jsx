import React from "react";
import "./aov.css";

export default function AovStats() {
  const stats = [
    { value: "200+", label: "Destinations" },
    { value: "500+", label: "Hotels" },
    { value: "10K+", label: "Happy Customers" },
    { value: "100+", label: "Tour Packages" },
  ];
  return (
    <section className="aov-stats-section">
      <div className="aov-stats-row">
        {stats.map((stat, i) => (
          <div className="aov-stat" key={i}>
            <div className="aov-stat-value">{stat.value}</div>
            <div className="aov-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
} 