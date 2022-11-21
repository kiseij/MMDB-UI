import { Table } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";

function Movies() {
  const { movies } = useLoaderData();
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.year}</td>
              <td>
                <Link
                  to={`/movie/${item.id}`}
                  className={"btn btn-outline-secondary"}
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Movies;
