import React, { useEffect, useState } from 'react';
import './markdown.css';
import Contact from '../../../component/contact/contact';
import BufferOverflow from './assets/bo';
import Contribution from '../../../component/contribution/contribution';
import Pageheader from '../../../component/pageheader/pageheader';
import Lottie from "lottie-react";
import decorations from '../../components/decorations.json';

function Bufferoverflow() {

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
      <BufferOverflow />
      <Contact />
      <Contribution />
    </div>
  );
}

export default Bufferoverflow;