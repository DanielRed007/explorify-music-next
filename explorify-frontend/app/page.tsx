"use client";

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSpotifyToken,
  resetToken,
} from "./store/slices/spotifyClientSlice";
import {
  fetchUserProfile,
  fetchUserTopArtists,
} from "./store/slices/userSlice";
import { AppDispatch, RootState } from "./store/store";
import Image from "next/image";
import { UserCard } from "./components/user/UserCard";
import { Loader } from "./components/shared/Loader";
import { Pill } from "./components/shared/Pill";
import { GenreContainer } from "./components/GenreContainer";
import { Button } from "./components/shared/Button";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, userLoading, userError } = useSelector(
    (state: RootState) => state.user
  );
  const { accessToken, clientLoading, clientError } = useSelector(
    (state: RootState) => state.spotiFyClient
  );

  useEffect(() => {}, []);

  useEffect(() => {}, []);

  return (
    <Fragment>
      <div className='mt-7'>
        <div className='max-w-7xl mx-auto grid grid-cols-3 gap-7'>
          <div className='rounded-md col-span-2 row-span-2 bg-green-500 p-4 text-white'>
            <div className='p-7'>
              <h1 className='text-7xl text-black font-bold mb-4 flex justify-left items-center'>
                Explorify Music{" "}
                <div>
                  <Image
                    className='ml-4'
                    src='/assets/img/spotify_black.png'
                    width={70}
                    height={70}
                    alt='Picture of the author'
                  />
                </div>
              </h1>
              <h2 className='text-2xl text-gray-800 font-light mb-2'>
                Explore the magic of Spotify
              </h2>
              <hr className='border-t-2 border-gray-800 mb-4' />
              {/* <UserCard profile={profile} loading={userLoading} /> */}
            </div>
          </div>

          <div className='rounded-md bg-green-500 p-4 text-white'>
            <Button text='Login' href='/api/auth/login' />
          </div>
          <div className='rounded-md bg-green-500 p-4 text-white'>
            <GenreContainer />
          </div>

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
