import { useEffect, useState } from "react";
import axios from "axios";

function useSuspiciousActivities() {
  const [data, setData] = useState([]); // API alerts array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuspicious = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/dashboard/security/suspicious-activities`
        );
        if (!res.data || !Array.isArray(res.data.alerts)) {
          throw new Error("Invalid suspicious activities response format");
        }

        setData(res.data.alerts);
      } catch (err) {
        console.error("❌ Failed to fetch suspicious activities:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuspicious();
  }, []);

  return { data, loading, error };
}

export default useSuspiciousActivities;
