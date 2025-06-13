import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HomePage.css';

// Icons
import { FaClock, FaDollarSign, FaGlobeAmericas, FaCheckCircle, FaArrowUp, FaStar } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { AiOutlineRobot, AiOutlineQuestionCircle } from 'react-icons/ai';
import { BiBook, BiTime, BiLineChart, BiUserPin } from 'react-icons/bi';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('support');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Level up your skill</h1>
          <p className="hero-subtitle">
            Beyond the Blackboard offers a modern learning experience with expert instructors and AI-powered tools to help you master any subject.
          </p>
          
          <div className="hero-cta-buttons">
            <button className="cta-button primary">
              <span>Explore Courses</span>
              <BsArrowRight className="arrow-icon" />
            </button>
            <button className="cta-button secondary">
              <span>Become an instructor</span>
            </button>
          </div>
          
          <div className="trust-indicator">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="star-icon" />
              ))}
            </div>
            <p>Trusted by 5,000 learners worldwide</p>
          </div>
        </div>
        
        <div className="hero-image-container">
          <img 
            src="/images/study-group.jpg" 
            alt="Study group collaborating" 
            className="hero-image" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/600x400/e6f7ef/1f2937?text=Study+Group+Image';
            }}
          />
          <div className="courses-badge">
            <span className="badge-number">200+</span>
            <span className="badge-text">Courses Available</span>
            <span className="badge-subtext">Across multiple categories</span>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-item">
          <h3>50,000+</h3>
          <p>Active students</p>
        </div>
        <div className="stat-item">
          <h3>200+</h3>
          <p>Complete Courses</p>
        </div>
        <div className="stat-item">
          <h3>98%</h3>
          <p>Success Rate</p>
        </div>
        <div className="stat-item">
          <h3>24/7</h3>
          <p>Learning Access</p>
        </div>
      </section>
      
      {/* Partners Section */}
      <section className="partners-section">
        <h2>TRUSTED BY LEADING INSTITUTIONS</h2>
        <div className="partner-logos">
          <img 
            src="/images/logos/harvard-logo.png" 
            alt="Harvard University" 
          />
          <img 
            src="/images/logos/stanford-logo.png" 
            alt="Stanford University" 
          />
          <img 
            src="/images/logos/mit-logo.png" 
            alt="MIT" 
          />
          <img 
            src="/images/logos/google-logo.png" 
            alt="Google" 
          />
          <img 
            src="/images/logos/microsoft-logo.png" 
            alt="Microsoft" 
          />
          <img 
            src="/images/logos/ibm-logo.png" 
            alt="IBM" 
          />
        </div>
      </section>
      
      {/* Educator Benefits Section */}
      <section className="educator-benefits">
        <div className="section-header">
          <h2>Join Our Educator Community</h2>
          <p>Turn your knowledge into income while maintaining your freedom and integrity.</p>
        </div>
        
        <div className="benefit-boxes">
          {/* Box 1: Set Your Rules */}
          <div className="benefit-box">
            <div className="icon-wrapper green">
              <FaClock className="benefit-icon" />
            </div>
            <h3>Set Your Rules</h3>
            <div className="highlight">
              <span className="highlight-text">90%</span> of educators choose their hours.
            </div>
            <p>Teach part-time, full-time, or seasonal—no rigid schedules.</p>
          </div>

          {/* Box 2: Earn More, Keep More */}
          <div className="benefit-box">
            <div className="icon-wrapper green">
              <FaDollarSign className="benefit-icon" />
            </div>
            <h3>Earn More, Keep More</h3>
            <div className="highlight">
              <span className="highlight-text">$5k/mo</span> keep 85% of revenue.
            </div>
            <p>No middlemen. Get paid instantly via PayPal, Stripe, or crypto.</p>
          </div>

          {/* Box 3: Global Classroom */}
          <div className="benefit-box">
            <div className="icon-wrapper green">
              <FaGlobeAmericas className="benefit-icon" />
            </div>
            <h3>Global Classroom</h3>
            <div className="highlight">
              <span className="highlight-text">150k+</span> students in 80+ countries.
            </div>
            <p>Teach in your language, set your rates, and grow your brand.</p>
          </div>
        </div>

        <div className="interactive-section">
          {/* Monthly Earnings Card */}
          <div className="earnings-card">
            <div className="icon-circle">
              <FaDollarSign className="dollar-icon" />
            </div>
            <h3>Monthly Earnings</h3>
            <div className="earnings-amount">$2,450</div>
            <div className="growth-indicator">
              <FaArrowUp className="arrow-up" />
              <span className="growth-text">+15% from last month</span>
            </div>
            <p className="earnings-note">Based on actual data from educators on our platform</p>
          </div>

          {/* Features Toggle Section */}
          <div className="features-toggle">
            <div className="toggle-buttons">
              <button 
                className={`toggle-btn ${activeTab === 'support' ? 'active' : ''}`}
                onClick={() => handleTabChange('support')}
              >
                Support & Tools
              </button>
              <button 
                className={`toggle-btn ${activeTab === 'growth' ? 'active' : ''}`}
                onClick={() => handleTabChange('growth')}
              >
                Growth
              </button>
              <button 
                className={`toggle-btn ${activeTab === 'community' ? 'active' : ''}`}
                onClick={() => handleTabChange('community')}
              >
                Community
              </button>
            </div>

            <div className="toggle-content">
              <AnimatePresence mode="wait">
                {activeTab === 'support' && (
                  <motion.div 
                    key="support"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="feature-content"
                  >
                    <h3>Everything You Need to Succeed</h3>
                    <div className="feature-item">
                      <FaCheckCircle className="check-icon" />
                      <div>
                        <h4>AI Course Builder</h4>
                        <p>Create professional-looking content in minutes</p>
                      </div>
                    </div>
                    <div className="feature-item">
                      <FaCheckCircle className="check-icon" />
                      <div>
                        <h4>24/7 Educator Hotline</h4>
                        <p>Get help when you need it, no matter the time zone</p>
                      </div>
                    </div>
                    <div className="feature-item">
                      <FaCheckCircle className="check-icon" />
                      <div>
                        <h4>Marketing Templates</h4>
                        <p>Promote your courses with proven marketing materials</p>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'growth' && (
                  <motion.div 
                    key="growth"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="tab-content"
                  >
                    <ul className="feature-list">
                      <li><FaCheckCircle className="check-icon" /> AI-powered course recommendations to boost your sales</li>
                      <li><FaCheckCircle className="check-icon" /> Marketing tools and promotional opportunities</li>
                      <li><FaCheckCircle className="check-icon" /> Detailed analytics on student engagement</li>
                      <li><FaCheckCircle className="check-icon" /> Regular platform-wide promotions featuring your courses</li>
                    </ul>
                  </motion.div>
                )}
                
                {activeTab === 'community' && (
                  <motion.div 
                    key="community"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="tab-content"
                  >
                    <ul className="feature-list">
                      <li><FaCheckCircle className="check-icon" /> Join a network of 15,000+ educators worldwide</li>
                      <li><FaCheckCircle className="check-icon" /> Collaborate on multi-instructor courses</li>
                      <li><FaCheckCircle className="check-icon" /> Participate in educator-only webinars and events</li>
                      <li><FaCheckCircle className="check-icon" /> Share resources and best practices in our forums</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="cta-button">
                <button className="join-button">Join Our Educator Network</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Supercharge Your Learning Section */}
      <section className="supercharge-section">
        <div className="section-header">
          <h2>Supercharge Your Learning</h2>
          <p className="supercharge-subtitle">Our AI-powered features are designed to optimize your study time and maximize knowledge retention.</p>
        </div>
        
        <div className="feature-cards-grid">
          {/* AI Study Assistant */}
          <motion.div 
            className="feature-card"
            whileHover={{ y: -5, boxShadow: '0 8px 15px rgba(0, 0, 0, 0.08)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="feature-icon">
              <AiOutlineRobot />
            </div>
            <h3>AI Study Assistant</h3>
            <p>Get personalized help from our advanced AI assistant that answers your questions and provides guidance when you need it.</p>
          </motion.div>
          
          {/* Smart Content Library */}
          <motion.div 
            className="feature-card"
            whileHover={{ y: -5, boxShadow: '0 8px 15px rgba(0, 0, 0, 0.08)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="feature-icon">
              <BiBook />
            </div>
            <h3>Smart Content Library</h3>
            <p>Access thousands of curated textbooks, lectures, and curriculum-tied learning resources that fit your unique needs.</p>
          </motion.div>
          
          {/* Time-Optimized Learning */}
          <motion.div 
            className="feature-card"
            whileHover={{ y: -5, boxShadow: '0 8px 15px rgba(0, 0, 0, 0.08)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="feature-icon">
              <BiTime />
            </div>
            <h3>Time-Optimized Learning</h3>
            <p>Our AI analyzes your optimal learning window and creates personalized schedules that maximize retention and efficiency.</p>
          </motion.div>
          
          {/* Interactive Q&A */}
          <motion.div 
            className="feature-card"
            whileHover={{ y: -5, boxShadow: '0 8px 15px rgba(0, 0, 0, 0.08)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="feature-icon">
              <AiOutlineQuestionCircle />
            </div>
            <h3>Interactive Q&A</h3>
            <p>Ask questions about any topic and receive detailed, interactive explanations designed to enhance understanding.</p>
          </motion.div>
          
          {/* Progress Analytics */}
          <motion.div 
            className="feature-card"
            whileHover={{ y: -5, boxShadow: '0 8px 15px rgba(0, 0, 0, 0.08)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="feature-icon">
              <BiLineChart />
            </div>
            <h3>Progress Analytics</h3>
            <p>Track your learning journey with detailed analytics that reveal your strong areas and growth opportunities.</p>
          </motion.div>
          
          {/* Personalized Roadmaps */}
          <motion.div 
            className="feature-card"
            whileHover={{ y: -5, boxShadow: '0 8px 15px rgba(0, 0, 0, 0.08)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="feature-icon">
              <BiUserPin />
            </div>
            <h3>Personalized Roadmaps</h3>
            <p>Get custom learning paths based on your goals, prior knowledge, and preferred learning styles.</p>
          </motion.div>
        </div>
      </section>
      
      {/* Why Choose Beyond the Blackboard Section */}
      <section className="why-choose-section">
        <h2>Why Choose Beyond the Blackboard</h2>
        <p className="why-choose-subtitle">
          Our platform uniquely serves both students seeking AI-enhanced learning and educators
          looking for freelance opportunities.
        </p>
        
        <div className="benefits-cards-container">
          {/* Students Card */}
          <div className="benefit-card">
            <div className="benefit-header">
              <div className="benefit-icon student-icon">
                <span>S</span>
              </div>
              <h3>For Students</h3>
            </div>
            
            <p className="benefit-description">
              Accelerate your learning with our AI-powered tools designed to
              make studying more efficient and personalized to your needs.
            </p>
            
            <ul className="benefit-list">
              <li>
                <FaCheckCircle className="check-icon" />
                <span>AI-powered personalized learning paths</span>
              </li>
              <li>
                <FaCheckCircle className="check-icon" />
                <span>Smart study planner and time optimization</span>
              </li>
              <li>
                <FaCheckCircle className="check-icon" />
                <span>Instant answers to questions with AI tutoring</span>
              </li>
              <li>
                <FaCheckCircle className="check-icon" />
                <span>Progress tracking and performance analytics</span>
              </li>
              <li>
                <FaCheckCircle className="check-icon" />
                <span>Course recommendations based on your goals</span>
              </li>
            </ul>
            
            <a href="#" className="learn-more-link">
              Learn more about student features <BsArrowRight className="arrow-icon" />
            </a>
          </div>
          
          {/* Educators Card */}
          <div className="benefit-card">
            <div className="benefit-header">
              <div className="benefit-icon educator-icon">
                <span>E</span>
              </div>
              <h3>For Educators</h3>
            </div>
            
            <p className="benefit-description">
              Turn your expertise into income with our educator-friendly platform
              that lets you teach on your own terms with maximum earnings
              potential.
            </p>
            
            <ul className="benefit-list">
              <li>
                <FaCheckCircle className="check-icon" />
                <span>Keep 80% of your course revenue</span>
              </li>
              <li>
                <FaCheckCircle className="check-icon" />
                <span>Flexible teaching schedule on your terms</span>
              </li>
              <li>
                <FaCheckCircle className="check-icon" />
                <span>Global audience reach without marketing hassle</span>
              </li>
              <li>
                <FaCheckCircle className="check-icon" />
                <span>Advanced analytics on student engagement</span>
              </li>
              <li>
                <FaCheckCircle className="check-icon" />
                <span>Create once, earn passively for years</span>
              </li>
            </ul>
            
            <a href="#" className="learn-more-link">
              Explore educator opportunities <BsArrowRight className="arrow-icon" />
            </a>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>What Our Students Are Saying</h2>
          <p className="testimonials-subtitle">
            Thousands of students have transformed their learning experience with Beyond the
            Blackboard. Here's what some of them have to say.
          </p>
        </div>
        
        <div className="testimonial-cards">
          {/* Testimonial 1 */}
          <div className="testimonial-card">
            <div className="testimonial-rating">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="rating-star" />
              ))}
            </div>
            <div className="testimonial-quote">
              <p>"Beyond the Blackboard changed my approach to learning programming. The AI tools helped me grasp complex concepts much faster than traditional methods."</p>
            </div>
            <div className="testimonial-author">
              <img 
                src="https://randomuser.me/api/portraits/women/65.jpg" 
                alt="Emma Rodriguez"
                className="author-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/100x100/e6f7ef/1f2937?text=ER';
                }}
              />
              <div className="author-info">
                <h4>Emma Rodriguez</h4>
                <p>Computer Science Student</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 2 */}
          <div className="testimonial-card">
            <div className="testimonial-rating">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="rating-star" />
              ))}
            </div>
            <div className="testimonial-quote">
              <p>"The quality of courses and instructors is exceptional. I especially love the personalized recommendations that helped me discover courses I wouldn't have found otherwise."</p>
            </div>
            <div className="testimonial-author">
              <img 
                src="https://randomuser.me/api/portraits/men/42.jpg" 
                alt="David Chen"
                className="author-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/100x100/e6f7ef/1f2937?text=DC';
                }}
              />
              <div className="author-info">
                <h4>David Chen</h4>
                <p>Business Administration Major</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 3 */}
          <div className="testimonial-card">
            <div className="testimonial-rating">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="rating-star" />
              ))}
            </div>
            <div className="testimonial-quote">
              <p>"As a medical student, time is precious. The flashcard generator and notes summarizer have saved me countless hours of study time while improving my retention."</p>
            </div>
            <div className="testimonial-author">
              <img 
                src="https://randomuser.me/api/portraits/women/33.jpg" 
                alt="Sophia Williams"
                className="author-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/100x100/e6f7ef/1f2937?text=SW';
                }}
              />
              <div className="author-info">
                <h4>Sophia Williams</h4>
                <p>Medical Student</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="testimonials-cta">
          <p>Join over 100,000 satisfied students</p>
          <button className="cta-button primary">
            <span>Join Our Community</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;