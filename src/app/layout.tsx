import type { Metadata } from "next";
import "swiper/css";
import "swiper/css/navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Magna Partners",
  description:
    "Magna Partners empowers youth through mentorship, skill development, and career guidance, fostering leadership, entrepreneurship, and career growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
