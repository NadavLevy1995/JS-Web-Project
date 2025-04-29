import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import BaseCodeViewer from "../components/BaseCodeViewer";


function formatTitle(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function removeComments(code) {
  if (!code) {
    return "";
  }
  return code
    .replace(/\/\/.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, "")
    .trim();
}

function Editor() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const socketRef = useRef(null);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [referenceCode, setReferenceCode] = useState("");
  const [usersCount, setUsersCount] = useState(1);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [socketId, setSocketId] = useState(null);
  const [ownerId, setOwnerId] = useState(null);
  const user = "Participant";
  const isMobile = window.innerWidth < 600;
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(SERVER_URL);
    const socket = socketRef.current;
  
    socket.on("connect", () => {
      setSocketId(socket.id);
    });
        
    console.log("room ID is:" , roomId)
    // Join a specific room with user name
    socket.emit("join_room", { roomId, user });
  
    // Load initial room state (sent by server on join)
    socket.on("load_code", ({ content, description, referenceCode, usersCount, ownerId }) => {
      setCode(content);
      setDescription(description);
      setReferenceCode(referenceCode);
  
      if (usersCount != null) {
        setUsersCount(usersCount);
      }
  
      setOwnerId(ownerId);
    });
  
    // Receive real-time code updates from others
    socket.on("code_update", (newCode) => {
      setCode(newCode);
    });
  
    // Update users count on change
    socket.on("update_user_count", (count) => {
      setUsersCount(count);
    });
  
    // Handle room closed event (triggered when mentor leaves)
    socket.on("room_closed", () => {
      alert("The room has been closed by the host.");
      navigate("/home");
    });
  
    // Cleanup on unmount – disconnect from socket
    return () => {
      socket.disconnect();
    };
  }, [roomId, user, navigate]);
  ;
  // Added for mentor entrance - first entrance to code-block room 
  useEffect(() => {
    if (socketId && ownerId) {
      setIsReadOnly(socketId === ownerId);
    }
  }, [socketId, ownerId]);

  const handleChange = (newCode) => {
    setCode(newCode);
    socketRef.current.emit("code_change", { roomId, content: newCode });
  };

  const isCorrect =
  code != null &&
  referenceCode != null &&
  code.trim() !== "" &&
  referenceCode.trim() !== "" &&
  removeComments(code) === removeComments(referenceCode);

  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        position: "relative",
        minHeight: "75vh",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* 👥 Participants + 🧑‍🏫 Role in one flexible container */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
          maxWidth: "900px",
          margin: "0 auto 1.5rem",
          gap: "1rem",
        }}
      >
        {/* Participants count */}
        <div style={{ color: "#ccc", fontSize: "clamp(1rem, 1.5vw, 1.2rem)", textAlign: "center" }}>
          <p style={{ margin: 0 }}>Participants</p>
          <p style={{ fontWeight: "bold", margin: 0 }}>
            {typeof usersCount === "number" ? usersCount - 1 : "-"}
          </p>
        </div>

        {/* Role indicator */}
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

      {/* 🧾 Title and description */}
      <h2 style={{ fontSize: "clamp(1rem, 3vw, 1.2rem)" }}>{formatTitle(roomId)}</h2>

      <p
        style={{
          maxWidth: "90%",
          margin: "1rem auto",
          color: "#ccc",
          fontSize: "clamp(1rem, 2vw, 1.1rem)",
        }}
      >
        {description}
      </p>

      {/* 🧩 BaseCode read-only viewer */}
    {code && (
      <>
        <BaseCodeViewer code={code} />
      </>
    )}
    
    {/* ✍️ Code Editor */}
    <div
      style={{
        border: "2px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        marginTop: "2rem",
        backgroundColor: "#1e1e1e",
        width: "90%",
        maxWidth: "900px",
        marginInline: "auto",
      }}
    >

<textarea
    value={code}
    onChange={isReadOnly ? undefined : (e) => handleChange(e.target.value)}
    readOnly={isReadOnly}
    style={{
      width: "100%",
      height: "20vh",
      backgroundColor: "#1e1e1e",
      color: "white",
      fontSize: "16px",
      fontFamily: "monospace",
      border: "none",
      resize: "none",
      outline: "none",
      whiteSpace: "pre",
      overflowWrap: "normal",
      overflowX: "auto",
      
    }}
  />
    </div>
    {isCorrect && (
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
)}


    {/* 🧠 Show solution to mentor (read-only user) */}
    {isReadOnly && (
      <div
        style={{
          marginTop: "1rem",
          backgroundColor: "#2b2b2b",
          padding: "1rem",
          borderRadius: "8px",
          color: "#aaffaa",
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
          width: "90%",
          maxWidth: "900px",
          marginInline: "auto",
          textAlign: "left",
        }}
      >
        <strong>Solution:</strong>
        <pre>{referenceCode}</pre>
      </div>
    )}
    
    {/* 🛑 Read-only message for first user */}
    {isReadOnly && (
      <p
        style={{
          color: "#f88",
          marginTop: "1rem",
          fontSize: "clamp(1rem, 1.2vw, 1.2rem)",
        }}
      >
        You are in view-only mode. Only participants who joined after you can edit the code.
      </p>
    )}
  </div>
  );
}

export default Editor;
