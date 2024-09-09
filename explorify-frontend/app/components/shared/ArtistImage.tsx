import Image from "next/image";

interface Artist {
  artist: string;
  image: {
    height: number;
    width: number;
    url: string;
  };
}

interface ArtistImagesProps {
  title: string;
  artists: Artist[];
}

export const ArtistImage: React.FC<ArtistImagesProps> = ({
  title,
  artists,
}) => {
  return (
    <div className='container mx-auto p-2'>
      <h1 className='text-4xl text-black font-bold mb-4'>{title}</h1>
      <div className='flex flex-wrap gap-4'>
        {artists &&
          artists.map((artistObj, index) => (
            <div key={index} className='flex flex-col items-center space-y-2'>
              {artistObj && (
                <>
                  <Image
                    src={artistObj?.image?.url}
                    alt={artistObj?.artist}
                    height={70}
                    width={70}
                    className='rounded-full border border-black'
                  />
                  <span className='text-lg text-black font-semibold'>
                    {artistObj?.artist}
                  </span>
                </>
              )}
            </div>
          ))}
      </div>
      <hr className='border-t border-black mt-4' />
    </div>
  );
};
