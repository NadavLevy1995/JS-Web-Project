import React from "react";

function PasswordModal({
  isOpen,
  onClose,
  onSubmit,
  password,
  setPassword,
  userName,
  setUserName,
  isRoomOpen,
  roomId
}) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#2c2c2c",
          padding: "2rem",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "400px",
          color: "white",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)"
        }}
      >
        <h3 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          {isRoomOpen
            ? `Enter password for room "${roomId}"`
            : `Set password for new room "${roomId}"`}
        </h3>

        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Your Name
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "100%",
            marginBottom: "1rem"
          }}
        />

        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          {isRoomOpen ? "Password" : "Set a Password"}
        </label>
        <input
          type="password"
          placeholder={isRoomOpen ? "Enter password" : "Create password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "100%",
            marginBottom: "1.5rem"
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: "#555",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              border: "none",
              color: "white",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            style={{
              backgroundColor: "#007bff",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              border: "none",
              color: "white",
              cursor: "pointer"
            }}
          >
            {isRoomOpen ? "Enter Room" : "Create Room"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordModal;
