import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
      className="cursor-pointer w-full bg-neutral-900 "
      onClick={() => {
        console.log("clicked");
        navigate(`/jobs/${id}`);
      }}
    >
      <CardHeader>
        <CardTitle>
          {title} at {company_name} | {location}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-2  ">
        <img src={company_logo_url} className="w-32  p-2" alt="Company Image" />

        <p>
          Expected Salary: {expected_salary} | Experience: {experience}
        </p>
        <Heart className="w-4 h-4 hover:bg-red-600" />
      </CardContent>
    </Card>
  );
};
export default JobCard;
