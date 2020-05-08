import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class MovieForm extends Form {

    state = {
        data: {
            title: '',
            genre: '',
            numberInStock: '',
            rate: '',
        },
        errors: {}

    };

    schema = {
        title: Joi.string().required().label('Title'),
        genre: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().min(0).max(100).required().label('Number In Stock'),
        rate: Joi.number().min(0).max(10).required().label('Rate'),
    };

    doSubmit = e => {

        console.log('test');

    }

    renderTitle() {

        const { id } = this.props.match.params;

        let title = `Movie - ${id}`;

        if (id === 'new') {
            title = 'Movie Form';
        }

        return (
            <h1>{title}</h1>
        );

    }

    render() {

        const genres = [
            { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
            { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
            { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" }
        ];

        return (
            <div>

                {this.renderTitle()}

                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title')}
                    {this.renderSelect('genre', 'Genre', genres)}
                    {this.renderInput('numberInStock', 'Number In Stock', 'number')}
                    {this.renderInput('rate', 'Rate', 'number')}

                    {this.renderButton('Save')}
                </form>

            </div>
        );
    }
}

export default MovieForm;