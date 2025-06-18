import axios from "axios";
import { createBrowserHistory } from "history";

const adminAxiosInstance = axios.create();
const history = createBrowserHistory();

adminAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("This is response from Admin API  => ", error);
    // history.push("/sign-in");
    return Promise.reject(error);
  }
);

export default adminAxiosInstance;
