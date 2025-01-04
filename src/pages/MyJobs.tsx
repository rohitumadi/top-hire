import { getApplicationWithUserId } from "@/api/applicationsApi";
import { getJobsByRecruiterId } from "@/api/jobsApi";
import ApplicationCard from "@/components/applications/ApplicationCard";
import JobCard from "@/components/JobCard";
import useFetchAuth from "@/hooks/useFetchAuth";
import { JobWithCompany } from "@/utils/database.types";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const MyJobs = () => {
  const { user, isLoaded } = useUser();
  const role = user?.unsafeMetadata.role;
  const {
    data: myApplications,
    loading: loadingMyApplications,
    error: errorMyApplications,
    fetchData: fetchMyApplications,
  } = useFetchAuth(getApplicationWithUserId);
  const {
    data: myJobs,
    loading: loadingMyJobs,
    error: errorMyJobs,
    fetchData: fetchMyJobs,
  } = useFetchAuth(getJobsByRecruiterId);
  useEffect(() => {
    async function getData() {
      if (role === "recruiter") {
        await fetchMyJobs(user?.id);
      }
      if (role === "candidate") {
        await fetchMyApplications(user?.id);
      }
    }
    if (user) getData();
  }, [user]);
  if (loadingMyApplications || loadingMyJobs)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={100} />
      </div>
    );
  if (isLoaded) {
    return (
      <div>
        <h1 className="text-center text-5xl font-semibold mb-4">
          {role === "recruiter" ? "Posted Jobs" : "Applied Jobs"}
        </h1>

        {role === "candidate" &&
          myApplications?.data?.map((application: any) => (
            <ApplicationCard key={application.id} jobDetails={application} />
          ))}

        {role === "recruiter" && (
          <div className="grid grid-cols-1 gap-4 m-4">
            {myJobs?.data?.map((job: JobWithCompany) => (
              <JobCard key={job.id} jobDetails={job} />
            ))}
          </div>
        )}
      </div>
    );
  }
};
export default MyJobs;
