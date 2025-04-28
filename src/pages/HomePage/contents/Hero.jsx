import { HiOutlineArrowLongRight } from "react-icons/hi2";
import "../css/hero.css";
import Header from "../components/Header";

import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FaChalkboardTeacher } from "react-icons/fa";

export default function Hero() {
  const Button = ({ text, icon }) => (
    <button>
      {icon}
      <span>{text}</span>
    </button>
  );

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Level up your skill</h1>
        <p className="hero-subtitle">
          Beyond the Blackboard offers a modern learning experience with expert
          instructors and AI-powered tools to help you master any subject.
        </p>
        <div className="hero-btn">
          <Button text="Explore Courses" icon={<HiOutlineArrowNarrowRight />} />
          <Button text="Become an instructor" icon={<FaChalkboardTeacher />} />
        </div>
        <div className="hero-trust-badge">
          <div className="hero-stars">
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
          </div>
          <p>Trusted by 5,000 learners worldwide</p>
        </div>
      </div>
      <div className="hero-image-container">
        <img
          src="https://lifeandletters.la.utexas.edu/wp-content/uploads/2019/07/image001.jpg"
          alt="Students collaborating and learning"
          className="hero-image"
        />
        <div className="courses-badge">
          <div className="courses-badge-icon">200+</div>
          <div className="courses-badge-text">
            <p className="badge-title">Courses Available</p>
            <p className="badge-subtitle">Across multiple categories</p>
          </div>
        </div>
      </div>
    </section>
  );
}
