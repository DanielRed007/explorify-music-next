"use client";

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSpotifyToken,
  resetToken,
} from "./store/slices/spotifyClientSlice";
import { AppDispatch, RootState } from "./store/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { accessToken, loading, error } = useSelector(
    (state: RootState) => state.spotiFyClient
  );

  useEffect(() => {
    dispatch(fetchSpotifyToken());
  }, [dispatch]);

  return (
    <Fragment>
      <div className='mt-7'>
        <div className='max-w-7xl mx-auto grid grid-cols-3 gap-7'>
          <div className='rounded-md col-span-2 row-span-2 bg-green-500 p-4 text-white'>
            <h1>Hola</h1>
          </div>

          <div className='rounded-md bg-green-500 p-4 text-white'>02</div>
          <div className='rounded-md bg-green-500 p-4 text-white'>03</div>

          <div className='rounded-md bg-green-500 p-4 text-white'>04</div>
          <div className='rounded-md bg-green-500 p-4 text-white'>05</div>
          <div className='rounded-md bg-green-500 p-4 text-white'>06</div>
          <div className='rounded-md bg-green-500 p-4 text-white'>07</div>
          <div className='rounded-md bg-green-500 p-4 text-white'>08</div>
        </div>
      </div>
    </Fragment>
  );
}
