"use client";

import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaUser } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{ backgroundImage: "url('/images/brick_wall_bg.jpg')" }}>
      <div className="flex items-center justify-center gap-0 px-4">
        {/* Left Image Area */}
        <div className="w-[250px]">
          <img src="/images/left_looking.png" alt="Left Looking Girl" /> 
        </div>

        {/* Center Login Card */}
        <div className="bg-gray-900 bg-opacity-95 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] p-10 flex flex-col items-center w-[350px]">
          <img
            src="/images/CodeStalkrFull.png"
            alt="CodeStalkr Logo"
            className="w-[220px] mb-6"
          />

          {/* Login Buttons */}
          <div className="space-y-6 w-full flex flex-col items-center my-2">
            <button
              className="w-[250px] flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg py-2 shadow-sm hover:shadow-md transition  hover:cursor-pointer"
              onClick={() => console.log("Google login")}
            >
              <FcGoogle size={22} />
              <span className="text-gray-700 font-medium">Continue with Google</span>
            </button>

            <button
              className="w-[250px] flex items-center justify-center gap-3 bg-gray-800 text-white rounded-lg py-2 hover:bg-gray-900 transition hover:cursor-pointer"
              onClick={() => console.log("Guest login")}
            >
              <FaUser size={20} />
              <span className="font-medium">Continue as Guest</span>
            </button>
          </div>
        </div>

        {/* Right Image Area */}
        <div className="w-[250px] relative -left-[17px]">
          <img src="/images/right_looking.png" alt="Right Looking Girl" />
        </div>
      </div>
    </div>
  );
}
