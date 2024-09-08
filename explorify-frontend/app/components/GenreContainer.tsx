import React, { FC, Fragment } from "react";
import { Pill } from "./shared/Pill";

interface GenreContainerProps {
  genres: string[];
}

export const GenreContainer: FC<GenreContainerProps> = ({ genres }) => {
  return (
    <Fragment>
      {genres.map((genre, index) => (
        <Pill content={genre} key={index} />
      ))}
    </Fragment>
  );
};
