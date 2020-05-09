import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getMovie, saveMovie, getMovies } from '../services/fakeMovieService';
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
        genres: []

    };

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().min(0).max(100).required().label('Number In Stock'),
        dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate'),
    };

    componentDidMount() {

        const genres = getGenres();
        this.setState({ genres });

        const { id } = this.props.match.params;

        if (id === 'new') return;

        const movie = getMovie(id);

        if (!movie) return this.props.history.replace('/not-found');

        this.setState({ data: this.mapToViewModel(movie) });

    }

    mapToViewModel = (movie) => {

        // maps data to the data structure of the current view (only mapping the required data)

        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }

    }

    doSubmit = () => {

        saveMovie(this.state.data);

        // console.log(getMovies());

        this.props.history.push('/movies');

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