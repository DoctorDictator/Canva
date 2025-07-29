import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { MobileRestriction } from "@/components/mobileRestriction";

import { auth } from "@/auth";

import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Canva",
  description: "A web-based graphic design application inspired by Canva, offering template customization, text and shape manipulation, and image editing with a focus on modularity, performance, and scalability.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <MobileRestriction>
            <Providers>
              <Toaster />

              {children}
            </Providers>
          </MobileRestriction>
        </body>
      </html>
    </SessionProvider>
  );
}
