import React from 'react';
import { Link } from 'react-router-dom';
// Icon imports are grouped by library for better organization
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaRegCopyright } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn, MdKeyboardArrowRight } from 'react-icons/md';

import './Footer.css';

/**
 * Enhanced Footer Component
 * 
 * Provides site-wide footer content including:
 * - Branding and social media links
 * - Navigation sections for quick links and course categories
 * - Contact information
 * 
 * Uses semantic HTML5 elements for better accessibility and SEO,
 * with responsive grid layout and modern visual effects.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Quick links data array
  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'Courses' },
    { to: '/for-students', label: 'For Students' },
    { to: '/for-educators', label: 'For Educators' },
    { to: '/ai-tools', label: 'AI Tools' }
  ];

  // Categories data array
  const categories = [
    { to: '/courses?field=Programming', label: 'Programming' },
    { to: '/courses?field=Design', label: 'Design' },
    { to: '/courses?field=Business', label: 'Business' },
    { to: '/courses?field=Marketing', label: 'Marketing' },
    { to: '/courses?field=Data Science', label: 'Data Science' }
  ];

  // Social media data array
  const socialMedia = [
    { href: 'https://facebook.com', label: 'Facebook', icon: FaFacebookF },
    { href: 'https://twitter.com', label: 'Twitter', icon: FaTwitter },
    { href: 'https://instagram.com', label: 'Instagram', icon: FaInstagram },
    { href: 'https://linkedin.com', label: 'LinkedIn', icon: FaLinkedinIn },
    { href: 'https://youtube.com', label: 'YouTube', icon: FaYoutube }
  ];

  // Contact information array
  const contactInfo = [
    {
      icon: MdLocationOn,
      content: '123 Learning Street, Education City, 10001',
      isLink: false
    },
    {
      icon: MdPhone,
      content: '+123 456 7890',
      isLink: true,
      href: 'tel:+1234567890'
    },
    {
      icon: MdEmail,
      content: 'info@beyondblackboard.com',
      isLink: true,
      href: 'mailto:info@beyondblackboard.com'
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#111" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,165.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      <div className="footer-container">
        {/* About section with branding and social links */}
        <div className="footer-section about-section">
          <div className="footer-branding">
            <h3>Beyond the Blackboard</h3>
          </div>
          <p>Empowering education beyond traditional boundaries. Connect, learn, and grow with our innovative platform that brings quality education right to your fingertips.</p>
          
          {/* Social media links with accessibility attributes */}
          <div className="social-icons">
            {socialMedia.map((social, index) => {
              const Icon = social.icon;
              return (
                <a 
                  key={index}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={social.label}
                >
                  <Icon />
                  <span className="social-hover-effect"></span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Quick Links navigation section */}
        <div className="footer-section quick-links">
          <h3 id="quick-links-heading">Quick Links</h3>
          <nav aria-labelledby="quick-links-heading">
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <MdKeyboardArrowRight className="link-arrow" />
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Course Categories navigation section */}
        <div className="footer-section categories">
          <h3 id="categories-heading">Categories</h3>
          <nav aria-labelledby="categories-heading">
            <ul>
              {categories.map((category, index) => (
                <li key={index}>
                  <MdKeyboardArrowRight className="link-arrow" />
                  <Link to={category.to}>{category.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Contact information section */}
        <div className="footer-section contact-us">
          <h3>Contact Us</h3>
          <ul>
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index} className="contact-item">
                  <div className="contact-icon-wrapper">
                    <Icon className="contact-icon" />
                  </div>
                  {item.isLink ? (
                    <a href={item.href}>{item.content}</a>
                  ) : (
                    <span>{item.content}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      
      {/* Copyright section */}
      <div className="copyright">
        <div className="copyright-container">
          <p>
            <FaRegCopyright /> {currentYear} Beyond the Blackboard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
