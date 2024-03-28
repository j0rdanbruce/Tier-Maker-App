import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const port = 8000;
const socketPort = 4000;
const io = new Server({
  cors: {
    origin: "http://localhost:3000"
  }
});

io.listen(socketPort);

app.use(cors());
app.use(express.json());

server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

io.on('connection', (socket) => {
  console.log(`a user connected: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`a user disconnected: ${socket.id}`);
  });
  socket.on('sort start event', (id) => {
    console.log(id);
    socket.broadcast.emit('sort start event', id);
  });
  socket.on('sort change event', (values) => {
    console.log(values);
    socket.broadcast.emit('sort change event', values);
  });
  socket.on('sort different container', (values) => {
    console.log(values);
    socket.broadcast.emit('sort different container', values);
  });
  socket.on('create', (room) => {
    try {
      const socketId = socket.id;
      socket.join(room);
      const rooms = Array.from(io.of("/").adapter.rooms);
      console.log(`User '${socket.id}' has created a room: ${room}`);
      console.log(`Number of rooms: ${rooms}`);
      io.emit('create-room-event', (room));
    } catch (error) {
      console.log(error);
    }
  });
});

app.get('', (req, res) => {
  res.json({ message: "Hello from index page!" });
});

app.get('/sorting', (req, res) => {
  res.json({
    message: "Hello from server!"
  });
});