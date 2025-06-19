import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./hero.css";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    heading: "Explore the World with Tourify",
    subheading: "Discover breathtaking destinations, unique cultures, and unforgettable adventures."
  },
  {
    image:
      "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=1200&q=80",
    heading: "Your Journey Begins Here",
    subheading: "Book hotels, find the best places, and get expert travel advice—all in one place."
  },
  {
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    heading: "Adventure Awaits",
    subheading: "Let us help you plan the trip of your dreams."
  }
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="hero-section">
      <div className="hero-slider">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="hero-slide"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8 }}
            style={{ backgroundImage: `url(${slides[index].image})` }}
          >
            <div className="hero-overlay">
              <motion.h1
                className="hero-heading"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {slides[index].heading}
              </motion.h1>
              <motion.p
                className="hero-subheading"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {slides[index].subheading}
              </motion.p>
              <motion.div
                className="hero-buttons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <button className="hero-btn hero-btn-primary">Book</button>
                <button className="hero-btn hero-btn-outline">Take Trip Advice</button>
              </motion.div>
              <div className="hero-pagination">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    className={`hero-dot${i === index ? " active" : ""}`}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
