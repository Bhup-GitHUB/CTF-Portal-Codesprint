import { useEffect, useState } from "react";
import PillNav from "../components/navbar/PillNav";
import InfiniteMenu from "../components/challenges/InfiniteMenu.jsx";
import LetterGlitch from "../components/background/LetterGlitch.jsx";
import ChallengeModal from "../components/challenges/ChallengeModal";
import folder from "../assets/folder.png";
import { API_ENDPOINTS } from "../config/api";
import "./ChallengesPage.css";

export default function ChallengesPage() {
  const [items, setItems] = useState([]);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_ENDPOINTS.CHALLENGES)
      .then(res => res.json())
      .then(data => {
        const mapped = data.challenges.map(ch => ({
          ...ch,
          image: folder,
          onOpen: () => setActiveChallenge(ch)
        }));
        setItems(mapped);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="challenges-page">
      {/* BACKGROUND */}
      <div className="challenges-bg">
        <LetterGlitch />
      </div>

      {/* FOREGROUND */}
      <div className="challenges-wrapper">
        <PillNav />

        <div className="challenges-content">
          <div className="challenges-container">
            {loading ? (
              <div className="challenges-loading">
                <div className="loading-spinner"></div>
                <span className="loading-text">Loading challenges...</span>
              </div>
            ) : (
              <InfiniteMenu
                items={items.map(ch => ({
                  image: ch.image,
                  title: ch.title,
                  description: ch.description,
                  link: ch.link,
                  onOpen: () => setActiveChallenge(ch),
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

