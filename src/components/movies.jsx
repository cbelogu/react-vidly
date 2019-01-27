import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { Paginate } from '../utils/paginate';
import ListGroup from './common/listgroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 3,
        currentPage: 1,
		selectedGenre: "",
		sortColumn: { path: 'title', order: 'asc'}
	};

	componentDidMount() {
        const genres = [{_id: "", name: "All Genres"}, ...getGenres()]
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

	handleSort = (sortColumn) => {
		this.setState ({ sortColumn });
	};


	getPagedMovies() {
		const { currentPage, pageSize, movies: allMovies, selectedGenre, sortColumn } = this.state;
		const filteredMovies = selectedGenre && selectedGenre._id
			? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
			: allMovies;
		const sortedMovies = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);
		const movies = Paginate(sortedMovies, currentPage, pageSize);
		return { filteredMovieCount: filteredMovies.length , movies };
	}
	
	render() {
		const { length: movieCount } = this.state.movies;
        const { currentPage, pageSize, sortColumn } = this.state;
        const { filteredMovieCount, movies } = this.getPagedMovies();
		
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
					<p>Showing {filteredMovieCount} movies from the database</p>
                    <MoviesTable
                        movies={movies}
                        onLike={this.handleLike}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
						sortColumn = {sortColumn}
                        />

					<Pagination
						itemsCount={filteredMovieCount}
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
