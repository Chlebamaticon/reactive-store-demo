import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import {UserList} from "./users/UserList";
import {Counter} from "./counter";
import {UserForm} from "./users/UserForm";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                  <UserForm />
                  <UserList testPropsValue={34}/>
                  <Counter />
                </header>
            </div>
        );
    }
}

export default App;
