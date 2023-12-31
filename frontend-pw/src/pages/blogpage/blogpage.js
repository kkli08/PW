import React from 'react';
import './blogpage.css';
import Contact from '../../component/contact/contact';
import Blogdetail from '../../component/blogdetail/blogdetail';
import Contribution from '../../component/contribution/contribution';
import Pageheader from '../../component/pageheader/pageheader';
import Lottie from "lottie-react";
import decorations from '../components/decorations.json';

function Blogpage() {
  return (
    <div className="Home">
      <header className="Home-header">
        <Pageheader />
      </header>
      <div className="lottie-animation">
      <Lottie animationData={decorations} />
      </div>
      <div className="lottie-animation-flipped">
        <Lottie animationData={decorations} />
      </div>
      <body>
        <Blogdetail />
        <Contact />
        <Contribution />
      </body>
    </div>
  );
}

export default Blogpage;
