import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie } from "../services/fakeMovieService";

class NewMovieForm extends Form {
  state = {
    data: {
      title: "",
      numberInStock: "",
      dailyRentalRate: "",
      genreId: ''
    },
    _id:'',
    errors: {}
  };

  schema = {
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

  componentDidMount() {
    const { data } = this.props;
    if (data) {
      const newData = {
        title: data.title,
        genreId: data.genre._id,
        numberInStock: data.numberInStock,
        dailyRentalRate: data.dailyRentalRate
      };
      this.setState({ data: newData, _id: data._id });
    }
  }

  doSubmit = () => {
    const movie = {
      name: this.state.data.title,
      genreId: this.state.data.genreId,
      numberInStock: this.state.data.numberInStock,
      dailyRentalRate: this.state.data.dailyRentalRate
    };

    if (this.state._id) {
      movie._id = this.state._id;
    }
    saveMovie(movie);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", getGenres())}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderSubmitButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default NewMovieForm;
