import { apiSlice } from "./api/apiSlice";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/auth/authSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import profileReducer from "../features/profiles/profileSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../features/notification/notificationSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth", "profile"],
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  profile: profileReducer,
  notification: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);