import React from "react";
import "./navbar.css";

function Navbar () {
    return(
    <section className="navbar">
        <a href="/" className="navbar-item">Home</a>
        <a href="/#about" className="navbar-item">About Me</a>
        <a href="/#projects" className="navbar-item">Projects</a>
        <a href="/blog" className="navbar-item">Blog</a>
        <a href="/#contact" className="navbar-item">Contact</a>
        <a href="/gallery" className="navbar-item">Gallery</a>
    </section>
    );
}


export default Navbar;

