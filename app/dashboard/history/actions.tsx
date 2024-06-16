"use server";

import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/utils";

export async function getGenerations() {
  const supabase = createClient();
  const user = await getUser(true);

  const { data, error } = await supabase
    .from("generations")
    .select()
    .eq("user_id", user?.id!)
    // .eq("action", "GENQV1")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return data;
}
