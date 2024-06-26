import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/src/lib/utils";
import { Providers } from "./Providers";
import { Suspense } from "react";
import { getServerUrl } from "@/src/get-server-url";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Loading from "@/app/Loading";
import { ChatProvider } from "./(customer)/users/chat/ChatContext";
import { Sidebar } from "@/src/features/sidebar/Sidebar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mate finder",
  description: "Generated by create next app",
  metadataBase: new URL(getServerUrl()),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className="h-full ">
      <body cz-shortcut-listen="true" className={cn(inter.className, 'h-full')}>
        <Suspense fallback={<Loading />}>
          <Providers>
            {children}
            <Analytics />
            <SpeedInsights />
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
