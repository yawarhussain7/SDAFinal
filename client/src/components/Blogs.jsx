import React from "react";
import "./blogs.css";

const blogs = [
  {
    image: "/images/blog1.jpg",
    title: "Top 10 Must-Visit Destinations in Pakistan",
    date: "June 2024",
    desc: "Discover the most breathtaking places to visit in Pakistan, from the mountains of Hunza to the beaches of Gwadar. Our travel experts share their top picks for an unforgettable adventure.",
    link: "#"
  },
  {
    image: "/images/blog2.jpg",
    title: "A Foodie's Guide to Pakistani Cuisine",
    date: "May 2024",
    desc: "Explore the rich and diverse flavors of Pakistan. From street food in Lahore to traditional dishes in Karachi, this guide will make your taste buds tingle!",
    link: "#"
  },
  {
    image: "/images/blog3.jpg",
    title: "Travel Tips for First-Time Visitors",
    date: "April 2024",
    desc: "Planning your first trip to Pakistan? Here are essential tips on safety, culture, and must-see attractions to make your journey smooth and memorable.",
    link: "#"
  }
];

export default function Blogs() {
  return (
    <section className="blogs-section">
      <h2 className="blogs-title">Latest from Our Blog</h2>
      <div className="blogs-grid">
        {blogs.map((b, i) => (
          <div className="blog-card" key={i}>
            <div className="blog-img" style={{ backgroundImage: `url(${b.image})` }} />
            <div className="blog-info">
              <div className="blog-date">{b.date}</div>
              <div className="blog-title">{b.title}</div>
              <div className="blog-desc">{b.desc}</div>
              <a href={b.link} className="blog-readmore">Read More &rarr;</a>
            </div>
          </div>
        ))}
      </div>
      <button className="blogs-more-btn">More Blogs</button>
    </section>
  );
} 