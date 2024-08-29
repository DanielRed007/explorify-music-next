import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { SpotifyUser } from "@/app/interface/user";
import axios from "axios";

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
  topArtists: null;
  topArtistsLoading: boolean;
  userLoading: boolean;
  userError: string | null;
}

const initialState: UserState = {
  profile: initialSpotifyUserState,
  topArtists: null,
  topArtistsLoading: false,
  userLoading: false,
  userError: null,
};

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;

      const accessToken = state.spotiFyClient.accessToken;

      if (!accessToken) {
        return rejectWithValue("Access Token is not available");
      }

      const response = await fetch(
        `https://api.spotify.com/v1/users/21tqr4elj6xgvzcp2qmrmnjry`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserTopArtists = createAsyncThunk(
  "user/fetchTopArtists",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;

      const accessToken = state.spotiFyClient.accessToken;

      if (!accessToken) {
        return rejectWithValue("Access Token is not available");
      }

      if (accessToken) {
        axios
          .get("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.error(err);
          });
      }

      // const response = await fetch(
      //   `https://api.spotify.com/v1/me/top/artists`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   }
      // );

      // if (!response.ok) {
      //   throw new Error("Failed to fetch user profile");
      // }

      // const data = await response.json();
      // return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
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
      .addCase(fetchUserTopArtists.pending, (state) => {
        state.topArtistsLoading = true;
        state.userError = null;
      })
      .addCase(
        fetchUserTopArtists.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.topArtistsLoading = false;
          state.topArtists = action.payload;
        }
      )
      .addCase(
        fetchUserTopArtists.rejected,
        (state, action: PayloadAction<any>) => {
          state.topArtistsLoading = false;
          state.userError = action.payload;
        }
      );
  },
});

export const { resetUserProfile } = userSlice.actions;
export default userSlice.reducer;
