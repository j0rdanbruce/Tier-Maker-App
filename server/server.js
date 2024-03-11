import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const port = 8000;
const io = new Server(server);

app.use(cors());
app.use(express.json());

server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.get('', (req, res) => {
  res.json({ message: "Hello from index page!" });
});

app.get('/sorting', (req, res) => {
  res.json({
    message: "Hello from server!"
  });
});