import React from "react";
import Skeleton from "@mui/material/Skeleton";

const CardSkeleton = () => {
  return (
    <div className="bg-[#1c1c1c] text-white shadow-lg rounded-lg relative overflow-visible p-4">
      {/* Previous Meeting Icon Placeholder */}
      <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center bg-[#333] shadow-lg overflow-hidden">
        <Skeleton variant="circular" width={30} height={30} className="bg-[#525252]" />
      </div>

      <div className="pt-12">
        {/* Title and Date Placeholder */}
        <Skeleton variant="text" width="80%" height={30} className="bg-[#525252]" />
        <Skeleton variant="text" width="60%" height={20} className="mt-2 bg-[#525252]" />

        {/* Avatar and Host Information Placeholder */}
        <div className="flex items-center gap-2 mt-4">
          <Skeleton variant="circular" width={40} height={40} className="bg-[#525252]" />
          <div>
            <Skeleton variant="text" width="80%" height={20} className="bg-[#525252]" />
            <Skeleton variant="text" width="60%" height={15} className="mt-1 bg-[#525252]" />
          </div>
        </div>
      </div>

      {/* Previous Meeting Placeholder */}
      <div className="self-end mt-auto mb-4 pr-4">
        <Skeleton variant="text" width={100} height={20} className="bg-[#525252] rounded-lg" />
      </div>
    </div>
  );
};

export default CardSkeleton;
