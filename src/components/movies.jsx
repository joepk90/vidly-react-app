import React, { Component } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBox from './common/searchBox';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        count: 0,
        pageSize: 4,
        currentPage: 1,
        selectedGenre: 'all',
        sortColumn: { path: 'title', order: 'asc' },
        searchQuery: ''
    }

    async componentDidMount() {

        const { data: genres } = await getGenres();
        const { data: movies } = await getMovies();

        const modifiedGenres = [{ _id: '', name: 'All Genres' }, ...genres];

        this.setState({ movies, genres: modifiedGenres, count: movies.length });

    }

    handleDelete = async movie => {

        const { movies: originalMovies } = this.state;

        const movies = originalMovies.filter(m => m._id !== movie._id);

        this.setState({ movies, count: movies.length })

        try {
            await deleteMovie(movie._id);
        } catch (ex) {

            // TODO not yet working - I think there is an issue with the server config:
            // - no response object provided + never reaches catch statement
            if (ex.response && ex.response.status === 404) {
                toast.error('this movie does not exist');
            }

            this.setState({ movies: originalMovies });

        }

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
        this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: '' })
    }

    handleSort = sortColumn => {

        this.setState({ sortColumn });
    }

    getPagedData = () => {

        const {
            pageSize,
            currentPage,
            sortColumn,
            selectedGenre,
            movies: allMovies,
            searchQuery
        } = this.state;

        let filtered = allMovies;
        if (searchQuery) {
            filtered = allMovies.filter((movie) => movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
        } else if (selectedGenre && selectedGenre._id) {
            filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        }

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies, selectedGenre };

    }

    handleSearch = query => {
        this.setState({ searchQuery: query, currentPage: 1, selectedGenre: 'all' });
    }


    render() {

        const {
            pageSize,
            currentPage,
            genres,
            sortColumn
        } = this.state;

        const { totalCount, data: movies, selectedGenre, searchQuery } = this.getPagedData();

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

                    <SearchBox
                        value={searchQuery}
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