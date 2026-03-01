import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "BillingRun — NEMT Claims Automation",
  description: "Automated NEMT billing software that reclaims your cash flow. Stop manual errors and start getting paid faster.",
  keywords: ["NEMT", "claims", "billing", "medical transport", "CMS 1500", "healthcare billing"],
  authors: [{ name: "BillingRun" }],
  openGraph: {
    title: "BillingRun — NEMT Claims Automation",
    description: "Stop losing 30% of claims to denials. Automated NEMT billing that speaks every payer's language.",
    url: "https://billingrun.ashketing.com",
    siteName: "BillingRun",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BillingRun — NEMT Claims Automation",
    description: "Stop losing 30% of claims to denials. Automated NEMT billing that speaks every payer's language.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} antialiased min-h-screen bg-background`}>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
