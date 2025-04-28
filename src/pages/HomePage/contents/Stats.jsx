import "../css/stats.css";

const statsData = [
  { number: "50,000+", label: "Active students" },
  { number: "200+", label: "Complete Courses" },
  { number: "98%", label: "Success Rate" },
  { number: "24/7", label: "Learning Access" },
];

export default function Stats() {
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
