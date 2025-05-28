function SmileyOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "8rem",
        zIndex: 9999,
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      😄
    </div>
  );
}

export default SmileyOverlay;
