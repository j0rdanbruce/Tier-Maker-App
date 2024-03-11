import express from 'express';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

app.get('/message', (req, res) => {
  res.json({ message: "Hello from server!" });
});