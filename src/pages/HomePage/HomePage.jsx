import { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FaChalkboardTeacher, FaRegClock, FaStar } from "react-icons/fa";
import { RiGroupLine } from "react-icons/ri";
import { FiBookOpen, FiUserCheck } from "react-icons/fi";
import { TfiCup } from "react-icons/tfi";
import { AiOutlineGlobal } from "react-icons/ai";
import { LuQuote, LuBrain, LuBookOpen, LuDollarSign } from "react-icons/lu";
import { IoCheckmark, IoCheckmarkSharp } from "react-icons/io5";
import { TiMessages } from "react-icons/ti";
import { VscGraph } from "react-icons/vsc";

// Header Component
function Header({ title, desc }) {
  return (
    <div className="header">
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  );
}

// Hero Component
function Hero() {
  const Button = ({ text, icon, to }) => (
    <Link to={to}>
      <button>
        {icon}
        <span>{text}</span>
      </button>
    </Link>
  );

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Level up your skill</h1>
        <p className="hero-subtitle">
          Beyond the Blackboard offers a modern learning experience with expert
          instructors and AI-powered tools to help you master any subject.
        </p>
        <div className="hero-btn">
          <Button text="Explore Courses" icon={<HiOutlineArrowNarrowRight />} to="/courses" />
          <Button text="Become an instructor" icon={<FaChalkboardTeacher />} to="/for-educators" />
        </div>
        <div className="hero-trust-badge">
          <div className="hero-stars">
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
          </div>
          <p>Trusted by 5,000 learners worldwide</p>
        </div>
      </div>
      <div className="hero-image-container">
        <img
          src="https://lifeandletters.la.utexas.edu/wp-content/uploads/2019/07/image001.jpg"
          alt="Students collaborating and learning"
          className="hero-image"
        />
        <div className="courses-badge">
          <div className="courses-badge-icon">200+</div>
          <div className="courses-badge-text">
            <p className="badge-title">Courses Available</p>
            <p className="badge-subtitle">Across multiple categories</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// OurGlobal Component
function OurGlobal() {
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

// Quote Component
function Quote() {
  return (
    <section className="quote-section">
      <div className="quote-grid">
        {[
          [
            "https://i.pravatar.cc/50?img=32",
            "Dr. Sarah Johnson",
            " Educational Technology Researcher ",
            `"Education is the passport to the future, for tomorrow belongs to those who prepare for it today. With AI-powered tools, that preparation becomes more efficient and effective than ever before."`,
          ],
        ].map(([img, name, role, text], i) => (
          <div className="quote-card" key={i}>
            <LuQuote className="quote-icon" />
            <p>{text}</p>
            <div className="quote-author">
              <img src={img} alt={name} />
              <div>
                <strong>{name}</strong>
                <div className="quote-role">{role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Share Component
function Share() {
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
      "Connect with senior educators who've built successful careers",
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

          <div className="h-tab-content" key={activeTab}>
            <p className="content-title">Everything You Need to Succeed</p>

            {tabs[activeTab].map((item, index) =>
              index % 2 === 0 ? (
                <div className="tab-box" key={index}>
                  <div className="div-icon">
                    <IoCheckmarkSharp className="h-tab-icon" />{" "}
                  </div>
                  <div>
                    <p className="tab-title">{item}</p>
                    <p className="tab-desc">{tabs[activeTab][index + 1]}</p>
                  </div>
                </div>
              ) : null
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

// Stats Component
function Stats() {
  const statsData = [
    { number: "50,000+", label: "Active students" },
    { number: "200+", label: "Complete Courses" },
    { number: "98%", label: "Success Rate" },
    { number: "24/7", label: "Learning Access" },
  ];

  return (
    <section className="stats-section">
      <div className="stats-container">
        {statsData.map((stat, index) => (
          <div className="stat-item" key={index}>
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Student Component
function Student() {
  return (
    <section className="student-section">
      <div className="testimonials-header">
        <h2 className="testimonials-heading">What Our Students Are Saying</h2>
        <p className="testimonials-subtitle">
          Join thousands of students who have transformed their learning journey with our AI-powered platform.
          Discover how Beyond the Blackboard is revolutionizing education.
        </p>
      </div>

      <div className="testimonial-grid">
        {[
          [
            "https://i.pravatar.cc/50?img=48",
            "Emma Rodriguez",
            "Computer Science Student",
            `"Beyond the Blackboard changed my approach to learning programming. The AI tools helped me grasp complex concepts much faster than traditional methods." `,
          ],
          [
            "https://i.pravatar.cc/50?img=32",
            "David Chen",
            "Business Administration Major",
            `"The quality of courses and instructors is exceptional. I especially like the personalized recommendations that helped me discover content I wouldn't have found otherwise."`, 
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
            <div className="testimonial-top">
              <img 
                src={img} 
                alt={name} 
                className="testimonial-avatar" 
              />
              <div className="testimonial-details">
                <h4>{name}</h4>
                <p className="student-title">{role}</p>
              </div>
            </div>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="star" />
              ))}
            </div>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Supercharge Component
function Supercharge() {
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

// Trusted Component
function Trusted() {
  const partnerLogos = [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Harvard_University_logo.svg/600px-Harvard_University_logo.svg.png",
      alt: "Harvard University",
    },
    {
      src: "https://www.designyourway.net/blog/wp-content/uploads/2024/04/the-meaning-behind-the-stanford-university-logo.png",
      alt: "Stanford University",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/321px-MIT_logo.svg.png",
      alt: "MIT",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1920px-Google_2015_logo.svg.png",
      alt: "Google",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Microsoft_icon.svg/512px-Microsoft_icon.svg.png",
      alt: "Microsoft",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1920px-IBM_logo.svg.png",
      alt: "IBM",
    },
  ];

  return (
    <section className="trusted-section">
      <div className="trusted-container">
        <h3>TRUSTED BY LEADING INSTITUTIONS</h3>
        <div className="trusted-logos">
          {partnerLogos.map(({ src, alt }, index) => (
            <img key={index} src={src} alt={alt} className="trusted-logo" />
          ))}
        </div>
      </div>
    </section>
  );
}

// WhyChoose Component
function WhyChoose() {
  const studentBenefits = [
    "AI-powered personalized learning paths",
    "Smart study planner and time optimization",
    "Instant answers to questions via AI tutoring",
    "Progress tracking and performance analytics",
    "Course recommendations based on goals",
  ];

  const educatorBenefits = [
    "Keep 80%+ of your course revenue ",
    "Flexible teaching schedules to fit your time",
    "Global audience reach with marketing support",
    "Advanced analytics on student engagement",
    "Create once, earn passively for years",
  ];

  const BenefitItem = ({ text, color }) => (
    <li>
      <IoCheckmark
        className={`check-mark ${
          color === "green" ? "green-icon" : "gold-icon"
        }`}
      />
      <span>{text}</span>
    </li>
  );
  return (
    <section className="why-choose-section">
      <div className="section-container">
        <Header
          title="Why Choose Beyond the Blackboard"
          desc="Our platform uniquely serves students seeking AI-enhanced learning and educators looking 
for freelance opportunities."
        />
        <div className="why-choose-cards">
          <div className="why-choose-card student-card">
            <div className="card-icon h-student-icon">S</div>
            <h3>For Students</h3>
            <p className="desc-card">
              Accelerate your learning with our AI-powered tools designed to
              make studying more efficient and personalized to your needs.
            </p>
            <ul className="benefits-list">
              {studentBenefits.map((benefit, index) => (
                <BenefitItem key={index} text={benefit} color="green" />
              ))}
            </ul>
            <Link to="/for-students" className="learn-more">
              Learn more about student features{" "}
              <HiOutlineArrowNarrowRight className="icon-more" />
            </Link>
          </div>
          <div className="why-choose-card educator-card">
            <div className="card-icon educator-icon">E</div>
            <h3>For Educators</h3>
            <p className="desc-card">
              Turn your expertise into income with our educator-friendly
              platform that lets you teach on your own terms with maximum
              earnings potential.
            </p>
            <ul className="benefits-list">
              {educatorBenefits.map((benefit, index) => (
                <BenefitItem key={index} text={benefit} />
              ))}
            </ul>
            <Link to="/for-educators" className="learn-more">
              Explore educator opportunities
              <HiOutlineArrowNarrowRight className="icon-more" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main HomePage component
function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <Stats />

      {/* Trusted By Section */}
      <Trusted />
      
      {/* Quote Section */}
      <Quote />

      {/* Our Global Section */}
      <OurGlobal />

      {/* Why Choose Us Section */}
      <WhyChoose />

      {/* Supercharge Your Learning Section */}
      <Supercharge />

      {/* Share Your Knowledge Section */}
      <Share />
      
      {/* Student Testimonials */}
      <Student />
    </div>
  );
}

export default HomePage;
