import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleKeyDown = (e) => {
    if (e.key =="Enter"){
      if (email.trim() === "" || password.trim() === ""){
        alert("Email and Password required");
        return;
      }

      navigate("/records");
    
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#faf5ef] space-y-4">
      <span className="font-knewave text-8xl">DAILY TIME</span>
      <span className="font-knewave text-8xl">REPORT</span>

      <input
        type="email"
        placeholder="Email:"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleKeyDown}
        className="font-overpass p-2 rounded-lg border-1 border-blue- bg-green-500 text-white hover:text-white-500 transition-colors duration-300"
      />

      
      <input
        type="password"
        placeholder="Password:"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
        className="font-overpass p-2 rounded-lg border-1 border-blue- bg-green-500 text-white hover:text-white-500 transition-colors duration-300"
      />
    </div>
  );
}