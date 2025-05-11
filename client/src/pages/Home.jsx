import { useEffect, useState, useRef } from "react";
import { useNavigate ,useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import PasswordModal from "../components/PasswordModal";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const tasks = [
  { title: "reverse-a-string", label: "🌀 Reverse a String" },
  { title: "is-palindrome", label: "🔁 Is Palindrome" },
  { title: "sum-two-numbers", label: "➕ Sum Two Numbers" },
  { title: "factorial", label: "✳️ Factorial" }
];

function Home() {
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [activeRoom, setActiveRoom] = useState({ roomId: null, password: null });
  const navigate = useNavigate();
  const socketRef = useRef(null); // Used to store the socket instance
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    console.log("🏠 Home mounted");

    // Fetch initial room status
    fetch(`${SERVER_URL}/active-room`)
  .then((res) => res.json())
  .then((data) => {
    setActiveRoom({
      roomId: data.activeRoom,
      password: data.password || null
    });
  })
  .catch((err) => console.error("Fetch error:", err));

    // Create socket connection
    const socket = io(SERVER_URL);
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Connected to server (Home)");
    });

    socket.on("room_opened", ({ roomId, password }) => {
      console.log("📥 Received room_opened:", roomId);
      setActiveRoom({ roomId, password: password || null });
    });
    
    socket.on("room_closed", () => {
      console.log("📥 Received room_closed");
      setActiveRoom({roomId: null, password: null});
    });

    return () => {
      socket.disconnect();
      console.log("❌ Socket disconnected (Home)");
    };
  }, [location.pathname]);

  const handleClick = (roomId) => {
    setCurrentRoom(roomId);
    setPasswordInput("");
    setShowPasswordModal(true);
  };


  const handlePasswordSubmit = () => {
    if (!passwordInput) {
      alert("Password is required.");
      return;
    }
  
    const isRoomOpen = activeRoom.roomId === currentRoom;
  
    if (isRoomOpen) {
      if (passwordInput !== activeRoom.password) {
        alert("Incorrect password.");
        return;
      }
    }
  
    localStorage.setItem("roomPassword", passwordInput);
    //localStorage.setItem("userName", userName);

    setShowPasswordModal(false);
    navigate(`/editor/${currentRoom}`, {
      state: { userName: userName, password: passwordInput }
    });
      };
  
  
  

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <h2>Choose a Code Block</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
          margin: "2rem auto"
        }}
      >
        {tasks.map((task) => {
          const isActive = !activeRoom.roomId || activeRoom.roomId === task.title;

          return (
            <button
              key={task.title}
              onClick={() => handleClick(task.title)}
              disabled={!isActive}
              style={{
                padding: "1rem",
                borderRadius: "8px",
                fontSize: "1.1rem",
                backgroundColor: isActive ? "#007bff" : "#555",
                color: "white",
                border: "none",
                cursor: isActive ? "pointer" : "not-allowed",
                opacity: isActive ? 1 : 0.5,
                transition: "all 0.2s ease-in-out"
              }}
            >
              {task.label}
            </button>
          );
        })}
        <PasswordModal
  isOpen={showPasswordModal}
  onClose={() => setShowPasswordModal(false)}
  onSubmit={handlePasswordSubmit}
  password={passwordInput}
  setPassword={setPasswordInput}
  isRoomOpen={activeRoom.roomId === currentRoom}
  roomId={currentRoom}
  userName={userName}
  setUserName={setUserName}
/>

      </div>
    </div>
  );
}
export default Home;