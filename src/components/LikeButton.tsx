import { getSavedJobs, saveJob, unSaveJob } from "@/api/jobsApi";
import useFetchAuth from "@/hooks/useFetchAuth";
import useUpdate from "@/hooks/useUpdate";
import { useUser } from "@clerk/clerk-react";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LikeButton = ({ jobId }: { jobId: string }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { fn: saveJobFn, loading: saveJobLoading } = useUpdate(saveJob);
  const { fn: unSaveJobFn, loading: unSaveJobLoading } = useUpdate(unSaveJob);

  const navigate = useNavigate();
  const {
    data,
    loading: loadingSavedJobs,
    error,
    fetchData: fetchSavedJobs,
  } = useFetchAuth(getSavedJobs);
  const { user, isLoaded } = useUser();
  useEffect(() => {
    if (!isLoaded || !user) {
      return;
    }
    const getData = async () => {
      await fetchSavedJobs();
    };
    getData();
  }, [isLoaded]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const job = data.find((job: any) => job.job_id === jobId);
    if (job) {
      setIsLiked(true);
    }
  }, [data, jobId]);

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
      toast.success("");
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
