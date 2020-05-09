import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

class MovieForm extends Form {

    state = {
        data: {
            title: '',
            genreId: '',
            numberInStock: '',
            dailyRentalRate: '',
        },
        errors: {},
        genres: getGenres()

    };

    schema = {
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().min(0).max(100).required().label('Number In Stock'),
        dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate'),
    };

    componentDidMount() {

        const { id } = this.props.match.params;

        if (id === 'new') return;

        const movie = getMovie(id);

        if (!movie) return this.props.history.push('/not-found');

        const { numberInStock, genre, title, dailyRentalRate } = movie;

        const data = {
            title,
            dailyRentalRate,
            genreId: genre._id,
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

        const { genres } = this.state;

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
                    {this.renderSelect('genreId', 'Genre', options)}
                    {this.renderInput('numberInStock', 'Number In Stock', 'number')}
                    {this.renderInput('dailyRentalRate', 'Rate', 'number')}

                    {this.renderButton('Save')}
                </form>

            </div>
        );
    }
}

export default MovieForm;