/* eslint-disable */

import React, { Component, PureComponent } from 'react';
import { withStore } from '../lib/store';
import { counter, usersList } from "../store/index";

class Test extends PureComponent {
  componentDidMount() {
    console.log('Test did mount');
  }

  componentDidUpdate() {
    console.log('Test did update!!!');
  }

  render(){
    return <p>Users amount: {this.props.list && this.props.list.length}</p>
  }
}

const TestC = withStore(usersList, counter)((store) => {
  const { users: { list } } = store;

  return ({list})
})(Test);

export function _Counter({counter}) {
    return (
        <div>
            <p>Counter value: </p>
            <h3>{ counter }</h3>
          <TestC />
        </div>
    );
}

class _C extends React.Component{
  constructor(p) {
    super(p);

    this.state = {
      counter: 0
    }
  }

    componentDidMount() {
        console.log('Counter did mount!!!');
    }

    componentDidUpdate() {
        console.log('Counter did update!!!');
    }

    render() {
        const {counter} = this.props;
        // const {counter} = this.state;

        return (
            <div>
              <p>Counter value: </p>
              <h3>{ counter }</h3>
              {/*<button onClick={() => this.setState({ counter: counter + 1 })}>sfsdfds</button>*/}
              <TestC />
              {/*sdfsdds*/}
            </div>
        );
    }
}

export const Counter = withStore(counter)(({counter: { counter }}) => ({counter}))(_C);
// export const Counter = _C;
