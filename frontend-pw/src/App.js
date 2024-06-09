import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/home/home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Blogpage from './pages/blogpage/blogpage';
import Gallerypage from './pages/gallerypage/gallerypage';
import ReactGA from 'react-ga4';
// import detail blog
import Bufferoverflow from './pages/blogpage/cybersecurity/bufferoverflow';

function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize('G-M4B3ZPELJN'); // Replace with GA4 tracking ID
  }, []);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  return null; // This component does not render anything
}

function App() {
  return (
    <Router>
      <GoogleAnalytics />
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/blog" Component={Blogpage}/>
        <Route path="/gallery" Component={Gallerypage}/>

        <Route path="/blog/cybersecurity/bufferoverflow" Component={Bufferoverflow}/>

        
      </Routes> 
        
    </Router>
  );
}

export default App;
