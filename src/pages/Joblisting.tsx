import { getJobs } from "@/api/jobsApi";
import JobCard from "@/components/JobCard";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Joblisting = () => {
  const { isLoaded } = useUser();
  const [searchQuery, setSearchQuery] = useState();
  const [location, setLocation] = useState();
  const [company_id, setCompanyId] = useState();
  const {
    data: jobs,
    loading: loadingJobs,
    error,
    fetchData: fetchJobs,
  } = useFetch(getJobs, {
    searchQuery,
    location,
    company_id,
  });
  useEffect(() => {
    async function getData() {
      await fetchJobs();
    }
    if (isLoaded) {
      getData();
    }
  }, [isLoaded]);
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center flex-grow">
        <ClipLoader className="" color="#fff" size={100} />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-center ">Latest Jobs</h1>
      {/* add filters */}
      {loadingJobs && (
        <div className="flex justify-center items-center ">
          <ClipLoader className="" color="#fff" size={100} />
        </div>
      )}
      <div className="flex flex-col gap-5 items-center">
        {!loadingJobs &&
          jobs &&
          jobs.map((job: any) => {
            return <JobCard key={job.id} jobDetails={job} />;
          })}
      </div>
    </div>
  );
};
export default Joblisting;
