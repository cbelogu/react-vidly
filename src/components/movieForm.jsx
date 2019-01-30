import React, {Component} from "react";
import { getMovie } from "../services/fakeMovieService";
import NewMovieForm from "./newMovieForm";

class MovieForm extends Component {
  
  render() { 
    const movie = getMovie(this.props.match.params.id);

    if (!movie) {
      this.props.history.push('/not-found');
      return null;
    }
    return ( <React.Fragment>
      <NewMovieForm data={movie} history={this.props.history}/>
    </React.Fragment> );
  }
}
 
export default MovieForm;
