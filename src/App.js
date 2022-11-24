import './App.css';
import Book from './Components/Book.js';

function App() {
  return (
    <div>
      <nav className='nav-bar'>
        <div className='nav-logo'>shawn hoo</div>
        <ul className='nav-links'>
          <div className='nav-menu'>
            <li><a href='#'>about</a></li>
            <li><a href='#'>of the florids</a></li>
            <li><a href='#'>publications</a></li>
            <li><a href='#'>blog</a></li>
            <li><a href='#'>contact</a></li>
          </div>
        </ul>
        </nav>
        <Book />
    </div>

  );
}

export default App;
