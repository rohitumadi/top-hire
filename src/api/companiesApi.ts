import { supabase } from "@/utils/supabase";
import createClerkSupabaseClient from "@/utils/supabaseClerkClient";

export async function getCompanies() {
  const { data, error } = await supabase.from("companies").select("*");
  if (error) {
    console.log("error occurred while fetching companies", error.message);
  }
  return data;
}

export async function addNewCompay(token: string, formData: any) {
  const supabase = createClerkSupabaseClient(token);
  const randomId = Math.floor(Math.random() * 1000000);
  const filename = `${randomId}-${formData.company_name}`;

  const { data: companyUpload, error: companyUploadError } =
    await supabase.storage
      .from("company_logo")
      .upload(filename, formData.company_logo);
  if (companyUploadError) {
    console.log("error occurred while uploading company", companyUploadError);
  }
  const company_logo_url = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/company_logo/${filename}`;

  const { error } = await supabase.from("companies").insert([
    {
      company_name: formData.company_name,
      company_logo_url,
    },
  ]);

  if (error) {
    console.log("error occurred while saving company", error.message);
  }
  return { error };
}
