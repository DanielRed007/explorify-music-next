import {
  axiosRequest,
  getAccessToken,
  getRefreshToken,
} from "@/app/utils/auth/auth.utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAccessToken, setRefreshToken } from "../slices/userSlice";
import { getAxiorError } from "@/app/utils/error.utils";
import { openModal } from "../slices/modalSlice";
import querystring from "querystring";
import { ArtistList } from "@/app/components/shared/ArtistList";
import {
  getArtistsListMap,
  getTrackListMap,
} from "@/app/utils/profile/profile.utils";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const accessToken: string | null = getAccessToken();
      const refreshToken = getRefreshToken();

      dispatch(setAccessToken(accessToken));
      dispatch(setRefreshToken(refreshToken));

      const response = await axiosRequest(
        `https://api.spotify.com/v1/me`,
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

export const fetchUserTopItems = createAsyncThunk(
  "user/fetchUserTopItems",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const accessToken: string | null = getAccessToken();
      const refreshToken = getRefreshToken();

      dispatch(setAccessToken(accessToken));
      dispatch(setRefreshToken(refreshToken));

      const responseArtists = await axiosRequest(
        `https://api.spotify.com/v1/me/top/artists`,
        "get",
        {
          Authorization: `Bearer ${accessToken}`,
        }
      );

      const responseTracks = await axiosRequest(
        `https://api.spotify.com/v1/me/top/tracks`,
        "get",
        {
          Authorization: `Bearer ${accessToken}`,
        }
      );
      console.log({ responseTracks });
      return {
        artists: getArtistsListMap(responseArtists.data.items),
        tracks: getTrackListMap(responseTracks.data.items),
      };
    } catch (error: any) {
      if (error.name === "AxiosError") {
        const axiosError: any = getAxiorError(error);

        return rejectWithValue({ redirect: true, error: axiosError });
      }
      return rejectWithValue(error);
    }
  }
);
