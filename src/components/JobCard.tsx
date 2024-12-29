import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import ShineBorder from "./ui/shine-border";
interface JobCardProps {
  title: string;
  id: string;
  location: string;
  isOpen: boolean;
  description: string;
  requirements: string;
  expected_salary: string;
  experience: string;
  company: {
    company_name: string;
    company_logo_url: string;
  };
}
const JobCard = ({ jobDetails }: { jobDetails: JobCardProps }) => {
  const navigate = useNavigate();
  const {
    title,
    id,
    location,
    experience,

    expected_salary,
    company: { company_name, company_logo_url },
  } = jobDetails;

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

        <CardContent className="grid grid-cols-5 p-4 gap-2 ">
          <img
            src={company_logo_url}
            className="w-24 sm:w-24 self-center col-span-1 bg-neutral-700 rounded-md p-2"
            alt="Company Image"
          />

          <p className="col-span-3 ">
            Expected Salary: {expected_salary} | Experience: {experience}
          </p>
          <LikeButton jobId={id} />
        </CardContent>
        {/* <BorderBeam size={250} duration={12} delay={9} /> */}
      </Card>
    </ShineBorder>
  );
};
export default JobCard;
