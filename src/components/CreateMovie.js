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


let directors = null;
let genres = null;


function GetDirectors() {
  let options = {
    method: "GET",
  };

  fetch(`http://localhost:8080/api/directors`, options)
    .then((response) => response.json())
    .then((result) => {
      directors = result;
    })
    .catch((error) => console.log(error));
}

function GetGenres() {
  let options = {
    method: "GET",
  };

  fetch(`http://localhost:8080/api/genres`, options)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      genres = result;
    })
    .catch((error) => console.log(error));
}

GetDirectors();
GetGenres();

function CreateMovie() {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  function updateComponent() {
    forceUpdate();
  }
  let navigate = useNavigate();

  function save(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    const movie = {
      name: data.get("name"),
      year: data.get("year"),
      genreId: data.get("genre"),
      directorId: data.get("director"),
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

 
  if (!directors || !genres) {
    setTimeout(() => updateComponent(), 0);
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

            {/* {JSON.stringify(genres, null, 2)} */}

            <Form.Group className="mb-3">
              <Form.Label>Directors</Form.Label>
              <Form.Select aria-label="select a director" name="director">
                <option disabled>select a director</option>
                {directors &&
                  directors.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </Form.Select>
              {/* <Form.Control
                type="text"
                name="director"
                placeholder="enter director id"
              /> */}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Genres</Form.Label>
              <Form.Select aria-label="select a genre" name="genre">
                <option disabled>select a genre</option>
                {genres &&
                  genres.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </Form.Select>
              {/* <Form.Control
                type="text"
                name="genre"
                placeholder="enter genre type"
              /> */}
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
