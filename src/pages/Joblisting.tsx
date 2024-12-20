import { getCompanies } from "@/api/companiesApi";
import { getJobs } from "@/api/jobsApi";
import CompanyFilter from "@/components/CompanyFilter";
import JobCard from "@/components/JobCard";
import LocationFilter from "@/components/LocationFilter";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Joblisting = () => {
  const [searchQuery, setSearchQuery] = useState<FormDataEntryValue>();
  const [location, setLocation] = useState<string>();
  const { theme } = useTheme();
  const [company_id, setCompanyId] = useState<string>();
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
  const {
    data: companies,
    loading: loadingCompanies,
    fetchData: fetchCompanies,
  } = useFetch(getCompanies);

  useEffect(() => {
    async function getData() {
      await fetchJobs();
      await fetchCompanies();
    }

    getData();
  }, [searchQuery, location, company_id]);

  useEffect(() => {
    async function getData() {}

    getData();
  }, []);

  function handleSearch(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("search");
    if (query) {
      setSearchQuery(query);
    }
  }

  async function clearFilters() {
    setLocation("");
    setCompanyId("");
    setSearchQuery("");
  }

  return (
    <div className=" flex flex-col gap-5">
      <h1 className="text-center ">Latest Jobs</h1>
      <form
        className="w-full flex  gap-2 mt-2 "
        onSubmit={(e) => handleSearch(e)}
      >
        <Input name="search" type="text" placeholder="Search by Job Title" />
        <Button>Search</Button>
      </form>
      {/* add filters */}

      <div className="grid sm:grid-cols-7 grid-cols-1 ">
        <div className="p-2 sm:col-span-2">
          <div className="font-bold gap-2 flex flex-col  items-center  border-2 border-neutral-500 rounded-sm p-2">
            <div className="flex  justify-between w-full items-center ">
              <div className="flex items-center gap-2">
                <Filter />
                Filters
              </div>
              <Button variant={"destructive"} onClick={clearFilters}>
                Clear All
              </Button>
            </div>

            <LocationFilter location={location} setLocation={setLocation} />
            <CompanyFilter
              companies={companies}
              company_id={company_id}
              setCompanyId={setCompanyId}
            />
          </div>
        </div>
        {loadingJobs && (
          <div className="col-span-5 self-center justify-self-center">
            <ClipLoader
              color={theme === "dark" ? "white" : "black"}
              size={100}
            />
          </div>
        )}

        {!loadingJobs && jobs && jobs.length > 0 && (
          <div className="flex flex-col sm:col-span-5 p-2 gap-5 justify-center items-center flex-grow">
            {jobs.map((job: any) => {
              return <JobCard key={job.id} jobDetails={job} />;
            })}
          </div>
        )}
        {jobs && jobs.length === 0 && (
          <div className="col-span-3 self-center ">
            <h2 className="text-center text-2xl font-semibold text-red-500">
              ⛔️ No Jobs Found !
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};
export default Joblisting;
