import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Magna Partners",
  description:
    "Magna Partners was established in 2024 as a collectively developed network of organizations and communities that focused on solving the problems of youths: high schoolers, college students, and young professionals, with various types of products and services.",
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
