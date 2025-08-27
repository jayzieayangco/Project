import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabase-client";
import { supabaseLoginWithEmail } from "./Service";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function navigateTo(route) {
    navigate(route);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await supabaseLoginWithEmail(email, password);

    if (!response) {
      return;
    }

    navigateTo("/records")
    console.log("Logged in successfully.")
  }

  return (
    <div className="flex flex-col items-center justify-left h-screen bg-[#faf5ef]">
      <div className="flex flex-col items-center justify-center p-25">
        <span className="font-knewave text-8xl">DAILY TIME</span>
        <br />
        <span className="font-knewave text-8xl">RECORD</span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 items-center mb-2"
      >
        <input
          required
          type="email"
          placeholder="Email:"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="font-overpass w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          required
          type="password"
          placeholder="Password:"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="font-overpass w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button type="submit" className="fixed top-6 right-28 font-overpass bg-green-600 text-white px-4.5 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50">
          Login
        </button>
      </form>
      <button 
      onClick={() => navigateTo("/register")} className={`${button}`}>
        Register
      </button>
    </div>
  );
}

export const button =
  "fixed top-6 right-6 font-overpass px-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50";
