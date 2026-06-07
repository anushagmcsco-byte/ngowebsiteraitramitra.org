import { Metadata } from "next";
import AboutPage from "./AboutClient";

export const metadata: Metadata = {
  title: "About Our Trust | Mission, Vision & Governance - Raita Mitra",
  description: "Discover the history, administrative pillars, leadership board, and active regional governance trustees of Raita Mitra Social Trust in Hubballi, Karnataka.",
  openGraph: {
    title: "About Our Trust | Mission, Vision & Governance - Raita Mitra",
    description: "Discover the history, administrative pillars, leadership board, and active regional governance trustees of Raita Mitra Social Trust in Hubballi, Karnataka.",
    images: [
      {
        url: "https://picsum.photos/seed/raitamitra-about-seo/1200/630",
        width: 1200,
        height: 630,
        alt: "About Raita Mitra Trust Board and Governance meeting"
      }
    ]
  }
};

export default function Page() {
  return <AboutPage />;
}
