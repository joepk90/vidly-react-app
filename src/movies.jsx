import React, { Component } from 'react';
import { getMovies } from './services/fakeMovieService';

class Movies extends Component {
    state = {
        movies: getMovies()
    }

    handleDelete = movie => {

    }

    renderRow() {

        return this.state.movies.map(function (movie) {

            return (
                <tr key={movie._id}>
                    <td key="{movie.title}">{movie.title}</td>
                    <td key="{movie.genre}">{movie.genre.name}</td>
                    <td key="{movie.numberInStock}">{movie.numberInStock}</td>
                    <td key="{movie.dailyRentalRate}">{movie.dailyRentalRate}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Rate</th>
                    </tr>
                </thead>
                <tbody>

                    {this.renderRow()}

                </tbody>

            </table >
        );
    }
}

export default Movies;