import React, { useEffect, useState } from 'react';
import Pagenavbar from "./pagenavbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCompass, faList, faSnowflake} from '@fortawesome/free-solid-svg-icons'
import {
  BrowserRouter as Router,
  Link,
  useNavigate,
} from "react-router-dom";
import "./pageheader.css";

function Pageheader () {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            setScrolled(isScrolled);
        };

        // 添加滚动监听
        window.addEventListener('scroll', handleScroll);

        // 清除监听
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // handle click on LOGO and go back to the top smoothly
    const scrollToTop = (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
    };

    // for mobile screen header
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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

  return (
    <div className={`App-pageheader ${scrolled ? 'scrolled' : ''}`}>
    <section className="pageheader">
        <section className="pageheader-top__logo">
            <a href="/" onClick={scrollToTop} className="pageheader-logo">Ke Li</a>
        </section>
        <section className="pageheader-top__navbar">
            <Pagenavbar /> 
        </section>
        
        {isMenuOpen && (
          <div className={`pagemobile-menu ${isMenuOpen ? 'pagemobile-menu-open' : ''}`}>
            {/* 移动菜单内容 */}
            <a onClick={scrollToAbout} className="navbar-item">About Me</a>
            <a onClick={scrollToProject} className="navbar-item">Projects</a>
            <a href="/resume.pdf" className="navbar-item" target="_blank" rel="noopener noreferrer">Resume</a>
            {/* <a href="/blog" className="navbar-item">Blog</a> */}
          </div>
        )}
        <section className="pagemobile-navbar" onClick={toggleMenu}>
          {/* 菜单图标或者文字 */}
          <FontAwesomeIcon icon={faSnowflake} />
          {/* <FontAwesomeIcon icon={faList} /> */}
          {/* <FontAwesomeIcon icon={faCompass} /> */}
        </section>

    </section>
    </div>
  );
}

export default Pageheader;
