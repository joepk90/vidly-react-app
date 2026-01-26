import { Component } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { getUsers } from '../services/userService';
import { paginate } from "../utils/paginate";
import SearchBox from './common/searchBox';
import Pagination from "./common/pagination";
import UsersTable from './usersTable';
import auth from '../services/authService';

class Users extends Component {
    state = {
        users: [],
        count: 0,
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc' },
        searchQuery: '',
        user: auth.getCurrentUser()
    }

    async componentDidMount() {
        const { data: users } = await getUsers();
        console.log(users);
        this.setState({ users, count: users.length });
    }

    handleDelete = async movie => {

        const { users: originalUsers } = this.state;

        const users = originalUsers.filter(m => m._id !== movie._id);

        this.setState({ users, count: users.length })

        try {
            // await deleteMovie(movie._id);
        } catch (ex) {

            // TODO not yet working - I think there is an issue with the server config:
            // - no response object provided + never reaches catch statement
            if (ex.response && ex.response.status === 404) {
                toast.error('this movie does not exist');
            }

            this.setState({ users: originalUsers });

        }

    }

    handlePageChange = page => {

        // check if page is a number

        this.setState({ currentPage: page })

    }


    handleSort = sortColumn => {

        this.setState({ sortColumn });
    }

    getPagedData = () => {

        const {
            pageSize,
            currentPage,
            sortColumn,
            users: allUsers,
            searchQuery
        } = this.state;

        let filtered = allUsers;
        if (searchQuery) {
            filtered = allUsers.filter((user) => user.name.toLowerCase().startsWith(searchQuery.toLowerCase()))
        }

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const users = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: users };

    }

    handleSearch = query => {
        this.setState({ searchQuery: query, currentPage: 1 });
    }

    render() {

        const {
            pageSize,
            currentPage,
            sortColumn,
            user
        } = this.state;

        const { totalCount, data: users, searchQuery } = this.getPagedData();

        console.log('Users: ', users);

        return (

            <div className="row">

                <div className="col-12 text-left">

                    {(user && user.isAdmin) && <Link to="/users/new" className="btn btn-primary mb-3">New User</Link>}

                    <p>Showing {totalCount} users in the database</p>

                    <SearchBox
                        value={searchQuery}
                        onChange={this.handleSearch}
                    />

                    <UsersTable
                        users={users}
                        sortColumn={sortColumn}
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

export default Users;