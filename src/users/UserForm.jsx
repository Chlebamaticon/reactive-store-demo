/* eslint-disable */
import * as React from 'react';
import { withStore } from '../lib/store';
import { usersList } from "../store/index";

class _UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.defaultState = {
            name: '',
            email: ''
        };

        this.state = { ...this.defaultState };
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        const { addUser } = this.props;

        if(!this.state.name || !this.state.email)
            return;

        addUser(this.state);

        this.setState({ ...this.defaultState });
    };

    handleChange = (name) => (ev) => {
        this.setState({
            [name]: ev.target.value
        });
    };

    componentDidMount() {
        console.log('cDM');

        this.name.focus();
    }

    render() {
        return (
            <form method="post" onSubmit={this.handleSubmit}>
                <label htmlFor="name">Name</label>
                <input id="name" value={this.state.name} type="text" onChange={this.handleChange('name')} ref={(el) => this.name = el} />
                <br />
                <label htmlFor="name">Email</label>
                <input id="email" value={this.state.email} type="text" onChange={this.handleChange('email')} />
                <br />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

// export const UserList = _UserList;
export const UserForm = withStore(usersList)()(_UserForm);
