import React from 'react';

export function User({user, removeUser}) {
    return (
        <li>
            <button onClick={() => removeUser(user.id)}>Delete</button>
            <strong>{user.name}  </strong>
            <i>({user.email})</i>
        </li>
    );
}
