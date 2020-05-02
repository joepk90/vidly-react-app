import React, { Component } from 'react';
import _ from 'lodash';
import { getMovies, deleteMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        count: getMovies().length,
        pageSize: 4,
        currentPage: 1,
        selectedGenre: 'all',
        sortColumn: { path: 'title', order: 'asc' }

    }

    componentDidMount() {

        const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];

        this.setState({ movies: getMovies(), genres });

    }

    handleDelete = async movie => {

        const movieId = movie._id;

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

    handlePageChange = page => {

        // check if page is a number

        this.setState({ currentPage: page })

    }

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 })
    }

    handleSort = path => {

        const sortColumn = { ...this.state.sortColumn };

        if (sortColumn.path === path) {
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        } else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }

        this.setState({ sortColumn });
    }


    render() {

        const { pageSize, currentPage, movies: allmovies, genres, selectedGenre, sortColumn } = this.state;

        const filtered = selectedGenre && selectedGenre._id ? allmovies.filter(m => m.genre._id === selectedGenre._id) : allmovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize);

        return (

            <div className="row">

                <div className="col-2">
                    <ListGroup
                        items={genres}
                        onItemSelect={this.handleGenreSelect}
                        selectedItem={selectedGenre}
                    />
                </div>

                <div className="col-10">
                    <p className="text-left">Showing {filtered.length} movies in the database</p>

                    <MoviesTable
                        movies={movies}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />

                    <Pagination
                        itemsCount={filtered.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>

        );
    }
}

export default Movies;