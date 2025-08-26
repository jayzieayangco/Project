import toast from "react-hot-toast";
import supabase from "../../supabase/supabase-client";

export async function fetchTimeRecords() {
  try {
    const userId = await fetchCurrentUserId();

    const { data, error } = await supabase
      .from("daily_time_record")
      .select("*")
      .eq("user_id", userId)
      .order("dtr_date", { ascending: false });

    if (error) throw error;

    return data;
  } catch (error) {
    toast.error("There has been an error.");
    return null;
  }
}

export async function fetchCurrentUserId() {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;

    console.log(data.session.user.id);

    return data.session.user.id;
  } catch (error) {
    console.error(error);
    toast.error("There has been an error with the user ID.");
    return null;
  }
}

export async function addTimeIn() {
  try {
    const checkTimeStatus = await checkForTimeRecord();

    if (checkTimeStatus.doesTimeInExist) {
      toast("Time in already exists", {
        icon: "⚠️",
      });
      return;
    }

    const userId = await fetchCurrentUserId();

    const { error } = await supabase
      .from("daily_time_record")
      .insert([{ user_id: userId }]);

    if (error) throw error;

    toast.success("Logged time in successfully.");
    return true;
  } catch (error) {
    console.error(error);
    toast.error("Error logging time in.");
    return null;
  }
}

export async function updateTimeOut() {
  try {
    const checkTimeStatus = await checkForTimeRecord();

    console.log(checkTimeStatus.doesTimeOutExist);

    if (checkTimeStatus.doesTimeOutExist) {
      toast("Time out already exists", {
        icon: "⚠️",
      });
      return;
    }
    const userId = await fetchCurrentUserId();

    const now = new Date();

    const currentDate = now.toLocaleDateString("en-CA");

    const { error } = await supabase
      .from("daily_time_record")
      .update({ dtr_time_out: now })
      .eq("user_id", userId)
      .eq("dtr_date", currentDate);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function checkForTimeRecord() {
  try {
    let doesTimeInExist = false;
    let doesTimeOutExist = false;

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-CA");

    const { data, error } = await supabase
      .from("daily_time_record")
      .select("*")
      .eq("dtr_date", formattedDate);

    if (error) throw error;

    if (data.length > 0) {
      doesTimeInExist = true;
    }

    if (!(data.dtr_time_out === null)) {
      doesTimeOutExist = true;
    }

    return {
      doesTimeInExist,
      doesTimeOutExist,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function supabaseLogOut() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
}
