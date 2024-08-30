import React, { Fragment } from "react";
import { Pill } from "./shared/Pill";

const musicGenres = [
  "Rock",
  "Pop",
  "Hip Hop",
  "Jazz",
  "Classical",
  "Electronic",
  "R&B",
  "Country",
  "Reggae",
  "Blues",
  "Metal",
  "Folk",
  "Punk",
  "Soul",
  "Funk",
  "Disco",
  "House",
  "Techno",
  "Trance",
  "Dubstep",
  "Drum and Bass",
  "Ambient",
  "Latin",
  "K-Pop",
  "Ska",
  "Gospel",
  "Indie",
  "Grunge",
  "Emo",
  "Alternative",
  "Synthwave",
  "Opera",
  "Salsa",
  "Reggaeton",
  "Afrobeat",
  "Dancehall",
  "Bossa Nova",
  "Flamenco",
  "Bluegrass",
  "Trap",
  "Industrial",
  "New Wave",
  "Progressive Rock",
  "Heavy Metal",
  "Psychedelic Rock",
  "Lofi Hip Hop",
  "Experimental",
  "World Music",
  "Celtic",
  "EDM",
  "Motown",
  "Swing",
];

export const GenreContainer = () => {
  const filteredGenres = musicGenres.slice(0, 14);

  return (
    <Fragment>
      {filteredGenres.map((genre, index) => (
        <Pill content={genre} key={index} />
      ))}
    </Fragment>
  );
};
