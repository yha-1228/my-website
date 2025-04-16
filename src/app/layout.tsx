import "@/styles/globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { type ReactNode } from "react";

import { Footer } from "@/components/layouts/footer";
import { Header } from "@/components/layouts/header";
import { MainArea } from "@/components/layouts/main-area";
import { SITE_TITLE } from "@/constants";

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
      <body className={inter.variable}>
        <div className="flex min-h-dvh flex-col">
          <Header />
          <MainArea>{children}</MainArea>
          <Footer className="mt-auto" />
        </div>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
    </html>
  );
}
