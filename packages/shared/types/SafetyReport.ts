export interface SafetyReport {
  id: number;
  title: string;
  description: string;
  location: string;
  status: "pending" | "in_review" | "resolved";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  userId: number;
  mediaAttachments: MediaAttachment[];
}

export interface MediaAttachment {
  id: number;
  url: string;
  type: "image" | "video" | "document";
  reportId: number;
}
