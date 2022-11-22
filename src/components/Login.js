import {
  Button,
  Form,
  Container,
  Row,
  Col,
  ButtonGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useReducer } from "react";

function Login() {
  let navigate = useNavigate();

  function save(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    const user = {
      username: data.get("username"),
      password: data.get("password"),
    };

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    const payload = JSON.stringify(user);

    const options = {
      method: "POST",
      headers: headers,
      body: payload,
    };

    fetch(`http://localhost:8080/api/auth/authenticate`, options)
      .then((response) => response.json())
      .then((result) => {
        console.log("success", result);
        if (result.token) {
          const token = result.token;
          localStorage.setItem("token", token);
        }

        if (!result.error) {
          setTimeout(() => {
            window.location.href = "/";
          }, 200);
        }
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <Container>
      <Row>
        <Col xs="3"></Col>
        <Col xs="6">
          <Form onSubmit={save}>
            <br />

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="enter Username"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                name="password"
                placeholder="enter password"
              />
            </Form.Group>

            <ButtonGroup>
              <Button variant="btn btn-secondary" type="submit">
                Login
              </Button>
            </ButtonGroup>
          </Form>
        </Col>
        <Col xs="3"></Col>
      </Row>
    </Container>
  );
}

export default Login;
