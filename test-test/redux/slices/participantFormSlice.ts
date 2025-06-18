import { PersistableParticipantFormState } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PersistableParticipantFormState = {
  sponsor: "",
  firstName: "",
  middleName: "",
  lastName: "",
  taxId: "",
  dob: "",
  phoneNo: "",
  email: "",
  streetAddress: "",
  streetAddress2: "",
  stateProvinces: "",
  rmd: false,
  city: "",
  zipCode: "",
  occupation: "",
  martialStatus: "",
  TraditionalRothIRAAmount: "",
  RothIRA: false,
  TraditionalIRA: false,
  RothIRAAmount: "",
  EmployeeCounrty: "",
  EmployeeName: "",
  Country: "",
  nameSuffux: "",
  nickname: "",
  sponsorLegalName: "",
  hasError: false,
};

export const participantFormSlice = createSlice({
  name: "participantForm",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{
        field: keyof PersistableParticipantFormState;
        value: string | boolean;
      }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { updateField, resetForm } = participantFormSlice.actions;

export default participantFormSlice.reducer;
