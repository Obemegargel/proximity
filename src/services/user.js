// MOST RECENT WORKING CODE
// import { supabase } from "../../supabaseClient";

// export const fetchUsers = async () => {
//   let { data: users, error } = await supabase.from("users").select("*");
//   console.log("error", error);
//   //   console.log("data", users);

//   if (error) {
//     throw new Error();
//   }

//   return users;
// };

// ==================================================================
import { supabase } from "../../supabaseClient";

export async function signUpWithEmail({ email, password, username }) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;

  const user = data.user;

  const { error: profileError } = await supabase.from("profiles").insert({
    id: user.id,
    username,
  });
  if (profileError) throw profileError;

  return user;
}
