import React, { useEffect, useState } from 'react';
import Navbar from "../navbar/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCompass} from '@fortawesome/free-solid-svg-icons'
import "./header.css";

function Header () {
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

  return (
    <div className={`App-header ${scrolled ? 'scrolled' : ''}`}>
    <section className="header">
        <section className="header-top__logo">
            <a href="/" onClick={scrollToTop} className="header-logo">Ke Li</a>
        </section>
        <section className="header-top__navbar">
            <Navbar /> 
        </section>
        <section className="mobile-navbar" onClick={toggleMenu}>
          {/* 菜单图标或者文字 */}
          <FontAwesomeIcon icon={faCompass} />
        </section>
        {isMenuOpen && (
          <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
            {/* 移动菜单内容 */}
            <a href="#about" className="navbar-item">About Me</a>
            <a href="#projects" className="navbar-item">Projects</a>
            <a href="/resume.pdf" className="navbar-item" target="_blank" rel="noopener noreferrer">Resume</a>
            {/* <a href="/blog" className="navbar-item">Blog</a> */}
          </div>
        )}

    </section>
    </div>
  );
}

export default Header;
