import React from "react";
import { TopTrack } from "@/app/interface/profile";
import { mapMilisecondsToMinutes } from "@/app/utils/time/time.utils";

interface TrackListProps {
  title: string;
  tracks: TopTrack[];
}

export const TrackList: React.FC<TrackListProps> = ({ title, tracks }) => {
  return (
    <div className='container mx-auto p-2'>
      <h1 className='text-4xl text-black font-bold mb-4'>{title}</h1>
      <ul>
        {tracks.map((track, index) => (
          <li key={index} className='m-1'>
            <div className='flex justify-between'>
              <span className='text-lg text-black font-semibold'>
                {track.trackName}
              </span>
              <span className='text-lg text-black font-medium'>
                {track.artists}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-gray-600'>{track.album}</span>
              <span className='text-sm text-gray-600'>{track.duration}</span>
            </div>
            <hr className='border-t border-black mt-2' />
          </li>
        ))}
      </ul>
    </div>
  );
};
