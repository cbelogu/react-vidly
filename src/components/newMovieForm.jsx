import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from '../services/fakeGenreService';
import { saveMovie } from '../services/fakeMovieService';

class NewMovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: '',
      numberInStock: "",
      rate: ""
    },
    errors: {}
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genre: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .label("Number In Stock"),
    rate: Joi.number()
      .integer()
      .min(0)
      .max(10)
      .label("Rate")
  };

  doSubmit = () => {
    const movie = {
        'name': this.state.data.title,
        'genre': this.state.data.genre,
        'numberInStock': this.state.data.numberInStock,
        'dailyRentalRate': this.state.data.rate
    };
    console.log(movie);
    saveMovie(movie);
    
  }

  render() {
    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genre", "Genre", getGenres())}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("rate", "Rate", "number")}
          {this.renderSubmitButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default NewMovieForm;
