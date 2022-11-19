import { Button, Form } from "react-bootstrap";
import { Link, useLoaderData, redirect } from "react-router-dom";

function save(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const id = data.get("id")
    const movie = {
        name: data.get("name"),
        year: data.get("year")
    }

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    const payload = JSON.stringify(movie);

    const options = {
        method: 'PUT',
        headers: headers,
        body: payload
    };

    fetch(`http://localhost:8080/api/movies/${id}`, options)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    
}

function EditMovie() {
    const { movie } = useLoaderData()
    return (
        <div>
            <Form onSubmit={save}>
                <Form.Label>Movie title</Form.Label>
                <Form.Control type="text" name="name" placeholder="enter movie title" defaultValue={movie.name} />
                <Form.Label>Movie year</Form.Label>
                <Form.Control type="text" name="year" placeholder="enter movie year" defaultValue={movie.year} />
                <Form.Control type="hidden" name="id" defaultValue={movie.id} />
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>

            <Link to={`/movie/${movie.id}`}>Back</Link>
        </div>
    );
}

export default EditMovie;