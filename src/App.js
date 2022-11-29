import {
  BrowserRouter,
  Routes,
  Route,
  Link,
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
              <li><Link to='/about'>about</Link></li>
              <li><Link to='/of-the-florids'>of the florids</Link></li>
              <li><Link to='/publications'>publications</Link></li>
              <li><Link to='/blog'>blog</Link></li>
              <li><Link to='/contact'>contact</Link></li>
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
