import React, { useEffect, useState } from 'react';
import Navbar from "../navbar/navbar";
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

  return (
    <div className={`App-header ${scrolled ? 'scrolled' : ''}`}>
    <section className="header">
        <section className="header-top__logo">
            <a href="/" className="header-logo">Ke Li</a>
        </section>
        <section className="header-top__navbar">
            <Navbar /> 
        </section>

    </section>
    </div>
  );
}

export default Header;