import "../css/benefits.css";
import Header from "../components/Header";

import { LuLightbulb, LuBook } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { MdOutlineAnalytics } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function Benefits() {
  return (
    <section className="benefits-section">
      <Header
        title="Benefits for Educators"
        desc="Discover how Beyond the Blackboard helps educators transform their teaching and deliver exceptional learning experiences."
      />

      <div className="benefits-grid">
        {[
          [
            <FaRegClock />,
            "Save Valuable Time",
            "Automate grading, content creation, and administrative tasks to focus more on teaching.",
          ],
          [
            <LuLightbulb />,
            "Personalized Learning at Scale",
            "Deliver customized learning experiences to each student without overwhelming workload.",
          ],
          [
            <TbTargetArrow />,
            "Targeted Interventions",
            "Identify students needing extra help early with AI-powered insights.",
          ],
          [
            <MdOutlineAnalytics />,
            "Actionable Analytics",
            " Get detailed reports on student performance and engagement.",
          ],
          [
            <LuBook />,
            "Dynamic Content Creation",
            "Generate curriculum-aligned materials quickly using AI.",
          ],
          [
            <HiUserGroup />,
            "Supportive Educator Community",
            " Join a network sharing best practices and innovative approaches.",
          ],
        ].map(([icon, title, desc]) => (
          <div className="benefit-card" key={title}>
            <div className="icon-box">{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </div>
      <div className="next-previous">
        <div>
          <FaArrowLeft className="icon" />
        </div>
        <div>
          <FaArrowRight className="icon" />
        </div>
      </div>
    </section>
  );
}
