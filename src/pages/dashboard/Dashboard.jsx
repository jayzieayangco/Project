import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const navigate=useNavigate();

  function navigateTo(path) {
    navigate(path);
  }
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#faf5ef]">
      <span className="font-knewave text-8xl">DAILY TIME</span>      
      <span className="font-knewave text-8xl">REPORT</span>
      <button
        onClick={() => navigateTo("/records")}
        className="font-overpass p-2 rounded-lg border-1 border-blue- bg-green-500 text-white hover:bg-transparent hover:text-blue-500 transition-colors duration-300 cursor-pointer"
      >
        ahm
      </button>
    </div>
  );
}
