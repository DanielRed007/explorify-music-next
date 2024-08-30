import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { SpotifyUser } from "@/app/interface/user";

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
  profile: string;
  userLoading: boolean;
  userError: string | null;
}

const initialState: UserState = {
  profile: "Profile",
  userLoading: false,
  userError: null,
};

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      return "Fetch Profile";
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
        (state, action: PayloadAction<string>) => {
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

export const { resetUserProfile } = userSlice.actions;
export default userSlice.reducer;
