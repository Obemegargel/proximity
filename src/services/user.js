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
// import { supabase } from "../../supabaseClient";
// never worked when I had it like this
// import supabase from "../../supabaseClient";

// export async function signUpWithEmail({ email, password, username }) {
//   const { data, error } = await supabase.auth.signUp({ email, password });
//   if (error) throw error;

//   const user = data.user;

//   const { error: profileError } = await supabase.from("profiles").insert({
//     id: user.id,
//     username,
//   });
//   if (profileError) throw profileError;

//   return user;
// }
// ==================================================================
// src/services/user.js
// This was the last code to work
// import { supabase } from "../../supabaseClient"; // <- usually a named export

// export async function signUpWithEmail({ email, password, username }) {
//   // 1) Create auth user
//   const { data, error } = await supabase.auth.signUp({ email, password });
//   if (error) throw error;

//   const user = data.user;

//   // 2) Insert into profiles table
//   const { error: profileError } = await supabase.from("profiles").insert({
//     id: user.id,
//     username,
//   });
//   if (profileError) throw profileError;

//   return user;
// }
// ==================================================================
// the code above worked last, this might not
// import { supabase } from "../../supabaseClient"; // if this is just for sign in it doesn't need username but I might need to use the code above so SignUpScreen.js works

// export async function signUpWithEmail({ email, password }) {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });
//   if (error) throw error;
//   return data.user;
// }
// ==================================================================
// most recent that works
// import { supabase } from "../../supabaseClient";

// // SIGN UP – needs username
// export async function signUpWithEmail({ email, password, username }) {
//   const { data, error } = await supabase.auth.signUp({ email, password });
//   if (error) throw error;

//   const user = data.user;

//   const { error: profileError } = await supabase.from("profiles").insert({
//     id: user.id,
//     username,
//   });
//   if (profileError) throw profileError;

//   return user;
// }

// // LOGIN – NO username here
// export async function signInWithEmail({ email, password }) {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });
//   if (error) throw error;

//   return data.user;
// }
// ==================================================================

// Supabase is a client instance
// Datatype: JavaScript object created by createClient(url, key)
// it contains properties like:
// .auth – methods for authentication (sign up, sign in, sign out, get user, etc.)
// .from - query builder for database tables
// .rpc - call Postgres functions
// .storage - methods for interacting with Supabase Storage / bucket management\
/*
// example:
  supabase = {
  auth: { signIn, signOut, getUser, ... },
  from: (tableName) => ({ select, insert, update, ... }),
  storage: { from(), upload(), ... }
  }
  */
import { supabase } from "../../supabaseClient";

// ... your signUpWithEmail and signInWithEmail are already here ...
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
// // LOGIN – NO username here
export async function signInWithEmail({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;

  return data.user;
}

// Get the currently logged-in user's profile (username)
export async function getCurrentUserProfile() {
  // 1) Get currently logged-in auth user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) {
    throw new Error("No logged-in user");
  }

  // 2) Look up matching row in profiles table
  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  if (error) throw error;

  return {
    userId: user.id,
    username: data.username,
  };
  /*
  {
  userId: "uuid-string",
  username: "someName"
  } 
  */
}

// Fetch all interests (id + name) from interests table
export async function fetchInterests() {
  const { data, error } = await supabase
    .from("interests")
    .select("interest_id, name")
    .order("name", { ascending: true });

  if (error) throw error;
  return data || [];
}
