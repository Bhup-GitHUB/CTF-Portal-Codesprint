import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupStep() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (!name || !email) {
      setError("Name and email are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      // ✅ store memberID for team creation / join
      localStorage.setItem("memberID", data.memberID);

      // ✅ move to team selection page
      navigate("/team");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="step">
      <h3>Create Account</h3>

      <input
        type="text"
        placeholder="Member Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {error && (
        <p style={{ color: "#ff6b6b", fontSize: "12px" }}>
          {error}
        </p>
      )}

      <button
        className="next-button"
        onClick={handleSignup}
        disabled={loading}
        style={{ marginTop: "12px", alignSelf: "flex-end" }}
      >
        {loading ? "Signing Up..." : "Sign Up →"}
      </button>

      <p style={{ opacity: 0.6, fontSize: "12px", marginTop: "8px" }}>
        Next, choose how you want to join a team.
      </p>
    </div>
  );
}
