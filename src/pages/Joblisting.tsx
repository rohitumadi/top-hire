import { getJobs } from "@/api/jobsApi";
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
    data,
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
      const jobs = await fetchJobs();
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
    </div>
  );
};
export default Joblisting;
