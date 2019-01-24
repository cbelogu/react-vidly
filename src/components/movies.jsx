import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { Paginate } from '../utils/paginate';
import ListGroup from './common/listgroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 3,
        currentPage: 1,
        selectedGenre: ""
	};

	componentDidMount() {
        const genres = [{name: "All Genres"}, ...getGenres()]
		this.setState({ movies: getMovies(), genres });
	}

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
		this.setState({ currentPage: pageNumber });
	};

	handleGenreSelect = (genre) => {
		this.setState( {selectedGenre: genre, currentPage: 1 });
	};

	render() {
		const { length: movieCount } = this.state.movies;
        const { currentPage, pageSize, movies: allMovies, selectedGenre } = this.state;
        const filteredMovies = selectedGenre && selectedGenre._id
            ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
            : allMovies;

		const movies = Paginate(filteredMovies, currentPage, pageSize);
		if (movieCount === 0) {
			return <p>There are no movies in the database!</p>;
		}

		return (
			<div className="row">
				<div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        onItemSelect={this.handleGenreSelect}
                        selectedItem={this.state.selectedGenre}
                        />
				</div>
				<div className="col">
					<p>Showing {filteredMovies.length} movies from the database</p>
                    <MoviesTable
                        movies={movies}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        />

					<Pagination
						itemsCount={filteredMovies.length}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
