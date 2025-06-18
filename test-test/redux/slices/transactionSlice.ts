// redux/slices/transactionSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TransactionState {
  transactionData: any;
  transactionpermId: number | null;
}

const initialState: TransactionState = {
  transactionData: null,
  transactionpermId: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactionData(state, action: PayloadAction<any>) {
      state.transactionData = action.payload;
      if (
        action.payload.TransactionData &&
        action.payload.TransactionData.length > 0
      ) {
        state.transactionpermId =
          action.payload.TransactionData[0].TransactionPermId;
      }
    },
  },
});

export const { setTransactionData } = transactionSlice.actions;
export default transactionSlice.reducer;
