import "../css/quote.css";
import { LuQuote } from "react-icons/lu";

export default function Quote() {
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
