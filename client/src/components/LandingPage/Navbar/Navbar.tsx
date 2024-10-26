import React, { useEffect, useState } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import Image from "next/image";
import Link from "next/link";
import meetai from "@/assets/meetai.jpg";
import { navigation } from "@/constants/navigationItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faCaretDown,
  faCaretUp,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUser } from "@/redux/slices/authSlice";

function Navbar() {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  // Fetch user information on component mount
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const [openNavigation, setOpenNavigation] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleNavigation = () => {
    setOpenNavigation((prev) => !prev);
    if (!openNavigation) {
      disablePageScroll();
    } else {
      enablePageScroll();
    }
  };

  const handleDropdownToggle = (event: React.MouseEvent) => {
    event.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    console.log(option);
    if (option === "Logout") {
      // Add your logout functionality here
    }
    setDropdownOpen(false);
  };

  return (
    <div className="relative">
      <div
        className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 transition-all duration-300 ${
          openNavigation ? "bg-black/50" : "bg-black/90 backdrop-blur-sm"
        }`}
      >
        <div className="flex items-center px-4 lg:px-3 xl:px-6 ">
          <Link href="#hero" className="block w-[12rem] xl:mr-8">
            <Image src={meetai} alt="Logo Meet" width={190} height={48} />
          </Link>

          {/* Navigation for Larger Devices */}
          <div className="hidden lg:flex flex-grow justify-center space-x-8">
            {navigation.map(
              (item) =>
                !item.onlyMobile && (
                  <Link
                    key={item.id}
                    href={item.url}
                    className="relative text-[25px] uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-6 md:py-8 lg:text-sm lg:font-semibold font-roboto font-normal"
                  >
                    {item.title}
                  </Link>
                )
            )}
          </div>

          {/* Buttons for Larger Devices */}
          <div className="lg:flex items-center space-x-4 ml-auto hidden relative">
            {user ? (
              <Box position="relative">
                <Box display="flex" alignItems="center">
                  <Avatar
                    src={
                      user?.avatar ||
                      "https://www.w3schools.com/howto/img_avatar.png"
                    }
                  />
                  <Typography sx={{ ml: 1 }}>
                    {user?.userName || "User"}
                  </Typography>
                  <IconButton onClick={handleDropdownToggle}>
                    <FontAwesomeIcon
                      color="white"
                      icon={isDropdownOpen ? faCaretUp : faCaretDown}
                    />
                  </IconButton>
                </Box>

                {isDropdownOpen && (
                  <Box
                    sx={{
                      marginTop: "0.5rem",
                      position: "absolute",
                      top: "100%",
                      right: 0,
                      bgcolor: "#313131",
                      boxShadow: 1,
                      borderRadius: 1,
                      zIndex: 999,
                      padding: "0.5rem"
                    }}
                  >
                    <Link
                      href="profile"
                      className="block px-4 py-2 rounded-md hover:bg-[#434244]"
                      onClick={() => {
                        setDropdownOpen(false);
                        toggleNavigation();
                      }}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/auth/logout"
                      className="block px-4 py-2 rounded-md hover:bg-[#434244]"
                      onClick={() => {
                        setDropdownOpen(false);
                      }}
                    >
                      Logout
                    </Link>
                    <Link
                      href="/user/dashboard"
                      className="block px-4 py-2 rounded-md hover:bg-[#434244]"
                      onClick={() => {
                        setDropdownOpen(false);
                      }}
                    >
                      Dashboard
                    </Link>
                  </Box>
                )}
              </Box>
            ) : (
              <>
                <Link
                  href="auth/register"
                  className="button text-n-1/50 transition-colors hover:text-n-1"
                >
                  Sign up
                </Link>
                <Link
                  href="auth/login"
                  className="font-semibold whitespace-nowrap leading-none transition duration-300 ease-in-out text-sm px-6 py-3 rounded-lg bg-primary-gradient text-white hover:text-white/80 hover:shadow-md hover:shadow-brand-purple-500/80 flex items-center space-x-2"
                >
                  <span>Sign in</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.366 17.648a1.2 1.2 0 0 1 0-1.696L12.318 12 8.366 8.048a1.2 1.2 0 1 1 1.697-1.696l4.8 4.8a1.2 1.2 0 0 1 0 1.696l-4.8 4.8a1.2 1.2 0 0 1-1.697 0Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </Link>
              </>
            )}
          </div>

          <button
            aria-label="Toggle Navigation"
            className="ml-auto lg:hidden px-3 relative z-10"
            onClick={toggleNavigation}
          >
            <FontAwesomeIcon
              icon={openNavigation ? faTimes : faBars}
              className="text-gray-600 transition-transform duration-300"
            />
          </button>
        </div>
      </div>

      {/* Overlay and Menu */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          openNavigation
            ? "opacity-100 md:opacity-0"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {openNavigation && (
          <div
            className="absolute inset-0 bg-black/80"
            onClick={toggleNavigation}
          ></div>
        )}
        <nav
          className={`fixed top-0 left-0 right-0 bottom-0 bg-black/80 flex flex-col items-center justify-center transition-transform duration-500 ease-in-out ${
            openNavigation ? "translate-x-0" : "translate-x-full"
          } z-50 md:hidden`}
        >
          <div className="flex flex-col items-center mt-4">
            {navigation.map(
              (item) =>
                !item.onlyMobile && (
                  <Link
                    key={item.id}
                    href={item.url}
                    onClick={toggleNavigation}
                    className={`block text-[16px] uppercase text-n-1 transition-colors hover:text-color-1 ${
                      item.onlyMobile ? "lg:hidden" : ""
                    } px-6 py-6 md:py-8 font-roboto font-normal`}
                  >
                    {item.title}
                  </Link>
                )
            )}

            {user ? (
              <>
                <Link
                  href="user/dashboard"
                  onClick={toggleNavigation}
                  className="text-[16px] uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-6 md:py-8 font-roboto font-normal flex items-center justify-between"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    // Add your logout functionality here
                    console.log("Logout clicked");
                    // For example, call an action to log out the user
                    // dispatch(logoutUser());
                  }}
                  className="text-[16px] uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-6 md:py-8 font-roboto font-normal flex items-center justify-between"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="auth/register"
                  className="text-xl uppercase text-n-1 transition-colors hover:text-color-1 py-6"
                >
                  Sign up
                </Link>
                <Link
                  href="auth/login"
                  className="text-xl uppercase bg-primary-gradient text-white px-6 py-3 rounded-lg hover:text-white/80"
                >
                  Sign in
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
