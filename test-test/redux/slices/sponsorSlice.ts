// src/redux/slices/sponsorSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { RO_CONSTANTS } from "@/constants/RolloverConstants";
import { LIST_USERS } from "@/services/api/userService";
import { ISponsor, ISponsorState } from "@/interfaces";

// src/types/sponsorTypes.ts

export const fetchSponsors = createAsyncThunk<
  ISponsor[],
  number | undefined,
  { state: RootState }
>(
  "sponsors/fetchSponsors",
  async (portfolioPermId, { getState, rejectWithValue }) => {
    const { auth, partner } = getState();
    const idToUse = Number(portfolioPermId) || auth.PortfolioPermId;
    const AccessCode = auth.AccessCode;
    try {
      const response = await LIST_USERS(
        idToUse,
        RO_CONSTANTS.PORTFOLIO_TYPE_ID.PLAN_SPONSOR,
        AccessCode,
        partner.partnerPermId,
        partner.apiKey
      );
      return response.InternalPortfolioInqRs.PortfolioData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: ISponsorState = {
  sponsors: [],
  sponseorsloading: false,
  error: null,
};

const sponsorSlice = createSlice({
  name: "sponsors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSponsors.pending, (state) => {
        state.sponseorsloading = true;
      })
      .addCase(
        fetchSponsors.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.sponsors = action.payload;
          state.sponseorsloading = false;
        }
      )
      .addCase(fetchSponsors.rejected, (state, action: PayloadAction<any>) => {
        state.sponseorsloading = false;
        state.error = action.payload;
      });
  },
});

export default sponsorSlice.reducer;
