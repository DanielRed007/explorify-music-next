import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import spotifyClientReducer from "./slices/spotifyClientSlice";
import userReducer from "./slices/userSlice";
import modalReducer from "./slices/modalSlice";

const store = configureStore({
  reducer: {
    spotiFyClient: spotifyClientReducer,
    user: userReducer,
    modal: modalReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
