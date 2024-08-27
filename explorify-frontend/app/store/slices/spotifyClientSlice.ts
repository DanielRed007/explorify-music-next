import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface SpotifyClientState {
  accessToken: string | null;
  clientLoading: boolean;
  clientError: string | null;
}

const initialState: SpotifyClientState = {
  accessToken: null,
  clientLoading: false,
  clientError: null,
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
      state.clientError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpotifyToken.pending, (state) => {
        state.clientLoading = true;
        state.clientError = null;
      })
      .addCase(
        fetchSpotifyToken.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.clientLoading = false;
          state.accessToken = action.payload;
        }
      )
      .addCase(
        fetchSpotifyToken.rejected,
        (state, action: PayloadAction<any>) => {
          state.clientLoading = false;
          state.clientError = action.payload;
        }
      );
  },
});

export const { resetToken } = spotifyClientSlice.actions;
export default spotifyClientSlice.reducer;
