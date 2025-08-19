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
    <div className="flex flex-col items-center justify-left h-screen bg-[#faf5ef]">
      <div className="flex flex-col items-center justify-center p-30">
        <span className="font-knewave text-8xl">DAILY TIME</span><br/>
        <span className="font-knewave text-8xl">RECORD</span>
      </div>

      <div>
        <input
          type="email"
          placeholder="Email:"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          className="font-overpass px-2 py-2 text-xl rounded-lg border-1 border-blue bg-green-500 text-white font-bold hover:text-white-500 transition-colors duration-300"
        />

        <br/>
        
        <input
          type="password"
          placeholder="Password:"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="font-overpass p-2 text-xl rounded-lg border-1 border-blue- bg-green-500 text-white font-bold hover:text-white-500 transition-colors duration-300"
        />
      </div>
    </div>
  );
}