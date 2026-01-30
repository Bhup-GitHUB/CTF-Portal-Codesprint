import { useEffect, useState } from "react";
import PillNav from "../components/navbar/PillNav";
import LetterGlitch from "../components/background/LetterGlitch";
import { API_ENDPOINTS } from "../config/api";

export default function LeaderboardPage() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch(API_ENDPOINTS.LEADERBOARD)
      .then(res => res.json())
      .then(data => setTeams(data.leaderboard || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      
      {/* BACKGROUND */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <LetterGlitch />
      </div>

      {/* FOREGROUND */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <PillNav />

        <div
          style={{
            paddingTop: "120px",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              width: "700px",
              maxWidth: "90vw",
              background: "rgba(10,25,50,0.65)",
              border: "1px solid rgba(80,160,255,0.4)",
              borderRadius: "12px",
              padding: "28px",
              color: "#cfe9ff"
            }}
          >
            <h1
              style={{
                textAlign: "center",
                letterSpacing: "0.35em",
                marginBottom: "24px"
              }}
            >
              LEADERBOARD
            </h1>

            {teams.map((team, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "14px 18px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                  background:
                    index === 0
                      ? "rgba(255,215,0,0.15)"
                      : "rgba(0,140,255,0.08)",
                  border:
                    index === 0
                      ? "1px solid rgba(255,215,0,0.6)"
                      : "1px solid rgba(80,160,255,0.3)"
                }}
              >
                <span style={{ letterSpacing: "0.15em" }}>
                  {index + 1} {team.TeamName}
                </span>

                <strong><span>Pts: </span>{team.Score}</strong>
              </div>
            ))}

            {teams.length === 0 && (
              <p style={{ textAlign: "center", opacity: 0.6 }}>
                No teams yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
