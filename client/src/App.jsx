// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Entrence from "./pages/Entrence"; // Currently unused
import Home from "./pages/Home";
import Editor from "./pages/Editor";

function App() {
  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#1e1e1e",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Router>
        {/* Header is displayed on all pages */}
        <Header />

        <Routes>
          {/* 
            Previously used entrance page – currently disabled 
            Uncomment if you want to show a "Start Session" screen
          */}
          {/* <Route path="/" element={<Entrence />} /> */}

          {/* Home page is now the default entry point */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          {/* Dynamic route for code editor session by room ID */}
          <Route path="/editor/:roomId" element={<Editor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
