import React from "react";
import "./navbar.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from "react-router-dom";

function Navbar () {
    const scrollToTop = (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
    };
    return(
    <section className="navbar">
        <a href="/" onClick={scrollToTop} className="navbar-item">Home</a>
        <a href="#about" className="navbar-item">About Me</a>
        <a href="#projects" className="navbar-item">Projects</a>
        <a href="/resume.pdf" className="navbar-item" target="_blank" rel="noopener noreferrer">Resume</a>
        <Link to="/blog" className="navbar-item">Blog</Link>
        <a href="#contact" className="navbar-item">Contact</a>
        <a href="/gallery" className="navbar-item">Gallery</a>
    </section>
    );
}


export default Navbar;

