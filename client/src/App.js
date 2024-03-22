import React, { useEffect, useState } from 'react';
import './App.css';

import { socket } from './socket';
import { ConnectionState } from './components/ConnectionState/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager/ConnectionManager';
import SortableList from './components/SortableList';

//Browser routing related imports go here
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

//Web page imports go here
import Home from './components/Pages/Home';
import RankingSession from './components/RankingSession/RankingSession';

//Navigation Bar imports go here
import NavigationBar from './components/NavigationBar/NavigationBar';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [rooms, setRooms] = useState({
    Room1: [],
    Room2: []
  });

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
      <Router>
        <NavigationBar />
        <Routes>
          <Route
            path='/'
            element={<Home name="Jordan" rooms={rooms} />}
          />
          <Route
            path="/rank-session"
            element={<RankingSession />}
          />
        </Routes>
      </Router>

      <ConnectionState isConnected={isConnected} />
      <ConnectionManager />
      <p id='info'>Here</p>
      <h2>Add Portion</h2>
      <div>
        <button>Add Item</button>
      </div>
    </div>
    
  );
}

export default App;