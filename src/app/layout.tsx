import "@/styles/globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { type Metadata } from "next";
import { type ReactNode } from "react";
import { z } from "zod";

import { SITE_TITLE } from "@/constants";

import { ViewportFixed } from "./_layouts/viewport-fixed";

export const metadata: Metadata = {
  title: SITE_TITLE,
  formatDetection: { email: false, address: false, telephone: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" dir="ltr">
      <ViewportFixed minWidth={360} />
      <body className="font-sans">{children}</body>
      <GoogleAnalytics
        gaId={z.string().min(1).parse(process.env.NEXT_PUBLIC_GA_ID)}
      />
    </html>
  );
}
