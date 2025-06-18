import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPartnerState {
  whiteLabelPartnerId: number | null;
  partnerPermId: number | null;
  apiKey: string | null;
  partnerName: string | null;
  image: string | null;
  subdomain: string | null;
  isEnable: boolean | null;
  apiBaseUrl: string | null;
  marketingBaseUrl: string | null;
}

const initialState: IPartnerState = {
  whiteLabelPartnerId: null,
  partnerPermId: null,
  apiKey: null,
  partnerName: null,
  image: null,
  subdomain: null,
  isEnable: null,
  apiBaseUrl: null,
  marketingBaseUrl: null,
};

const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    setPartnerDetails(
      state,
      action: PayloadAction<{
        whiteLabelPartnerId: number;
        partnerPermId: number;
        apiKey: string;
        partnerName: string;
        image: string;
        subdomain: string;
        isEnable: boolean;
        apiBaseUrl: string;
        marketingBaseUrl: string;
      }>
    ) {
      state.whiteLabelPartnerId = action.payload.whiteLabelPartnerId;
      state.partnerPermId = action.payload.partnerPermId;
      state.apiKey = action.payload.apiKey;
      state.partnerName = action.payload.partnerName;
      state.image = action.payload.image;
      state.subdomain = action.payload.subdomain;
      state.isEnable = action.payload.isEnable;
      state.apiBaseUrl = action.payload.apiBaseUrl;
      state.marketingBaseUrl = action.payload.marketingBaseUrl;
    },
    clearPartnerDetails(state) {
      state.whiteLabelPartnerId = null;
      state.partnerPermId = null;
      state.apiKey = null;
      state.partnerName = null;
      state.image = null;
      state.subdomain = null;
      state.isEnable = null;
      state.apiBaseUrl = null;
      state.marketingBaseUrl = null;
    },
  },
});

// Export the actions and reducer
export const { setPartnerDetails, clearPartnerDetails } = partnerSlice.actions;
export default partnerSlice.reducer;

// Selectors for accessing specific parts of the state
export const selectPartnerDetails = (state: any) => state.partner;
export const selectPartnerName = (state: any) => state.partner.partnerName;
export const selectSubdomain = (state: any) => state.partner.subdomain;
