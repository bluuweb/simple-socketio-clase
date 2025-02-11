import express from "express";
import http from "node:http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("cliente conectado: ", socket.id);

  socket.emit("message", `Bem-vindo ao chat!: ${socket.id}`);

  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("cliente desconectado: ", socket.id);
    io.emit("message", `Cliente desconectado: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
