import React from 'react';
import './App.css';
import Header from './component/header/header';
import Cover from './component/cover/cover';
import About from './component/about/about';
import Project from './component/project/project';
import Contact from './component/contact/contact';
import Blog from './component/blog/blog';

import Contribution from './component/contribution/contribution';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <body>
        <Cover />
        <About />
        <Project />
        <Blog />
        <Contact />
        
        <Contribution />
      </body>
    </div>
  );
}

export default App;
