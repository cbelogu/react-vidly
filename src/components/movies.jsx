import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

class Movies extends Component {
    state = {
        movies: getMovies()
    };

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
    }

    render() {
        const { length: movieCount } = this.state.movies;

        if (movieCount === 0) {
            return <p>There are no movies in the database!</p>
        }

        return (
        <React.Fragment>
            <p>Showing {movieCount} movies from the database</p>

        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Genre</th>
                    <th>Number In Stock</th>
                    <th>Daily Rental Rate</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {this.state.movies.map(movie =>
                <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                </tr>)}
            </tbody>
        </table>
        </React.Fragment>);
    }
}

export default Movies;