import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getMovie, saveMovie, updateMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';

class MovieForm extends Form {

    state = {
        data: {
            // _id: '#', id exists when editing
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

    async populateGenres() {

        const { data } = await getGenres();

        this.setState({ genres: data });
    }

    async populateMovie() {

        try {
            const { id } = this.props.match.params;

            if (id === 'new') return;

            const { data: movie } = await getMovie(id);

            this.setState({ data: this.mapToViewModel(movie) });

        } catch (ex) {

            if (ex.response && ex.response.status === 404) {

                // console.error(ex);
                // console.error(ex.response);
                // console.error(ex.response.status);

                this.props.history.replace('/not-found');
            }
        }
    }

    async componentDidMount() {

        await this.populateGenres();

        await this.populateMovie();

    }

    mapToViewModel = (movie) => {

        // maps data to the data structure of the current view (only mapping the required data)

        return {
            _id: movie._id, // _id will be undefined if creating a new movie
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }

    }

    doSubmit = async () => {

        const { data } = this.state;

        const test = await saveMovie(data);

        console.log(test);

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