"use client";
import React from 'react';
import { TypewriterEffect } from '../ui/typewriter-effect';
import { Button } from '../ui/moving-border';
import Link from 'next/link';
import Image from 'next/image';
import image from '@/assets/vrkK9OuCTWyvpqoQIp4V_w.jpeg';
import bgcimage from '@/assets/temp-hero.png';
import { BottomLine, Gradient } from '../Design/Hero';
import { ScrollParallax } from 'react-just-parallax';

function HeroSection() {
  const words = [
    { text: "Unlock" },
    { text: "Boundless" },
    { text: "Connections" },
    { text: "with" },
    { text: "Meet Ai", className: "text-blue-500" }, // Blue color for 'Meet Ai'
  ];

  return (
    <div className="pt-[6rem] lg:pt-[4rem] xl:pt-[11rem] px-4 lg:px-8 xl:px-12 shadow-top" id="hero">
      <div className="container relative mx-auto max-w-screen-lg"> {/* Adjusted container */}
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[4rem] md:mb-20 lg:mb-[6rem] px-4"> {/* Added px-4 */}
          <TypewriterEffect words={words} className="h1 text-white text-2xl md:text-3xl lg:text-3xl" />
          <p className="max-w-3xl mx-auto mt-4 mb-6 text-white text-base md:text-lg lg:text-xl xl:text-2xl">
            MeetAi makes it easy to connect with people, no matter how far apart you are. Whether it's chatting with friends, working with colleagues, or sharing special moments with family.
          </p>
          <div className="mt-6">
            <Link href={'/courses'}>
              <Button className="bg-slateblue-200 text-white border border-darkslateblue-300 hover:bg-slateblue-300 hover:border-darkslateblue-400 py-2 px-4 rounded-md flex items-center justify-center">
                Get Started for free
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative max-w-6xl max-h-4xl mx-auto">

          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient ">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.7rem] bg-n-10 rounded-t-[0.9rem]" />
              <div className="aspect-w-26 aspect-h-15 rounded-b-xl overflow-hidden">

                <Image 
                  src={image} 
                  alt="Meet" 
                  objectFit="cover" 
                  className="rounded-[1rem] w-full h-auto" 
                  width={1700}  // Adjusted width
                  height={1000}  // Adjusted height
                />
                <ScrollParallax isAbsolutelyPositioned>
                  <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex"></ul>
                </ScrollParallax>
              </div>
            </div>
            <Gradient />
          </div>
          <div className="absolute -top-1/2 left-1/2 w-[204%] opacity-5 lg:w-[170%] -translate-x-1/2 md:-top-1/3 md:w-[109%] lg:-top-1/5 lg:pt-24 md:pt-14">

            <Image 
              src={bgcimage} 
              alt="hero" 
              objectFit="cover" 
              className="rounded-[1rem] w-full h-auto max-w-full shadow-lg"  // Added shadow-lg
              width={7440}
              height={4800}
            />
          </div>
        </div>
      </div>
      <BottomLine />
    </div>
  );
}

export default HeroSection;
