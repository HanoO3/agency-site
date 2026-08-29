export interface Project {
  slug: string;
  title: string;
  category: string;
  shortDescription?: string;
  summary?: string;
  description?: string;
  url: string;
  image: string;
  gallery?: string[];
  technologies?: string[];
  tags?: string[];
  services?: string[];
  year?: string;
  client?: string;
  featured?: boolean;
  tier?: "selected" | "wordpress";
  aspectRatio?: "16/9" | "4/5" | "4/3" | "1/1";
}