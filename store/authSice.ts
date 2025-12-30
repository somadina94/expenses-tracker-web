import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/types";
import Cookies from "js-cookie";

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  access_token: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  access_token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.access_token = action.payload;
      Cookies.set("access_token", action.payload, {
        secure: true,
        sameSite: "lax",
        expires: 90,
      });
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.access_token = null;
      Cookies.remove("access_token");
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
