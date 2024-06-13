import clsx from "clsx";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const inter = Raleway({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Elevator Generator",
  description: "workshop-useState-elevator-generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={clsx(inter.className, "h-full")}>{children}</body>
    </html>
  );
}
