import "../css/trusted.css";

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

export default function Trusted() {
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
