import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
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
  const shouldInjectToolbar = process.env.NODE_ENV === "development";
  return (
    <html lang="en">
      <body>
        <main id="app" className="flex flex-col" data-theme="light">
          <div className="flex-grow-1">{children}</div>
          {shouldInjectToolbar && <VercelToolbar />}
        </main>
        <SpeedInsights />
      </body>
    </html>
  );
}
