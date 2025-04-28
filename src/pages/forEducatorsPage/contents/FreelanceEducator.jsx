import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import "../css/freelance.css";

// مكون StatCard لعرض البطاقة الإحصائية
const StatCard = ({ value, description }) => (
  <div className="stat-card">
    <strong>{value}</strong>
    <p>{description}</p>
  </div>
);

// مكون Testimonial لعرض الشهادات
const Testimonial = ({ quote, name, title, image }) => (
  <div className="testimonial-box">
    <h3 className="title">Educator Success Story</h3>
    <p className="quote">"{quote}"</p>
    <div className="testimonial-author">
      <img src={image} alt={name} />
      <div>
        <h3 className="name">{name}</h3>
        <span>{title}</span>
      </div>
    </div>
  </div>
);

// مكون FreelanceListItem لعرض كل عنصر في القائمة
const FreelanceListItem = ({ text }) => (
  <li>
    <IoMdCheckmarkCircleOutline className="check-icon" />
    <span>{text}</span>
  </li>
);

export default function FreelanceEducator() {
  const listItems = [
    "Set your own schedule and rates",
    "Connect with motivated students globally",
    "Leverage our AI tools to enhance your teaching",
    "Create and sell your own courses",
    "Zero platform fees for the first 3 months",
    "Get paid securely and on time",
  ];
  return (
    <section className="freelance-section">
      <div className="freelance-left">
        <h2>
          Become a <span className="highlight-purple">Freelance Educator</span>
        </h2>
        <p>
          Join our marketplace of expert educators and share your knowledge with
          students worldwide. Set your own hours and rates while using our
          platform to handle the administrative details.
        </p>
        <ul className="freelance-list">
          {listItems.map((item, index) => (
            <FreelanceListItem key={index} text={item} />
          ))}
        </ul>
        <a href="#" className="btn apply-btn">
          Apply Now
        </a>
      </div>

      <div className="freelance-right">
        <div className="stat-cards">
          <div className="stat-cards-left">
            <StatCard
              value="$45/hr"
              description="Average hourly rate for programming tutors"
            />
            <StatCard value="$2.5M+" description="Paid to educators in 2023" />
          </div>

          <div className="stat-cards-right">
            <StatCard
              value="15,000+"
              description="Active educators on our platform"
            />
          </div>
        </div>

        <Testimonial
          quote="I was able to quit my full-time job and now earn 30% more while working fewer hours. The AI tools help me create better lesson plans in half the time."
          name="Sarah J."
          title="Computer Science Educator"
          image="https://i.pravatar.cc/40?img=47"
        />
      </div>
    </section>
  );
}
