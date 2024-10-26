'use client';

import Image from 'next/image';
import hero from '@/assets/hero-back.png';

interface HomeCardProps {
  img: any;
  title: string;
  description: string;
  iconbg: string;
  iconColor: string;
  handleClick?: () => void;
}

const HomeCard = ({ img, title, description, iconbg, iconColor, handleClick }: HomeCardProps) => {
  return (
    <div
      className="bg-cover px-4 py-6 flex flex-col justify-between w-full xl:max-w-[300px] min-h-[180px] rounded-[14px] cursor-pointer max-md:px-5 max-md:py-8"
      onClick={handleClick}
      style={{ backgroundImage: `url(${hero.src})` }}
    >
      <div
        className="flex items-center glassmorphism1 justify-center w-12 h-12 rounded-md"
        style={{ backgroundColor: iconbg, color: iconColor }}
      >
        <Image src={img} alt="icon" width={24} height={24} />
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-2xl font-bold text-white-100/0.5">{title}</h4>
        <p className="text-base font-bold text-sky-200">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
