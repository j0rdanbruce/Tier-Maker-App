import React, { useEffect, useState } from 'react';
import { socket } from './socket';
import { ConnectionState } from './components/ConnectionState/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager/ConnectionManager';
import SortableList from './components/SortableList';

import './App.css';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('sort change event', (values) => {
      document.getElementById('info').innerText = JSON.stringify(values);
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <div className="App">
      <ConnectionState isConnected={isConnected} />
      <ConnectionManager />
      
      <SortableList />
      <p id='info'>Here</p>
      <h2>Add Portion</h2>
      <div>
        <button>Add Item</button>
      </div>
    </div>
    
  );
}

export default App;