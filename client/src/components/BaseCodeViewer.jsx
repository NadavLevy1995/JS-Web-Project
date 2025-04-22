import Editor from "@monaco-editor/react";

function BaseCodeViewer({ code }) {
  const handleEditorDidMount = (editor, monaco) => {
    monaco.editor.setTheme("vs-dark");
  };

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
      <div
        style={{
          color: "#bbb",
          fontSize: "1.5rem",
          fontStyle: "italic",
          marginBottom: "0.5rem",
          textAlign: "center",
          fontFamily: "'Fira Code', monospace",
        }}
      >
        Read-only view. Use it as a visual guide.
      </div>

      <Editor
        height="20vh"
        language="javascript"
        value={code}
        onMount={handleEditorDidMount}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          fontSize: 16,
          fontFamily: "'Fira Code', monospace",
          lineNumbers: "on",
          wordWrap: "on",
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}

export default BaseCodeViewer;
