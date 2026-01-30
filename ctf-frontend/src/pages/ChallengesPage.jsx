import { useEffect, useState } from "react";
import PillNav from "../components/navbar/PillNav";
import InfiniteMenu from "../components/challenges/InfiniteMenu.jsx";
import LetterGlitch from "../components/background/LetterGlitch.jsx";
import ChallengeModal from "../components/challenges/ChallengeModal";
import folder from "../assets/folder.png";
import { API_ENDPOINTS } from "../config/api";

export default function ChallengesPage() {
  const [items, setItems] = useState([]);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_ENDPOINTS.CHALLENGES)
      .then(res => res.json())
      .then(data => {
        const mapped = data.challenges.map(ch => ({
          ...ch, // ✅ Spread all challenge properties (title, description, code, points, etc.)
          image: folder,
          onOpen: () => setActiveChallenge(ch)
        }));
        setItems(mapped);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* BACKGROUND */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <LetterGlitch />
      </div>

      {/* FOREGROUND */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <PillNav />

        <div style={{ paddingTop: "120px", display: "flex", justifyContent: "center" }}>
          <div style={{ height: "600px", width: "100%", maxWidth: "1200px" }}>
            {loading ? (
              <p style={{ color: "#9fd3ff", textAlign: "center" }}>Loading…</p>
            ) : (
              <InfiniteMenu
                items={items.map(ch => ({
                  image: ch.image,
                  title: ch.title,
                  description: ch.description,
                  link: "#",
                  onOpen: () => setActiveChallenge(ch), // 👈 IMPORTANT
                }))}
                scale={1}
              />
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {activeChallenge && (
        <ChallengeModal
          challenge={activeChallenge}
          onClose={() => setActiveChallenge(null)}
        />
      )}
    </div>
  );
}
