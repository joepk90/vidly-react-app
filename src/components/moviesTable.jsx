import React, { Component } from 'react';
import Like from "./common/like";

const MoviesTable = props => {

    const { movies, onDelete, onLike } = props;

    return (

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

export default MoviesTable;