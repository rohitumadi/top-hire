import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Database, JobWithCompany } from "@/utils/database.types";
import ShineBorder from "../ui/shine-border";
import { Badge } from "../ui/badge";

interface ApplicationWithComapnyType {
  job_id: string; // Replace with the actual type
  candidate_id: string;
  status: Database["public"]["Enums"]["status"];
  job: JobWithCompany;
}
function ApplicationCard({
  jobDetails,
}: {
  jobDetails: ApplicationWithComapnyType;
}) {
  const {
    title,
    id,
    location,
    experience,
    expected_salary,
    company: { company_name, company_logo_url },
  } = jobDetails.job;

  const navigate = useNavigate();
  return (
    <ShineBorder
      className="relative flex h-fit w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
      color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      borderWidth={3}
    >
      <Card
        className="cursor-pointer border-none shadow-none relative   w-full "
        onClick={() => {
          navigate(`/job/${id}`, { state: { jobDetails } });
        }}
      >
        <CardHeader className="p-4">
          <CardTitle className="">
            {title} at {company_name} | {location}
          </CardTitle>
        </CardHeader>

        <CardContent className="grid items-center grid-cols-5 p-4 gap-2 ">
          <img
            src={company_logo_url}
            className="w-24 sm:w-24 self-center col-span-1 bg-neutral-700 rounded-md p-2"
            alt="Company Image"
          />

          <p className="col-span-3 ">
            Expected Salary: {expected_salary} | Experience: {experience}
          </p>
          <div>
            <Badge>{jobDetails.status}</Badge>
          </div>
        </CardContent>
      </Card>
    </ShineBorder>
  );
}
export default ApplicationCard;
