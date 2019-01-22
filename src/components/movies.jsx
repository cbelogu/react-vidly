import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import { Paginate } from '../utils/paginate';

class Movies extends Component {
	state = {
		movies: getMovies(),
        pageSize: 3,
        currentPage: 1
	};

	handleDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	};

	handleLike = (movie) => {
		const movies = [ ...this.state.movies ];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handlePageChange = (pageNumber) => {
		this.setState({currentPage: pageNumber})
	};

	render() {
        const { length: movieCount } = this.state.movies;
        const { currentPage, pageSize, movies: allMovies } = this.state;
        const movies = Paginate(allMovies, currentPage, pageSize);
		if (movieCount === 0) {
			return <p>There are no movies in the database!</p>;
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
							<th />
							<th />
						</tr>
					</thead>
					<tbody>
						{movies.map((movie) => (
							<tr key={movie._id}>
								<td>{movie.title}</td>
								<td>{movie.genre.name}</td>
								<td>{movie.numberInStock}</td>
								<td>{movie.dailyRentalRate}</td>
								<td>
									<Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
								</td>
								<td>
									<button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
					<Pagination
						itemsCount={movieCount}
                        pageSize={pageSize}
                        currentPage = {currentPage}
						onPageChange={this.handlePageChange}
					/>
				</table>
			</React.Fragment>
		);
	}
}

export default Movies;
