"use client";

import Image from "next/image";
import { avatarImages } from "@/constants/AvatarData";
import { useState } from "react";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  avatarCount: number;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
}

const MeetingCard = ({
  icon,
  title,
  date,
  avatarCount,
  buttonIcon1,
  handleClick,
  buttonText = "Join meet",
}: MeetingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className={`relative flex min-h-[300px] w-full flex-col justify-between rounded-xl px-6 py-8 xl:max-w-[568px] transition-all duration-300 ${
        isHovered ? "bg-blue-500 shadow-lg" : "bg-gray-800"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={icon}
        alt="Meeting icon"
        width={28}
        height={28}
        className="absolute top-4 left-4"
      />

      <article className="flex flex-col items-center justify-center text-center gap-2 mt-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-base font-normal">{date}</p>
      </article>

      <article className="flex flex-col items-center justify-center mt-6">
        <div className="relative flex justify-center w-full">
          <div className="flex space-x-4">
            {avatarImages.slice(0, avatarCount).map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`Attendee ${index + 1}`}
                width={50}
                height={50}
                className="rounded-full"
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleClick}
          className={`mt-6 rounded-lg px-8 py-3 text-lg font-semibold transition-all duration-300 ${
            isHovered
              ? "bg-white text-blue-500 shadow-lg"
              : "bg-blue-500 text-white"
          }`}
        >
          {isHovered ? "Start meet" : buttonText}
        </button>
      </article>
    </section>
  );
};

export default MeetingCard;
