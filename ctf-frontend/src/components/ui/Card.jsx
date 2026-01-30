import { useEffect, useRef } from "react";
import "./Card.css";
import { Fingerprint, Activity, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Card = ({
  blurStrength = 12,
  color = "white",
  metalness = 1,
  roughness = 0.4,
  overlayColor = "rgba(255, 255, 255, 0.1)",
  displacementStrength = 20,
  noiseScale = 1,
  specularConstant = 1.2,
  grayscale = 1,
  glassDistortion = 0,
  className = "",
  style = {},
}) => {

  const baseFrequency = 0.03 / Math.max(0.1, noiseScale);
  const saturation = 1 - Math.max(0, Math.min(1, grayscale));

  const cssVariables = {
    "--blur-strength": `${blurStrength}px`,
    "--metalness": metalness,
    "--roughness": roughness,
    "--overlay-color": overlayColor,
    "--text-color": color,
    "--saturation": saturation,
  };

  const navigate = useNavigate();


  return (
    <div
      className={`reflective-card-container ${className}`}
      style={{ ...style, ...cssVariables }}
    >
      {/* SVG FILTERS */}
      <svg className="reflective-svg-filters" aria-hidden="true">
        <defs>
          <filter id="metallic-displacement" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="turbulence"
              baseFrequency={baseFrequency}
              numOctaves="2"
              result="noise"
            />
            <feColorMatrix in="noise" type="luminanceToAlpha" result="noiseAlpha" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={displacementStrength}
              xChannelSelector="R"
              yChannelSelector="G"
              result="rippled"
            />
            <feSpecularLighting
              in="noiseAlpha"
              surfaceScale={displacementStrength}
              specularConstant={specularConstant}
              specularExponent="20"
              lightingColor="#ffffff"
              result="light"
            >
              <fePointLight x="0" y="0" z="300" />
            </feSpecularLighting>
            <feComposite in="light" in2="rippled" operator="in" result="light-effect" />
            <feBlend in="light-effect" in2="rippled" mode="screen" />
          </filter>
        </defs>
      </svg>

      {/* WEBCAM FEED */}
      

      {/* VISUAL LAYERS */}
      <div className="reflective-noise" />
      <div className="reflective-sheen" />
      <div className="reflective-border" />

      {/* CONTENT */}
      <div className="reflective-content">
        {/* HEADER */}
        <div className="card-header">
          <div className="security-badge">
            <Lock size={14} className="security-icon" />
            <span>SECURE ACCESS</span>
          </div>
          <Activity className="status-icon" size={20} />
        </div>

        {/* BODY */}
        <div className="card-body">
          <div className="user-info centered">
            <h2 className="user-name">CODESPRINT 6.O</h2>
            <p className="user-role">CAPTURE THE FLAG</p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="card-footer">
          <div className="id-section">
            <span className="label">EVENT DATE</span>
            <span className="value">XXXI-I-MMXXVI</span>
          </div>
<div className="action-section">
  <button
  className="actionbutton"
  onClick={() => navigate("/auth")}
>
  Next<span className="arrow">→</span>
</button>

</div>

        </div>
      </div>
    </div>
  );
};

export default Card;
