// Home.js
import React, { useEffect } from 'react';
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
import { ref, get, set, update } from 'firebase/database';
import { database } from '../../firebase';

function Home() {
  useEffect(() => {
    const incrementViewCount = async () => {
      const viewCountRef = ref(database, 'viewCount');
      const snapshot = await get(viewCountRef);

      if (snapshot.exists()) {
        const currentCount = snapshot.val();
        // Increment the view count
        await set(viewCountRef, currentCount + 1);
      } else {
        // Initialize the view count if it doesn't exist
        await set(viewCountRef, 1);
      }
    };

    incrementViewCount();
  }, []); // Empty dependency array ensures this runs once per render

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