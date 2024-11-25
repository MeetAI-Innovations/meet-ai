import React from "react";

function Logo({ width }: any) {
  return (
    <div className="font-bold mt-2 font-mono flex justify-center flex-col items-center text-sm">
      <img src="/logo.svg" style={{ width: width }} />
      <p className="tracking-[0.5rem] pt-2">MeetAI</p>
    </div>
  );
}

export default Logo;
