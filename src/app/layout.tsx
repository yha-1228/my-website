import "@/styles/globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { type ReactNode } from "react";
import { z } from "zod";

import { SITE_TITLE } from "@/constants";
import { cn } from "@/utils/styling";

import { Footer } from "./_layouts/footer";
import { Header } from "./_layouts/header";
import { MainArea } from "./_layouts/main-area";

export const metadata: Metadata = {
  title: { template: `${SITE_TITLE} | %s`, default: SITE_TITLE },
  formatDetection: { email: false, address: false, telephone: false },
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" dir="ltr">
      <body className={cn(inter.variable, "body-vars")}>
        <div className="font-base flex min-h-dvh flex-col">
          <Header />
          <MainArea>{children}</MainArea>
          <Footer className="mt-auto" />
        </div>
      </body>
      <GoogleAnalytics
        gaId={z.string().min(1).parse(process.env.NEXT_PUBLIC_GA_ID)}
      />
    </html>
  );
}
