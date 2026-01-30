import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/api";

export default function LoginStep() {
  const navigate = useNavigate();

  const [memberName, setMemberName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!memberName || !teamName) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(API_ENDPOINTS.TEAM_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          memberName,
          teamName
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // ✅ store team token (MOST IMPORTANT)
      localStorage.setItem("teamToken", data.token);
      localStorage.setItem("teamName", teamName);
      localStorage.setItem("memberName", memberName);

      // ✅ go to home
      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="step">
      <h3>Team Login</h3>

      <input
        type="text"
        placeholder="Member Name"
        value={memberName}
        onChange={e => setMemberName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Team Name"
        value={teamName}
        onChange={e => setTeamName(e.target.value)}
      />

      {error && (
        <p style={{ color: "#ff6b6b", fontSize: "12px" }}>
          {error}
        </p>
      )}

      <button
        className="next-button"
        style={{ marginTop: "12px", alignSelf: "flex-end" }}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login →"}
      </button>

      <p style={{ opacity: 0.6, fontSize: "12px", marginTop: "8px" ,gap:'10px'}}>
        Login using your registered team
        <br></br>
        Or Signup Next
      </p>
    </div>
  );
}
