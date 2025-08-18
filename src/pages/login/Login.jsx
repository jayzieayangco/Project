import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  function navigateTo(path) {
    navigate(path);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <span>Welcome to the Login Page.</span>
      <button
        onClick={() => navigateTo("/dashboard")}
        className="p-2 rounded-lg border-1 border-blue- bg-blue-500 text-white hover:bg-transparent hover:text-blue-500 transition-colors duration-300 cursor-pointer"
      >
        Proceed to dashbaord here.
      </button>
    </div>
  );
}
