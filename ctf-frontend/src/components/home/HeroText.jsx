import RotatingText from "./RotatingText";
import "./HeroText.css";

export default function HeroText() {
  return (
    <div className="hero-text">
      <span className="hero-static">CTF</span>

      <RotatingText
        texts={["think.", "break.", "dominate."]}
        rotationInterval={1800}
        staggerDuration={0.04}
        splitBy="characters"
        mainClassName="hero-rotating"
      />
    </div>
  );
}
