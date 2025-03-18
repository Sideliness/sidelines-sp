// app/page.tsx
'use client';

import React, { useState } from 'react';

export default function HomePage() {
  const [message, setMessage] = useState('');

  // Play by Play placeholder
  const PlayByPlayPlaceholder = () => {
    return (
      <div className="mb-4 border-b border-blue-900 pb-4">
        <div className="flex items-center mb-2">
          <div className="w-12 h-12 bg-gray-400 rounded-full mr-3"></div>
          <div>
            <div className="text-white text-xl font-bold">35' 3PT ATTEMPT MISSED</div>
            <div className="text-gray-300 text-sm">STEPHEN CURRY | 24 PTS | 3/4 3PG</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-gray-300 mr-2">19</span>
            <span className="text-gray-300 mx-2">36</span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <div className="w-6 h-6 bg-yellow-500 rounded-full mr-1"></div>
              <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              <span className="text-white mx-2">118 - 124</span>
              <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
            </div>
            <div className="text-white">Q4 | 0:52</div>
            <div className="flex items-center ml-4">
              <span className="text-white ml-2">1K</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen w-screen bg-[#232341] flex flex-col overflow-hidden">
      <div className="bg-[#232341] w-full">
        {/* Header with SIDELINES text */}
        <header className="py-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-300">SIDELINES</h1>
        </header>

        {/* Navigation buttons */}
        <nav className="flex justify-center gap-2 md:gap-6 my-4">
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
      </div>

      {/* Main content with two columns */}
      <div className="flex-grow w-full flex flex-col md:flex-row overflow-hidden p-4 gap-4">
        {/* Left column - Play by Play */}
        <div className="w-full md:w-2/5 bg-[#1e2142] p-4 md:p-6 overflow-auto rounded-lg">
          <h2 className="text-white text-xl mb-4">PlayByPlay</h2>
          <div className="space-y-1">
            <PlayByPlayPlaceholder />
            <PlayByPlayPlaceholder />
            <PlayByPlayPlaceholder />
          </div>
        </div>

        {/* Right column - Chat */}
        <div className="w-full md:w-3/5 bg-[#1e2142] p-4 md:p-6 flex flex-col overflow-hidden rounded-lg">
          <div className="flex-grow overflow-y-auto mb-4">
            {/* Message placeholder - we're not implementing these as requested */}
            <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
              Chat messages will appear here
            </div>
          </div>
          
          {/* Message input */}
          <div className="mt-auto">
            <input
              type="text"
              placeholder="Type Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-4 bg-white text-black text-lg rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}