import React from 'react';

function Review() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 bg-black">
      <div className="flex justify-center items-center font-bold max-w-4xl text-center mb-6 animate-fade-in">
        <h1 className="text-white text-3xl md:text-5xl">
        Why us should prefer MeetAi
        </h1>
      </div>

      <div className="text-gray-400 text-lg md:text-xl max-w-4xl text-center mb-8 animate-fade-in">
  Discover how MeetAi is transforming online meetings with innovative features and user-friendly design. Experience the ease, quality, and security that our platform offers, making every meeting more productive and enjoyable.
</div>


      <div className="flex flex-col md:flex-row justify-center items-center mt-4 space-y-4 md:space-y-0 md:space-x-4 animate-fade-in">
        {/* <a
          href="#"
          className="border border-solid border-blue-500 py-2 px-4 rounded-md bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition duration-200"
        >
         Learn More
        </a>
        <input
          className="w-64 md:w-96 h-10 bg-gray-700 text-white placeholder-gray-400 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="Search..."
        /> */}
      </div>
    </div>
  );
}

export default Review;
