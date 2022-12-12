import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import './App.css';
import About from './Components/About.js';
import Book from './Components/Book.js';
import BlogPage from './Components/blog/BlogPage.js';
import ContactPage from './Components/contact/ContactPage.js';
import HomePage from './Components/HomePage.js';
import PublicationsPage from './Components/PublicationsPage';
import BlogPageAdmin from './Components/blog/blogAdmin/BlogPageAdmin.js';

import ProtectedLayout from './Components/ProtectedLayout';
import PostsPage from './Components/PostsPage';

function App() {  
  return (
    <BrowserRouter>
      <div className="App">
        <nav className='nav-bar'>
          <div className='nav-logo'>
            <NavLink to='/' className="logo">shawn hoo</NavLink>
          </div>
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
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<About />} />
          <Route path='/of-the-florids' element={<Book />} />
          <Route path='/blog' element={<BlogPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/publications' element={<PublicationsPage />} />
          <Route path='/admin/blog' element={<BlogPageAdmin />} />
          
          <Route path='/admin' element={<ProtectedLayout />} >
            <Route path='posts' element={<PostsPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
