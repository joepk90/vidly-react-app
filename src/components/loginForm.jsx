import React, { Component } from 'react';

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
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            autoFocus
                            value={account.usename}
                            onChange={this.handleChange}
                            id="username"
                            name="username"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            value={account.usename}
                            onChange={this.handleChange}
                            id="password"
                            name="password"
                            type="text"
                            className="form-control" />
                    </div>
                    <button className="btn btn-primary">Login</button>
                </form>

            </div>
        );
    }
}

export default LoginForm;