import {
  getApplicationsForJob,
  getJobDetails,
  updateJobStatus,
} from "@/api/jobsApi";
import ApplyModal from "@/components/ApplyModal";
import { useTheme } from "@/components/theme-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Database, JobWithCompany } from "@/utils/database.types";
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
import { Briefcase, DoorClosed, DoorOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
type applicationsType = Database["public"]["Tables"]["applications"]["Row"][];

const Job = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isLoaded } = useUser();
  const [isApplied, setisApplied] = useState<boolean>(false);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const role = user?.unsafeMetadata.role;
  const {
    data: applications,
    loading: loadingApplications,
    fetchData: fetchApplications,
    error,
  } = useFetch<applicationsType>(getApplicationsForJob);
  const {
    data: jobDetails,
    loading: loadingJob,
    fetchData: fetchJob,
  } = useFetch<JobWithCompany>(getJobDetails);
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
    async function getData(jobId: string) {
      await fetchApplications(jobId);
      await fetchJob(jobId);
    }
    if (id) getData(id);
  }, [id]);
  useEffect(() => {
    if (isLoaded) {
      setisApplied(
        applications?.some(
          (application: Database["public"]["Tables"]["applications"]["Row"]) =>
            application.candidate_id === user?.id
        ) || false
      );
    }
  }, [applications, isLoaded, user?.id]);

  async function handleStatusChange() {
    if (isOpen) {
      await updateJobStatusFn(
        "Job closed successfully",
        "Error closing Job",
        id,
        "false"
      );
      await fetchJob(id);
    } else {
      await updateJobStatusFn(
        "Job opened successfully",
        "Error opening job",
        id,
        "true"
      );
      await fetchJob(id);
    }
  }
  if (loadingJob || loadingApplications) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color={theme === "dark" ? "white" : "black"} size={100} />
      </div>
    );
  }
  const applicationsCount = applications?.length || 0;

  return (
    <ShineBorder
      className="relative flex mb-4 h-fit w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
      color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      borderWidth={3}
    >
      <Card className="border-none shadow-none ">
        <div className="flex flex-col gap-y-4  p-2">
          <h1 className="font-semibold text-5xl">
            {company_name} is hiring for {title} | {experience}
          </h1>
          <div className="flex justify-between items-center">
            <div className="flex gap-2  ">
              <Badge>{jobLocation}</Badge>
              <Badge>{expected_salary}</Badge>
            </div>
            <p className="flex gap-2 items-center">
              <Briefcase /> {applicationsCount} applicants
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
            <MDEditor.Markdown
              className="bg-transparent font-semibold  text-black dark:text-white"
              source={requirements}
            />
          </div>
          {role !== "recruiter" && jobDetails && (
            <ApplyModal
              job={jobDetails}
              applied={isApplied || false}
              fetchJob={fetchJob}
            />
          )}
          {role === "recruiter" && (
            <Button onClick={() => navigate(`/applications/${jobDetails?.id}`)}>
              Applications
            </Button>
          )}
        </div>
      </Card>
    </ShineBorder>
  );
};
export default Job;
