// components/ProfilePage.tsx
'use client';

import React from 'react';
import { User } from 'lucide-react';

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#232341] flex flex-col">
      {/* Header with SIDELINES text */}
      <header className="py-6 text-center w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-300">SIDELINES</h1>
      </header>

      {/* Navigation buttons */}
      <nav className="flex justify-center gap-2 md:gap-6 px-4 my-4 w-full">
        <button className="bg-white text-black font-bold py-2 px-4 rounded-full text-sm md:text-base">
          LIVE NOW
        </button>
        <button className="bg-white text-black font-bold py-2 px-4 rounded-full text-sm md:text-base">
          SPORTS
        </button>
        <button className="bg-white text-black font-bold py-2 px-4 rounded-full text-sm md:text-base">
          STANDINGS
        </button>
        <button className="bg-white text-black font-bold py-2 px-4 rounded-full text-sm md:text-base">
          PROFILE
        </button>
      </nav>

      {/* Main content area with two columns */}
      <div className="flex flex-col md:flex-row gap-4 p-4 flex-grow w-full">
        {/* Left column: User profile */}
        <div className="w-full md:w-1/2 bg-[#1e2142] rounded-lg p-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-[#2a3574] rounded-full p-4">
              <User size={48} className="text-white" />
            </div>
            <h2 className="text-white text-5xl font-bold">User</h2>
          </div>

          {/* Password reset button */}
          <button className="w-full bg-gray-400 text-white text-3xl font-bold py-4 mb-4 rounded">
            Reset Password
          </button>

          {/* Delete account button */}
          <button className="w-full bg-gray-400 text-white text-3xl font-bold py-4 rounded">
            Delete Account
          </button>
        </div>

        {/* Right column: History */}
        <div className="w-full md:w-1/2 bg-[#1e2142] rounded-lg p-6">
          <h2 className="text-white text-5xl font-bold mb-6">History</h2>
          <div className="space-y-2">
            <p className="text-white text-3xl">Game #1</p>
            <p className="text-white text-3xl">Game #2</p>
            <p className="text-white text-3xl">Game #3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;