import React from 'react';
import logo from './logo.svg';
import './App.css';

// async function chat() {
//   console.log('ça roule');
//   const response = await fetch('http://localhost:3000/api/', {
//     method: 'GET',
//     headers: new Headers({'Content-Type': 'Access-Control-Allow-Origin'}),
//     // mode: 'cors'
//   });
//   return response
// }

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* <button onClick={chat}>
        Clique ici
      </button> */}
      </header>
    </div>
  );
}

export default App;
