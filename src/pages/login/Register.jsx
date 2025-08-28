import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabase-client";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      name,
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    const user = data?.user;

    if (user) {
      const { error: insertError } = await supabase.from("users").insert([
        {
          name,
          user_id: user.id,
          email: user.email,
        },
      ]);

      if (insertError) {
        console.error(insertError.message);
        setMessage("Registered, but failed to save extra user data.");
        setLoading(false);
        return;
      }
    }

    setMessage("Check your email to confirm your account.");
    setName("");
    setEmail("");
    setPassword("");
    setLoading(false);

    navigate("/");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#faf5ef] p-8 rounded-2xl shadow-xl w-96 relative">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-2xl"
          onClick={() => navigate("/")}
        >
          &times;
        </button>

        <h2 className="font-overpass text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        <form onSubmit={handleRegister} className="flex flex-col">
          <input
            type="name"
            placeholder="Name"
            className="font-overpass w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="font-overpass w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="font-overpass w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="font-overpass w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
}
