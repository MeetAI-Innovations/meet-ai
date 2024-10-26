import React from 'react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Karen Davidson',
      role: 'Digital Marketing',
      img: 'https://via.placeholder.com/150', // Replace with actual image URL
    },
    {
      name: 'Christopher Sahel',
      role: 'Product Designer',
      img: 'https://via.placeholder.com/150', // Replace with actual image URL
    },
    {
      name: 'Divina Wilson',
      role: 'Creative Designer',
      img: 'https://via.placeholder.com/150', // Replace with actual image URL
    },
    {
      name: 'Simson Gabriel',
      role: 'Marketing Manager',
      img: 'https://via.placeholder.com/150', // Replace with actual image URL
    },
  ];

  return (
    <div className=" py-12">
      <div className="text-center mb-12">
        <button className="text-white border border-white py-2 px-4 rounded-full mb-4">
          Our Team
        </button>
        <h2 className="text-3xl font-bold text-white">The Brains Behind Our Service</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="rounded-lg shadow-lg p-6 text-center"
            style={{
                background: 'linear-gradient(135deg, #3c003b, #692d80)', // Dark to light purple gradient
                color: 'white',
            }}
          >
            <img
              src={member.img}
              alt={member.name}
              className="rounded-lg w-full h-48 object-cover mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
            <p className="text-gray-300">{member.role}</p> {/* Made text light gray for contrast */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
