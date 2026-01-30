import { useState } from "react";
import "./ChallengeModal.css";
import DecryptedText from "../effects/DecryptedText";

export default function ChallengeModal({ challenge, onClose }) {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
const submitAnswer = async () => {
  setLoading(true);
  setStatus(null);

  try {
    const res = await fetch("http://localhost:8080/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("teamToken")}`,
      },
     body: JSON.stringify({
  code: challenge.code, // ✅ NOT title
  answer: answer,
}),

    });

    const data = await res.json();

    if (data.correct) {
      setStatus(`✅ Correct! +${data.points} points`);
    } else if (data.message === "already solved") {
      setStatus("⚠️ Already solved");
    } else {
      setStatus("❌ Wrong answer");
    }
  } catch (err) {
    setStatus("⚠️ Submission failed");
  }

  setLoading(false);
};

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="close-btn" onClick={onClose}>✕</button>

       <div className="description">
  <DecryptedText
    text={challenge.description}
    speed={30}
    maxIterations={12}
    sequential
    revealDirection="start"
    animateOn="view"
    className="decrypt-revealed"
    encryptedClassName="decrypt-encrypted"
  />
</div>


        <div className="meta">
          <span>Points: <strong>{challenge.points}</strong></span>
        </div>

        <input
          type="text"
          placeholder="Enter flag"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        />

        <button
          className="submit-btn"
          onClick={submitAnswer}
          disabled={loading}
        >
          {loading ? "Submitting…" : "Submit"}
        </button>

        {status && <p className="status">{status}</p>}
      </div>
    </div>
  );
}
