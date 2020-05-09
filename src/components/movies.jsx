import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { getMovies, deleteMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import Input from "./common/input";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        count: getMovies().length,
        pageSize: 4,
        currentPage: 1,
        selectedGenre: 'all',
        sortColumn: { path: 'title', order: 'asc' },
        search: ''
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
        this.setState({ selectedGenre: genre, currentPage: 1, search: '' })
    }

    handleSort = sortColumn => {

        this.setState({ sortColumn });
    }



    filteredData = () => {
        const {
            movies: allMovies,
            selectedGenre,
            search,
        } = this.state;

        if (search !== '') {
            return allMovies.filter((movie) => movie.title.toLowerCase().search(search.toLowerCase()) !== -1)
        } else {
            return selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        }
    }

    getPagedData = () => {

        const {
            pageSize,
            currentPage,
            sortColumn,
            selectedGenre
        } = this.state;

        const filtered = this.filteredData();

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies, selectedGenre };

    }

    handleSearch = ({ currentTarget: input }) => {

        let search = { ...this.state };

        search = input.value;

        this.setState({ search, currentPage: 1, selectedGenre: 'all' });

    }


    render() {

        const {
            pageSize,
            currentPage,
            genres,
            sortColumn
        } = this.state;

        const { totalCount, data: movies, selectedGenre } = this.getPagedData();

        return (

            <div className="row">

                <div className="col-2">
                    <ListGroup
                        items={genres}
                        onItemSelect={this.handleGenreSelect}
                        selectedItem={selectedGenre}
                    />
                </div>

                <div className="col-10 text-left">

                    <Link to="/movies/new" className="btn btn-primary mb-3">New Movie</Link>

                    <p>Showing {totalCount} movies in the database</p>

                    <Input
                        name="search"
                        placeholder="Search"
                        value={this.state.search}
                        onChange={this.handleSearch}
                    />

                    <MoviesTable
                        movies={movies}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />

                    <Pagination
                        itemsCount={totalCount}
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