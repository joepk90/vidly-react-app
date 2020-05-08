import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './common/input';
import Form from './common/form';

class LoginForm extends Form {

    state = {
        data: {
            username: '',
            password: ''
        },
        errors: {}

    };

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password'),
    };

    doSubmit = e => {

        console.log('test');

    }

    render() {

        const { data, errors } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        name="username"
                        label="Username"
                        value={data.username}
                        onChange={this.handleChange}
                        error={errors.username}
                    />
                    <Input
                        name="password"
                        label="Password"
                        value={data.password}
                        onChange={this.handleChange}
                        error={errors.password}
                    />
                    <button disabled={this.validate()}
                        className="btn btn-primary">Login</button>
                </form>

            </div>
        );
    }
}

export default LoginForm;