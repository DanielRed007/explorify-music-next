import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface SpotifyClientState {
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: SpotifyClientState = {
  accessToken: null,
  loading: false,
  error: null,
};

export const fetchSpotifyToken = createAsyncThunk(
  "spotifyClient/fetchToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/spotify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch token");
      }

      const data = await response.json();

      return data.access_token;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const spotifyClientSlice = createSlice({
  name: "spotifyClient",
  initialState,
  reducers: {
    resetToken: (state) => {
      state.accessToken = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpotifyToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSpotifyToken.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.accessToken = action.payload;
        }
      )
      .addCase(
        fetchSpotifyToken.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { resetToken } = spotifyClientSlice.actions;
export default spotifyClientSlice.reducer;
