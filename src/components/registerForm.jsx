import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import * as userService from '../services/userService'

class RegisterForm extends Form {

    state = {
        data: {
            username: '',
            password: '',
            name: '',
        },
        errors: {}

    };

    schema = {
        username: Joi.string().email().required().label('Username'),
        password: Joi.string().min(5).required().label('Password'),
        name: Joi.string().required().label('Name'),
    };

    doSubmit = async e => {

        try {

            const response = await userService.register(this.state.data);

            localStorage.setItem('token', response.headers['x-auth-token']);

            // force full page reload to run componentDidMount method in App component
            // this updates the user information and changes the navbar links
            // TODO make thisi work without full page reload
            window.location = '/';
            // this.props.history.push('/');

        } catch (ex) {

            if (ex.response && ex.response.status === 400) {

                // console.error(ex);
                // console.error(ex.response);
                // console.error(ex.response.status);

                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }

    }

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username', 'email')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderInput('name', 'Name')}

                    {this.renderButton('Register')}
                </form>

            </div>
        );
    }
}

export default RegisterForm;