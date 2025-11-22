import { useState, useEffect } from "react";
import { linkApi } from "../services/linkApi";
import type { Link } from "../types";

export const useLinks = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchLinks = async (showLoading = false) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      setError(null);
      const data = await linkApi.getAllLinks();
      setLinks(data);
      setIsInitialLoad(false);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch links");
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchLinks(true); // Show loading on initial load
  }, []);

  const refetch = () => fetchLinks(false); // Don't show loading on refetch

  return { links, loading: loading && isInitialLoad, error, refetch };
};
