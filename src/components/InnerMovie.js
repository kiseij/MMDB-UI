import {
  Button,
  Toast,
  ToastContainer,
  ButtonGroup,
  Card,
} from "react-bootstrap";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";

function InnerMovie() {
  let navigate = useNavigate();
  const { movie } = useLoaderData();
  const [show, setShow] = useState(false);

  function deleteMovie(id, e) {
    // issoktu modalas ir lauktu kol useris paspaus taip noriu trint ir tik tada testu koda zemyn
    // jei paspaudzia ne, cancel cancel

    const options = {
      method: "DELETE",
    };

    fetch(`http://localhost:8080/api/movies/${id}`, options)
      .then((response) => response.json())
      .then((result) => {
        // setShow(true);
        navigate("/");
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <Card>
      <Card.Header>
        <h2>{movie.year}</h2>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <h1>{movie.name}</h1>
        </Card.Title>
        <Card.Text>
            {/* if movie.genre and movie.genre.name */}
            <span>
                <strong>Genre:</strong> {movie.genre && movie.genre.name}
            </span>
            <br/>
            {/* if movie.director and movie.director.name */}
            <span>
                <strong>Director:</strong> {movie.director ? movie.director.name : "No director selected"}
            </span>
        </Card.Text>
        <ButtonGroup>
          <Link to="/" className="btn btn-secondary">
            Back
          </Link>
          <Link to={`/edit/${movie.id}`} className="btn btn-secondary">
            Edit
          </Link>
          <Button
            onClick={deleteMovie.bind(this, movie.id)}
            className="btn btn-secondary"
          >
            Delete
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
    /* <ToastContainer position="top-end">
        <Toast show={show} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Success!</strong>
          </Toast.Header>
          <Toast.Body>{movie.name} was deleted!</Toast.Body>
        </Toast>
      </ToastContainer> */
  );
}

export default InnerMovie;
