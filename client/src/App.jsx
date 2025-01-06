import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import LandingPage from './Components/LandingPage';
import Contact from './Components/Contact';
import Detail from './Components/Detail/Detail';
import FavoritesMovies from './Components/FavoritesMovies';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/main' element={<Home />}>
          <Route path='favorites' element={<FavoritesMovies />} />
        </Route>
        <Route path='/contact' element={<Contact />} />
        <Route path='/peliculaDetail/:id' element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
