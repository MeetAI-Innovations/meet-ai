import React from 'react';
import { BentoGrid, BentoGridItem, gridItems } from '@/components/LandingPage/ui/bento-grid';
import { cn } from '@/lib/utils';

function Aboutdemo() {
  return (
    <section id="about" className="mb-3 md:mb-5 lg:mb-8 p-4 lg:p-8 md:p-6">
      <BentoGrid className="mb-20"> 
        {gridItems.map(({ id, title, description, content, subContent, link, button, className, img, imgClassName }) => (
          <BentoGridItem
            id={id}
            key={id}
            title={title}
            description={description}
            content={content}
            subContent={subContent}
            link={link}
            button={button}
            className={className}
            img={img}
            imgClassName={imgClassName}
          />
        ))}
      </BentoGrid>
      {/* <div className="flex justify-center mt-8 lg:mt-16">
        <button className="relative flex items-center justify-center font-semibold whitespace-nowrap leading-none transition duration-200 ease-in-out focus:outline-none text-sm px-4 py-2 rounded-lg bg-primary-gradient text-white hover:text-white/80 hover:shadow-md hover:shadow-brand-purple-500/80">
          <span>Sign up</span>
        </button>
      </div> */}
    </section>
  );
}

export default Aboutdemo;
