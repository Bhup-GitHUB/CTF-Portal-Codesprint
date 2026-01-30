import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import TeamPage from "./pages/TeamPage";
import HomePage from "./pages/HomePage";
import ChallengesPage from "./pages/ChallengesPage";
import TeamMemberPage from "./pages/TeamMemberPage";
import LeaderboardPage from "./pages/LeaderboardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
       <Route path="/team" element={<TeamPage />} />
       <Route path="/Home" element={<HomePage />} />
       <Route path="/challenges" element={< ChallengesPage/>} />
       <Route path="/TeamMemberPage" element={<TeamMemberPage />} />
       <Route path="/leaderboard" element={<LeaderboardPage />} />

    </Routes>
  );
}

export default App;
