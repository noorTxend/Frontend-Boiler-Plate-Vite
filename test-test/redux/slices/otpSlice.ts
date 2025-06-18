import { IOtpState } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IOtpState = {
  referenceValue: "",
  otp: "",
  username: "",
};

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    setReferenceValue(state, action: PayloadAction<string>) {
      state.referenceValue = action.payload;
    },
    setOtp(state, action: PayloadAction<string>) {
      state.otp = action.payload;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    resetOtpState(state) {
      state.otp = "";
    },
  },
});

export const { setReferenceValue, setOtp, setUsername, resetOtpState } =
  otpSlice.actions;
export default otpSlice.reducer;
