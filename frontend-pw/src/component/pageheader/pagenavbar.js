import React from "react";
import "./pagenavbar.css";
import {
    BrowserRouter as Router,
    Link,
    useNavigate,
  } from "react-router-dom";



function Pagemavbar () {
    const navigate = useNavigate();

    const scrollToAbout = () => {
        navigate('/');
        setTimeout(() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1);
    };
    const scrollToProject = () => {
        navigate('/');
        setTimeout(() => {
            const aboutSection = document.getElementById('projects');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1);
    };
    

    return(
        
    <section className="pagenavbar">
        <Link to="/" className="pagenavbar-item">Home</Link>
        <a onClick={scrollToAbout} className="pagenavbar-item">About Me</a>
        <a onClick={scrollToProject} className="pagenavbar-item">Projects</a>
        <a href="/resume.pdf" className="pagenavbar-item" target="_blank" rel="noopener noreferrer">Resume</a>
        <Link to="/blog" className="pagenavbar-item">Blog</Link>
        <a href="#contact" className="pagenavbar-item">Contact</a>
        <a href="/gallery" className="pagenavbar-item">Gallery</a>
    </section>
    );
}


export default Pagemavbar;

