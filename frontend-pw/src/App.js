import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/home/home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import Blogpage from './pages/blogpage/blogpage';
import Gallerypage from './pages/gallerypage/gallerypage';
import ReactGA from 'react-ga';

function GAListener() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize('G-M4B3ZPELJN');
  }, []);

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return null; // This component does not render anything
}

function App() {
  return (
    <Router>
      <GAListener /> {/* This component will handle the GA tracking */}
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/blog" Component={Blogpage}/>
        <Route path="/gallery" Component={Gallerypage}/>
        
      </Routes> 
        
    </Router>
  );
}

export default App;
