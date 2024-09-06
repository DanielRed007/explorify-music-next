import { ProfileArtistsList, SpotifyArtist } from "@/app/interface/profile";

export const getArtistsListMap = (
  artists: SpotifyArtist[]
): ProfileArtistsList[] => {
  return artists.map((artist) => ({
    name: artist.name,
    followers: artist.followers.total,
    popularity: artist.popularity,
  }));
};
