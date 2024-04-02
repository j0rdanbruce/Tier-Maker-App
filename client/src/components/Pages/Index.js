/**
 * The component that represents the Index (Landing) page of the web application.
 * Users will land on this page first.
 */

import { useEffect } from "react";

//react-boostrap imports go here
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//react-router-dom imports go here
import { useNavigate } from "react-router-dom";

//socket imports go here
import { socket } from "../../socket";


/**
 * The component for the username form.
 */

const UsernameForm = (props) => {
  const { setUsername } = props;
  const navigate = useNavigate();

  const handleUsernameFormSubmission = (event) => {
    event.preventDefault();   //prevents the broswer page from reloading and disconnecting the socket from the server

    const username = document.getElementById('username').value;
    setUsername(username);
    socket.emit('create-custom-id', (username));
    navigate('/home');    //navigates to the home page after setting the user's username
  }

  return (
    <Form>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="E.g: TierMaster96" />
        <Button
          type="submit"
          onClick={handleUsernameFormSubmission}
        >
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}

const Index = (props) => {
  const { setUsername } = props;

  const style = {
    width: '500px',
    height: '230px',
    marginLeft: 'auto',
    marginRight: 'auto'
  }

  return (
    <Card style={style}>
      <Card.Body>
        <UsernameForm setUsername={setUsername} />
      </Card.Body>
    </Card>
  );
}

export default Index;