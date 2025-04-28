import "../css/supercharge.css";
import Header from "../components/Header";

import { LuBrain, LuBookOpen } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { VscGraph } from "react-icons/vsc";
import { FiUserCheck } from "react-icons/fi";

export default function Supercharge() {
  return (
    <section className="supercharge-section">
      <Header
        title="Supercharge Your Learning"
        desc="Our AI-powered features are designed to optimize your study time and maximize 
knowledge retention."
      />

      <div className="supercharge-grid">
        {[
          [
            <LuBrain />,
            "AI Study Assistant",
            "Get personalized help from our advanced AI tutor that adapts to your learning style and answers questions 24/7.",
          ],
          [
            <LuBookOpen />,
            "Smart Content Library",
            "Access thousands of courses, textbooks, and practice materials tailored to your curriculum and learning goals.",
          ],
          [
            <FaRegClock />,
            "Time-Optimized Learning",
            "Our AI identifies your optimal learning windows and creates schedules to maximize retention and efficiency.",
          ],
          [
            <TiMessages />,
            "Interactive Q&A",
            "Ask questions about any topic and receive detailed, easy-to-understand explanations in seconds.",
          ],
          [
            <VscGraph />,
            "Progress Analytics",
            "Track your learning journey with detailed analytics that show strengths, weaknesses, and improvement areas.",
          ],
          [
            <FiUserCheck />,
            "Personalized Roadmaps",
            "Get custom learning paths based on your goals, prior knowledge, and preferred learning pace.",
          ],
        ].map(([icon, title, desc]) => (
          <div className="supercharge-card" key={title}>
            <div className="icon-box">{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
