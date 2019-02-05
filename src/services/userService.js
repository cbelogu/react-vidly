import http from "./httpService";
import config from "../config.json";

export function register(user) {
    return http.post(config.apiEndPointUsers, {
        name: user.name,
        email: user.username,
        password: user.password
    });
}