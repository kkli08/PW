import React from 'react';
import './App.css';
import Header from './component/header/header';
import Cover from './component/cover/cover';
import About from './component/about/about';
import Project from './component/project/project';
import Contact from './component/contact/contact';

import Contribution from './component/contribution/contribution';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Cover />
        <About />
        <Project />
        <Contact />

        <Contribution />
      </header>
    </div>
  );
}

export default App;
