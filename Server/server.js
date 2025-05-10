// server.js

// 🌐 Express server with Socket.IO and MongoDB support

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const path = require("path");
const Room = require("./db/models/Room");
const connectToDatabase = require("./db/connection");

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

connectToDatabase();

// Setup Socket.IO server with CORS config
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


// Global error handling for safety in production
process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("💥 Unhandled Rejection:", reason);
});

// In-memory room cache & socket-room tracking
const socketRooms = {};
const roomCache = {};



app.get("/", (req, res) => {
  res.json({ message: "✅ Server is up and running!" });
});

app.get("/active-room", (req, res) => {
  for (const roomId in roomCache) {
    if (roomCache[roomId].usersCount > 0) {
      return res.json({ activeRoom: roomId });
    }
  }
  return res.json({ activeRoom: null });
});

io.on("connection", (socket) => {
  console.log(`🔌 User connected: ${socket.id}`);

  // Join room and initialize if needed
  socket.on("join_room", async ({ roomId, user }) => {
    try {
      socket.join(roomId);
      socketRooms[socket.id] = roomId;
      console.log(`${user} joined room ${roomId}`);

      // Initialize room in cache if not already present
      if (!roomCache[roomId]) {
        const roomFromDB = await Room.findOne({ title: roomId });
        if (!roomFromDB) {
          socket.emit("error", "Room not found");
          return;
        }

        roomCache[roomId] = {
          description: roomFromDB.description,
          content: roomFromDB.baseCode,
          referenceCode: roomFromDB.referenceCode,
          usersCount: 0,
          lastUpdated: null,
          locked: false,
          ownerId: socket.id,
          participants: []
        };
        io.emit("room_opened", roomId);
      }

      roomCache[roomId].usersCount += 1;
      // Updates the Students Count
      io.to(roomId).emit("update_user_count", roomCache[roomId].usersCount);
      console.log(`👥 Room "${roomId}" now has ${roomCache[roomId].usersCount} user(s)`);

      socket.emit("load_code", {
        content: roomCache[roomId].content,
        description: roomCache[roomId].description,
        referenceCode: roomCache[roomId].referenceCode,
        usersCount: roomCache[roomId].usersCount,
        ownerId: roomCache[roomId].ownerId,
        participants: roomCache[roomId].participants
      });
    } catch (err) {
      console.error("❌ Error in join_room:", err.message);
      socket.emit("error", "Server error");
    }
  });

    socket.on("code_change", ({ roomId, content }) => {
      const room = roomCache[roomId];
      if (!room) return;
    
      if (room.content !== content) {
        room.content = content;
        room.lastUpdated = new Date();
              }
       socket.to(roomId).emit("code_update", content);

    });
    
  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
    const roomId = socketRooms[socket.id];

    if (!roomId || !roomCache[roomId]) {
      return;
    }

    const roomData = roomCache[roomId];
    roomData.usersCount -= 1;
    io.to(roomId).emit("update_user_count", roomData.usersCount);
    console.log(`👤 Room "${roomId}" now has ${roomData.usersCount} user(s)`);

    if (roomData.ownerId === socket.id) {
      console.log(`🔒 Room "${roomId}" is closing (owner disconnected)`);
      socket.to(roomId).emit("room_closed");

      const room = io.sockets.adapter.rooms.get(roomId);
      if (room) {
        for (const clientId of room) {
          const clientSocket = io.sockets.sockets.get(clientId);
          if (clientSocket) {
            clientSocket.leave(roomId);
          }
        }
      }


      // Clean participants list
      roomData.participants = [];
      delete roomCache[roomId];
      io.emit("room_closed", roomId);
    }

    delete socketRooms[socket.id];
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
