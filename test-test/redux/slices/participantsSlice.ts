import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IParticipantsStateProps } from "@/interfaces";

const initialState: IParticipantsStateProps = {
  totalParticipants: 0,
  portfolioPermIds: [],
};

const participantsSlice = createSlice({
  name: "participants",
  initialState,
  reducers: {
    setTotalParticipants(state, action: PayloadAction<number>) {
      state.totalParticipants = action.payload;
    },
    addPortfolioPermId(state, action: PayloadAction<number>) {
      if (!state.portfolioPermIds.includes(action.payload)) {
        state.portfolioPermIds.push(action.payload);
      }
    },
    setPortfolioPermIds(state, action: PayloadAction<number[]>) {
      state.portfolioPermIds = action.payload;
    },
  },
});

export const { setTotalParticipants, addPortfolioPermId, setPortfolioPermIds } =
  participantsSlice.actions;

export default participantsSlice.reducer;
