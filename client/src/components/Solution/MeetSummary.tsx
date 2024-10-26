import React from 'react';

const MeetingSummary = () => {
  return (
    <div className="bg-gray-900 text-gray-300">
      <div className="container mx-auto p-6">
        {/* Hero Section */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white shadow-md">Meeting Summary</h1>
          <p className="text-lg mt-2">Date: October 8, 2024 | Duration: 1 hour</p>
        </header>

        {/* Meeting Overview Card */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
          <h2 className="text-xl font-semibold">Meeting Overview</h2>
          <p><strong>Host:</strong> John Doe</p>
          <p><strong>Participants:</strong></p>
          <div className="flex space-x-2 mt-2">
            <img src="participant1.jpg" alt="Participant 1" className="w-8 h-8 rounded-full" />
            <img src="participant2.jpg" alt="Participant 2" className="w-8 h-8 rounded-full" />
            <img src="participant3.jpg" alt="Participant 3" className="w-8 h-8 rounded-full" />
            <span>+2 more</span>
          </div>
        </div>

        {/* Agenda and Key Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Agenda */}
          <section className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Agenda</h2>
            <ul className="space-y-2">
              <li className="cursor-pointer">Project Updates <span className="text-gray-400">(Click for details)</span></li>
              <li className="cursor-pointer">Budget Review <span className="text-gray-400">(Click for details)</span></li>
              <li className="cursor-pointer">Next Steps <span className="text-gray-400">(Click for details)</span></li>
            </ul>
          </section>

          {/* Key Highlights */}
          <section className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Key Highlights</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Increased project efficiency by 20% 🚀</li>
              <li>Secured additional funding 💰</li>
              <li>Completed Phase 1 on schedule ✅</li>
            </ul>
          </section>
        </div>

        {/* Action Items */}
        <section className="bg-gray-800 p-4 rounded-lg mt-6">
          <h2 className="text-xl font-semibold">Action Items</h2>
          <table className="min-w-full mt-2">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-2 text-left">Task Description</th>
                <th className="py-2 text-left">Responsible</th>
                <th className="py-2 text-left">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr>
                <td className="py-2">Finalize the project plan</td>
                <td className="py-2">Alice</td>
                <td className="py-2">Oct 15, 2024</td>
              </tr>
              <tr>
                <td className="py-2">Send budget report</td>
                <td className="py-2">Bob</td>
                <td className="py-2">Oct 20, 2024</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Additional Resources */}
        <section className="bg-gray-800 p-4 rounded-lg mt-6">
          <h2 className="text-xl font-semibold">Additional Resources</h2>
          <ul className="list-disc list-inside mt-2">
            <li><a href="#" className="text-blue-400">Meeting Recording</a></li>
            <li><a href="#" className="text-blue-400">Project Documents</a></li>
          </ul>
        </section>

        {/* Feedback Section */}
        <section className="bg-gray-800 p-4 rounded-lg mt-6">
          <h2 className="text-xl font-semibold">Feedback</h2>
          <textarea className="w-full h-24 p-2 bg-gray-700 rounded-md mt-2" placeholder="Leave your feedback..."></textarea>
          <button className="mt-2 px-4 py-2 bg-blue-600 rounded-md">Submit Feedback</button>
        </section>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-green-500 rounded-md hover:bg-green-600">Schedule Next Meeting</button>
        </div>
      </div>
    </div>
  );
};

export default MeetingSummary;
