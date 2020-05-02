import React, { Component } from 'react';
import Like from "./common/like";
import TableHeader from './common/tableHeader';

class MoviesTable extends Component {

    columns = [
        { path: 'title', label: 'Title' },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'rate' },
        { key: '' },
        { key: '' },
    ];

    render() {

        const { movies, onDelete, onLike, onSort, sortColumn } = this.props;
        return (
            <table className="table">
                <TableHeader
                    columns={this.columns}
                    sortColumn={sortColumn}
                    onSort={onSort}
                />

                <tbody>
                    {movies.map(movie => (
                        <tr key={movie._id}>
                            <td key="{movie.title}">{movie.title}</td>
                            <td key="{movie.genre}">{movie.genre.name}</td>
                            <td key="{movie.numberInStock}">{movie.numberInStock}</td>
                            <td key="{movie.dailyRentalRate}">{movie.dailyRentalRate}</td>
                            <td>
                                <Like liked={movie.liked} onClick={() => onLike(movie)} />
                            </td>
                            <td>
                                <button id={movie._id} onClick={() => onDelete(movie)} type="button" className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        );
    }
}

export default MoviesTable;