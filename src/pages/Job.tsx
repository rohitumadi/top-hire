import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import ShineBorder from "@/components/ui/shine-border";
import { Briefcase, DoorClosed, DoorOpen } from "lucide-react";
import { useLocation } from "react-router-dom";

const Job = () => {
  const location = useLocation();
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
        <div className="flex flex-col gap-y-4 s p-2">
          <h1 className="font-semibold">
            {company_name} is hiring for {title} | {experience}
          </h1>
          <div className="flex justify-between ">
            <p className="flex gap-2">
              <Badge>{jobLocation}</Badge>
              <Badge>{expected_salary}</Badge>
            </p>
            <p className="flex gap-2 items-center">
              <Briefcase /> 0 applications
            </p>
            <p>
              {isOpen ? (
                <div className="flex gap-2 items-center">
                  <DoorOpen /> Open
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <DoorClosed /> Closed
                </div>
              )}
            </p>
          </div>

          <img
            className="self-center bg-neutral-800 rounded-md p-2 dark:bg-transparent"
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
            <p>
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
            </p>
          </div>
        </div>
      </Card>
    </ShineBorder>
  );
};
export default Job;
