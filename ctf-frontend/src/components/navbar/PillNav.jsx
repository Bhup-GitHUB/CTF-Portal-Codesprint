
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./PillNav.css";

export default function PillNav() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = [
    { label: "Home", href: "/home" },
    { label: "Challenges", href: "/challenges" },
    { label: "Team", href: "/TeamMemberPage" },
    { label: "Leaderboard", href: "/leaderboard" }
  ];

  return (
    <div className="pill-nav-container">
      <nav className="pill-nav">
        {/* LOGO */}
        <Link to="/home" className="pill-logo">
          CODESPRINT
        </Link>

        {/* DESKTOP NAV */}
        <ul className="pill-list desktop-only">
          {items.map(item => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`pill ${
                  location.pathname === item.href ? "active" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* MOBILE BUTTON */}
        <button
          className="mobile-menu-button mobile-only"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="mobile-menu mobile-only">
          {items.map(item => (
            <Link
              key={item.href}
              to={item.href}
              className={`mobile-link ${
                location.pathname === item.href ? "active" : ""
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
