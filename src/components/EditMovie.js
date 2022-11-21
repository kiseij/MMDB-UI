import {
  Button,
  Form,
  Container,
  Row,
  Col,
  ButtonGroup,
} from "react-bootstrap";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

function EditMovie() {
  const { movie } = useLoaderData();
  let navigate = useNavigate();
  function save(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const id = data.get("id");
    const movie = {
      name: data.get("name"),
      year: data.get("year"),
    };

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    const payload = JSON.stringify(movie);

    const options = {
      method: "PUT",
      headers: headers,
      body: payload,
    };

    fetch(`http://localhost:8080/api/movies/${id}`, options)
      .then((response) => response.json())
      .then((result) => {
        navigate("/movie/" + result.id);
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <div>
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
                  defaultValue={movie.name}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Movie year</Form.Label>
                <Form.Control
                  type="text"
                  name="year"
                  placeholder="enter movie year"
                  defaultValue={movie.year}
                />
              </Form.Group>
              <Form.Control type="hidden" name="id" defaultValue={movie.id} />
              <ButtonGroup>
                <Button variant="btn btn-secondary" type="submit">
                  Save
                </Button>
                <Link to={`/movie/${movie.id}`} className={"btn btn-secondary"}>
                  Back
                </Link>
              </ButtonGroup>
            </Form>
          </Col>
          <Col xs="3"></Col>
        </Row>
      </Container>
    </div>
  );
}

export default EditMovie;
