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
    <div className="flex flex-col items-center justify-left h-max bg-[#faf5ef]">
      <div className="flex flex-col items-center justify-center p-30">
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
          className="font-overpass px-2 py-2 text-xl rounded-lg border-1 border-blue bg-green-600 text-white font-bold hover:text-white-500 transition-colors duration-300"
        />
        <input
          required
          type="password"
          placeholder="Password:"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="font-overpass p-2 text-xl rounded-lg border-1 border-blue- bg-green-600 text-white font-bold hover:text-white-500 transition-colors duration-300"
        />

        <button type="submit" className={`${button}`}>
          Login
        </button>
      </form>
      <button onClick={() => navigateTo("/register")} className={`${button}`}>
        Register
      </button>
    </div>
  );
}

export const button =
  "font-overpass w-[200px] bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50";
