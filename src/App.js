import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Movies from "./components/Movies";
import InnerMovie from "./components/InnerMovie";
import EditMovie from "./components/EditMovie";
import CreateMovie from "./components/CreateMovie";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Login from "./components/Login";

const token = localStorage.getItem("token");
let headers = new Headers();
if (token) {
  headers.append("Authorization", "Bearer " + token);
}

function getAllMovies() {
  const options = {
    method: "GET",
    headers: headers,
  };

  return new Promise((resolve, reject) => {
    fetch("http://localhost:8080/api/movies", options)
      .then((response) => response.json())
      .then((result) => resolve(result))
      .catch((error) => {
        window.location.href = "/login";
        reject(error);
      });
  });
}

async function getMovies() {
  const movies = await getAllMovies();
  return { movies };
}

function getOneMovie(id) {
  const options = {
    method: "GET",
    headers: headers,
  };

  return new Promise((resolve, reject) => {
    fetch(`http://localhost:8080/api/movies/${id}`, options)
      .then((response) => response.json())
      .then((result) => resolve(result))
      .catch((error) => {
        window.location.href = "/login";
        reject(error);
      });
  });
}

async function getMovie(req) {
  const movie = await getOneMovie(req.params.id);
  return { movie };
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Movies />,
    loader: getMovies,
  },
  {
    path: "/movie/:id",
    element: <InnerMovie />,
    loader: getMovie,
  },
  {
    path: "/edit/:id",
    element: <EditMovie />,
    loader: getMovie,
  },
  {
    path: "/create/",
    element: <CreateMovie />,
  },
  {
    path: "/login/",
    element: <Login />,
  },
]);

function App() {
  function logoutAction() {
    console.log("loggin out");
    localStorage.clear();
    window.location.href = "/login";
  }
  return (
    <div className={"container-wrapper container-fluid"}>
      <div className={"container"}>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">MMDB</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Docs" id="collasible-nav-dropdown">
                  <NavDropdown.Item
                    href="http://localhost:8080/swagger-ui/index.html#/"
                    target="_blank"
                  >
                    Swagger
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="https://github.com/kiseij/MMDB"
                    target="_blank"
                  >
                    API Code
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="https://github.com/kiseij/MMDB-UI"
                    target="_blank"
                  >
                    UI Code
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link onClick={logoutAction}>Logout</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="/create">Create new movie</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
