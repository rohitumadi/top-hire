import { supabase } from "@/utils/supabase";

export async function getCompanies(token: string) {
  const { data, error } = await supabase.from("companies").select("*");
  if (error) {
    console.log("error occurred while fetching companies", error.message);
  }
  return data;
}
