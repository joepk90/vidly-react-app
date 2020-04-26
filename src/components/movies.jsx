import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/fakeMovieService';
import Like from "./common/like";
import Pagination from "./common/pagination";

class Movies extends Component {
    state = {
        movies: getMovies(),
        count: getMovies().length,
        pageSize: 4,
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

    handleLike = (movie) => {
        let movies = [...this.state.movies];

        let index = movies.indexOf(movie);

        movies[index] = { ...movies[index] }; // why are we cloning the object here? - why not just use the object in the state?

        if (!movies[index].liked) {
            movies[index].liked = true;
        } else {
            movies[index].liked = false;
        }

        this.setState({ movies });
    };

    handlePageChange = e => {

        // e.preventDefault();

        console.log(e)
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
                        <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
                    </td>
                    <td>
                        <button id={movie._id} onClick={this.handleDelete} type="button" className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            );
        });
    }

    render() {

        const { count } = this.state;

        return (
            <React.Fragment>

                <p className="text-left">{this.renderCount()}</p>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Rate</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.renderRow()}

                    </tbody>

                </table>
                <Pagination itemsCount={count} pageSize={this.state.pageSize} onPageChange={this.handlePageChange} />
            </React.Fragment>
        );
    }
}

export default Movies;