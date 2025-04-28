import React from "react";
import "./css/main.css";

import FreelanceEducator from "./contents/FreelanceEducator";
import Hero from "./contents/Hero";
import Benefits from "./contents/Benefits";
import Impact from "./contents/Impact";
import Testimonials from "./contents/Testimonials";
import GetStarted from "./contents/GetStarted";
import FAQ from "./contents/FAQ";

const ForEducatorsPage = () => {
  return (
    <div id="for-educators-page">
      {/* Hero Section */}
      <Hero />

      {/* Freelance Educator Section */}
      <FreelanceEducator />

      {/* Benefits Section */}
      <Benefits />

      {/* Impact Section */}
      <Impact />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Get Started Section */}
      <GetStarted />

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
};

export default ForEducatorsPage;
