import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

export default function useUpdate(cb: Function) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { session } = useSession();

  const fn = async (...args: any) => {
    setLoading(true);

    try {
      const supabaseAccessToken = await session?.getToken({
        template: "supabase",
      });
      const res = await cb(supabaseAccessToken, ...args);
      setError(null);
    } catch (e: any) {
      console.log("error", e);
      setError(e);
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  return { loading, error, fn };
}
