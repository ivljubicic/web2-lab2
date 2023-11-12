import { supabase } from "$lib/supabaseClient";

export async function load() {
  const { data } = await supabase.from("posts").select();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return {
    posts: data ?? [],
    user: user,
  };
}