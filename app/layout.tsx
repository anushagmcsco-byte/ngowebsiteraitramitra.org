import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Raita Mitra Social Trust (R) | Empowering Farmers & Rural Communities',
  description: 'Registered non-profit public charitable trust in Hubballi, Karnataka dedicated to the empowerment of farmers, rural youth, and women.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-stone-50/50 text-stone-800" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
