import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (cb: any, options = {}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { session } = useSession();

  const fetchData = async (...args: any) => {
    setLoading(true);

    try {
      const supabaseAccessToken = await session?.getToken({
        template: "supabase",
      });
      const res = await cb(supabaseAccessToken, options, ...args);
      setData(res);
      setError(null);
    } catch (e: any) {
      console.log("error", e);
      setError(e);
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  return { data, loading, error, fetchData };
};
export default useFetch;
