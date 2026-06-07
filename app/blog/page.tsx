import { Metadata } from "next";
import BlogIndexPage from "./BlogClient";

export const metadata: Metadata = {
  title: "Trust Editorial Press & Agrarian Publications - Raita Mitra",
  description: "Browse academic farming logs, organic carbon updates, dynamic trust reports, and public welfare campaigns direct from Raita Mitra Social Trust.",
  openGraph: {
    title: "Trust Editorial Press & Agrarian Publications - Raita Mitra",
    description: "Browse academic farming logs, organic carbon updates, dynamic trust reports, and public welfare campaigns direct from Raita Mitra Social Trust.",
    images: [
      {
        url: "https://picsum.photos/seed/raitamitra-blog-seo/1200/630",
        width: 1200,
        height: 630,
        alt: "Scientific organic farming soil testing and training reports"
      }
    ]
  }
};

export default function Page() {
  return <BlogIndexPage />;
}
