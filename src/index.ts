import express from "express";
import http from "node:http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const votes = {
  n: 0,
  s: 0,
  x: 0,
  p: 0,
};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.emit("updateVotes", votes); // enviar votos iniciales al cliente

  socket.on("vote", (option: "n" | "s" | "x" | "p") => {
    console.log("vote", option);
    if (votes[option] !== undefined) {
      votes[option]++;
      io.emit("updateVotes", votes); // notificar a todos los clientes
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
