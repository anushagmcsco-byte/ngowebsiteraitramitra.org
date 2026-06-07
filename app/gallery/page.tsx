import { Metadata } from "next";
import GalleryPage from "./GalleryClient";

export const metadata: Metadata = {
  title: "Afield Project Gallery & Visual Impact - Raita Mitra",
  description: "Explore on-site organic micro-husbandry, school computer labs, women's Self-Help Groups (SHG) training, and rainwater harvesting models across Karnataka.",
  openGraph: {
    title: "Afield Project Gallery & Visual Impact - Raita Mitra",
    description: "Explore on-site organic micro-husbandry, school computer labs, women's Self-Help Groups (SHG) training, and rainwater harvesting models across Karnataka.",
    images: [
      {
        url: "https://picsum.photos/seed/raitamitra-gallery-seo/1200/630",
        width: 1200,
        height: 630,
        alt: "Photo diary tracking direct community welfare programs in Karnataka"
      }
    ]
  }
};

export default function Page() {
  return <GalleryPage />;
}
