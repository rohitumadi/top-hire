import { saveJob, unSaveJob } from "@/api/jobsApi";
import useUpdate from "@/hooks/useUpdate";
import { JobWithCompany } from "@/utils/database.types";
import { useUser } from "@clerk/clerk-react";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface LikeButtonProps {
  fetchSavedJobs: () => void;
  jobId: string;
  savedJobs: JobWithCompany[];
}

const LikeButton = ({ jobId, savedJobs, fetchSavedJobs }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { fn: saveJobFn, loading: saveJobLoading } = useUpdate(saveJob);
  const { fn: unSaveJobFn, loading: unSaveJobLoading } = useUpdate(unSaveJob);

  const navigate = useNavigate();

  const { user, isLoaded } = useUser();
  useEffect(() => {
    if (!isLoaded || !user) {
      return;
    }
    const getData = async () => {
      await fetchSavedJobs();
    };
    getData();
  }, [isLoaded, unSaveJobLoading]);

  useEffect(() => {
    if (!savedJobs) {
      return;
    }
    const job = savedJobs.find((job: any) => job.job_id === jobId);
    if (job) {
      setIsLiked(true);
    }
  }, [savedJobs, jobId]);

  async function handleToggleLike(e: React.MouseEvent<SVGSVGElement>) {
    e.stopPropagation();
    if (!user) {
      return navigate("?sign-in=true");
    }

    if (isLiked) {
      await unSaveJobFn(
        "Job removed from saved jobs",
        "Error removing job ",
        user.id,
        jobId
      );
      setIsLiked(false);
    } else {
      await saveJobFn(
        "Job saved successfully",
        "Error saving job",
        user.id,
        jobId
      );
      setIsLiked(true);
    }
  }
  return (
    <Heart
      onClick={(e) => handleToggleLike(e)}
      className={`self-center justify-self-center hover:fill-current  hover:text-red-600 ${
        isLiked ? "fill-current text-red-600" : ""
      }`}
    />
  );
};
export default LikeButton;
