"use client";

import { useState, useEffect } from 'react';

const EditProfile = () => {
  // States for form fields
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    state: '',
    password: '',
  });

  // Handle image upload and preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const image = e.target?.result as string;
      setProfileImage(image);
      localStorage.setItem('profileImage', image);
    };

    if (file) reader.readAsDataURL(file);
  };

  // Load saved profile image from localStorage
  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) setProfileImage(savedImage);
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex lg:ml-[240px] p-6 bg-gray-900 min-h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-white">Edit Profile</h2>
          <div className="relative">
            <div
              className="w-28 h-28 rounded-full bg-cover bg-center border-4 border-gray-600"
              style={{ backgroundImage: `url(${profileImage || ''})` }}
            ></div>
            <label htmlFor="profile-photo" className="absolute bottom-0 right-0 bg-gray-700 p-2 rounded-full cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 9V5.25m0 0l5.25 5.25M15.75 5.25H9.75A2.25 2.25 0 007.5 7.5v9A2.25 2.25 0 009.75 18.75h4.5A2.25 2.25 0 0016.5 16.5V15m0 0H18" />
              </svg>
            </label>
            <input id="profile-photo" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>

        {/* Profile Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-300">First Name</label>
              <input type="text" id="first-name" name="firstName" value={formData.firstName} onChange={handleInputChange} className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:border-gray-500 focus:ring-gray-500" required />
            </div>
            {/* Last Name */}
            <div>
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-300">Last Name</label>
              <input type="text" id="last-name" name="lastName" value={formData.lastName} onChange={handleInputChange} className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:border-gray-500 focus:ring-gray-500" required />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:border-gray-500 focus:ring-gray-500" required />
          </div>

          {/* City and State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-300">City</label>
              <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:border-gray-500 focus:ring-gray-500" required />
            </div>
            {/* State */}
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-300">State</label>
              <input type="text" id="state" name="state" value={formData.state} onChange={handleInputChange} className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:border-gray-500 focus:ring-gray-500" required />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Change Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:border-gray-500 focus:ring-gray-500" required />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button type="button" className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700">Cancel</button>
            <button type="submit" className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
