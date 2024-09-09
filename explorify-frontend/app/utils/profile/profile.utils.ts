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

export const getArtistGenres = (artists: SpotifyArtist[]) => {
  let artistsGenres: string[] = [];
  const genresList = artists.reduce(
    (acc, val) => acc.concat(val.genres),
    artistsGenres
  );
  const filteredList = genresList
    .filter((genre, index) => genresList.indexOf(genre) === index)
    .slice(0, 20);

  return filteredList;
};

export const getTrackImages = (tracks: SpotifyTrack[], size: number) => {
  const trackImage = (imageList: any) =>
    imageList?.album.images.find((img: any) => img.width === size);

  return tracks.map((track) => ({
    name: track.name,
    image: trackImage(track),
  }));
};

export const getArtistImages = (artists: SpotifyArtist[], size: number) => {
  const trackImage = (imageList: any) =>
    imageList.images.find((img: any) => img.width === size);

  return artists.map((artist) => ({
    image: trackImage(artist),
    name: artist.name,
  }));
};
