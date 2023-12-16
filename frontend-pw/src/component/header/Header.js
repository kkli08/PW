import React from "react";
import Navbar from "../navbar/navbar";
import "./header.css";

function Header () {
  return (
    
    <section className="header">
        <section className="header-top__logo">
            <a href="/" className="header-logo">Ke Li</a>
        </section>
        <section className="header-top__navbar">
            <Navbar /> 
        </section>

    </section>
  );
}

export default Header;