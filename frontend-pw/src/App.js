import React, { lazy, Suspense, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import ReactGA from 'react-ga4';

const Home = lazy(() => import('./pages/home/home'));
const Blogpage = lazy(() => import('./pages/blogpage/blogpage'));
const Gallerypage = lazy(() => import('./pages/gallerypage/gallerypage'));
const Bufferoverflow = lazy(() => import('./pages/blogpage/cybersecurity/bufferoverflow'));

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
      <Suspense fallback={<div className="route-loading" aria-label="Loading page" />}>
        <Routes>
          <Route path="/" Component={Home}/>
          <Route path="/blog" Component={Blogpage}/>
          <Route path="/gallery" Component={Gallerypage}/>
          <Route path="/blog/cybersecurity/bufferoverflow" Component={Bufferoverflow}/>
        </Routes>
      </Suspense>
        
    </Router>
  );
}

export default App;
