import { useEffect, useState } from "react";
import PillNav from "../components/navbar/PillNav";
import LetterGlitchBackground from "../components/background/LetterGlitch";
import MemberCard from "../pages/team/MemberCard";
import { API_ENDPOINTS, fetchWithAuth } from "../config/api";

export default function TeamMemberPage() {
  const [team, setTeam] = useState(null);

  useEffect(() => {
    fetchWithAuth(API_ENDPOINTS.TEAM_ME)
      .then(res => res.json())
      .then(data => setTeam(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      
      {/* BACKGROUND */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <LetterGlitchBackground />
      </div>

      {/* FOREGROUND */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <PillNav />

        <div
          style={{
            paddingTop: "120px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "40px"
          }}
        >
          {/* TEAM HEADER */}
          {team && (
            <div style={{ textAlign: "center", color: "#cfe9ff" }}>
              <h1 style={{ letterSpacing: "0.35em", fontSize: "22px" }}>
                TEAM {team.teamName}
              </h1>
              <p style={{ fontSize: "12px", opacity: 0.6 }}>
                SCORE: {team.score}
              </p>
            </div>
          )}

          {/* MEMBERS COLUMN */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              alignItems: "center"
            }}
          >
            {team?.members?.map((member, index) => (
              <MemberCard key={index} member={member} teamName={team.teamName} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
