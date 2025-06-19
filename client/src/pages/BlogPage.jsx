import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BlogPage.css";

const blogs = [
  {
    image: "/images/blog1.jpg",
    category: "Travel Tips",
    title: "10 Essential Tips for Traveling in Pakistan",
    desc: "Discover the must-know tips for a safe and enjoyable journey across Pakistan's diverse regions.",
  },
  {
    image: "/images/blog2.jpg",
    category: "Culture",
    title: "Exploring Pakistan's Rich Heritage",
    desc: "Dive into the vibrant culture, traditions, and history that make Pakistan a unique destination.",
  },
  {
    image: "/images/blog3.jpg",
    category: "Adventure",
    title: "Top 5 Adventure Destinations in Pakistan",
    desc: "From the Karakoram to the Himalayas, explore the best spots for thrill-seekers and nature lovers.",
  },
  {
    image: "/images/blog4.jpg",
    category: "Food",
    title: "A Foodie's Guide to Pakistani Cuisine",
    desc: "Savor the flavors of Pakistan with our guide to the country's most delicious and iconic dishes.",
  },
  {
    image: "/images/blog5.jpg",
    category: "Nature",
    title: "The Most Beautiful Lakes in Pakistan",
    desc: "A visual journey through Pakistan's stunning lakes, from Saif-ul-Malook to Attabad Lake.",
  },
  {
    image: "/images/blog6.jpg",
    category: "Guides",
    title: "How to Plan Your First Trip to Pakistan",
    desc: "Step-by-step advice for first-time visitors, from visas to must-see destinations.",
  },
];

export default function BlogPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {/* Bootstrap CSS and Fonts */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <section
        className={`blog-section min-vh-100 ${isLoaded ? "fade-in" : ""}`}
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}>
        <div className="container h-100 py-5">
          {/* Hero Section */}
          <div className="text-center mb-5">
            <h1 className="section-title fw-bold mb-3">
              Travel Stories & Guides
            </h1>
            <p className="text-muted fs-5 mb-0">
              Get inspired by our latest travel stories, tips, and guides for
              exploring Pakistan.
            </p>
          </div>

          {/* Blog Grid Section */}
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {blogs.map((b, i) => (
              <div className="col" key={i}>
                <div className="card glassmorphism h-100">
                  <img
                    src={b.image}
                    className="card-img-top"
                    alt={b.title}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "15px 15px 0 0",
                    }}
                  />
                  <div className="card-body">
                    <span className="badge bg-primary mb-2">{b.category}</span>
                    <h5 className="card-title fw-bold">{b.title}</h5>
                    <p className="card-text text-muted">{b.desc}</p>
                    <button className="btn btn-gradient btn-sm rounded-pill fw-medium">
                      <i className="bi bi-arrow-right-circle me-2"></i>
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom CSS to match Login page */}
      <style jsx>{`
        .blog-section {
          position: relative;
          overflow: hidden;
          background-attachment: fixed;
        }
        .blog-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 32, 39, 0.5);
          z-index: 1;
        }
        .container {
          position: relative;
          z-index: 2;
        }
        .glassmorphism {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border-radius: 15px;
        }
        .section-title {
          position: relative;
          display: inline-block;
          color: #2b6777;
        }
        .section-title::after {
          content: "";
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: linear-gradient(135deg, #b07d3c, #a0522d);
          border-radius: 2px;
        }
        .card-img-top {
          transition: transform 0.3s ease;
        }
        .card:hover .card-img-top {
          transform: scale(1.05);
        }
        .card-title {
          color: #333;
        }
        .badge {
          background-color: #b07d3c !important;
          font-size: 0.9rem;
          padding: 0.5rem 1rem;
        }
        .btn-gradient {
          background: linear-gradient(135deg, #b07d3c, #a0522d);
          border: none;
          transition: all 0.3s ease;
        }
        .btn-gradient:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(176, 125, 60, 0.3);
        }
        .text-primary {
          color: #b07d3c !important;
          transition: color 0.3s;
        }
        .text-primary:hover {
          color: #a0522d !important;
        }
        .text-muted {
          color: #6c757d !important;
        }
        .fade-in {
          animation: fadeIn 1s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 991px) {
          .blog-section {
            padding: 2rem 0;
          }
        }
      `}</style>
    </>
  );
}
