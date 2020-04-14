import React, { Component } from 'react';
import { getMovies, deleteMovie } from './services/fakeMovieService';

class Movies extends Component {
    state = {
        movies: getMovies(),
        count: getMovies().length
    }

    componentDidMount() { }

    renderCount() {

        const { count } = this.state;

        let countString = `No movies in the database`;
        if (count > 0) {
            countString = 'Showing ' + count + ' movies in the database';
        }

        return countString;

    }

    handleDelete = async movie => {

        const movieId = movie.target.id;

        await deleteMovie(movieId)
        delete this.state.movies.movieId;

        const { movies } = this.state;

        this.setState({ movies })
        this.setState({ count: movies.length })

    }

    renderRow() {

        return this.state.movies.map(movie => {

            return (
                <tr key={movie._id}>
                    <td key="{movie.title}">{movie.title}</td>
                    <td key="{movie.genre}">{movie.genre.name}</td>
                    <td key="{movie.numberInStock}">{movie.numberInStock}</td>
                    <td key="{movie.dailyRentalRate}">{movie.dailyRentalRate}</td>
                    <td>
                        <button id={movie._id} onClick={this.handleDelete} type="button" className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div className="moviesList">

                <p className="text-left pt-3">{this.renderCount()}</p>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Rate</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.renderRow()}

                    </tbody>

                </table>
            </div>
        );
    }
}

export default Movies;