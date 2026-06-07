import { Metadata } from "next";
import OurFocusPage from "./OurFocusClient";

export const metadata: Metadata = {
  title: "6 Pillars of Grassroots Activity & Livelihoods - Raita Mitra",
  description: "Explore our intensive programs in sustainable agriculture, women's Self-Help Groups, digital computer learning labs, and climate adaptation projects.",
  openGraph: {
    title: "6 Pillars of Grassroots Activity & Livelihoods - Raita Mitra",
    description: "Explore our intensive programs in sustainable agriculture, women's Self-Help Groups, digital computer learning labs, and climate adaptation projects.",
    images: [
      {
        url: "https://picsum.photos/seed/raitamitra-focus-seo/1200/630",
        width: 1200,
        height: 630,
        alt: "Scientific agriculture and rural life education models"
      }
    ]
  }
};

export default function Page() {
  return <OurFocusPage />;
}
