import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./common/pagination";
import { Paginate } from "../utils/paginate";
import ListGroup from "./common/listgroup";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: "",
    sortColumn: { path: "title", order: "asc" },
    searchQueryString: ""
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const { data: movies } = await getMovies();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ movies, genres });
  }

  handleDelete = async movie => {
    try {
      await deleteMovie(movie._id);
    } catch (error) {
      if (error && error.response && error.response.status === 404) {
        toast.error(`This movie has already been deleted from database!`);
      }
    }

    const { data: movies } = await getMovies();
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = pageNumber => {
    this.setState({ currentPage: pageNumber });
  };

  handleGenreSelect = genre => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
      searchQueryString: ""
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedMovies() {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQueryString
    } = this.state;
    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
        : searchQueryString !== ""
        ? allMovies.filter(movie =>
            movie.title
              .toLowerCase()
              .startsWith(searchQueryString.toLowerCase())
          )
        : allMovies;
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = Paginate(sortedMovies, currentPage, pageSize);
    return { filteredMovieCount: filteredMovies.length, movies };
  }

  handleSearchQueryChange = ({ currentTarget: input }) => {
    this.setState({
      searchQueryString: input.value,
      selectedGenre: "",
      currentPage: 1
    });
  };

  render() {
    const { length: movieCount } = this.state.movies;
    const { currentPage, pageSize, sortColumn } = this.state;
    const { filteredMovieCount, movies } = this.getPagedMovies();
    const { user } = this.props;

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
          {user && (
            <Link to="/movies/new" className="btn btn-primary m-2">
              New Movie
            </Link>
          )}
          <SearchBox
            onChange={this.handleSearchQueryChange}
            value={this.state.searchQueryString}
          />
          <p>Showing {filteredMovieCount} movies from the database</p>
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
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
