import { Metadata } from "next";
import ContactPage from "./ContactClient";

export const metadata: Metadata = {
  title: "Reach Our Hubballi Office & Helpline - Raita Mitra",
  description: "Contact Raita Mitra Social Trust coordinate desk. Send inquiries, connect with our trustees, or coordinate donor compliance receipts direct in Karnataka.",
  openGraph: {
    title: "Reach Our Hubballi Office & Helpline - Raita Mitra",
    description: "Contact Raita Mitra Social Trust coordinate desk. Send inquiries, connect with our trustees, or coordinate donor compliance receipts direct in Karnataka.",
    images: [
      {
        url: "https://picsum.photos/seed/raitamitra-contact-seo/1200/630",
        width: 1200,
        height: 630,
        alt: "Raita Mitra Hubballi Head Office address details and map locator"
      }
    ]
  }
};

export default function Page() {
  return <ContactPage />;
}
