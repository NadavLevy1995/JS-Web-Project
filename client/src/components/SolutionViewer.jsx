function SolutionViewer({ referenceCode }) {
  return (
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
  );
}

export default SolutionViewer;
