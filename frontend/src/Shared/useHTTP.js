import React, { useCallback, useState } from "react";

function useHTTP() {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const fetchData = useCallback(
    async (url, method = "GET", body, headers = {}) => {
      setLoading(true);

      const res = await fetch(process.env.REACT_APP_BACKEND_URL + "" + url, {
        body,
        method,
        headers,
      });

      const data = await res.json();

      setLoading(false);
      if (!res.ok) {
        setError(data.message);
        return;
      }

      return data;
    }
  );
  return { loading, error, fetchData };
}
export default useHTTP;
