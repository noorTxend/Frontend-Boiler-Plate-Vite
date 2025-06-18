import { IGetDocState } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IGetDocState = {
  documentPermIds: [],
};

const docSlice = createSlice({
  name: "docIds",
  initialState,
  reducers: {
    setDocIds(state, action: PayloadAction<number[]>) {
      state.documentPermIds = action.payload;
    },
  },
});

export const { setDocIds } = docSlice.actions;
export default docSlice.reducer;
