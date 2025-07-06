import { useEffect, useState } from "react";
import axios from "axios";

function useVisitorsByCountry() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/dashboard/visitors/countries`
        );

        if (!res?.data?.countries || !Array.isArray(res.data.countries)) {
          throw new Error("Invalid visitors by country format");
        }

        setCountries(res.data.countries);
      } catch (err) {
        console.error("❌ Failed to fetch visitor countries:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, []);

  return { countries, loading, error };
}

export default useVisitorsByCountry;
