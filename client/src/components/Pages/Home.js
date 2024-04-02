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

  const activeRoomStlye = {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: 'fit-content',
    margin: '15px auto'
  }

  const cardStyle = {
    width: '700px',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  }

  const buttonStyle = {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  }

  const handleJoinRoomBtnClick = (event) => {
    event.preventDefault();

    socket.emit('join-room-event', (roomName));
  }

  return (
    <div style={activeRoomStlye}>
      <Card style={cardStyle}>
        <Card.Body>
          <Card.Title>{roomName}</Card.Title>
          <Card.Text>
            Number of active users: {roomMembers.length}
          </Card.Text>
          <p>{JSON.stringify(roomMembers)}</p>
        </Card.Body>
      </Card>
      <Button style={buttonStyle} onClick={handleJoinRoomBtnClick}>
        Join Room
      </Button>
    </div>
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
          onClick={(event) => handleCreateRoomEvent(event)}
        >
          Create Room
        </Button>
      </Form.Group>
    </Form>
  );

  function handleCreateRoomEvent(event) {
    event.preventDefault();   //prevents the page from reloading when submitting form data.

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