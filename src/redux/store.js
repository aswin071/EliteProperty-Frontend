import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  emailAddress: localStorage.getItem('emailAddress') || "",
  user: JSON.parse(localStorage.getItem('user')) || null,
  tokenExpiry: localStorage.getItem('tokenExpiry') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  accessToken: localStorage.getItem('accessToken') || null,
  is_registered: localStorage.getItem('is_registered') === "true" || false, 
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setEmailAddress: (state, action) => {
      state.emailAddress = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setTokenExpiry: (state, action) => {
      state.tokenExpiry = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setIsRegistered: (state, action) => {
      state.is_registered = action.payload;
      localStorage.setItem('is_registered', action.payload); // Update localStorage
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.emailAddress = "";
      state.tokenExpiry = null;
      state.refreshToken = null;
      state.accessToken = null;
    },
  },
});

export const {
  setEmailAddress,
  setUser,
  setTokenExpiry,
  setRefreshToken,
  setAccessToken,
  clearUser,
  setIsRegistered,
} = appSlice.actions;

const store = configureStore({
  reducer: appSlice.reducer,
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('emailAddress', state.emailAddress);
  localStorage.setItem('user', JSON.stringify(state.user));
  localStorage.setItem('tokenExpiry', state.tokenExpiry);
  localStorage.setItem('refreshToken', state.refreshToken);
  localStorage.setItem('accessToken', state.accessToken);
  localStorage.setItem('is_registered', state.is_registered); 
});

export default store;