import {
  Button,
  Form,
  Container,
  Row,
  Col,
  ButtonGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CreateMovie() {
  let navigate = useNavigate();
  function save(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    const movie = {
      name: data.get("name"),
      year: data.get("year"),
    };

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    const payload = JSON.stringify(movie);

    const options = {
      method: "POST",
      headers: headers,
      body: payload,
    };

    fetch(`http://localhost:8080/api/movies`, options)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        navigate("/movie/" + result.id);
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
              <Form.Label>Movie title</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="enter movie title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Movie year</Form.Label>
              <Form.Control
                type="text"
                name="year"
                placeholder="enter movie year"
              />
            </Form.Group>
            <ButtonGroup>
              <Button variant="btn btn-secondary" type="submit">
                Save
              </Button>
            </ButtonGroup>
          </Form>
        </Col>
        <Col xs="3"></Col>
      </Row>
    </Container>
  );
}

export default CreateMovie;
