import { useState } from "react";

const useFetch = <T,>(cb: Function, options = {}) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (...args: any) => {
    setLoading(true);

    try {
      let res;
      if (Object.entries(options).length !== 0) {
        res = await cb(options, ...args);
      } else {
        res = await cb(...args);
      }

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
