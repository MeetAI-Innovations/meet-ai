"use client";

import React, { Suspense, lazy } from "react";
import '../../styles/globals.css';
import Loading from "@/app/(main)/loading"

const LandingPage = lazy(() => import('@/components/LandingPage/landingPage'));
const HomePage = lazy(() => import('@/components/DashBoard/Homepage/HomePage'));

function Home() {
  return (
    <main className="bg-dark-1">
      <Suspense fallback={<Loading></Loading>}>
        <LandingPage />
        
      </Suspense>
    </main>
  );
}

export default Home;
