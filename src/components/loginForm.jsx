import React, { Component } from 'react';
import Input from './common/input';

class LoginForm extends Component {

    state = {
        account: {
            username: '',
            password: ''
        }

    }

    handleChange = ({ currentTarget: input }) => {

        const account = { ...this.state.account };

        account[input.name] = input.value;

        this.setState({ account });

    }

    handleSubmit = e => {
        e.preventDefault();
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