import { ProfileArtistsList } from "@/app/interface/profile";

interface ArtistListProps {
  title: string;
  artists: ProfileArtistsList[];
}

export const ArtistList: React.FC<ArtistListProps> = ({ title, artists }) => {
  return (
    <div className='container mx-auto p-2'>
      <h1 className='text-4xl text-black font-bold mb-4'>{title}</h1>
      <ul>
        {artists.map((artist, index) => (
          <li key={index} className='m-1'>
            <div className='flex justify-between'>
              <span className='text-lg text-black font-semibold'>
                {artist.name}
              </span>
              <span className='text-lg text-black font-medium'>
                {artist.followers}
              </span>
            </div>
            <hr className='border-t border-black mt-2' />
          </li>
        ))}
      </ul>
    </div>
  );
};
