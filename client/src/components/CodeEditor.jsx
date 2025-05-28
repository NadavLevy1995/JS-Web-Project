function CodeEditor({ code, isReadOnly, onChange }) {
  return (
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
        onChange={isReadOnly ? undefined : (e) => onChange(e.target.value)}
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
  );
}

export default CodeEditor;
