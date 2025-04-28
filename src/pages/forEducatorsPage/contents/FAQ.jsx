import { useState } from "react";

import "../css/FAQ.css";
import Header from "../components/Header";

import { IoIosArrowDown } from "react-icons/io";

export default function FAQ() {
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
}

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
