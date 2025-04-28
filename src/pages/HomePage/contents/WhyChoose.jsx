import "../css/why-choose.css";
import Header from "../components/Header";

import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { IoCheckmark } from "react-icons/io5";

export default function WhyChoose() {
  const studentBenefits = [
    "AI-powered personalized learning paths",
    "Smart study planner and time optimization",
    "Instant answers to questions via AI tutoring",
    "Progress tracking and performance analytics",
    "Course recommendations based on goals",
  ];

  const educatorBenefits = [
    "Keep 80%+ of your course revenue ",
    "Flexible teaching schedules to fit your time",
    "Global audience reach with marketing support",
    "Advanced analytics on student engagement",
    "Create once, earn passively for years",
  ];

  const BenefitItem = ({ text, color }) => (
    <li>
      <IoCheckmark
        className={`check-mark ${
          color === "green" ? "green-icon" : "gold-icon"
        }`}
      />
      <span>{text}</span>
    </li>
  );
  return (
    <section className="why-choose-section">
      <div className="section-container">
        <Header
          title="Why Choose Beyond the Blackboard"
          desc="Our platform uniquely serves students seeking AI-enhanced learning and educators looking 
for freelance opportunities."
        />
        <div className="why-choose-cards">
          <div className="why-choose-card student-card">
            <div className="card-icon student-icon">S</div>
            <h3>For Students</h3>
            <p className="desc-card">
              Accelerate your learning with our AI-powered tools designed to
              make studying more efficient and personalized to your needs.
            </p>
            <ul className="benefits-list">
              {studentBenefits.map((benefit, index) => (
                <BenefitItem key={index} text={benefit} color="green" />
              ))}
            </ul>
            <a href="/for-students" className="learn-more">
              Learn more about student features{" "}
              <HiOutlineArrowNarrowRight className="icon-more" />
            </a>
          </div>
          <div className="why-choose-card educator-card">
            <div className="card-icon educator-icon">E</div>
            <h3>For Educators</h3>
            <p className="desc-card">
              Turn your expertise into income with our educator-friendly
              platform that lets you teach on your own terms with maximum
              earnings potential.
            </p>
            <ul className="benefits-list">
              {educatorBenefits.map((benefit, index) => (
                <BenefitItem key={index} text={benefit} />
              ))}
            </ul>
            <a href="/for-educators" className="learn-more">
              Explore educator opportunities
              <HiOutlineArrowNarrowRight className="icon-more" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
