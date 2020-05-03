import React, { Component } from 'react';
import Input from './common/input';

class LoginForm extends Component {

    state = {
        account: {
            username: '',
            password: ''
        },
        errors: {}

    }

    validate = () => {

        const errors = {};

        const { account } = this.state;

        if (account.username.trim() === '') {
            errors.username = 'Username is Required';
        }

        if (account.password.trim() === '') {
            errors.password = 'Password is Required';
        }

        // checks if the object is empty
        return Object.keys(errors).length === 0 ? null : errors;

    }

    handleChange = ({ currentTarget: input }) => {

        const account = { ...this.state.account };

        account[input.name] = input.value;

        this.setState({ account });
    }

    handleSubmit = e => {

        e.preventDefault();

        const errors = this.validate();

        console.log(errors);

        this.setState((errors));

        if (this.errors) return;
    }

    render() {

        const { account } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        name="username"
                        label="Username"
                        value={account.username}
                        onChange={this.handleChange}
                    />
                    <Input
                        name="password"
                        label="Password"
                        value={account.password}
                        onChange={this.handleChange}
                    />
                    <button className="btn btn-primary">Login</button>
                </form>

            </div>
        );
    }
}

export default LoginForm;