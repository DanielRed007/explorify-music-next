interface ArtistListProps {
  title: string;
  artists: { name: string; count: number }[];
}

export const ArtistList: React.FC<ArtistListProps> = ({ title, artists }) => {
  return (
    <div className='container mx-auto p-3'>
      <h1 className='text-3xl text-black font-bold mb-4'>{title}</h1>
      <ul>
        {artists.map((artist, index) => (
          <li key={index} className='mb-4'>
            <div className='flex justify-between'>
              <span className='text-lg text-black font-semibold'>
                {artist.name}
              </span>
              <span className='text-lg text-black font-medium'>
                {artist.count}
              </span>
            </div>
            <hr className='border-t border-black mt-2' />
          </li>
        ))}
      </ul>
    </div>
  );
};
