import Card from "../components/ui/Card";
import LetterGlitch from "../components/background/LetterGlitch";

export default function LandingPage() {
  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <LetterGlitch />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card />
      </div>
    </div>
  );
}
