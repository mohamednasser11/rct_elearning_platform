import React, { useState } from "react";
import "./forEducatorsPage.css";
import { LuLightbulb, LuBook, LuQuote } from "react-icons/lu";
import { FaRegClock, FaArrowUp, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { MdOutlineAnalytics } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi2";
import { IoIosArrowDown, IoIosRadioButtonOn, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiGraduationCapLine } from "react-icons/ri";
import { FiBook } from "react-icons/fi";
import { TiArrowUp } from "react-icons/ti";
import { CgArrowLongRight } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

// Header Component
const Header = ({ title, desc }) => (
  <div className="header">
    <h2>{title}</h2>
    <p>{desc}</p>
  </div>
);

// Hero Component
const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="promo-section">
      <div className="text-column">
        <div className="student-badge">FOR EDUCATORS</div>
        <h1 className="main-heading">
          Empower Your <span className="highlight">Teaching</span> with AI
        </h1>
        <p className="subheading">
          Join our community of educators and transform your teaching approach
          with innovative AI tools designed for modern education.
        </p>
        <div className="cta-buttons">
          <button
            className="cta-button primary"
            onClick={() => navigate("/signup")}
          >
            Become an Educator
          </button>
          <button className="cta-button secondary">
            Learn More
          </button>
        </div>
      </div>
      <div className="image-column">
        <div className="laptop-container">
          <img
            src="https://lifeandletters.la.utexas.edu/wp-content/uploads/2019/07/image001.jpg"
            alt="Classroom"
            className="laptop-image"
          />
        </div>
      </div>
    </div>
  );
};

// Freelance Educator Component
const FreelanceEducator = () => {
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
            <li key={index}>
              <IoMdCheckmarkCircleOutline className="check-icon" />
              <span>{item}</span>
            </li>
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
};

const StatCard = ({ value, description }) => (
  <div className="stat-card">
    <strong>{value}</strong>
    <p>{description}</p>
  </div>
);

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

// Benefits Component
const Benefits = () => {
  return (
    <section className="benefits-section">
      <Header
        title="Benefits for Educators"
        desc="Discover how Beyond the Blackboard helps educators transform their teaching and deliver exceptional learning experiences."
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
          <div className="fe-benefit-card" key={title}>
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
};

// Impact Component
const Impact = () => {
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
              <li key={index}>
                <div className={`impact-icon ${item.colorClass}`}>{item.icon}</div>
                <div className="div-list">
                  <div>
                    <h2>{item.value}</h2>
                    <TiArrowUp className="arrow-up" />
                  </div>
                  <span>{item.description}</span>
                </div>
              </li>
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
              <li key={index}>
                <IoIosRadioButtonOn className="reach-icon" /> {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

// Testimonials Component
const Testimonials = () => {
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
};

// Get Started Component
const GetStarted = () => {
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
};

// FAQ Component
const FAQ = () => {
  return (
    <section className="faq-section">
      <Header
        title="Frequently Asked Questions"
        desc="Find answers to common questions about becoming an educator on
          Beyond The Blackboard."
      />

      <div className="faq-list">
        {[
          [
            "What qualifications do I need to become an educator?",
            "You should have experience in your subject area, but formal teaching credentials are not always required.",
          ],
          [
            "How does the revenue sharing work?",
            "You earn based on course sales or hourly sessions, minus a small platform fee.",
          ],
          [
            "How much time does it take to create a course?",
            "It depends on the depth of content, but most educators create their first course in under a week using our tools.",
          ],
          [
            "Can I import existing course materials?",
            "Yes, you can upload PDFs, videos, and slides to build your course quickly.",
          ],
          [
            "What kind of support do you offer to educators?",
            "We offer onboarding support, AI content tools, marketing help, and dedicated educator success teams.",
          ],
          [
            "Do I retain ownership of my course content?",
            "Absolutely. You retain full rights and can remove your content anytime.",
          ],
        ].map(([q, a], i) => (
          <FAQItem key={i} question={q} answer={a} />
        ))}
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        {question}
        <IoIosArrowDown className="faq-arrow" />
      </button>
      <div className="faq-answer">{answer}</div>
    </div>
  );
};

// Main Component
const ForEducatorsPage = () => {
  return (
    <div id="for-educators-page">
      <Hero />
      <FreelanceEducator />
      <Benefits />
      <Impact />
      <Testimonials />
      <GetStarted />
      <FAQ />
    </div>
  );
};

export default ForEducatorsPage; 