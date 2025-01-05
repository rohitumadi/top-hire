import { getSavedJobs } from "@/api/jobsApi";
import JobCard from "@/components/JobCard";
import { useTheme } from "@/components/theme-provider";
import useFetchAuth from "@/hooks/useFetchAuth";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const SavedJobs = () => {
  const { user, isLoaded } = useUser();
  const { theme } = useTheme();
  const {
    data: savedJobs,
    loading: loadingSavedJobs,
    error,
    fetchData: fetchSavedJobs,
  } = useFetchAuth(getSavedJobs);

  useEffect(() => {
    if (!isLoaded || !user) {
      return;
    }
    const getData = async () => {
      await fetchSavedJobs(user?.id);
    };
    if (isLoaded) getData();
  }, [isLoaded, user]);

  return (
    <div className="px-4">
      <h1 className="text-center text-5xl font-semibold mb-4">Saved Jobs</h1>
      {loadingSavedJobs && (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={100} color={theme === "dark" ? "white" : "black"} />
        </div>
      )}
      {savedJobs && savedJobs.length > 0 && (
        <div className="flex flex-col gap-4">
          {savedJobs.map((job: any) => (
            <JobCard
              savedJobs={savedJobs}
              key={job.id}
              fetchSavedJobs={fetchSavedJobs}
              jobDetails={job.job}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default SavedJobs;
