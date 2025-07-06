import { useEffect, useState } from "react";
import axios from "axios";

function useReferralTraffic() {
  const [summary, setSummary] = useState({ direct: 0, organic: 0, social: 0 });
  const [sources, setSources] = useState([]); // for ReferralTrafficChart
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReferralTraffic = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/dashboard/traffic/referrals`
        );

        const { data } = res;

        if (!data || !data.summary || !Array.isArray(data.sources)) {
          throw new Error("Invalid referral data format");
        }

        setSummary(data.summary);
        setSources(data.sources);
      } catch (err) {
        console.error("❌ Failed to fetch referral traffic:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReferralTraffic();
  }, []);

  return { summary, sources, loading, error };
}

export default useReferralTraffic;
