import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";
import { saveMovie, getMovie } from "../services/movieService";
import { toast } from "react-toastify";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      numberInStock: "",
      dailyRentalRate: "",
      genreId: ""
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .label("Number In Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .label("Rate")
  };

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  async populateGenres() {
    const { data } = await getGenres();
    this.setState({ genres: data });
  }

  async populateMovies() {
    try {
      const id = this.props.match.params.id;
      if (id === "new") return;
      
      const { data: movie } = await getMovie(id);
      this.setState({ data: this.mapMovieData(movie) });
    }
    catch(error) {
      if (error && error.response.status >= 400 && error.response.status < 500) {
        return this.props.history.replace("/not-found");
      }
    }
  }

  mapMovieData(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = async () => {
    try {
      await saveMovie(this.state.data);
      this.props.history.push("/movies");
    }
    catch(error) {
      if (error && error.response.status >= 400 && error.response.status < 500) {
        toast.error(error.response.message);
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderSubmitButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
