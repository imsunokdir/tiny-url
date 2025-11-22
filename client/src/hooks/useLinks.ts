import { useQuery, useQueryClient } from "@tanstack/react-query";
import { linkApi } from "../services/linkApi";
import type { Link } from "../types";

export const useLinks = () => {
  const queryClient = useQueryClient();

  const {
    data: links = [],
    isLoading: loading,
    error,
  } = useQuery<Link[]>({
    queryKey: ["links"],
    queryFn: linkApi.getAllLinks,
  });

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["links"] });
  };

  return {
    links,
    loading,
    error: error ? "Failed to fetch links" : null,
    refetch,
  };
};
