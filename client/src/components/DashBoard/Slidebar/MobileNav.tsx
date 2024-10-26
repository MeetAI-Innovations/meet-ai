'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants/index';
import { cn } from '@/lib/utils';
import hamburger from '@/assets/icons/hamburger.svg';
import logo from '@/assets/icons/logo.svg';
import router from 'next/router';
import axios from 'axios';
import { useUserContext } from '@/Context/userContext';

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMediumOrLarger, setIsMediumOrLarger] = useState(false);
  const pathname = usePathname();
  const { token, setToken } = useUserContext();
  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false); 
        setIsMediumOrLarger(true);
      } else {
        setIsMediumOrLarger(false);
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const logout = async () => {
    const response = await axios.get('http://localhost:5000/api/v1/user/logout', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    console.log('Response: ', response.data);
    router.push('/');
  };


  return (
    <section className="w-full max-w-[264px] sm:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Image
            src={hamburger}
            width={36}
            height={36}
            alt="Hamburger Icon"
            className="cursor-pointer"
            onClick={toggleSidebar}
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className={cn("border-none", {
            "bg-dark-1": isOpen || isMediumOrLarger, 
          })}
        >
          <Link href="/" className="flex items-center gap-2 p-4">
            <Image
              src={logo}
              width={32}
              height={32}
              alt="MeetAi Logo"
            />
            <p className="text-[26px] font-extrabold text-white">MeetAi</p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto pt-4">
            <section className="flex h-full flex-col gap-6 text-white">
              {sidebarLinks.map(({ route, imgURL, label }) => {
                const isActive = pathname === route || pathname.startsWith(`${route}/`);

                return (
                  <SheetClose asChild key={route}>
                    <Link
                      href={route}
                      className={cn(
                        'flex gap-4 items-center p-4 rounded-lg w-full transition-colors duration-200',
                        {
                          'bg-blue-1': isActive,
                          'hover:bg-blue-1': !isActive,
                        }
                      )}
                    >
                      <Image
                        src={imgURL}
                        alt={label}
                        width={20}
                        height={20}
                      />
                      <p className="font-semibold">{label}</p>
                    </Link>
                  </SheetClose>
                );
              })}
            </section>

            <section className='py-4'>
              <button
              onClick={logout}
                className="flex gap-4 items-center p-4 rounded-lg w-full text-white transition-colors duration-200"
              >
                <i className="fa-solid fa-arrow-right-from-bracket" style={{ fontSize: '24px' }}></i>
                <p className="font-semibold">Logout</p>
              </button>
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileSidebar;
