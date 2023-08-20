
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import LandingPage from './Components/LandingPage';

import Contact from './Components/Contact';
import Navbar from './Components/Navbar'
import Detail from './Components/Detail/Detail';
import { useLocation } from 'react-router-dom';
function App() {
  const location = useLocation();
  return (
    <>
     
      {location.pathname !== '/' && <Navbar />}

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/peliculaDetail/:id' element={<Detail />} />
      </Routes>
    </>

  )
}

export default App;
