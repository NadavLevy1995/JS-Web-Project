import { useNavigate } from "react-router-dom";
import Bottom from "../components/Bottom"; // Footer component displayed only on this page

function Entrence() {
  const navigate = useNavigate();

  // Redirect to home page (task selection) on button click
  const handleStart = () => {
    navigate("/home");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "80vh",
      }}
    >
      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={handleStart}
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
            padding: "1rem 2.5rem",
            cursor: "pointer",
            borderRadius: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
          }}
        >
          Start Session
        </button>
      </main>

      <Bottom />
    </div>
  );
}

export default Entrence;