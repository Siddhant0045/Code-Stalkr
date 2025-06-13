"use client";

import React, { useState } from "react";
import FetchedData from "@/components/fetchedData";

export default function Dashboard() {
  const [links, setLinks] = useState([""]);
  const [showStats, setShowStats] = useState(false);

  const handleAddLink = () => {
    if (links.length < 3) {
      setLinks([...links, ""]);
    }
  };

  const handleChange = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
    setShowStats(false);
  };

  const handleFetchData = () => {
    setShowStats(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow">
        <div className="text-2xl font-bold text-blue-600">CodeStalkr</div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
          Login
        </button>
      </header>

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center py-20 px-20">
        {/* Intro */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-4">
          Track, Compare, and Level Up Your Coding Journey.
        </h1>
        <p className="text-gray-600 text-lg text-center mb-12 max-w-xl">
          Analyze your competitive programming growth across platforms. Paste your profiles to get personalized stats and friendly comparisons.
        </p>

        {/* Inputs Row */}
        <div className="flex flex-wrap gap-4 items-center justify-center w-full mb-6">
          {links.map((link, index) => (
            <input
              key={index}
              type="text"
              value={link}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder="Paste your link here"
              className="w-[300px] px-4 py-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        {/* Buttons Centered Below */}
        <div className="flex gap-4 justify-center mb-6">
          {links.length < 3 && (
            <button
              onClick={handleAddLink}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              + Add Link
            </button>
          )}
          <button
            onClick={handleFetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Fetch Data
          </button>
        </div>

        {/* Stats Section */}
        {showStats && (
          <div className="flex flex-wrap justify-center gap-4 w-full max-w-6xl">
            {links.map((link, index) => (
              <div
                key={index}
                className={`bg-white shadow rounded p-4 text-gray-800 text-sm ${links.length === 1
                    ? "w-[700px]"
                    : links.length === 2
                      ? "w-[450px]"
                      : "w-[350px]"
                  }`}
              >
                <FetchedData link={link} />
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
