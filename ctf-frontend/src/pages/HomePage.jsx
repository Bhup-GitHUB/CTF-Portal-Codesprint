import "./HomePage.css";
import mascot from "../assets/mascot.png";
import { useNavigate } from "react-router-dom";
import PillNav from "../components/navbar/PillNav";

import HeroText from "../components/home/HeroText";
import LetterGlitch from "../components/background/LetterGlitch";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page-root">
      {/* 🔥 BACKGROUND */}
      <div className="glitch-bg">
        <LetterGlitch />
      </div>

      {/* 🔝 FOREGROUND */}
      <div className="home-wrapper">
        <PillNav />

        {/* LEFT – MASCOT */}
        <div className="home-left">
          <img src={mascot} alt="CTF Mascot" className="home-mascot" />
        </div>

        {/* RIGHT – CONTENT */}
        <div className="home-right">
          <HeroText />

          

          <h2 className="home-description">
           <p className="home-description">
  Welcome to{" "}
  <strong>
    Code
    <span
      style={{
        background: "linear-gradient(135deg, rgba(80, 160, 255, 0.9), rgba(40, 120, 255, 0.9))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      Sprint
    </span>
  </strong>
  , a battlefield for minds.
  <br />
  Break systems, decode secrets, reverse logic, and dominate the leaderboard.
</p>

          </h2>

        <ul className="home-features">
  <li> <strong>7 challenges</strong>, each worth <strong>100 points</strong></li>
  <li> <strong>1 hour 30 minutes</strong> total contest duration</li>
  <li> <strong>Live leaderboard</strong> updates in real-time</li>
</ul>


       

          <p className="home-footer-text">
            Happy Hunting.
          </p>
        </div>
      </div>
    </div>
  );
}
