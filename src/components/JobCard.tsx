import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
interface JobCardProps {
  title: string;
  location: string;
  expected_salary: string;
  experience: string;

  companyName: string;
  companyImage: string;
}
const JobCard = (jobDetails: JobCardProps) => {
  const {
    title,
    location,
    expected_salary,
    experience,
    companyName,
    companyImage,
  } = jobDetails;
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {title} at {companyName} | {location}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <img src={companyImage} alt="Company Image" />
        <p>
          Expected Salary: {expected_salary} | Experience: {experience}
        </p>
      </CardContent>
    </Card>
  );
};
export default JobCard;
