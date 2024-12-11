import { getJobs } from "@/api/jobsApi";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

const Joblisting = () => {
  const { isLoaded } = useUser();
  const { data, loading, error, fetchData: fetchJobs } = useFetch(getJobs, {});
  useEffect(() => {
    async function getData() {
      const jobs = await fetchJobs();
    }
    if (isLoaded) {
      getData();
    }
  }, [isLoaded]);
  console.log(data);

  return <div>Joblisting</div>;
};
export default Joblisting;
