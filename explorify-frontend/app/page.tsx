"use client";

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import Image from "next/image";
import { GenreContainer } from "./components/GenreContainer";
import { Button } from "./components/shared/Button";
import { BannerCard } from "./components/shared/BannerCard";

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
            </div>
          </div>

          <div className='rounded-md bg-green-500 p-4 text-white'>
            <Button text='Login' href='/api/auth/login' />
          </div>
          <div className='rounded-md bg-green-500 p-4 text-white'>
            <GenreContainer />
          </div>

          <div className='rounded-md bg-gray-900 p-4 text-white'>
            <BannerCard
              title='Jimi Hendrix'
              subtitle='All Along The Watchtower'
              imageUrl='https://i0.wp.com/themindcircle.com/wp-content/uploads/2015/05/Jimi-Hendrix-Sept-17th-1970-6.jpg'
            />
          </div>
          <div className='rounded-md bg-gray-900 p-4 text-white'>
            <BannerCard
              title='Bob Dylan'
              subtitle='Desolation Row'
              imageUrl='https://i0.wp.com/themindcircle.com/wp-content/uploads/2015/05/Jimi-Hendrix-Sept-17th-1970-6.jpg'
            />
          </div>
          <div className='rounded-md bg-gray-900 p-4 text-white'>
            <BannerCard
              title='Jimi Hendrix'
              subtitle='Highway Chile'
              imageUrl='https://i0.wp.com/themindcircle.com/wp-content/uploads/2015/05/Jimi-Hendrix-Sept-17th-1970-8.jpg'
            />
          </div>

          <div className='rounded-md bg-gray-900 p-4 text-white'>
            <BannerCard
              title='Jimi Hendrix'
              subtitle='All Along The Watchtower'
              imageUrl='https://i0.wp.com/themindcircle.com/wp-content/uploads/2015/05/Jimi-Hendrix-Sept-17th-1970-6.jpg'
            />
          </div>
          <div className='rounded-md bg-gray-900 p-4 text-white'>
            <BannerCard
              title='Bob Dylan'
              subtitle='Desolation Row'
              imageUrl='https://i0.wp.com/themindcircle.com/wp-content/uploads/2015/05/Jimi-Hendrix-Sept-17th-1970-6.jpg'
            />
          </div>
          <div className='rounded-md bg-gray-900 p-4 text-white'>
            <BannerCard
              title='Jimi Hendrix'
              subtitle='Highway Chile'
              imageUrl='https://i0.wp.com/themindcircle.com/wp-content/uploads/2015/05/Jimi-Hendrix-Sept-17th-1970-8.jpg'
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
