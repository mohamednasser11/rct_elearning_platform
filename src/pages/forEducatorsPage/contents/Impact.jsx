import Header from "../components/Header";
import "../css/impact.css";

import { FaArrowUp, FaRegClock } from "react-icons/fa";
import { RiGraduationCapLine } from "react-icons/ri";
import { FiBook } from "react-icons/fi";
import { IoIosRadioButtonOn } from "react-icons/io";
import { TiArrowUp } from "react-icons/ti";

// مكون إحصائيات الكروت
const StatCardItem = ({ icon, colorClass, value, description }) => (
  <li>
    <div className={`impact-icon ${colorClass}`}>{icon}</div>
    <div className="div-list">
      <div>
        <h2>{value}</h2>
        <TiArrowUp className="arrow-up" />
      </div>
      <span>{description}</span>
    </div>
  </li>
);

// مكون الدول والوصول
const ReachListItem = ({ text }) => (
  <li>
    <IoIosRadioButtonOn className="reach-icon" /> {text}
  </li>
);

export default function Impact() {
  const stats = [
    {
      icon: <FaArrowUp />,
      colorClass: "green",
      value: "32%",
      description:
        "Average improvement in student test scores after implementing EduSprint",
    },
    {
      icon: <FaRegClock />,
      colorClass: "blue",
      value: "6.5 hours",
      description:
        "Average weekly time saved by educators on administrative tasks",
    },
    {
      icon: <RiGraduationCapLine />,
      colorClass: "purple",
      value: "87%",
      description: "Increase in student engagement and classroom participation",
    },
    {
      icon: <FiBook />,
      colorClass: "teal",
      value: "2.4x",
      description:
        "Increase in curriculum coverage, allowing educators to teach more effectively",
    },
  ];

  const reachList = [
    <>
      Present in <strong>52 countries</strong> worldwide
    </>,
    <>
      Supporting <strong>10,000+ educators</strong> globally
    </>,
    <>
      Helping <strong>250,000+ students</strong> learn better
    </>,
  ];

  return (
    <section className="impact-section">
      <Header
        title="Our Impact on Education"
        desc="Beyond the Blackboard is transforming how educators teach and how students learn across the globe."
      />

      <div className="impact-cards">
        <div className="impact-card results-card">
          <h2>Measurable Results</h2>
          <ul className="results-list">
            {stats.map((item, index) => (
              <StatCardItem key={index} {...item} />
            ))}
          </ul>
        </div>

        <div className="impact-card reach-card">
          <h2>Global Reach</h2>
          <img
            src="https://lifeandletters.la.utexas.edu/wp-content/uploads/2019/07/image001.jpg"
            alt="Global Reach"
          />
          <ul className="reach-list">
            {reachList.map((text, index) => (
              <ReachListItem key={index} text={text} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
