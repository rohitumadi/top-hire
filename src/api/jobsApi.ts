import createClerkSupabaseClient from "@/utils/supabase";

export async function getJobs(token: string, companyDetails: any) {
  const { location, company_id, searchQuery } = companyDetails;
  const supabase = createClerkSupabaseClient(token);

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
