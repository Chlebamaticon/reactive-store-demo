import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { UserList } from "./UserList";

function A() {
  return <p>fdsfsdds</p>
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <UserList dupa={34}/>
          <A />
        </header>
      </div>
    );
  }
}

export default App;
