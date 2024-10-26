'use client';

import Image from 'next/image';
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { usePathname, useRouter } from 'next/navigation';
import { sidebarLinks } from '@/constants/index';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { useUserContext } from '@/Context/userContext';

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { token, setToken } = useUserContext();

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
    <section className="fixed top-0 left-0 h-screen bg-black p-6 pt-28 text-white hidden  sm:flex flex-col justify-between z-40 sm:w-[130px] md:w-[130px] lg:w-[264px]">
      {/* Sidebar Navigation */}
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map(({ route, imgURL, label }) => {
          const isActive = pathname === route || pathname.startsWith(`${route}/`);

          return (
            <Link
              key={label}
              href={route}
              className={cn(
                'flex items-center gap-4 p-4 rounded-lg transition-colors duration-200',
                isActive ? 'bg-blue-1' : 'hover:bg-blue-1'
              )}
            >
              <Image
                src={imgURL}
                alt={label}
                width={24}
                height={24}
                className="min-w-[24px]"
              />
              {/* Hide label on small devices */}
              <span className="text-lg font-semibold hidden lg:block">
                {label}
              </span>
            </Link>
          );
        })}
          {/* Logout Button */}
      <button
          onClick={logout}
          className="flex items-center gap-4 p-4 rounded-lg hover:bg-blue-1 transition-colors duration-200 "
        >
          <i className="fa-solid fa-arrow-right-from-bracket" style={{ fontSize: '24px' }}></i>
          <span className="text-lg font-semibold hidden lg:block">
            Logout
          </span>
        </button>
      </div>

    
      

      {/* Sidebar Footer */}
      <footer className="mt-auto pt-6 border-t border-gray-700  lg:block">
        <p className="text-sm text-gray-400">
          © 2024 MeetAi. All rights reserved.
        </p>
        <Link
          href="/terms"
          className="text-sm text-blue-500 hover:underline mt-2 block"
        >
          Terms & Conditions
        </Link>
        <Link
          href="/privacy"
          className="text-sm text-blue-500 hover:underline mt-1 block"
        >
          Privacy Policy
        </Link>
      </footer>
    </section>
  );
};

export default Sidebar;
