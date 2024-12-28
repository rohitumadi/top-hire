import createClerkSupabaseClient from "@/utils/supabaseClerkClient";

interface ApplicationData {
  candidate_id: string;
  job_id: string;
  name: string;
  status: string;
  experience: number;
  skills: string;
  education: ["Intermediate", "Graduate", "Post Graduate"];
  resume: File;
}

export async function applyJob(token: string, data: ApplicationData) {
  const supabase = createClerkSupabaseClient(token);

  const randomId = Math.floor(Math.random() * 1000000);
  const filename = `${randomId}-${data.candidate_id}.pdf`;

  const { data: resumeUpload, error: resumeUploadError } =
    await supabase.storage.from("resumes").upload(filename, data.resume);
  if (resumeUploadError) {
    console.log("error occurred while uploading resume", resumeUploadError);
  }
  const resumeUrl = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/resumes/${filename}`;

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

export async function updateApplicationStatus(
  token: string,
  applicationId: string,
  status: string
) {
  const supabase = createClerkSupabaseClient(token);
  const { error } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", applicationId);
  if (error) {
    console.log(
      "error occurred while updating application status",
      error.message
    );
  }
}
