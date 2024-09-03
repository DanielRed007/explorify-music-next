"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { resetUserProfile } from "@/app/store/slices/userSlice";
import { AppDispatch } from "@/app/store/store";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { preserveQueryParameters } from "@/app/utils/auth/auth.utils";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [query, setQuery] = useState({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParams = Object.fromEntries(urlParams.entries());
    setQuery(queryParams);
  }, []);

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
              href={preserveQueryParameters("/dashboard", query)}
            >
              Dashboard
            </Link>
            <Link
              className='m-4 bg-green-500 rounded-lg p-2 text-black text-bold'
              href={preserveQueryParameters("/dashboard/search", query)}
            >
              Search
            </Link>
            <Link
              className='m-4 bg-green-500 rounded-lg p-2 text-black text-bold'
              href={preserveQueryParameters("/dashboard/about", query)}
            >
              About
            </Link>
            <Link
              className='m-4 bg-green-500 rounded-lg p-2 text-black text-bold'
              href={preserveQueryParameters("/dashboard/contact", query)}
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
