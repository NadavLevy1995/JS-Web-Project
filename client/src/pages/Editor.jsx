import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import BaseCodeViewer from "../components/BaseCodeViewer";
import ParticipantsHeader from "../components/ParticipantsHeader";
import RoomHeader from "../components/RoomHeader";
import CodeEditor from "../components/CodeEditor";
import SolutionViewer from "../components/SolutionViewer";
import SmileyOverlay from "../components/SmileyOverlay";


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
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
  
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


  if (isLoading) {
    return (
      <div
        style={{
          color: "white",
          textAlign: "center",
          paddingTop: "5rem",
        }}
      >
        
        <div className="spinner"></div>
        <div style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
          Loading...
        </div>
      </div>
    );
  }
  
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
    <ParticipantsHeader usersCount={usersCount} isReadOnly={isReadOnly} />
    <RoomHeader roomId={roomId} description={description} />
    {code && <BaseCodeViewer code={code} />}
    <CodeEditor code={code} isReadOnly={isReadOnly} onChange={handleChange} />
    {isCorrect && <SmileyOverlay />}
    {isReadOnly && <SolutionViewer referenceCode={referenceCode} />}    
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
