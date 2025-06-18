import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "../redux/store";
import { loginSuccess, loginFailure } from "../redux/slices/authSlice";
import { toast } from "react-hot-toast";
import { ERROR_MESSAGES } from "@/layouts/skeletons/toastUtils";
import { GET_USER_LOGIN } from "@/services/api/userService";
import { useSelector } from "react-redux";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const loginUser =
  (
    userName: string,
    password: string,
    navigate: any,
    identityToken: null | string,
    cookies: { Username?: string },
    partnerPermId: any,
    apiKey: string
  ): AppThunk =>
  async (dispatch) => {
    try {
      const response = await GET_USER_LOGIN(
        userName,
        password,
        identityToken,
        partnerPermId,
        apiKey
      );

      if (
        response.TFARequired ||
        (!response.TFARequired && response.AccessCode)
      ) {
        dispatch(
          loginSuccess({
            AccessCode: response?.AccessCode,
            ReferenceValue: response?.ReferenceValue,
            expirationTime: response?.expirationTime || null,
            policy: response?.Policy,
            PortfolioPermId: response?.PortfolioPermId,
            username: userName,
            LoginName: response?.LoginName,
            PortfolioTypePermId: response?.PortfolioTypePermId,
          })
        );
        sessionStorage.setItem("AccessCode", response.AccessCode);
        //If TFA is true, navigate to the OTP screen.
        if (response.TFARequired) {
          navigate("/confirm-otp", { replace: true });
        }
        //  If TFA is false and the username matches the stored username in cookies, navigate to the home page.
        else if (!response.TFARequired && cookies.Username === userName) {
          navigate("/", { replace: true });
        }
        // If none of the above conditions are met, navigate to the home page.
        else {
          navigate("/");
        }
        // toast.success("Login successful!");
      } else {
        dispatch(loginFailure(ERROR_MESSAGES.ACCESS_CODE_REC_FAILURE));
        toast.error(ERROR_MESSAGES.LOGIN_FAILED);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data.message || ERROR_MESSAGES.LOGIN_CRED_FAILED;
      dispatch(loginFailure(errorMessage));
      toast.error(errorMessage);
    }
  };
