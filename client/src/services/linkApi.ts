import type { CreateLinkInput, Link } from "../types";
import { apiInstance } from "./apiInstance";

export const linkApi = {
  // Get all links
  getAllLinks: async (): Promise<Link[]> => {
    const response = await apiInstance.get<Link[]>("/api/links");
    return response.data;
  },
  // Get single link by code
  getLinkByCode: async (code: string): Promise<Link> => {
    const response = await apiInstance.get<Link>(`/api/links/${code}`);
    return response.data;
  },
  // Create new link
  createLink: async (input: CreateLinkInput): Promise<Link> => {
    const response = await apiInstance.post<Link>("/api/links", input);
    return response.data;
  },
  // Delete link
  deleteLink: async (
    code: string,
    customDomain?: string | null
  ): Promise<void> => {
    await apiInstance.delete(`/api/links/${code}`, {
      data: { customDomain },
    });
  },
  // Health check
  healthCheck: async () => {
    const response = await apiInstance.get("/healthz");
    return response.data;
  },
};
