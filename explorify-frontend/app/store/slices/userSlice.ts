import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { permanentRedirect } from "next/navigation";
import { SpotifyUser } from "@/app/interface/user";
import {
  axiosRequest,
  getAccessToken,
  getRefreshToken,
} from "@/app/utils/auth/auth.utils";
import { getAxiorError } from "@/app/utils/error.utils";
import { closeModal, openModal } from "./modalSlice";
import { fetchUserProfile, fetchUserTopItems } from "../thunks/profileThunks";

const initialSpotifyUserState: SpotifyUser = {
  display_name: "",
  external_urls: {
    spotify: "",
  },
  href: "",
  id: "",
  images: [],
  type: "",
  uri: "",
  followers: {
    href: null,
    total: 0,
  },
};

interface UserState {
  profile: SpotifyUser;
  topItems: any;
  userLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  userError: string | null;
}

const initialState: UserState = {
  profile: initialSpotifyUserState,
  topItems: null,
  userLoading: false,
  accessToken: "",
  refreshToken: "",
  userError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserProfile: (state: any) => {
      state.profile = initialState;
      state.userError = null;
    },
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
    },
    setRefreshToken(state, action: PayloadAction<string | null>) {
      state.refreshToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<SpotifyUser>) => {
          state.userLoading = false;
          state.profile = action.payload;
        }
      )
      .addCase(
        fetchUserProfile.rejected,
        (state, action: PayloadAction<any>) => {
          state.userLoading = false;
          state.userError = action.payload;
        }
      )
      .addCase(fetchUserTopItems.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(
        fetchUserTopItems.fulfilled,
        (state, action: PayloadAction<SpotifyUser>) => {
          state.userLoading = false;
          state.topItems = action.payload;
        }
      )
      .addCase(
        fetchUserTopItems.rejected,
        (state, action: PayloadAction<any>) => {
          state.userLoading = false;
          state.userError = action.payload;
        }
      );
  },
});

export const { resetUserProfile, setAccessToken, setRefreshToken } =
  userSlice.actions;
export default userSlice.reducer;
