import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Sidebar from "@/components/DashBoard/Slidebar/SlideBar2";
import Navbar from "@/components/DashBoard/Slidebar/TopBar";
import { UserContextProvider } from "@/Context/userContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MeetAi",
  description: "AI powered meeting",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      
        <body className={inter.className}>
          {/* Header containing the Navbar */}
          <header>
            <Navbar />
          </header>
          <div className="flex h-screen ">
            <aside className="h-full">
              <Sidebar />
            </aside>
            <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-20 lg:pt-6 md:pt-15 max-md:pb-14 sm:px-14">
              <div className="w-full">{children}</div>
            </section>
          </div>
        </body>
      
    </html>
  );
}
