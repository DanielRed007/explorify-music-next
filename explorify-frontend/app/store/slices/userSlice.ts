import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserProfile {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  profile: UserProfile | null;
  userLoading: boolean;
  userError: string | null;
}

const initialState: UserState = {
  profile: null,
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserProfile: (state) => {
      state.profile = null;
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
        (state, action: PayloadAction<UserProfile>) => {
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
