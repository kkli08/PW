import React from 'react';
import './gallerypage.css';
import Contact from '../../component/contact/contact';
import Blogdetail from '../../component/blogdetail/blogdetail';
import Contribution from '../../component/contribution/contribution';
import Pageheader from '../../component/pageheader/pageheader';
import Gallery from './gallerycomponent/gallery';
import Lottie from "lottie-react";
import decorations from './gallerycomponent/decorations.json';

function Gallerypage() {
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
        <Gallery />
        <Contact />
        <Contribution />
      </body>
    </div>
  );
}

export default Gallerypage;
