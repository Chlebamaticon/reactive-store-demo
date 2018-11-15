/* eslint-disable */
import * as React from 'react';
import { withStore } from '../lib/store';
import { usersList } from "../store";
import { User } from "./User";

class _UserList extends React.Component {

    render() {
        const { list, removeUser } = this.props;

        return (
           <div>
                <h2>User list</h2>
                <ul>
                    {list && list.map(user => (
                        <User
                            user={user}
                            removeUser={removeUser}
                            key={user.id}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}

export const UserList = withStore(usersList)(({ users: { list } }) => ({list}))(_UserList);
