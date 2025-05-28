function TaskButton({ task, activeRoomId, onClick }) {
  const isActive = !activeRoomId || activeRoomId === task.title;

  return (
    <button
      onClick={() => onClick(task.title)}
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
}

export default TaskButton;
