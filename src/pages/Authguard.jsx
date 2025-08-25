import { useNavigate } from "react-router-dom";
import supabase from "../supabase/supabase-client";
import { useEffect } from "react";

export default function AuthGuard({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkSession() {
      try {
        console.log("Authguard activated.");
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (data.session) {
          navigate("/records");
        } else {
          navigate("/");
        }
        return;
      } catch (error) {
        console.error("Error getting session:", error);
        navigate("/");
        return null;
      }
    }

    checkSession();
  }, []);

  return <main>{children}</main>;
}
