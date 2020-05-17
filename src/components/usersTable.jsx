import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from "./common/table";
import auth from '../services/authService';

class MoviesTable extends Component {

    deleteColumn = {
        key: 'delete',
        content: user => (
            <button
                id={user._id} onClick={() => this.props.onDelete(user)}
                type="button"
                className="btn btn-danger"
            >Delete</button>
        )
    }

    columns = [
        { path: 'title', label: 'Title', content: user => <Link to={`/movies/${user._id}`}>{user.name}</Link> },
        { path: 'email', label: 'Email' },
        { path: 'isAdmin', label: 'Administrator', content: user => user.isAdmin === true ? 'True' : 'False' },
    ];

    constructor() {
        super();

        const user = auth.getCurrentUser();
        if (user && user.isAdmin) this.columns.push(this.deleteColumn)
    }

    render() {

        const { users, onSort, sortColumn } = this.props;
        return (

            <Table
                columns={this.columns}
                data={users}
                sortColumn={sortColumn}
                onSort={onSort}
            />

        );
    }
}

export default MoviesTable;