import React, { Component } from 'react';

class LoginForm extends Component {

    state = {
        account: {
            username: '',
            password: ''
        }

    }

    handleChange = e => {

        const account = { ...this.state.account };

        account.username = e.currentTarget.value;

        this.setState({ account });

    }

    handleSubmit = e => {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            autoFocus
                            value={this.state.account.usename}
                            onChange={this.handleChange}
                            id="username" type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="text" className="form-control" />
                    </div>
                    <button className="btn btn-primary">Login</button>
                </form>

            </div>
        );
    }
}

export default LoginForm;