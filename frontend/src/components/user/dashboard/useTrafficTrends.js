import { useEffect, useState } from "react";
import axios from "axios";

function useTrafficTrends() {
  const [trafficData, setTrafficData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/dashboard/traffic/trends`
        );
        const rawArray = res.data?.data; // <- ✅ This is the actual array

        if (!Array.isArray(rawArray)) {
          throw new Error("Traffic trends data is not an array.");
        }

        const transformed = rawArray.map((item) => ({
          dateHour: item.dateHour,
          metric1: item.lastOneDay,
          metric2: item.lastSevenDays,
        }));

        setTrafficData(transformed);
        setError(null); // Clear any previous error
      } catch (err) {
        console.error("❌ Failed to fetch traffic trends:", err);
        setError(err);
        setTrafficData([]); // Ensure data doesn't stay stale
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  return { trafficData, loading, error };
}

export default useTrafficTrends;
