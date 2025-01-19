import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import LandingPage from './Components/LandingPage';
import FavoritesMovies from './Components/FavoritesMovies';
import Resenias from './Components/Resenias';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/main' element={<Home />}>
          <Route path='favorites' element={<FavoritesMovies />} />
          <Route path='resenias' element={<Resenias />} />
        </Route>
        <Route path='/peliculaDetail/:id' element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
