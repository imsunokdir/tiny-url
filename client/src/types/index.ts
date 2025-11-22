export interface Link {
  id: string;
  code: string;
  targetUrl: string;
  customDomain: string | null;
  clicks: number;
  lastClicked: Date | null;
  createdAt: Date;
  updatedAt: Date;
  shortUrl: string;
}

export interface CreateLinkInput {
  targetUrl: string;
  customCode?: string;
  customDomain?: string;
}
export interface ApiError {
  error: string;
}

export interface HealthCheck {
  ok: boolean;
  version: string;
  uptime: number;
  timestamp: string;
}
