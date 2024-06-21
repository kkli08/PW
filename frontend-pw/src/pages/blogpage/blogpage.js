import React, { useEffect } from 'react';
import './blogpage.css';
import Contact from '../../component/contact/contact';
import Blogdetail from '../../component/blogdetail/blogdetail';
import Contribution from '../../component/contribution/contribution';
import Pageheader from '../../component/pageheader/pageheader';
import Lottie from "lottie-react";
import decorations from '../components/decorations.json';
import { ref, get, set, update } from 'firebase/database';
import { database } from '../../firebase';

function Blogpage() {
  useEffect(() => {
    const incrementViewCount = async () => {
      const viewCountRef = ref(database, 'viewBlogCount');
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
