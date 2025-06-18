import {
  createSlice,
  PayloadAction,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { logout } from "./authSlice";
import { IPage, IPagePermissionState } from "@/interfaces";

const initialState: IPagePermissionState = {
  pages: [],
  loading: false,
  error: null,
};

const pagePermissionSlice = createSlice({
  name: "pagePermission",
  initialState,
  reducers: {
    fetchPermissionsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPermissionsSuccess(state, action: PayloadAction<IPage[]>) {
      state.pages = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchPermissionsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IPagePermissionState>) => {
    builder.addCase(logout, (state) => {
      state.pages = [];
      state.loading = false;
      state.error = null;
    });
  },
});

export const {
  fetchPermissionsStart,
  fetchPermissionsSuccess,
  fetchPermissionsFailure,
} = pagePermissionSlice.actions;
export default pagePermissionSlice.reducer;

export const selectPages = (state: any) => state.pagePermission.pages;

export const selectPermissionsLoading = (state: any) =>
  state.pagePermission.loading;

export const selectPermissionsError = (state: any) =>
  state.pagePermission.error;
