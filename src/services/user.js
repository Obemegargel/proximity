import { supabase } from "../../supabaseClient";

export const fetchUsers = async () => {
  let { data: users, error } = await supabase.from("users").select("*");
  console.log("error", error);
  //   console.log("data", users);

  if (error) {
    throw new Error();
  }

  return users;
};
