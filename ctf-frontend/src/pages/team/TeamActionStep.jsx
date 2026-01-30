import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/api";

export default function TeamActionStep() {
  const [mode, setMode] = useState("create");
  const [teamName, setTeamName] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [generatedPin, setGeneratedPin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const memberID = localStorage.getItem("memberID");

  /* ======================
     CREATE TEAM
  ====================== */
  const handleCreateTeam = async () => {
    if (!teamName || !password) {
      setError("Team name and password required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(API_ENDPOINTS.TEAM_CREATE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamName,
          password,
          memberID
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // ✅ Save token
      localStorage.setItem("teamToken", data.teamToken);

      // ✅ Show real pin from backend
      setGeneratedPin(data.pin);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     JOIN TEAM
  ====================== */
  const handleJoinTeam = async () => {
    if (!pin) {
      setError("Team code required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(API_ENDPOINTS.TEAM_JOIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pin,
          memberID
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // ✅ Save token
      localStorage.setItem("teamToken", data.teamToken);

      navigate("/home");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="step">
      <h3>Team Setup</h3>

      {/* MODE SWITCH */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => {
            setMode("create");
            setGeneratedPin(null);
            setError("");
          }}
          className={mode === "create" ? "next-button" : "back-button"}
        >
          Create Team
        </button>

        <button
          onClick={() => {
            setMode("join");
            setGeneratedPin(null);
            setError("");
          }}
          className={mode === "join" ? "next-button" : "back-button"}
        >
          Join Team
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <p style={{ color: "#ff6b6b", fontSize: "12px" }}>
          {error}
        </p>
      )}

      {/* ============ CREATE TEAM ============ */}
      {mode === "create" && (
        <>
          <input
            placeholder="Team Name"
            value={teamName}
            onChange={e => setTeamName(e.target.value)}
          />

          <input
            type="password"
            placeholder="Team Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {!generatedPin && (
            <button
              className="next-button"
              onClick={handleCreateTeam}
              disabled={loading}
              style={{ alignSelf: "flex-end" }}
            >
              {loading ? "Creating..." : "Create Team →"}
            </button>
          )}

          {generatedPin && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "12px",
                padding: "10px",
                border: "1px solid rgba(80,160,255,0.4)",
                borderRadius: "6px",
                background: "rgba(10,25,50,0.6)"
              }}
            >
              <span style={{ fontFamily: "monospace", letterSpacing: "0.2em" }}>
                {generatedPin}
              </span>

              <button
                className="next-button"
                onClick={() => navigate("/home")}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}

      {/* ============ JOIN TEAM ============ */}
      {mode === "join" && (
        <>
          <input
            placeholder="Team Code"
            value={pin}
            onChange={e => setPin(e.target.value)}
          />

          <button
            className="next-button"
            onClick={handleJoinTeam}
            disabled={loading}
            style={{ alignSelf: "flex-end" }}
          >
            {loading ? "Joining..." : "Join Team →"}
          </button>
        </>
      )}

      <p style={{ opacity: 0.6, fontSize: "12px" }}>
        Create a team or join using a team code.
      </p>
    </div>
  );
}
