import { message } from "antd";
import { useCallback, useEffect, useState } from "react";
function useHTTP() {
  const [loading, setLoading] = useState();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  useEffect(() => {
    if (error) message.error(error);
  }, [error]);
  useEffect(() => {
    if (success) message.success(success);
  }, [success]);
  const fetchData = useCallback(
    async (url, method = "GET", body, headers = {}) => {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + "" + url, {
        body,
        method,
        headers,
      });

      const data = await res.json();
      setLoading(false);
      let code = 200;
      if (!res.ok) {
        code = 400;
        setError(data.message);
      } else {
        setSuccess(data.message);
      }

      return { ...data, code };
    }
  );
  return { loading, error, fetchData };
}
export default useHTTP;
