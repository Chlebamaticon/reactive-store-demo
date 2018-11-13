import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import {UserList} from "./users/UserList";
import {Counter} from "./counter";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <UserList testPropsValue={34}/>
                    <Counter />
                </header>
            </div>
        );
    }
}

export default App;
