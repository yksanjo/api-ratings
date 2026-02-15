import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "API Ratings - Rate & Review APIs",
  description: "Community-driven ratings and reviews for APIs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
