"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className='w-full bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-between h-16'>
          <div className='flex'>
            <div className='mt-4'>
              <Link className='m-4' href='/'>
                Search
              </Link>
              <Link className='m-4' href='/about'>
                About
              </Link>
              <Link className='m-4' href='/contact'>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
