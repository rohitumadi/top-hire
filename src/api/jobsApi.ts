import createClerkSupabaseClient from "@/utils/supabase";

export async function getJobs(token: string, companyDetails: any) {
  const supabase = createClerkSupabaseClient(token);

  const { data, error } = await supabase.from("jobs").select("*");
  if (error) {
    console.log("error occurred while fetching jobs", error.message);
    return null;
  }

  return data;
}
