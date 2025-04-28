import { useState } from "react";

import Header from "../components/Header";
import "../css/share.css";

import { LuBrain, LuBookOpen, LuDollarSign } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa";
import { IoCheckmarkSharp } from "react-icons/io5";

export default function Share() {
  const [activeTab, setActiveTab] = useState("support");

  const tabs = {
    support: [
      " AI Course Builder",
      "Create professional-looking content in minutes",
      "24/7 Educator Hotline",
      "Get help when you need it, no matter the time zone",
      "Marketing Templates",
      "Promote your courses with proven marketing materials",
    ],
    growth: [
      "Featured Instructor Spotlights",
      "Get promoted on our homepage and marketing channels",
      "Mentorship Programs",
      "Connect with senior educators who’ve built successful careers",
      "Advanced Analytics",
      "Track performance and optimize your courses with detailed insights",
    ],
    community: [
      "Global Educator Forums",
      "Share insights and get advice from your peers worldwide",
      "Collaboration Projects",
      "Team up with other experts to create multi-disciplinary courses",
      "Annual Virtual Summit",
      "Join our flagship event to learn, network, and get inspired",
    ],
  };

  return (
    <section className="Share-section">
      <Header
        title="Share Your Knowledge, Earn Without Limits"
        desc="Turn your knowledge into income while maintaining your freedom and integrity."
      />

      <div className="Share-grid">
        {[
          [
            <LuBrain />,
            "Set Your Rules",
            "90%",
            "of educators choose their own hours",
            "Teach part-time, full-time, or seasonal—no rigid schedules.",
          ],
          [
            <LuBookOpen />,
            "Earn More, Keep More",
            "$5K/mo",
            "or 85%+ of revenue",
            "No middlemen. Get paid instantly via PayPal, Stripe, or crypto.",
          ],
          [
            <FaRegClock />,
            "Global Classroom",
            "150K+",
            "countries",
            "Teach in your language, set your rates, and grow your brand.",
          ],
        ].map(([icon, title, descNum, desc, des]) => (
          <div className="Share-card" key={title}>
            <div className="icon-box">{icon}</div>
            <h3>{title}</h3>
            <div className="num">
              <p>{descNum}</p>
              <p>{desc}</p>
            </div>
            <p>{des}</p>
          </div>
        ))}
      </div>

      <div className="down">
        <div className="left">
          <div className="right-card">
            <div className="icon-box">
              <LuDollarSign />
            </div>
            <h3>Monthly Earnings</h3>
            <p className="rigth-num">$2,450</p>
            <p className="rigth-desc-num">+25% from last month</p>
            <p>Based on actual data from educators on our platform.</p>
          </div>
        </div>

        <div className="right">
          <div className="tabs">
            {Object.keys(tabs).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`tab-button ${activeTab === key ? "active" : ""}`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>

          <div className="tab-content">
            <p className="content-title">Everything You Need to Succeed</p>

            {tabs[activeTab].map((item, index) =>
              index % 2 === 0 ? (
                <div className="tab-box" key={index}>
                  <div className="div-icon">
                    <IoCheckmarkSharp className="tab-icon" />{" "}
                  </div>
                  <div>
                    <p className="tab-title">{item}</p>
                    <p className="tab-desc">{tabs[activeTab][index + 1]}</p>
                  </div>
                </div>
              ) : null
            )}
          </div>
          <button className="botton-rigth">Join Our Educator Network</button>
        </div>
      </div>
    </section>
  );
}
