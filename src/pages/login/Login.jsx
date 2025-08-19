import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  function navigateTo(path) {
    navigate(path);
  }

  return (
    <div className=" flex flex-col items-center h-screen bg-[#faf5ef]">
      <div className="flex flex-col items-center justify-center p-30">
        <span className="font-knewave text-8xl">DAILY TIME</span><br/>  
        <span className="font-knewave text-8xl items-center">RECORD</span>
      </div>

      <div className="flex flex-col items-center justify-center">
        <button
          onClick={() => navigateTo("/dashboard")}
          className="font-overpass p-2 rounded-lg border-1 border-blue- bg-green-500 text-white px-10 py-2 text-3xl font-bold m-9 hover:bg-transparent hover:text-black transition-colors duration-300 cursor-pointer"
        >
          LOG IN
        </button>
      </div>
    </div>
  );
}
