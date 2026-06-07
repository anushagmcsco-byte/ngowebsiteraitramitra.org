import { Metadata } from "next";
import ImpactPage from "./ImpactClient";

export const metadata: Metadata = {
  title: "Social Return Simulator (80G Price Calculator) - Raita Mitra",
  description: "Calculate the exact physical allocation of your donor contributions towards organic seed, village computers, and women SHG microenterprise grants.",
  openGraph: {
    title: "Social Return Simulator (80G Price Calculator) - Raita Mitra",
    description: "Calculate the exact physical allocation of your donor contributions towards organic seed, village computers, and women SHG microenterprise grants.",
    images: [
      {
        url: "https://picsum.photos/seed/raitamitra-impact-seo/1200/630",
        width: 1200,
        height: 630,
        alt: "Interactive social impact assessment calculator and tax benefits estimator"
      }
    ]
  }
};

export default function Page() {
  return <ImpactPage />;
}
