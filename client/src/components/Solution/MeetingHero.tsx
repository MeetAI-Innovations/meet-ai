import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa'; // For icons

const MeetaiHeroSection = () => {
  return (
    <div className="relative h-screen bg-black text-white">
      {/* Large 'Meetai' Text */}
      <div className="absolute inset-0 flex justify-center items-center">
        <h1 className="text-[20rem]  tracking-wider font-extrabold text-white-100 opacity-10">
          Meetai
        </h1>
      </div>

      {/* Bottom Left Logo Section */}
      <div className="absolute bottom-4 left-4 flex items-center space-x-2">
        {/* Placeholder Logo */}
        <div className="w-8 h-8 border-2 border-white rounded-md flex justify-center items-center">
          <span className="text-xs font-bold">M</span>
        </div>
        <span className="font-bold text-lg">Meetai</span>
      </div>

      {/* Bottom Right Social Media Icons */}
      <div className="absolute bottom-4 right-4 flex space-x-4 text-white">
        {/* Social Media Icons */}
        <a href="#" className="p-2 bg-gray-800 rounded-full">
          <FaTwitter />
        </a>
        <a href="#" className="p-2 bg-gray-800 rounded-full">
          <FaInstagram />
        </a>
        <a href="#" className="p-2 bg-gray-800 rounded-full">
          <FaFacebookF />
        </a>
        <a href="#" className="p-2 bg-gray-800 rounded-full">
          <FaLinkedinIn />
        </a>
        <a href="#" className="p-2 bg-gray-800 rounded-full">
          <FaYoutube />
        </a>
      </div>
    </div>
  );
};

export default MeetaiHeroSection;
