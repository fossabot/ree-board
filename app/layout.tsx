import type { Metadata } from "next";
import dynamic from "next/dynamic";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ree Board",
  description: "Retro board application for your team",
};

const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights)
);

const VercelToolbar = dynamic(
  () => import("@vercel/toolbar/next").then((mod) => mod.VercelToolbar)
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shouldInjectToolbar = process.env.NODE_ENV === "development";
  return (
    <html lang="en">
      <body>
        <main id="app">
          {children}
          {shouldInjectToolbar && <VercelToolbar />}
        </main>
        <SpeedInsights />
      </body>
    </html>
  );
}
