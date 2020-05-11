import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { login } from '../services/authService';

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

    doSubmit = async () => {

        const { data } = this.state;

        const response = await login(data.username, data.password);

        console.log(response);

    }

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', 'password')}

                    {this.renderButton('Login')}
                </form>

            </div>
        );
    }
}

export default LoginForm;