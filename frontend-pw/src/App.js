import React from 'react';
import './App.css';
import Header from './component/header/header';
import Cover from './component/cover/cover';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Cover />
      </header>
    </div>
  );
}

export default App;
