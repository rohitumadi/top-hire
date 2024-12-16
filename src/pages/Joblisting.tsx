import { getJobs } from "@/api/jobsApi";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Joblisting = () => {
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

    getData();
  }, []);

  return (
    <div className=" flex flex-col gap-5">
      <h1 className="text-center ">Latest Jobs</h1>
      {/* add filters */}
      <div className="grid sm:grid-cols-5 grid-cols-1 ">
        <div className="p-2 sm:col-span-1">
          <h2 className="font-bold flex justify-between items-center gap-2 border-2 border-neutral-500 rounded-sm p-2">
            <div className="flex items-center gap-2">
              <Filter />
              Filters
            </div>
            <Button variant={"outline"}>Clear All</Button>
          </h2>
        </div>
        {loadingJobs && (
          <div className="col-span-4 self-center justify-self-center">
            <ClipLoader className="" color="#fff" size={100} />
          </div>
        )}

        {!loadingJobs && jobs && (
          <div className="flex flex-col sm:col-span-3 p-2 gap-5 justify-center items-center flex-grow">
            {jobs.map((job: any) => {
              return <JobCard key={job.id} jobDetails={job} />;
            })}
          </div>
        )}
        {jobs && jobs.length === 0 && (
          <div className="col-span-4 self-center ">
            <h2 className="text-center">No Jobs Found</h2>
          </div>
        )}
      </div>
    </div>
  );
};
export default Joblisting;
