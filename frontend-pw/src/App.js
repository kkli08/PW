import React from 'react';
import './App.css';
import Header from './component/header/header';
import Cover from './component/cover/cover';
import About from './component/about/about';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Cover />
        <About />
      </header>
    </div>
  );
}

export default App;
