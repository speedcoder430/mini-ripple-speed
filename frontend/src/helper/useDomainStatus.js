// src/helpers/useDomainStatus.js
import { useState, useEffect } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";

export const useDomainStatus = () => {
  const [status, setStatus] = useState("idle"); // idle | loading | active | inactive | error

  const fetchStatus = async () => {
    setStatus("loading");
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const token = await currentUser.getIdToken(true);

      // const token = await auth.currentUser.getIdToken(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/domain/status`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const domainStatus = res.data?.data?.domainStatus;
      console.log("domainStatus:", domainStatus);

      if (domainStatus === "active") {
        setStatus("active");
      } else {
        setStatus("inactive");
      }
    } catch (error) {
      console.error("❌ Failed to fetch domain status", error);
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const isConnected = status === "active";

  return { status, isConnected };
};
