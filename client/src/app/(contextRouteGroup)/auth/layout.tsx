import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css"
import { UserContextProvider } from "@/Context/userContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MeetAi",
  description: "AI powered meeting",
};

export default function RootLayout({
  children ,
}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
       
            <body className={inter.className}>
            {children}
            </body>
            
    </html>
  );
}
