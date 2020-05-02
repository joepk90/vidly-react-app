import React, { Component } from 'react';
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {

    columns = [
        { path: 'title', label: 'Title' },
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
        },
        {
            key: 'delete',
            content: movie => (
                <button
                    id={movie._id} onClick={() => this.props.onDelete(movie)}
                    type="button"
                    className="btn btn-danger"
                >Delete</button>
            )
        },
    ];

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