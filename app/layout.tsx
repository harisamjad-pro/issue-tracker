import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer";

const interFont = localFont({
  variable: "--font-inter-sans",
  src: [
    { path: "./fonts/Inter_Thin.ttf", weight: "100" },
    { path: "./fonts/Inter_ExtraLight.ttf", weight: "200" },
    { path: "./fonts/Inter_Light.ttf", weight: "300" },
    { path: "./fonts/Inter_Regular.ttf", weight: "400" },
    { path: "./fonts/Inter_Medium.ttf", weight: "500" },
    { path: "./fonts/Inter_SemiBold.ttf", weight: "600" },
    { path: "./fonts/Inter_Bold.ttf", weight: "700" },
    { path: "./fonts/Inter_ExtraBold.ttf", weight: "800" },
    { path: "./fonts/Inter_Black.ttf", weight: "900" },
  ]
});

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "A system to track bugs and assign to other users.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interFont.variable} font-[family-name:var(--font-inter-sans)] antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
