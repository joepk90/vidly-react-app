import React, { Component } from 'react';
import Joi from 'joi-browser';
import { Redirect } from 'react-router-dom';
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

            const { state } = this.props.location

            // force full page reload to run componentDidMount method in App component
            // this updates the user information and changes the navbar links
            // TODO make thisi work without full page reload
            window.location = state ? state.from.pathname : '/';
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

        if (auth.getCurrentUser()) return <Redirect to='/' />;

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