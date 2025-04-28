import { HiOutlineArrowLongRight } from "react-icons/hi2";
import "../css/hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-left">
          <h1>
            Empower Your <br />
            <span className="text-blue">Teaching</span> with AI
          </h1>
          <p>
            Join our community of educators and transform your teaching approach
            with innovative AI tools designed for modern education.
          </p>
          <div className="hero-buttons">
            <HeroButton
              href="#"
              className="btn btn-primary"
              text="Become an Educator"
              icon={<HiOutlineArrowLongRight className="arrow-icon" />}
            />
            <HeroButton
              href="#"
              className="btn btn-secondary"
              text="Learn More"
            />
          </div>
        </div>
        <div className="hero-right">
          <img
            src="https://lifeandletters.la.utexas.edu/wp-content/uploads/2019/07/image001.jpg"
            alt="Classroom"
          />
        </div>
      </div>
    </section>
  );
}

const HeroButton = ({ href, className, text, icon }) => {
  return (
    <a href={href} className={className}>
      <span>{text}</span>
      {icon && icon}
    </a>
  );
};
