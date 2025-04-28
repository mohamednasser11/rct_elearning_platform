import "./HomePage.css";
import Hero from "./contents/Hero";
import Stats from "./contents/Stats";
import Trusted from "./contents/Trusted";
import Quote from "./contents/Quote";
import OurGlobal from "./contents/OurGlobal";
import WhyChoose from "./contents/WhyChoose";
import Supercharge from "./contents/Supercharge";
import Student from "./contents/Student";
import Share from "./contents/Share";

function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <Stats />

      {/* Trusted By Section */}
      <Trusted />
      {/* Quote Section */}
      <Quote />

      {/* Our Global Section */}
      <OurGlobal />

      {/* Why Choose Us Section */}
      <WhyChoose />

      {/* Supercharge Your Learning Section */}
      <Supercharge />

      {/* Share Your Knowledge Section */}
      <Share />
      {/* Student Testimonials */}
      <Student />
    </div>
  );
}

export default HomePage;
