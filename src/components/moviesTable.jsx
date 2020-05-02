import React, { Component } from 'react';
import Like from "./common/like";

class MoviesTable extends Component {

    raiseSort = path => {

        const sortColumn = { ...this.props.sortColumn };

        console.log(sortColumn);

        if (sortColumn.path === path) {
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        } else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }

        this.props.onSort(sortColumn);
    }

    render() {

        const { movies, onDelete, onLike } = this.props;
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th onClick={() => this.raiseSort('title')} scope="col">Title</th>
                        <th onClick={() => this.raiseSort('genre.name')} scope="col">Genre</th>
                        <th onClick={() => this.raiseSort('numberInStock')} scope="col">Stock</th>
                        <th onClick={() => this.raiseSort('dailyRentalRate')} scope="col">Rate</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
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