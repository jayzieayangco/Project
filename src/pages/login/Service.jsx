import supabase from "../../supabase/supabase-client";

export async function supabaseLoginWithEmail(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
