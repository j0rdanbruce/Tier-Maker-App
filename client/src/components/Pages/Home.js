/**
 * The Home Page component represent the landing page for the Tier Ranking Application.
 */

//react-bootstrap imports go here
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//socket imports go here
import { socket } from '../../socket';

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

const RoomManager = (props) => {

  const style = {
    width: '700px',
    marginLeft: 'auto',
    marginRight: 'auto'
  };


  return (
    <Form style={style}>
      <Form.Group controlId='roomManager.RoomName'>
        <Form.Label>Create a Ranking Session:</Form.Label>
        <Form.Control type='text' placeholder='MyRoom'></Form.Control>
      </Form.Group>
      <Button variant='primary' type='submit'>Create</Button>
    </Form>
  );
};

const Home = (props) => {
  const {
    name,
    rooms
  } = props;
  
  const activeRooms = Object.entries(rooms).map(([roomName, roomMembers]) => (
    <ActiveRoom roomName={roomName} roomMembers={roomMembers} />
  ));

  return (
    <div>
      <h1>Home Page</h1>
      <p>{`Hello, ${name}`}</p>
      {activeRooms}
      <RoomManager />
    </div>
    
  );
};

export default Home;