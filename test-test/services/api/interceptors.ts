import axios from "axios";
import store from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";
import { AppDispatch } from "../../redux/store";
import { createBrowserHistory } from "history";
import { toast } from "react-hot-toast";
import { ERROR_MESSAGES } from "@/layouts/skeletons/toastUtils";

const axiosInstance = axios.create();
const history = createBrowserHistory();
let isToastShown = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const extractError = error.response.data.ExceptionDetails;
    console.log("Error:", extractError);
    if (
      error.response &&
      extractError.ErrorCode == 20001 &&
      extractError.ErrorDescription == "Access Code validation failed."
    ) {
      // console.log("This is if of interceptor");
      const dispatch = store.dispatch as AppDispatch;
      dispatch(logout());
      history.push("/sign-in");
      if (!isToastShown) {
        toast(ERROR_MESSAGES.SESSION_EXPIRE, {
          style: { color: "#000" },
          icon: "⚠️",
        });
        isToastShown = true;
        setTimeout(() => (isToastShown = false), 5000);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
