import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/sorting")
    .then(response => response.json())
  .then(data => {
      setMessage(data);
    })
  });

  return (
    <>
      <h1>{message && message.message}</h1>
    </>
    
  );
}

export default App;