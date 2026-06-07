import { Metadata } from "next";
import CompliancePage from "./ComplianceClient";

export const metadata: Metadata = {
  title: "Statutory Compliance & Legal Registry - Raita Mitra",
  description: "Verify operational transparency, CSR00059487 Ministry ID, NITI Aayog NGO Darpan registry: KA/2023/0342549, and 12A/80G provisional profiles of Raita Mitra.",
  openGraph: {
    title: "Statutory Compliance & Legal Registry - Raita Mitra",
    description: "Verify operational transparency, CSR00059487 Ministry ID, NITI Aayog NGO Darpan registry: KA/2023/0342549, and 12A/80G provisional profiles of Raita Mitra.",
    images: [
      {
        url: "https://picsum.photos/seed/raitamitra-compliance-seo/1200/630",
        width: 1200,
        height: 630,
        alt: "Raita Mitra Social Trust statutory compliance details and certifications"
      }
    ]
  }
};

export default function Page() {
  return <CompliancePage />;
}
