import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetchAuth = (cb: Function) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const { session } = useSession();

  const fetchData = async (...args: any) => {
    setLoading(true);

    try {
      const supabaseAccessToken = await session?.getToken({
        template: "supabase",
      });

      const res = await cb(supabaseAccessToken, ...args);
      if (res?.error) {
        throw res.error;
      }
      setData(res);
      setError(undefined);
    } catch (e: any) {
      console.log("error", e);
      setError(e);
    } finally {
      setLoading(false);
      setError(undefined);
    }
  };

  return { data, loading, error, fetchData };
};
export default useFetchAuth;
