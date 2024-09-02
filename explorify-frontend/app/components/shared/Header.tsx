"use client";

import { resetUserProfile } from "@/app/store/slices/userSlice";
import { AppDispatch } from "@/app/store/store";
import Link from "next/link";
import { useDispatch } from "react-redux";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogoutUser = () => {
    dispatch(resetUserProfile());
  };

  return (
    <header className='w-full bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-between h-16'>
          <div className='mt-5'>
            <Link
              className='m-4 bg-green-500 rounded-lg p-2 text-black text-bold'
              href='/'
            >
              Search
            </Link>
            <Link
              className='m-4 bg-green-500 rounded-lg p-2 text-black text-bold'
              href='/about'
            >
              About
            </Link>
            <Link
              className='m-4 bg-green-500 rounded-lg p-2 text-black text-bold'
              href='/contact'
            >
              Contact
            </Link>
          </div>

          <div className='mt-5'>
            <Link
              className='m-4 bg-gray-700 rounded-lg p-2 text-green-500 text-bold'
              href='/'
              onClick={handleLogoutUser}
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
