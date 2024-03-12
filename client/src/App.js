import React, { useEffect, useState } from 'react';
import { socket } from './socket';
import { ConnectionState } from './components/ConnectionState/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager/ConnectionManager';

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

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <div className="App">
      <ConnectionState isConnected={isConnected} />
      <ConnectionManager />
    </div>
    
  );
}

export default App;