import axios from "axios";
import logger from "./loggerService";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
    const expectedException =
      error &&
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
  
    if (!expectedException) {
      logger.log("unexpected exception occured", error);
      toast("something unexpected happened");
    }
    return Promise.reject(error);
  });

export default {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete
};