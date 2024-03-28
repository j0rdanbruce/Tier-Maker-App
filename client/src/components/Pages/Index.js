/**
 * The component that represents the Index (Landing) page of the web application.
 * Users will land on this page first.
 */

//react-boostrap imports go here
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

/**
 * The component for the username form.
 */

const UsernameForm = (props) => {
  const { setUsername } = props;

  return (
    <Form>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="E.g: TierMaster96" />
        <Button
          type="submit"
          onClick={(event) => handleUsernameFormSubmission(event)}
        >
          Submit
        </Button>
      </Form.Group>
    </Form>
  );

  function handleUsernameFormSubmission(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    setUsername(username);
  }
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