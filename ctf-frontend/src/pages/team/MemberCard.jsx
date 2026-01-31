import Lanyard from "./Lanyard";

export default function MemberCard({ member, teamName = "UNKNOWN TEAM" }) {
  // Handle both string (ID) and object (with name) formats
  const memberName = typeof member === 'string' ? member : (member?.name || member?.email || 'Unknown Member');
  const memberId = typeof member === 'string' ? member : (member?.id || member?._id || '');

  return (
    <div
      style={{
        width: "520px",
        maxWidth: "90vw",
        background: "rgba(10,25,50,0.6)",
        border: "1px solid rgba(80,160,255,0.4)",
        borderRadius: "10px",
        padding: "18px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px"
      }}
    >
      {/* LANYARD */}
      <div style={{ width: "100%", height: "380px" }}>
        <Lanyard memberName={teamName} memberId={memberId} />
      </div>

      {/* MEMBER INFO */}
      <div
        style={{
          width: "100%",
          padding: "12px",
          borderTop: "1px solid rgba(80,160,255,0.3)",
          textAlign: "center",
          color: "#cfe9ff"
        }}
      >
        <h3
          style={{
            letterSpacing: "0.2em",
            fontSize: "14px",
            marginBottom: "6px"
          }}
        >
          {teamName.toUpperCase()}
        </h3>

        <p
          style={{
            fontSize: "11px",
            opacity: 0.7,
            letterSpacing: "0.15em"
          }}
        >
          MEMBER ID: {memberName}
        </p>
      </div>
    </div>
  );
}
