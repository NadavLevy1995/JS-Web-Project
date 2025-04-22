# 🎯 JS-Collab – Real-Time Coding Platform for Students & Mentor

JS-Collab is a real-time collaborative coding app built to help Tom, a passionate JavaScript lecturer,
keep mentoring his students remotely.
Tom (the mentor) selects a coding block from the lobby, and students join the active session with a live shared editor, real-time updates.  
The app is optimized for live synchronization, automatic session management, role-based access control, and collaborative learning across devices.


# 🌐 Live Deployment

- **Frontend:**  *(coming soon)***************************************
- **Backend:** Hosted on Railway  
- **API Base URL:** https://js-web-practice-production.up.railway.app  
- **WebSocket Endpoint:** https://js-web-practice-production.up.railway.app/socket.io


# 🧩 Features

### 👨‍🏫 Mentor (Tom)
- Selects a code block from the lobby to begin a session
- Enters the editor in read-only mode
- Sees how many students are currently connected
- Leaving the session automatically clears the code and redirects all students to the lobby

### 🧑‍🎓 Students
- Join the active code block session
- Edit code collaboratively in real-time
- See changes made by others instantly
- Receive a smiley face when the code matches the predefined solution

### ⚙️ General
- Real-time code synchronization using WebSockets
- Syntax highlighting for improved readability
- Task data loaded from MongoDB
- Session state stored in server memory and cleaned up when mentor leaves


# 🛠️ Tech Stack

### 🖥️ Frontend
- **React.js** – UI framework
- **Vite** – Lightning-fast development and build tool
- **Socket.IO Client** – WebSocket communication
- **Monaco Editor** – Code editor with syntax highlighting
- **React Router** – Navigation between pages

### 🔧 Backend
- **Node.js + Express** – REST API and WebSocket server
- **Socket.IO** – Real-time code synchronization
- **dotenv** – Environment variable management

### 🗄️ Database
- **MongoDB** – Stores code blocks and room metadata
- **Mongoose** – Schema modeling and queries

### ☁️ Deployment
- **Railway** – Server and database hosting
- **Vercel** – Frontend deployment
- 
### 📡 Key Endpoints

- `GET /active-room` – Get list of currently active rooms  
- `WS /socket.io` – WebSocket connection for real-time updates  
  - Events: `joinRoom`, `codeChange`, `roomStatusChanged`, `toggleLock`, etc.

# 👨‍💻 **Author**

Developed by **Nadav Levy**  
As part of a real-time full-stack coding challenge at **Moveo**.  
Built with love, sockets, and a whole lot of `console.log()` 😄
