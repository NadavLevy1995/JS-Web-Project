function RoomHeader({ roomId, description }) {
  const formatTitle = (slug) =>
    slug.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");

  return (
    <>
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
    </>
  );
}

export default RoomHeader;
