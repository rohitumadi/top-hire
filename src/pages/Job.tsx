import { getApplicationCountForJob } from "@/api/jobsApi";
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
import { useUser } from "@clerk/clerk-react";
import { Briefcase, DoorClosed, DoorOpen } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const Job = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const role = user?.unsafeMetadata.role;

  const location = useLocation();
  const {
    data: applicationCount,
    loading: loadingApplicationCount,
    fetchData: fetchApplicationCount,
    error,
  } = useFetch(getApplicationCountForJob);
  useEffect(() => {
    async function fetchApplicationCountForJob(jobId: string) {
      await fetchApplicationCount(jobId);
    }
    if (id) fetchApplicationCountForJob(id);
  }, [id]);
  const jobDetails = location.state?.jobDetails;
  const {
    title,
    location: jobLocation,
    experience,
    isOpen,
    expected_salary,
    description,
    requirements,
    company: { company_name, company_logo_url },
  } = jobDetails;
  const requirementsObj = JSON.parse(requirements);
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
                <Select>
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
                      <SelectItem value={`${isOpen ? "open" : "close"}`}>
                        {`${isOpen ? "Close" : "Open"}`}
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
            <div>
              {requirementsObj.map(
                (
                  section: { title: string; items: string[] },
                  index: number
                ) => (
                  <div key={index} className="mb-6 ml-4">
                    <h2 className="text-xl font-semibold mb-3">
                      {section.title}
                    </h2>
                    <ul className="list-disc list-inside space-y-2">
                      {section.items.map((item: string, idx: number) => (
                        <li key={idx} className="ml-4">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </Card>
    </ShineBorder>
  );
};
export default Job;
