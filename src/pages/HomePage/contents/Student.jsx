import Header from "../components/Header";
import "../css/student.css";

import { LuQuote } from "react-icons/lu";

export default function Student() {
  return (
    <section className="student-section">
      <Header
        title="What Our Students Are Saying"
        desc="Join thousands of students who have transformed their learning journey with our AI-powered platform.
            Discover how Beyond the Blackboard is revolutionizing education."
      />

      <div className="testimonial-grid">
        {[
          [
            "https://i.pravatar.cc/50?img=48",
            "Emma Rodriguez",
            "Computer Science Student",
            `"Beyond the Blackboard changed my approach to learning programming. The AI tools 
helped me grasp complex concepts much faster than traditional methods." `,
          ],
          [
            "https://i.pravatar.cc/50?img=32",
            "David Chen",
            "Business Administration Major",
            `"The quality of courses and instructors is exceptional. I especially like the personalized 
recommendations that helped me discover content I wouldn’t have found otherwise."`,
          ],
          [
            "https://i.pravatar.cc/50?img=47",
            "Sophia Williams",
            "Medical Student",
            `"As a medical student, time is precious. The flashcard generator and notes summarizer have 
saved me countless hours of study time while improving my retention."`,
          ],
        ].map(([img, name, role, text], i) => (
          <div className="testimonial-card" key={i}>
            <div className="star-quote-icon">
              <div className="hero-stars">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <LuQuote className="star-quote-icon" />
            </div>
            <p>{text}</p>
            <div className="testimonial-author">
              <img src={img} alt={name} />
              <div>
                <strong>{name}</strong>
                <div className="testimonial-role">{role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="btn-down">
        <p>Join Our Educator Network</p>
        <button className="botton">Join Our Educator Network</button>
      </div>
    </section>
  );
}
