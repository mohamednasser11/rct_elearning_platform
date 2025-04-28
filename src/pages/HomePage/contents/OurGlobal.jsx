import "../css/our-global.css";
import Header from "../components/Header";

import { RiGroupLine } from "react-icons/ri";
import { FiBookOpen } from "react-icons/fi";
import { TfiCup } from "react-icons/tfi";
import { AiOutlineGlobal } from "react-icons/ai";

export default function OurGlobal() {
  return (
    <section className="our-global-section">
      <Header
        title="Our Global Impact"
        desc="Transforming education worldwide with our AI-powered learning platform."
      />

      <div className="our-global-grid">
        {[
          [
            <RiGroupLine />,
            "500,000+",
            "Active Students",
            "Learning on our platform",
          ],
          [
            <FiBookOpen />,
            "2,000+",
            "Courses Available",
            "In various disciplines",
          ],
          [
            <TfiCup />,
            "15,000+",
            "Certified Educators",
            "Experts in their fields",
          ],
          [
            <AiOutlineGlobal />,
            "190+",
            "Countries Represented",
            "Global learning community",
          ],
        ].map(([icon, title, subtitle, desc]) => (
          <div className="our-global-card" key={title}>
            <div className="icon-box">{icon}</div>
            <h3>{title}</h3>
            <p className="sub-title">{subtitle}</p>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
