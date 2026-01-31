import { useEffect, useState } from "react";
import PillNav from "../components/navbar/PillNav";
import LetterGlitch from "../components/background/LetterGlitch";
import { API_ENDPOINTS } from "../config/api";
import "./LeaderboardPage.css";

export default function LeaderboardPage() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch(API_ENDPOINTS.LEADERBOARD)
      .then(res => res.json())
      .then(data => setTeams(data.leaderboard || []))
      .catch(err => console.error(err));
  }, []);

  const getRankClass = (index) => {
    if (index === 0) return "rank-1";
    if (index === 1) return "rank-2";
    if (index === 2) return "rank-3";
    return "";
  };

  const getBadgeClass = (index) => {
    if (index === 0) return "gold";
    if (index === 1) return "silver";
    if (index === 2) return "bronze";
    return "";
  };

  return (
    <div className="leaderboard-page">
      {/* BACKGROUND */}
      <div className="leaderboard-bg">
        <LetterGlitch />
      </div>

      {/* FOREGROUND */}
      <div className="leaderboard-wrapper">
        <PillNav />

        <div className="leaderboard-card">
          <div className="leaderboard-header">
            <h1 className="leaderboard-title">LEADERBOARD</h1>
          </div>

          <div className="leaderboard-list">
            {teams.map((team, index) => (
              <div
                key={index}
                className={`team-row ${getRankClass(index)}`}
              >
                <div className="team-info">
                  <div className={`rank-badge ${getBadgeClass(index)}`}>
                    {index + 1}
                  </div>
                  <span className="team-name">{team.TeamName}</span>
                </div>

                <div className="team-score">
                  <span className="label">Pts:</span>
                  <span className="value">{team.Score}</span>
                </div>
              </div>
            ))}

            {teams.length === 0 && (
              <p className="leaderboard-empty">
                No teams yet. Be the first to score!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
