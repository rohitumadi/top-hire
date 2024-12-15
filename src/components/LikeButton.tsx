import { getSavedJobs, saveJob, unSaveJob } from "@/api/jobsApi";
import useFetch from "@/hooks/useFetch";
import useToggleSavedJobs from "@/hooks/useToggleSavedJobs";
import { useUser } from "@clerk/clerk-react";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LikeButton = ({ jobId }: { jobId: string }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { fn: saveJobFn, loading: saveJobLoading } =
    useToggleSavedJobs(saveJob);
  const { fn: unSaveJobFn, loading: unSaveJobLoading } =
    useToggleSavedJobs(unSaveJob);

  const navigate = useNavigate();
  const {
    data,
    loading: loadingSavedJobs,
    error,
    fetchData: fetchSavedJobs,
  } = useFetch(getSavedJobs, {});
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
      await saveJobFn(user.id, jobId);
      setIsLiked(false);
    } else {
      await unSaveJobFn(user.id, jobId);
      setIsLiked(true);
    }
  }
  return (
    <Heart
      onClick={(e) => handleToggleLike(e)}
      className={`w-4 h-4 hover:fill-current  hover:text-red-600 ${
        isLiked ? "fill-current text-red-600" : ""
      }`}
    />
  );
};
export default LikeButton;