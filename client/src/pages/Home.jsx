import React from "react";
import Hero from "../components/Hero.jsx";
import AovStats from "../components/AovStats.jsx";
import AovHowItWorks from "../components/AovHowItWorks.jsx";
import Destinations from "../components/Destinations.jsx";
import Hotels from "../components/Hotels.jsx";
import Reviews from "../components/Reviews.jsx";
import Blogs from "../components/Blogs.jsx";
import CoverLetter from "../components/CoverLetter.jsx";

const Home = () => {
  return (
    <>
      <Hero />
      <AovStats />
      <AovHowItWorks />
      <Destinations />
      <Hotels />
      <Reviews />
      <Blogs />
      <CoverLetter />
    </>
  );
};

export default Home;
