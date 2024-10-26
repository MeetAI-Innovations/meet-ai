import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardSkeleton = () => {
  return (
    <SkeletonTheme baseColor='rgba(17, 25, 40, 0.75)' highlightColor='rgba(255, 255, 255, 0.125)'>
    <section
      className="relative flex min-h-[300px] w-full flex-col justify-between rounded-xl px-6 py-8 xl:max-w-[568px] bg-gray-800"
    >
      {/* Skeleton for the icon */}
      <div className="absolute top-4 left-4">
        <Skeleton circle={true} height={28} width={28} />
      </div>

      {/* Skeleton for the title and date */}
      <article className="flex flex-col items-center justify-center text-center gap-2 mt-4">
        <Skeleton height={28} width={200} />
        <Skeleton height={20} width={150} />
      </article>

      {/* Skeleton for the avatars */}
      <article className="flex flex-col items-center justify-center mt-6">
        <div className="relative flex justify-center w-full">
          <div className="flex space-x-4">
            <Skeleton circle={true} height={50} width={50} />
          </div>
        </div>

        {/* Skeleton for the button */}
        <div className="mt-6">
          <Skeleton height={48} width={160} />
        </div>
      </article>
    </section>
    </SkeletonTheme>
  );
};

export default CardSkeleton;
