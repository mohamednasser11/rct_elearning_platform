import Header from "../components/Header";
import "../css/testimonials.css";

import { LuQuote } from "react-icons/lu";

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <Header
        title="Educators Love Beyond The Blackboard"
        desc="Hear from educators who have transformed their teaching experience with our platform."
      />

      <div className="testimonial-grid">
        {[
          [
            "https://i.pravatar.cc/50?img=48",
            "Dr. Emily Rodriguez",
            "High School Science Teacher",
            "Lincoln High School",
            `" Beyond the Blackboard has completely transformed my teaching. I can now create 
personalized learning paths for each student, and the AI grading tool saves me hours every 
week."`,
          ],
          [
            "https://i.pravatar.cc/50?img=32",
            "Prof. James Wilson",
            "Computer Science Professor",
            "Westfield University",
            `"As a university professor managing large classes, Beyond the Blackboard has been a game
changer. The analytics help me identify students who need extra support."`,
          ],
          [
            "https://i.pravatar.cc/50?img=47",
            "Sarah Thompson",
            "Elementary School Teacher",
            "Oakridge Elementary",
            `"The time I save with Beyond the Blackboard allows me to focus on building relationships 
with my students."`,
          ],
        ].map(([img, name, role, school, text], i) => (
          <div className="testimonial-card" key={i}>
            <LuQuote className="quote-icon-testimonial" />
            <p>{text}</p>
            <div className="testimonial-author">
              <img src={img} alt={name} />
              <div>
                <strong>{name}</strong>
                <div className="testimonial-role">{role}</div>
                <div className="testimonial-school">{school}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
