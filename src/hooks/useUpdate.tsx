import { useSession } from "@clerk/clerk-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useUpdate(cb: Function) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const { session } = useSession();

  const fn = async (
    toastSuccessMsg: string,
    toastErrorMessage: string,
    ...args: any
  ) => {
    setLoading(true);

    try {
      const supabaseAccessToken = await session?.getToken({
        template: "supabase",
      });
      const res = await cb(supabaseAccessToken, ...args);
      if (res?.error) {
        throw res.error;
      }
      toast.success(toastSuccessMsg);
      setError(undefined);
    } catch (e: any) {
      console.log("error", e);
      toast.error(toastErrorMessage + " " + e.message);
      setError(e);
    } finally {
      setLoading(false);
      setError(undefined);
    }
  };

  return { loading, error, fn };
}
