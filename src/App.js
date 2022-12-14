import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useState, useEffect } from 'react';

import './App.css';
import About from './Components/About.js';
import Book from './Components/Book.js';
import BlogPage from './Components/blog/BlogPage.js';
import ContactPage from './Components/contact/ContactPage.js';
import HomePage from './Components/HomePage.js';
import PublicationsPage from './Components/PublicationsPage';
import BlogPageAdmin from './Components/blog/blogAdmin/BlogPageAdmin.js';
import AboutAdmin from "./Components/adminComponents/about_Admin_folder/AboutAdmin";
import ContactAdmin from "./Components/adminComponents/contact_Admin_folder/ContactAdmin";
import PublicationsPageAdmin from "./Components/adminComponents/publications_Admin_folder/PublicationsPageAdmin";
import ProtectedLayout from './Components/ProtectedLayout';
import MediumNavMenu from "./Components/navMenu/mediumNavMenu";
import SmallNavMenu from "./Components/navMenu/smallNavMenu";



function App() {

  const windowSize = useWindowSize();
  const viewWidth = windowSize.width;

  return (
    <BrowserRouter>
      <div className="App">
        {(viewWidth > 480) ? <MediumNavMenu /> : <SmallNavMenu /> }
        
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<About />} />
          <Route path='/of-the-florids' element={<Book />} />
          <Route path='/blog' element={<BlogPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/publications' element={<PublicationsPage />} />
          
          <Route path='/admin' element={<ProtectedLayout />} >
            <Route path='about' element={<AboutAdmin />} />
            <Route path='publications' element={<PublicationsPageAdmin />} />
            <Route path='blog' element={<BlogPageAdmin />} />
            <Route path='contact' element={<ContactAdmin />} />
          </Route>

        </Routes>
      </div>
    </BrowserRouter>

  );
}

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export default App;
