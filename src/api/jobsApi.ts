import { supabase } from "@/utils/supabase";
import createClerkSupabaseClient from "@/utils/supabaseClerkClient";

export async function getJobs(companyDetails: any) {
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

export async function getJobDetails(jobId: string) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const { data, error } = await supabase
    .from("jobs")
    .select("*, company:companies(company_name,company_logo_url)")
    .eq("id", jobId)
    .single();

  if (error) {
    console.log("error occurred while fetching job details", error.message);
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

export async function saveJob(token: string, userId: string, jobId: string) {
  const supabase = createClerkSupabaseClient(token);

  const { data, error } = await supabase.from("saved_jobs").insert({
    job_id: jobId,
    user_id: userId,
  });
  if (error) {
    console.log("error occurred while saving job", error.message);
  }
}
export async function unSaveJob(token: string, userId: string, jobId: string) {
  const supabase = createClerkSupabaseClient(token);

  const { data, error } = await supabase
    .from("saved_jobs")
    .delete()
    .eq("job_id", jobId)
    .eq("user_id", userId);
  if (error) {
    console.log("error occurred while deleting job", error.message);
  }
}

export async function getApplicationCountForJob(jobId: string) {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("id", jobId);
  if (error) {
    console.log(
      "error occurred while fetching application count",
      error.message
    );
  }
  return data?.length;
}

export async function updateJobStatus(
  token: string,
  jobId: string,
  status: string
) {
  const supabase = createClerkSupabaseClient(token);
  const { data, error } = await supabase
    .from("jobs")
    .update({ isOpen: status })
    .eq("id", jobId);
  if (error) {
    console.log("error occurred while updating job status", error.message);
  }
}
