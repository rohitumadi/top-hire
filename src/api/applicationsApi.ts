import { Database } from "@/utils/database.types";
import createClerkSupabaseClient from "@/utils/supabaseClerkClient";

export async function saveJob(
  token: string,
  data: Database["public"]["Tables"]["applications"]["Row"]
) {
  const supabase = createClerkSupabaseClient(token);

  const randomId = Math.floor(Math.random() * 1000000);
  const filename = `${randomId}-${data.candidate_id}.pdf`;

  const { data: resumeUpload, error: resumeUploadError } =
    await supabase.storage.from("resumes").upload(filename, data.resume);
  console.log(resumeUpload);
  if (resumeUploadError) {
    console.log("error occurred while uploading resume", resumeUploadError);
  }
  const resumeUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resumes/${filename}`;

  const { error } = await supabase.from("applications").insert([
    {
      ...data,
      resume: resumeUrl,
    },
  ]);
  if (error) {
    console.log("error occurred while applying for a job", error.message);
  }
}
