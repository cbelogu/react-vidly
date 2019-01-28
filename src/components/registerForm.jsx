import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = {
      data: {
          'email': "",
          'password': "",
          'name': ""
      },
      errors: {}
  };

  schema = {
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().min(5).label('Password'),
    name: Joi.string().required().label('Name')
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const error = this.validateProperty(input);
    if (error) errors[input.name] = error;
    else delete errors[input.name];
    this.setState({ errors });

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  doSubmit() {
    console.log("form submitted");
  }
  
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderSubmitButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
