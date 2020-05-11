import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';

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

        try {

            const { data } = this.state;

            await auth.login(data.username, data.password);

            // force full page reload to run componentDidMount method in App component
            // this updates the user information and changes the navbar links
            // TODO make thisi work without full page reload
            window.location = '/';
            // this.props.history.push('/');

        } catch (ex) {

            if (ex && ex.response && ex.response.status === 400) {
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
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', 'password')}

                    {this.renderButton('Login')}
                </form>

            </div>
        );
    }
}

export default LoginForm;