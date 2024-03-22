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
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('a user disconnected');
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
  })
});;

app.get('', (req, res) => {
  res.json({ message: "Hello from index page!" });
});

app.get('/sorting', (req, res) => {
  res.json({
    message: "Hello from server!"
  });
});