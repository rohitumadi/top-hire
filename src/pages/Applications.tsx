import { getApplicationsForJob } from "@/api/jobsApi";
import { ApplicationsTable } from "@/components/applications/ApplicationsTable";
import { columns } from "@/components/applications/columns";
import { useTheme } from "@/components/theme-provider";
import useFetch from "@/hooks/useFetch";
import { applicationsType } from "@/utils/database.types";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
function Applications() {
  const { jobId } = useParams<{ jobId: string }>();
  const { theme } = useTheme();
  const {
    data: applications,
    loading: loadingApplications,
    fetchData: fetchApplications,
    error,
  } = useFetch<applicationsType>(getApplicationsForJob);

  useEffect(() => {
    async function getData(jobId: string) {
      await fetchApplications(jobId);
    }
    if (jobId) getData(jobId);
  }, [jobId]);
  return (
    <div className="flex flex-col gap-5 items-center">
      <h1 className="text-center font-semibold text-5xl ">Applications</h1>
      {loadingApplications ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color={theme === "dark" ? "white" : "black"} size={100} />
        </div>
      ) : (
        <ApplicationsTable
          jobId={jobId || ""}
          data={applications || []}
          columns={columns}
        />
      )}
    </div>
  );
}
export default Applications;
