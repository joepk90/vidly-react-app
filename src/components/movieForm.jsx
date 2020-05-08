import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

class MovieForm extends Form {

    state = {
        data: {
            title: '',
            genre: '',
            numberInStock: '',
            dailyRentalRate: '',
        },
        errors: {}

    };

    schema = {
        title: Joi.string().required().label('Title'),
        genre: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().min(0).max(100).required().label('Number In Stock'),
        dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate'),
    };

    componentDidMount() {

        const { id } = this.props.match.params;

        if (id === 'new') return;

        const { numberInStock, genre, title, dailyRentalRate } = getMovie(id);

        const data = {
            title,
            dailyRentalRate,
            genre: genre._id,
            numberInStock
        }

        this.setState({ data });

    }

    doSubmit = e => {

        console.log('test');

    }

    renderTitle() {

        let formTitle = 'Movie Form';

        const { title } = this.state.data;

        if (title !== '') {
            formTitle = formTitle + ': ' + title;
        }

        return (
            <h1>{formTitle}</h1>
        );

    }

    render() {

        const genres = getGenres();
        const genreOptions = genres.map(genre => {
            return { value: genre._id, name: genre.name }
        })

        const firstOption = { value: '', name: 'Choose...' }
        const options = [firstOption, ...genreOptions]


        return (
            <div>

                {this.renderTitle()}

                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title')}
                    {this.renderSelect('genre', 'Genre', options)}
                    {this.renderInput('numberInStock', 'Number In Stock', 'number')}
                    {this.renderInput('dailyRentalRate', 'Rate', 'number')}

                    {this.renderButton('Save')}
                </form>

            </div>
        );
    }
}

export default MovieForm;