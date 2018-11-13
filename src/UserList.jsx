/* eslint-disable */


import * as React from 'react';
import { withStore } from './store';


class _UserList extends React.Component {

    render() {
        const { val, actions: { setValue } } = this.props;

      return (
            <div>
              <button onClick={() => setValue(Math.round(Math.random()*1e6))}>Set Value</button>
                <h3>User list, val: {val}</h3>
            </div>
        )
    }
}

export const UserList = withStore(({test: {val}}) => ({ val }))(_UserList);
