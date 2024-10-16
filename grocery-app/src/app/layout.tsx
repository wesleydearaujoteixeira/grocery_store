

import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import Header from "./_components/Header";
import { UpdateCartContext, UpdateCartProvider } from "./context/UpdateContext";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>

        <UpdateCartProvider>

        <Header/>
        {children}
        <Toaster />

        </UpdateCartProvider>

      </body>
    </html>
  );
}
