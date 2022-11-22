import {
  Button,
  Form,
  Container,
  Row,
  Col,
  ButtonGroup,
} from "react-bootstrap";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useReducer } from "react";

let directors = null;
let genres = null;

const token = localStorage.getItem("token");
let headers = new Headers();
if (token) {
  headers.append("Authorization", "Bearer " + token);
}

function GetDirectors() {
  let options = {
    method: "GET",
    headers: headers,
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
    headers: headers,
  };

  fetch(`http://localhost:8080/api/genres`, options)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      genres = result;
    })
    .catch((error) => console.log(error));
}

if (token) {
  GetDirectors();
  GetGenres();
}

function EditMovie() {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  function updateComponent() {
    forceUpdate();
  }
  const { movie } = useLoaderData();
  let navigate = useNavigate();

  function save(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const id = data.get("id");
    const movie = {
      name: data.get("name"),
      year: data.get("year"),
      genreId: data.get("genre"),
      directorId: data.get("director"),
    };

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    if (token) {
      headers.append("Authorization", "Bearer " + token);
    }

    const payload = JSON.stringify(movie);

    const options = {
      method: "PUT",
      headers: headers,
      body: payload,
    };

    fetch(`http://localhost:8080/api/movies/${id}`, options)
      .then((response) => response.json())
      .then((result) => {
        if (!result.error) {
          navigate("/movie/" + result.id);
        }
      })
      .catch((error) => {
        if (error && error.error) {
          console.log("error", JSON.stringify(error));
        } else {
          window.location.href = "/login";
        }
      });
  }

  if (!directors || !genres) {
    setTimeout(() => updateComponent(), 0);
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
              <Form.Group className="mb-3">
                <Form.Label>Directors</Form.Label>
                <Form.Select
                  aria-label="select a director"
                  name="director"
                  defaultValue={movie.directorId}
                >
                  <option disabled>select a director</option>
                  {directors &&
                    directors.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Genres</Form.Label>
                <Form.Select
                  aria-label="select a genre"
                  name="genre"
                  defaultValue={movie.genreId}
                >
                  <option disabled>select a genre</option>
                  {genres &&
                    genres.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </Form.Select>
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
