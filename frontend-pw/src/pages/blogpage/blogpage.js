import React from 'react';
import './blogpage.css';
import Contact from '../../component/contact/contact';
import Blogdetail from '../../component/blogdetail/blogdetail';
import Contribution from '../../component/contribution/contribution';
import Pageheader from '../../component/pageheader/pageheader';
function Blogpage() {
  return (
    <div className="Home">
      <header className="Home-header">
        <Pageheader />
      </header>
      <body>
        <Blogdetail />
        <Contact />
        <Contribution />
      </body>
    </div>
  );
}

export default Blogpage;
