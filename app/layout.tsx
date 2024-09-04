import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ree Board",
  description: "Retro board application for your team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <main id="app" className="flex flex-col" data-theme="light">
            <div className="flex-grow-1">{children}</div>
          </main>
          <SpeedInsights />
      </body>
    </html>
  );
}
