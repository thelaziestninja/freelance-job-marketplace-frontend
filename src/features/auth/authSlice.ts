import { createSlice } from "@reduxjs/toolkit";
import { authApiSlice } from "./authApiSlice";
import { RootState } from "../../app/store";

interface AuthState {
  user: { username: string; email: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  userType: "freelancer" | "client" | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  userType: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, userType } = action.payload;
      state.user = user;
      state.token = token;
      state.userType = userType;
      state.isAuthenticated = true;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.userType = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApiSlice.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.userType = payload.user.user_type;
        state.isAuthenticated = true;
      }
    );
    builder.addMatcher(
      authApiSlice.endpoints.logout.matchFulfilled,
      (state) => {
        state.user = null;
        state.token = null;
        state.userType = null;
        state.isAuthenticated = false;
      }
    );
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectUserType = (state: RootState) => state.auth.userType;
export default authSlice.reducer;
