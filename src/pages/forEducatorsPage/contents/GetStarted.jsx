import Header from "../components/Header";
import "../css/get-started.css";

import { CgArrowLongRight } from "react-icons/cg";

export default function GetStarted() {
  return (
    <section className="get-started-section">
      <Header
        title="How to Get Started"
        desc="Joining Beyond The Blackboard as an educator is simple and straightforward"
      />

      <div className="steps-container">
        {[
          [
            "01",
            "Create Your Profile",
            "Sign up as an educator and tell us about your teaching experience and areas of expertise.",
          ],
          [
            "02",
            "Set Up Your Courses",
            "Create your courses using our intuitive course builder and AI-powered content suggestions.",
          ],
          [
            "03",
            "Start Teaching",
            "Publish your courses and begin engaging with students from around the world.",
          ],
        ].map(([num, title, desc], i) => (
          <div className={`step-card`} key={title}>
            <h1>
              <span className="step-number">{num}</span>
            </h1>
            <h2>{title}</h2>

            <p>{desc}</p>
            {(i === 1 || i === 0) && (
              <CgArrowLongRight className="arrow-rigth" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
