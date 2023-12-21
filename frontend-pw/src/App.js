import React from 'react';
import './App.css';
import Home from './pages/home/home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Blogpage from './pages/blogpage/blogpage';
import Gallerypage from './pages/gallerypage/gallerypage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/blog" Component={Blogpage}/>
        <Route path="/gallery" Component={Gallerypage}/>
        
      </Routes> 
        
    </Router>
  );
}

export default App;
