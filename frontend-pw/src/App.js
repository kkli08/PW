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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/blog" Component={Blogpage}/>
      </Routes> 
        
    </Router>
  );
}

export default App;
