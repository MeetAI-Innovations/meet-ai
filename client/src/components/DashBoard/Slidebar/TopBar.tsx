import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/icons/logo.svg'


import MobileNav from '@/components/DashBoard/Slidebar/MobileNav';

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full  px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src={logo}
          width={32}
          height={32}
          alt="MeetAi logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          MeetAi
        </p>
      </Link>
      <div className="flex-between gap-5">
      

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;