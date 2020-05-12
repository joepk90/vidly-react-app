import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from "./common/like";
import Table from "./common/table";
import auth from "../services/authService";

class MoviesTable extends Component {

    deleteColumn = {
        key: 'delete',
        content: movie => (
            <button
                id={movie._id} onClick={() => this.props.onDelete(movie)}
                type="button"
                className="btn btn-danger"
            >Delete</button>
        )
    }

    columns = [
        { path: 'title', label: 'Title', content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'rate' },
        {
            key: 'like',
            content: movie => (
                <Like liked={movie.liked}
                    onClick={() => this.props.onLike(movie)}
                />
            )
        }
    ];

    constructor() {
        super();

        const user = auth.getCurrentUser();
        if (user && user.isAdmin) this.columns.push(this.deleteColumn)
    }

    render() {

        const { movies, onSort, sortColumn } = this.props;
        return (

            <Table
                columns={this.columns}
                data={movies}
                sortColumn={sortColumn}
                onSort={onSort}
            />

        );
    }
}

export default MoviesTable;