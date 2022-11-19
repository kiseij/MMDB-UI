import { Button } from "react-bootstrap";
import { Link, useLoaderData, redirect } from "react-router-dom";

function goBack(path) {
    return redirect(path)
}

function deleteMovie(id, e) {
    const options = {
        method: 'DELETE'
    };

    fetch(`http://localhost:8080/api/movies/${id}`, options)
    .then(response => response.json())
    .then(result => {
        // TO-DO po sekmingo istrinimo redirectint i home
        goBack('/')
    })
    .catch(error => console.log('error', error));
}

function InnerMovie() {
    const { movie } = useLoaderData()
    return (
        <div>
            <h1>{movie.name}</h1>
            <h2>{movie.year}</h2>
            <Link to="/">Back</Link>
            <Link to={`/edit/${movie.id}`} className="btn btn-warning">Edit</Link>
            <Button onClick={deleteMovie.bind(this, movie.id)} className="btn btn-danger">Delete</Button>
        </div>
    );
}

export default InnerMovie;