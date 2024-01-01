import React from 'react';
import './home.css';
import Header from '../../component/header/header';
import Cover from '../../component/cover/cover';
import About from '../../component/about/about';
import Project from '../../component/project/project';
import Contact from '../../component/contact/contact';
import Blog from '../../component/blog/blog';
import Contribution from '../../component/contribution/contribution';
import Experience from '../../component/experience/experience';
import Lottie from "lottie-react";
import decorations from '../components/decorations.json';


function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <Header />
      </header>
      {/* <div className="lottie-animation">
      <Lottie animationData={decorations} />
      </div> */}
      <body>
        <Cover />
        <About />
        <Experience />
        <Project />
        <Blog />
        <Contact />
        
        <Contribution />
      </body>
    </div>
  );
}

export default Home;
