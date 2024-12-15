import { supabase } from "@/utils/supabase";
import createClerkSupabaseClient from "@/utils/supabaseClerkClient";

export async function getJobs(token: string, companyDetails: any) {
  const { location, company_id, searchQuery } = companyDetails;

  let query = supabase
    .from("jobs")
    .select("*, company:companies(company_name,company_logo_url)");

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.log("error occurred while fetching jobs", error.message);
    return null;
  }
  return data;
}

export async function getSavedJobs(token: string) {
  const supabase = createClerkSupabaseClient(token);
  const { data, error } = await supabase
    .from("saved_jobs")
    .select(
      "*, job:jobs(title, location, company:companies(company_name,company_logo_url))"
    );
  if (error) {
    console.log("error occurred while fetching saved jobs", error.message);
  }
  return data;
}

export async function saveJob(token: string, jobId: string) {
  const supabase = createClerkSupabaseClient(token);

  // const { data, error } = await supabase.from("saved_jobs").insert({
  //   job_id: jobId,
  //   user_id: supabase.auth.user()?.id,
  // });
  // if (error) {
  //   console.log("error occurred while saving job", error.message);
  // }
  // return data;
}
