import createClerkSupabaseClient from "@/utils/supabaseClerkClient";

export async function getCompanies(token: string) {
  const supabase = createClerkSupabaseClient(token);
  const { data, error } = await supabase.from("companies").select("*");
  if (error) {
    console.log("error occurred while fetching companies", error.message);
  }
  return data;
}
