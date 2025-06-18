// redux/store.ts
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import partnerReducer from "./slices/partnerSlice";
import pagePermissionReducer from "./slices/pagePermissionSlice";
import participantsReducer from "./slices/participantsSlice";
import transacationReducer from "./slices/transactionSlice";
import sponsorReducer from "./slices/sponsorSlice";
import participantFormReducer from "./slices/participantFormSlice";
import registrationReducer from "./slices/registrationSlice";
import otpReducer from "./slices/otpSlice";
import docsReducer from "./slices/getDocListSlice";

const persistConfig = {
  key: "root",
  storage,
};
const partnerDetailConfig = {
  key: "partner",
  storage,
};
const pagePermissionPersistConfig = {
  key: "pagePermission",
  storage,
};
const particpantPerirsitConfig = {
  key: "totalparticipant",
  storage,
};
const transacationPersistConfig = {
  key: "transacationid",
  storage,
};
const participantFormPersistConfig = {
  key: "participantForm",
  storage,
};
const otpPersistConfig = {
  key: "otp",
  storage,
};
const docPeristConfig = {
  key: "docId",
  storage,
};
const registrationPersistConfig = {
  key: "register",
  storage,
};
const perirstedPartnerReducer = persistReducer(
  partnerDetailConfig,
  partnerReducer
);
const persistedReducer = persistReducer(persistConfig, authReducer);
const persistedPagePermissionReducer = persistReducer(
  pagePermissionPersistConfig,
  pagePermissionReducer
);
const perirstedParticipantReducer = persistReducer(
  particpantPerirsitConfig,
  participantsReducer
);
const peristedTransacationReducer = persistReducer(
  transacationPersistConfig,
  transacationReducer
);
const peristedFormParticipant = persistReducer(
  participantFormPersistConfig,
  participantFormReducer
);
const peristedOtp = persistReducer(otpPersistConfig, otpReducer);
const peristedDocsId = persistReducer(docPeristConfig, docsReducer);
const peristedRegistation = persistReducer(
  registrationPersistConfig,
  registrationReducer
);
const store = configureStore({
  reducer: {
    partner: perirstedPartnerReducer,
    auth: persistedReducer,
    pagePermission: persistedPagePermissionReducer,
    participants: perirstedParticipantReducer,
    transacation: peristedTransacationReducer,
    sponsors: sponsorReducer,
    participantForm: peristedFormParticipant,
    registrationForm: peristedRegistation,
    otp: peristedOtp,
    docID: peristedDocsId,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/RESUME",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
      // Only enable Redux DevTools in development mode
      // devTools: process.env.NODE_ENV !== "production",
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
