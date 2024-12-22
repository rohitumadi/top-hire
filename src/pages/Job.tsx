import {
  getApplicationCountForJob,
  getJobDetails,
  updateJobStatus,
} from "@/api/jobsApi";
import { useTheme } from "@/components/theme-provider";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ShineBorder from "@/components/ui/shine-border";
import useFetch from "@/hooks/useFetch";
import useUpdate from "@/hooks/useUpdate";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, DoorClosed, DoorOpen } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Job = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const { theme } = useTheme();
  const role = user?.unsafeMetadata.role;
  const {
    data: applicationCount,
    loading: loadingApplicationCount,
    fetchData: fetchApplicationCount,
    error,
  } = useFetch(getApplicationCountForJob);
  const {
    data: jobDetails,
    fetchData: fetchJob,
    loading: loadingJob,
  } = useFetch(getJobDetails);
  const {
    fn: updateJobStatusFn,
    loading: updateJobStatusLoading,
    error: updateJobStatusError,
  } = useUpdate(updateJobStatus);
  const {
    title,
    location: jobLocation,
    experience,
    isOpen,
    expected_salary,
    description,
    requirements,
    company: { company_name, company_logo_url } = {},
  } = jobDetails || {};
  useEffect(() => {
    async function getJob(jobId: string) {
      console.log("fetching job details");
      await fetchApplicationCount(jobId);
      await fetchJob(jobId);
    }
    if (id) getJob(id);
  }, [id]);

  async function handleStatusChange() {
    if (isOpen) {
      await updateJobStatusFn(id, "false");
      await fetchJob(id);
      toast.success("Job closed successfully");
    } else {
      await updateJobStatusFn(id, "true");
      await fetchJob(id);
      toast.success("Job opened successfully");
    }
  }
  if (loadingJob || loadingApplicationCount) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color={theme === "dark" ? "white" : "black"} size={100} />
      </div>
    );
  }
  return (
    <ShineBorder
      className="relative flex mb-4 h-fit w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
      color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      borderWidth={3}
    >
      <Card className="">
        <div className="flex flex-col gap-y-4  p-2">
          <h1 className="font-semibold">
            {company_name} is hiring for {title} | {experience}
          </h1>
          <div className="flex justify-between items-center">
            <div className="flex gap-2  ">
              <Badge>{jobLocation}</Badge>
              <Badge>{expected_salary}</Badge>
            </div>
            <p className="flex gap-2 items-center">
              <Briefcase /> {applicationCount} applicants
            </p>
            <div className="flex gap-2 items-center">
              {/* <span>Job Status </span> */}
              {user && role === "recruiter" ? (
                <Select onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue
                      placeholder={
                        isOpen ? (
                          <div className="flex gap-2 items-center">
                            <DoorOpen /> Open
                          </div>
                        ) : (
                          <div className="flex gap-2 items-center">
                            <DoorClosed /> Closed
                          </div>
                        )
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={isOpen ? "closed" : "open"}>
                        <div className="flex cursor-pointer gap-2 items-center">
                          {isOpen ? <DoorClosed /> : <DoorOpen />}
                          {isOpen ? "Close" : "Open"}
                        </div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : isOpen ? (
                <div className="flex gap-2 items-center">
                  <DoorOpen /> Open
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <DoorClosed /> Closed
                </div>
              )}
            </div>
          </div>

          <img
            className="self-center bg-neutral-800 rounded-md p-4 dark:bg-transparent"
            src={company_logo_url}
            width={400}
            alt="Company Logo"
          />
          <div>
            <h2 className="font-extrabold text-2xl">Description</h2>
            <p>{description}</p>
          </div>
          <div>
            <h2 className="font-extrabold text-2xl">Requirements</h2>
            <p>{requirements}</p>
          </div>
        </div>
      </Card>
    </ShineBorder>
  );
};
export default Job;
