import React, { FC } from "react";
import Image from "next/image";
import { SpotifyUser } from "@/app/interface/user";

interface UserCardProps {
  profile: SpotifyUser;
  loading: boolean;
}

export const UserCard: FC<UserCardProps> = ({ profile, loading }) => {
  return !loading && profile ? (
    <div className='rounded-md bg-gray-700 flex flex-col md:flex-row items-center justify-between p-4'>
      <div className='flex-1'>
        <h1 className='text-5xl text-gray-200 font-bold'>
          {profile?.display_name}
        </h1>
        <h1 className='text-xl text-gray-200 font-light mb-2 mt-2'>
          Followers: {profile?.followers?.total}
        </h1>
      </div>

      {profile?.images && profile.images[1] && (
        <div className='flex-shrink-0 ml-4'>
          <Image
            src={profile.images[1].url}
            alt={`${profile?.display_name}'s profile picture`}
            width={150}
            height={150}
            className='rounded-full'
          />
        </div>
      )}
    </div>
  ) : null;
};
