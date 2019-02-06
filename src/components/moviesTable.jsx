import React, { Component } from 'react';
import Like from './common/like';
import Table from './common/table';
import { Link } from 'react-router-dom';
import auth from '../services/authService';

const deleteColumn = {
    key: 'deleteButton',
    content: movie => <button onClick={() => this.props.onDelete(movie)} className="btn btn-danger btn-sm">
        Delete
    </button>
};

class MoviesTable extends Component {
    columns = [
        { path: 'title', label: 'Title', content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Rate' },
        {
            key: 'like',
            content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
        }
    ]

    constructor(){
        super();
        const user = auth.getCurrentUser();
        if (user && user.isAdmin) {
            this.columns.push(deleteColumn);
        }
    }

    render() {
        const { movies, onSort, sortColumn } = this.props;

        return (
            <Table
                data={movies}
                onSort={onSort}
                sortColumn={sortColumn}
                columns={this.columns} />
        );
    }
}

export default MoviesTable;