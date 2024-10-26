"use client";
import React, { useState } from "react";

import EditProfile from "@/components/DashBoard/EditProfile/EditProfile";

function Home() {
  return (
    <section className="flex size-full flex-col gap-5 text-white h-full">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <EditProfile />
      </div>
    </section>
  );
}

export default Home;
