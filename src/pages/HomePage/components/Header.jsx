// No need to import CSS here as it's already included in HomePage.css

export default function Header({ title, desc }) {
  return (
    <div className="header">
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  );
}
