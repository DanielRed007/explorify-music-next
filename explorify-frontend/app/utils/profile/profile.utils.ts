import {
  TopArtists,
  SpotifyArtist,
  SpotifyTrack,
  TopTrack,
} from "@/app/interface/profile";
import { mapMilisecondsToMinutes } from "../time/time.utils";

export const getArtistsListMap = (artists: SpotifyArtist[]): TopArtists[] => {
  return artists.map((artist: SpotifyArtist) => ({
    name: artist.name,
    followers: artist.followers.total,
    popularity: artist.popularity,
  }));
};

export const getTrackListMap = (tracks: SpotifyTrack[]): TopTrack[] => {
  return tracks.map((track: SpotifyTrack) => ({
    album: track.album.name,
    artists: track.artists[0].name,
    trackName: track.name,
    duration: mapMilisecondsToMinutes(track.duration_ms),
  }));
};
