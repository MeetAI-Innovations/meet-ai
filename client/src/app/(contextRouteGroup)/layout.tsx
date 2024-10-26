import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "../../styles/globals.css";
import { UserContextProvider } from "@/Context/userContext";
import { Providers } from "../providers";
import ClientProvider from "../ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MeetAi",
  description: "AI powered meeting",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" >
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/jpg" href="/assets/logo_meet.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <UserContextProvider>
        <Providers>
          <ClientProvider>
            <body className={inter.className}>{children}</body>
          </ClientProvider>
        </Providers>
      </UserContextProvider>
    </html>
  );
}
