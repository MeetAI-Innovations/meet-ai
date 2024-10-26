import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardSkeleton2 = () => {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <div className="bg-gray-800 p-4 flex flex-col justify-between w-full rounded-xl shadow-md min-h-[120px]">
        
        {/* Icon Placeholder */}
        <div className="flex items-center gap-3 mb-4">
          <Skeleton circle={true} height={28} width={28} />
          <div className="flex flex-col gap-1">
            <Skeleton width={120} height={24} />
            <Skeleton width={80} height={18} />
          </div>
        </div>

        {/* Previous Meeting Placeholder
        <div className="self-end mt-auto">
          <Skeleton width={100} height={20} className="rounded-lg" />
        </div> */}
        <p className="self-end mt-auto text-sm py-1 px-3 text-gray-400 bg-gray-700 rounded-lg">
                Previous Meeting
              </p>
      </div>
    </SkeletonTheme>
  );
};

export default CardSkeleton2;
