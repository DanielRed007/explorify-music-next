import { FC } from "react";

interface BannerCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export const BannerCard: FC<BannerCardProps> = ({
  title,
  subtitle,
  imageUrl,
}) => {
  return (
    <div className='bg-gray-900 rounded-lg shadow-md overflow-hidden hover:bg-gray-800 transition-colors duration-200 max-w-sm'>
      <div className='relative'>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt='Spotify cover'
            className='w-full h-48 object-cover'
          />
        ) : (
          <div className='w-full h-48 bg-blue-500 flex items-center justify-center'>
            <span className='text-white text-4xl font-bold'>
              {title.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className='p-4'>
        <h3 className='text-white text-xl font-bold'>{title}</h3>
        <p className='text-gray-400'>{subtitle}</p>
      </div>
    </div>
  );
};
