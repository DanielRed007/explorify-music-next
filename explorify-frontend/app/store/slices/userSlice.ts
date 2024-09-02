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
  userLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  userError: string | null;
}

const initialState: UserState = {
  profile: initialSpotifyUserState,
  userLoading: false,
  accessToken: "",
  refreshToken: "",
  userError: null,
};

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const accessToken: string | null = getAccessToken();
      const refreshToken = getRefreshToken();

      dispatch(setAccessToken(accessToken));
      dispatch(setRefreshToken(refreshToken));

      const response = await axiosRequest(
        "https://api.spotify.com/v1/me",
        "get",
        {
          Authorization: `Bearer ${accessToken}`,
        }
      );

      return response.data;
    } catch (error: any) {
      if (error.name === "AxiosError") {
        const axiosError: any = getAxiorError(error);

        dispatch(
          openModal({
            type: "error",
            modalContent: {
              status: axiosError.error.status,
              message: axiosError.error.message,
              displayButtons: true,
            },
          })
        );

        return rejectWithValue({ redirect: true, error: axiosError });
      }
      return rejectWithValue(error);
    }
  }
);

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
      );
  },
});

export const { resetUserProfile, setAccessToken, setRefreshToken } =
  userSlice.actions;
export default userSlice.reducer;
