/* eslint-disable */
import * as React from 'react';
import { withStore } from '../store/index';
import { User } from "./User";
import { UserForm } from "./UserForm";

class _UserList extends React.Component {

    render() {
        const { list, removeUser } = this.props;

        console.log('props', this.props);

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

// export const UserList = _UserList;
export const UserList = withStore(({ users: { list } }) => ({list}))(_UserList);
