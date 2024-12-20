import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const { theme } = useTheme();
  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        user.unsafeMetadata.role === "recruiter" ? "/post-job" : "/jobs"
      );
    }
  }, [user]);
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center flex-grow">
        <ClipLoader color={theme === "dark" ? "white" : "black"} size={100} />
      </div>
    );
  }

  const handleRoleSelection = async (role: string) => {
    await user
      ?.update({
        unsafeMetadata: {
          role,
        },
      })
      .then(() => {
        navigate(role === "recruiter" ? "/post-job" : "/jobs");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col items-center  gap-10  flex-grow mt-20">
      <h2 className="font-extrabold sm:text-8xl  text-7xl ">I am a... </h2>
      <div className="flex gap-5">
        <Button size={"lg"} onClick={() => handleRoleSelection("recruiter")}>
          Recruiter
        </Button>
        <Button size={"lg"} onClick={() => handleRoleSelection("candidate")}>
          Candidate
        </Button>
      </div>
    </div>
  );
};
export default Onboarding;
