export interface MediaAttachment {
  id: number;
  url: string;
  type: "image" | "video" | "document";
  reportId: number;
}
