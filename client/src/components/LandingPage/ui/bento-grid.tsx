import React from 'react';
import { cn } from '@/lib/utils';
import Image, { StaticImageData } from 'next/image';
import b9 from '@/assets/b9.png';
import item1 from '@/assets/item-1.png';
import item3 from '@/assets/item3.jpeg';
import item4 from '@/assets/item4-temp.jpeg';
import item5 from '@/assets/item-6.jpeg';

// BentoGrid Component
export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  id,
  title,
  description,
  content,
  subContent,
  link,
  button,
  img,
  imgClassName,
  className,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  content?: string | React.ReactNode;
  subContent?: string | React.ReactNode;
  link?: string | React.ReactNode;
  button?: string | React.ReactNode;
  img?: StaticImageData | string;
  imgClassName?: string;
  id?: number;
}) => {
  const imageUrl = typeof img === 'string' ? img : img?.src;
  const isBackgroundImage = id === 1 || id === 2;

  // Conditional styling for background color and image visibility
  const backgroundColorClasses = id === 1
    ? "bg-blue-500" // Example color for item 1
    : id === 2
    ? "bg-green-500" // Example color for item 2
    : "";
  
  const itemSizeClasses = id === 3 || id === 4 || id === 5
    ? "md:col-span-4 md:h-[24rem] p-4 sm:p-6" // Medium device sizes
    : "md:col-span-6 p-4 sm:p-6"; // Medium device sizes
  
  return (
    <div
      className={cn(
        `relative overflow-hidden rounded-2xl flex flex-col items-center justify-center shadow-lg border border-white/[0.6] group transition-transform duration-300 transform hover:scale-105 ${itemSizeClasses}`,
        isBackgroundImage ? backgroundColorClasses : "bg-gray-800",
        className
      )}
      style={
        !isBackgroundImage
          ? {}
          : { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
      }
    >
      {/* Conditionally render image if not using a background image */}
      {!isBackgroundImage && img && (
        <div className="relative overflow-hidden w-full h-full mb-4">
          <img
            src={imageUrl}
            className={cn(
              "object-cover w-full h-full transition-transform duration-300 rounded-lg",
              imgClassName
            )}
            alt="Grid Item"
          />
        </div>
      )}

      {/* Content container */}
      <div className="flex flex-col justify-center text-center">
        <h2 className="text-white font-bold text-lg mb-2">{title}</h2>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        {content && (
          <div className="p-4 bg-gray-700 rounded-lg mb-4">
            <h3 className="font-semibold text-white mb-1">{content}</h3>
            {subContent && <p className="text-gray-300 text-xs">{subContent}</p>}
          </div>
        )}
        {button && link && (
          <a href={link as string} className="bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block">
            {button}
          </a>
        )}
      </div>
    </div>
  );
};

// Grid Items Data
export const gridItems = [
  {
    id: 1,
    title: "Easy to create meetings and invite people",
    description: "Our platform makes it a breeze to set up meetings and invite participants.",
    content: "Create link meetings",
    subContent: "We re-engineered the service we built for secure business meetings, MeetAi to make it free and available for all",
    button: "Join meet",
    link: "https://room.me/qwe-r1-2zx",
    className: "col-span-1 md:col-span-6", // Default col-span-1 for small screens
    imgClassName: "w-full h-full object-cover",
    img: b9, // Use imported StaticImageData
  },
  {
    id: 2,
    title: "Collaboration with AI Meeting Notes, to make your easily",
    description: "No more taking detailed notes during meetings – our AI system does it for you.",
    content: "Summary",
    subContent: "The kickoff meeting for the Aerebook Redesign Landing Page project aimed to outline the key objectives and strategies for revamping the existing landing page. The primary focus is on enhancing user experience, improving visual aesthetics, and optimizing the landing page for",
    button: "",
    link: "",
    className: "col-span-1 md:col-span-6", // Default col-span-1 for small screens
    imgClassName: "w-full h-full object-cover",
    img: item1, // Use imported StaticImageData
  },
  {
    id: 3,
    title: "Grouping & Personal to make your privacy safe",
    description: "Our system offers both grouping and personalization features to ensure your privacy is safeguarded.",
    content: "Group",
    subContent: "",
    button: "",
    link: "",
    className: "col-span-1 md:col-span-4 lg:h-[80%]", // Default col-span-1 for small screens
    imgClassName: "w-full h-full",
    img: item3,
  },
  {
    id: 4,
    title: "Invite your team/people to join meetings",
    description: "Our platform simplifies the process of inviting your team or other participants to your meetings.",
    content: "Invite team/people",
    subContent: "",
    button: "Join meet",
    link: "",
    className: "col-span-1 md:col-span-4 lg:h-[80%]", // Default col-span-1 for small screens
    imgClassName: "w-full h-full",
    img: item4,
  },
  {
    id: 5,
    title: "Record your meeting easily and repeat that!",
    description: "Our tool makes it easy to record your meetings and play them back whenever you need to.",
    content: "Recorded",
    subContent: "",
    button: "",
    link: "",
    className: "col-span-1 md:col-span-4 lg:h-[80%]", // Default col-span-1 for small screens
    imgClassName: "w-full h-full",
    img: item5,
  },
];
