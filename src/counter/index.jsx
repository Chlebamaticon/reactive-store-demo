/* eslint-disable */

import React from 'react';
import { withStore } from '../store/index';

export function _Counter({counter}) {
    return (
        <div>
            <p>Counter value: </p>
            <h3>{ counter }</h3>
        </div>
    );
}

class _C extends React.Component{
    componentDidMount() {
        console.log('Counter did mount!!!');
    }

    componentDidUpdate() {
        console.log('Counter did update!!!');
    }

    render() {
        const {counter} = this.props;

        return (
            <div>
                <p>Counter value: </p>
                <h3>{ counter }</h3>
            </div>
        );
    }
}

export const Counter = withStore(({counter: { counter }}) => ({counter}))(_Counter);
