import React from 'react';

// Import images
import onephoto from '@/assets/images/image.png';
import twophoto from '@/assets/images/Screenshot 2024-10-05 225718.png';
import threephoto from '@/assets/images/image3.png';
import bgimage from "@/assets/images/WhatsApp Image 2024-10-06 at 12.39.39 AM.jpeg";

// ProfileCard Component
const ProfileCard = ({ name, role, position }: any) => (
  <div className={`absolute ${position} bg-black bg-opacity-70 px-4 py-2 rounded-lg text-white flex items-center space-x-4`}>
    <img
      src={onephoto.src} // Use the 'src' property here
      alt={name}
      className="w-10 h-10 rounded-full object-cover"
    />
    <div>
      <h4 className="font-bold">{name}</h4>
      <p className="text-gray-400 text-sm">{role}</p>
    </div>
  </div>
);

// ImageWithProfileCards Component
const ImageWithProfileCards = () => {
  return (
    <div className="relative max-w-sm mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      {/* Main Image */}
      <img
        src={twophoto.src}
        alt="Profile background"
        className="w-full h-96 object-cover"
      />

      {/* Profile Card 1 */}
      <ProfileCard
        name="Olivia Rhye"
        role="Freelance Copywriting"
        position="top-4 right-4"
      />

      {/* Profile Card 2 */}
      <ProfileCard
        name="Marina Dyas"
        role="Human Resource Scoutwell"
        position="bottom-4 left-4"
      />
    </div>
  );
};

// ImageWithProfileCards1 Component
const ImageWithProfileCards1 = () => {
  return (
    <div className="relative max-w-sm mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      {/* Main Image */}
      <img
        src={threephoto.src}
        alt="Profile background"
        className="w-full h-96 object-cover"
      />

      {/* Profile Card 1 */}
      <ProfileCard
        name="Olivia Rhye"
        role="Freelance Copywriting"
        position="top-4 right-4"
      />

      {/* Profile Card 2 */}
      <ProfileCard
        name="Marina Dyas"
        role="Human Resource Scoutwell"
        position="bottom-4 left-4"
      />
    </div>
  );
};

// MeetCandidatesPage Component
const MeetCandidatesPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2">
          
            <h1 className="text-4xl font-bold mb-4 leading-normal">
            AI-powered Solutions for Modern Meetings
            </h1>
            <button className="mt-6 py-2 px-4 bg-white text-black rounded-md">
              All Services
            </button>
          </div>
          <div className="lg:w-1/2 lg:mt-0">
            <img
              src={bgimage.src}
              alt="Background image"
              className="w-full h-72 bg-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="bg-black text-white min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">

          {/* Top Section */}
          <section className="mb-12 grid lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-semibold mb-4">
                Meet with candidates faster, stay in your own workflow
              </h1>
              <p className="text-gray-400 mb-8">
                Looking for the fastest way to meet with candidates? Room does just that.
              </p>
              <button className="py-3 px-6 bg-gray-800 text-white rounded-md">
                See how
              </button>
            </div>
            
            {/* Profile Card Section */}
            <div className="flex flex-col gap-4">
              {/* Profile Card 1 */}
              <ImageWithProfileCards />
            </div>
          </section>

          {/* Bottom Section */}
          <section className="grid lg:grid-cols-2 gap-12">
            <div className="flex items-center">
              <ImageWithProfileCards1 />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-semibold mb-4">
                Send candidates your 1:1 or Booking Page
              </h1>
              <p className="text-gray-400 mb-8">
                Propose several times or let them book directly on your schedule.
              </p>
              <button className="py-3 px-6 bg-gray-800 text-white rounded-md">
                See how
              </button>
            </div>
          </section>

          {/* Integration of ImageWithProfileCards
          <section className="mt-12">
            <h2 className="text-3xl font-semibold mb-8 text-center">
              Highlighted Profiles
            </h2>
            <ImageWithProfileCards />
          </section> */}

        </div>
      </div>
    </div>
  );
};

export default MeetCandidatesPage;
