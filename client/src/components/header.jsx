function Header() {
  return (
    <header
      style={{
        width: "100%",
        textAlign: "center",
        padding: "2rem 0",
        // backgroundColor: "#f0f0f0", // אפשר להסיר לאחר בדיקה
        boxSizing: "border-box"
      }}
    >
      <div>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>JS Course</h1>
        <h2 style={{ fontSize: "1.2rem", fontWeight: "normal", color: "gray" }}>
          By Tom
        </h2>
      </div>
    </header>
  );
}

export default Header;
