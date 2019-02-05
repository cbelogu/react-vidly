import http from "./httpService";
import config from "../config.json";

export function getMovies(){
    return http.get(config.apiEndPointMovies);
}

export function deleteMovie(id) {
    return http.delete(getMovieUrl(id));
}

export function getMovie(id) {
    return http.get(getMovieUrl(id));
}

export function saveMovie(movie) {
    if (movie._id){
        const body = { ...movie };
        delete body._id;
        return http.put(getMovieUrl(movie._id), body);
    }
    return http.post(config.apiEndPointMovies, movie);
}

function getMovieUrl(id) {
    return config.apiEndPointMovies + '/' + id;
}
