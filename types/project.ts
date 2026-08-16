export type Project = {
  slug: string;
  title: string;
  client?: string;
  category: string;
  summary: string;
  image: string;
  year?: string;
  aspectRatio?: "16/9" | "4/5" | "4/3" | "1/1";
  tags?: string[];
};