import React from 'react';

 function Heading() {
  return (
    <div className="pt-[2rem]  flex flex-col items-center justify-center ml-1 md:ml-10">
      <div className="flex justify-center items-center mt-0 md:mt-10 font-bold text-center">
        <h1 className="text-white text-3xl md:text-5xl">
          Professionals of all types get more done with MeetAi
        </h1>
      </div>

      <div className="text-white text-xl md:text-2xl mt-4 md:mt-6 text-center">
        Get any kind of work or client meeting booked fast
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center mt-4">
        <a
          href="#"
          className="border border-solid py-1.5 px-3 rounded-md m-2 md:m-4 bg-pr-button text-white font-semibold shadow-md hover:bg-blue-500 border-black" >
        Requirement
        </a>

        {/* <input
          className="search-input w-64 md:w-96 h-9 bg-slate-700 text-white placeholder-white px-4 mt-2 md:mt-0"
          placeholder="Search..."
        /> */}
      </div>
    </div>
  );
}
export default Heading;