/**
 * The Home Page component represent the landing page for the Tier Ranking Application.
 */

//react-bootstrap imports go here
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//socket imports go here
import { socket } from '../../socket';
import { useEffect, useState } from 'react';

const ActiveRoom = (props) => {
  const {
    roomName,
    roomMembers
  } = props;

  const cardStyle = {
    width: '700px',
    marginLeft: 'auto',
    marginRight: 'auto'
  }

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <Card.Title>{roomName}</Card.Title>
        <Card.Text>
          Number of active users: {roomMembers.length}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const CreateRoomForm = () => {
  const style = {
    width: '700px',
    marginLeft: 'auto',
    marginRight: 'auto'
  };

  return (
    <Form style={style}>
      <Form.Group controlId='room-name'>
        <Form.Label>Create a Ranking Session:</Form.Label>
        <Form.Control
          type='text'
          placeholder='My Room'
        />
        <Button
          type='submit'
          onClick={handleCreateRoomEvent}
        >
          Create Room
        </Button>
      </Form.Group>
    </Form>
  );

  function handleCreateRoomEvent() {
    const roomName = document.getElementById('room-name').value;
    socket.emit('create', roomName);
  }
};

const Home = (props) => {
  const {
    name,
    rooms
  } = props;

  const [activeRooms, setActiveRooms] = useState(null);
  
  useEffect(() => {
    const activeRooms = Object.entries(rooms).map(([roomName, roomMembers]) => (
      <ActiveRoom roomName={roomName} roomMembers={roomMembers} />
    ));
    setActiveRooms(activeRooms);

  }, [rooms]);

  return (
    <div>
      <h1>Home Page</h1>
      <p>{`Hello, ${name}`}</p>
      {activeRooms}
      <CreateRoomForm />
    </div>
  );
};

export default Home;