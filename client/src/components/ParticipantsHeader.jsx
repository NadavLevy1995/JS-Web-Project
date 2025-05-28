function ParticipantsHeader({ usersCount, isReadOnly }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: window.innerWidth < 600 ? "column" : "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        maxWidth: "900px",
        margin: "0 auto 1.5rem",
        gap: "1rem",
      }}
    >
      <div style={{ color: "#ccc", fontSize: "clamp(1rem, 1.5vw, 1.2rem)", textAlign: "center" }}>
        <p style={{ margin: 0 }}>Participants</p>
        <p style={{ fontWeight: "bold", margin: 0 }}>
          {typeof usersCount === "number" ? usersCount - 1 : "-"}
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "0.5rem 1rem",
          borderRadius: "10px",
          fontWeight: "bold",
          fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
          whiteSpace: "nowrap",
        }}
      >
        {isReadOnly ? "TOM" : "Student"}
      </div>
    </div>
  );
}

export default ParticipantsHeader;
