import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import './App.css';
import About from './Components/About.js';
import Book from './Components/Book.js';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className='nav-bar'>
          <div className='nav-logo'>shawn hoo</div>
          <ul className='nav-links'>
            <div className='nav-menu'>
              <li><NavLink to='/about' className={({isActive}) => isActive ? "active" : undefined}>about</NavLink></li>
              <li><NavLink to='/of-the-florids' className={({isActive}) => isActive ? "active" : undefined}>of the florids</NavLink></li>
              <li><NavLink to='/publications' className={({isActive}) => isActive ? "active" : undefined}>publications</NavLink></li>
              <li><NavLink to='/blog' className={({isActive}) => isActive ? "active" : undefined}>blog</NavLink></li>
              <li><NavLink to='/contact' className={({isActive}) => isActive ? "active" : undefined}>contact</NavLink></li>
            </div>
          </ul>
        </nav>
        
        <Routes>
          <Route path='/about' element={<About />} />
          <Route path='/of-the-florids' element={<Book />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
