import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Movies from './components/Movies';
import InnerMovie from './components/InnerMovie';
import EditMovie from './components/EditMovie';

function getAllMovies() {
  const options = {
    method: 'GET'
  };
  
  return new Promise((resolve, reject) => {
    fetch("http://localhost:8080/api/movies", options)
    .then(response => response.json())
    .then(result => resolve(result))
    .catch(error => reject(error))
  })
}

async function getMovies() {
  const movies = await getAllMovies()
  return { movies }
}

function getOneMovie(id) {
  const options = {
    method: 'GET'
  };
  
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:8080/api/movies/${id}`, options)
    .then(response => response.json())
    .then(result => resolve(result))
    .catch(error => reject(error))
  })
}

async function getMovie(req) {
  const movie = await getOneMovie(req.params.id)
  return { movie }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Movies />,
    loader: getMovies
  },
  {
    path: '/movie/:id',
    element: <InnerMovie />,
    loader: getMovie
  },
  {
    path: '/edit/:id',
    element: <EditMovie />,
    loader: getMovie
  }
]);

function App() {
  return (
    <div className={'container-wrapper container-fluid'}>
      <div className={'container'}>
        <RouterProvider router={router} />
      </div> 
    </div>
  );
}

export default App;
