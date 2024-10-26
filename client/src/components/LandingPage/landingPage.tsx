"use client";

import { useState, useEffect } from 'react';
import {
  Navbar,
  Button,
  HeroSection,
  FeaturedSection,
  FeaturedTitle,
  Footer,
  Heading,
  Review,
  HoverEffect,
  Copyright,
} from '../index';
import { hoverItems } from '../../constants/hoverItems';
import Grid from './Featured/Grid';

import MeetCandidatesPage from '@/components/Solution/temp'
import MeetaiHeroSection from '../Solution/MeetingHero';
import MeetingSummary from '../Solution/MeetSummary';
import Team from '../Solution/team';
import ProfileEdit from '../Solution/Profile';
export default function LandingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
 
      await new Promise(resolve => setTimeout(resolve, 4000)); 
      setLoading(false);
    };

    loadContent();

  
    setTimeout(() => {
      const loader = document.querySelector('.loader-container');
      if (loader && loader instanceof HTMLElement) {
        loader.style.top = "-100%";
      }
    }, 4000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader-container">
         
          <h1 className="head fy">MeetAi</h1>
          <h1 className="head sy">AI-Powered</h1>
          <h1 className="head ty">Meeting</h1>
          <h1 className="head ffy">Platform</h1>
        </div>
      ) : (
        <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
          {/* Navbar */}
          <Navbar />

          {/* Hero Section */}
          <HeroSection />

          {/* Featured Title */}
          <FeaturedTitle />

          {/* Grid Section */}
          <Grid />

          {/* Heading Section */}
          <Heading />

          {/* Featured Section */}
          <FeaturedSection />

          {/* Review Section */}
          <Review />

          {/* Hover Effect Section */}
          <HoverEffect items={hoverItems} />

          {/* Footer */}
          <Footer />

          {/* Copyright Section */}
          <Copyright />
          {/* <MeetCandidatesPage></MeetCandidatesPage>
          <MeetaiHeroSection></MeetaiHeroSection> */}
       <Team></Team>
       <ProfileEdit></ProfileEdit>
        </div>
      )}
    </>
  );
}
