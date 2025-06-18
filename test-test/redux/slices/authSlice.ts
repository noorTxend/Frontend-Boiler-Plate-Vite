// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState, IPolicy } from "@/interfaces";

const initialState: IAuthState = {
  isAuthenticated: false,
  AccessCode: null,
  error: null,
  sessionExpired: false,
  expirationTime: null,
  policy: null,
  PortfolioPermId: null,
  ReferenceValue: null,
  username: null,
  LoginName: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{
        AccessCode: string;
        expirationTime: number;
        policy: IPolicy;
        PortfolioPermId: number;
        ReferenceValue: string;
        username: string;
        LoginName?: string;
        PortfolioTypePermId: number;
      }>
    ) {
      state.isAuthenticated = true;
      state.AccessCode = action.payload.AccessCode;
      state.ReferenceValue = action.payload.ReferenceValue;
      state.error = null;
      state.sessionExpired = false;
      state.expirationTime = action.payload.expirationTime;
      state.policy = action.payload.policy;
      state.PortfolioPermId = action.payload.PortfolioPermId;
      state.username = action.payload.username;
      state.LoginName = action.payload.LoginName;
      state.PortfolioTypePermId = action.payload.PortfolioTypePermId;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isAuthenticated = false;
      state.AccessCode = null;
      state.ReferenceValue = null;
      state.error = action.payload;
      state.expirationTime = null;
      state.policy = null;
      state.username = null;
      state.LoginName = null;
      state.PortfolioTypePermId = null;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.AccessCode = null;
      state.PortfolioPermId = null;
      state.ReferenceValue = null;
      state.error = null;
      state.sessionExpired = true;
      state.expirationTime = null;
      state.policy = null;
      state.username = null;
      state.LoginName = null;
      state.PortfolioTypePermId = null;
    },
    refreshSuccess(state, action: PayloadAction<{ AccessCode: string }>) {
      state.AccessCode = action.payload.AccessCode;
    },
    refreshFailure(state) {
      state.isAuthenticated = false;
      state.ReferenceValue = false;
      state.AccessCode = null;
      state.error = "Token refresh failed";
      state.LoginName = null;
      state.PortfolioTypePermId = null;
    },
    setSessionExpired(state) {
      state.isAuthenticated = false;
      state.ReferenceValue = false;
      state.AccessCode = null;
      state.sessionExpired = true;
      state.expirationTime = null;
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  logout,
  refreshSuccess,
  refreshFailure,
  setSessionExpired,
} = authSlice.actions;
export default authSlice.reducer;
export const selectAccessCode = (state: any) => state.auth.AccessCode;
export const selectExpirationTime = (state: any) => state.auth.expirationTime;
export const selectPolicy = (state: any) => state.auth.policy;
