import { useEffect, useState, useRef } from "react";
import { useNavigate ,useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import TaskButton from "../components/TaskButton"

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const tasks = [
  { title: "reverse-a-string", label: "🌀 Reverse a String" },
  { title: "is-palindrome", label: "🔁 Is Palindrome" },
  { title: "sum-two-numbers", label: "➕ Sum Two Numbers" },
  { title: "factorial", label: "✳️ Factorial" }
];

function Home() {
  const location = useLocation();
  const [activeRoom, setActiveRoom] = useState(null);
  const navigate = useNavigate();
  const socketRef = useRef(null); // Used to store the socket instance

  useEffect(() => {
    console.log("🏠 Home mounted");


    fetch(`${SERVER_URL}/active-room`)
      .then((res) => res.json())
      .then((data) => setActiveRoom(data.activeRoom))
      .catch((err) => console.error("Fetch error:", err));

    
    const socket = io(SERVER_URL);
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Connected to server (Home)");
    });

    socket.on("room_opened", (roomId) => {
      console.log("📥 Received room_opened:", roomId);
      setActiveRoom(roomId);
    });

    socket.on("room_closed", () => {
      console.log("📥 Received room_closed");
      setActiveRoom(null);
    });

    return () => {
      socket.disconnect();
      console.log("❌ Socket disconnected (Home)");
    };
  }, [
    location.pathname
  ]);

  const handleClick = (roomId) => {
    navigate(`/editor/${roomId}`);
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
        {tasks.map((task) => (
          <TaskButton
            key={task.title}
            task={task}
            activeRoomId={activeRoom}
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
}


export default Home;