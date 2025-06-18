import { IRegistrationState } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IRegistrationState = {
  step: 1,
  accountType: "",
  firstName: "",
  lastName: "",
  middleName: "",
  email: "",
  userName: "",
  password: "",
  retypePassword: "",
  adminstrativefirm: "",
  taxid: "",
  dob: "",
  title: "",
  businessType: "",
  streetaddress: "",
  streetaddress2: "",
  selectCity: "",
  selectState: "",
  zipCode: "",
  cfirstname: "",
  llastname: "",
  cphonenumber: "",
  additionalData: {},
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    updateFormField(
      state,
      action: PayloadAction<{ field: keyof IRegistrationState; value: any }>
    ) {
      const { field, value } = action.payload;
      (state[field] as any) = value;
    },
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
    resetRegistration() {
      return initialState;
    },
  },
});
export const { updateFormField, setStep, resetRegistration } =
  registrationSlice.actions;
export default registrationSlice.reducer;
