import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
interface JobCardProps {
  title: string;
  id: string;
  location: string;
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
    <Card
      className="cursor-pointer  w-full bg-neutral-900 border-2 border-neutral-300"
      onClick={() => {
        console.log("clicked");
        navigate(`/jobs/${id}`);
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
          className="w-24 sm:w-24 self-center col-span-1"
          alt="Company Image"
        />

        <p className="col-span-3 ">
          Expected Salary: {expected_salary} | Experience: {experience}
        </p>
        <LikeButton jobId={id} />
      </CardContent>
    </Card>
  );
};
export default JobCard;
