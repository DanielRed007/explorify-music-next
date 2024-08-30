"use client";

import { Fragment, useEffect, useState } from "react";
import Header from "../components/shared/Header";
import { fetchUserProfile } from "../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, userLoading, userError } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  if (userLoading) return <div>{userLoading}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <Fragment>
      <Header />
      <div className='mt-7'>
        <div className='max-w-7xl mx-auto grid grid-cols-3 gap-7'>
          <div className='rounded-md col-span-2 row-span-2 bg-green-500 p-4 text-white'>
            <div className='p-7'>
              <h1 className='text-7xl text-black font-light mb-4 flex justify-left items-center'>
                Welcome, {profile.display_name}
              </h1>
              <h2 className='text-2xl text-gray-800 font-light mb-2'>
                Explore the magic of Spotify
              </h2>
              <hr className='border-t-2 border-gray-800 mb-4' />
            </div>
          </div>

          <div className='rounded-md bg-green-500 p-4 text-white'></div>
          <div className='rounded-md bg-green-500 p-4 text-white'></div>

          <div className='rounded-md bg-green-500 p-4 text-white'>04</div>
          <div className='rounded-md bg-green-500 p-4 text-white'>05</div>
          <div className='rounded-md bg-green-500 p-4 text-white'>06</div>
          <div className='rounded-md bg-green-500 p-4 text-white'>07</div>
          <div className='rounded-md bg-green-500 p-4 text-white'>08</div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
