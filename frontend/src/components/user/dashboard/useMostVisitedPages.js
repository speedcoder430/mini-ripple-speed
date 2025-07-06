// useMostVisitedPages.js
import { useEffect, useState } from "react";
import axios from "axios";

export default function useMostVisitedPages() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/dashboard/pages/most-visited`
        );

        if (!res.data || !Array.isArray(res.data.pages)) {
          throw new Error("Invalid format");
        }

        setData(res.data.pages);
      } catch (err) {
        console.error("Fetch failed:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  return { data, loading, error };
}
