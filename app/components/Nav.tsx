'use client';

import React, { useState, useEffect, useContext, MouseEventHandler } from "react";
import INav from "@/interfaces/INav";
import NavMenuItem from "./NavMenuItem";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import scrollToId from "@/helpers/scrollToId";
import Envelope from "@/assets/icos/Envelope";

const Nav: React.FC<INav> = ({ data: [menu, settingsArr] }) => {

  const settings = settingsArr[0];

  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);

  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('');

  const router = useRouter();

  const pathname = usePathname();

  const handleClick = (event: any, link: string) => {
    event.preventDefault();

    // If we are in another page than the home page, we need to navigate to the home page first
    if (pathname !== '/') {
      router.push('/');
      // const interval = setTimeout(() => {
      scrollToId(link);
      // }, 400);
      // return () => clearInterval(interval);
    } else {
      scrollToId(link);
    }

    setSelectedMenuItem(link);
  };

  const handleMouseLeave = (event: any) => {
    handleHideMenu();
  };

  const handleHideMenu = () => {
    document.getElementById("dropdown-menu-details")?.removeAttribute("open");
  }

  return (
    <>
    <div className="navbar bg-base-100 shadow-xl z-[1500] sticky top-0 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            {/* Dropdown menu */}
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              {menu.map((item, index) => (
                <NavMenuItem
                  key={index}
                  index={index}
                  title={item.titleDe}
                  link={item.link}
                  selected={selectedMenuItem === item.link}
                  handleClick={handleClick}
                />
              ))}
            </ul>
          </div>
          <div className="flex-1 whitespace-nowrap">
            {/* Logo/Title */}
            <Link
              href="/"
              className="btn btn-ghost normal-case text-xl"
              // onClick={() => handleClick(-1)}
            >{settings.homepageTitle}</Link>
          </div>
        </div>
        <div className="hidden lg:flex">
          {/* Horisontal menu */}
          <ul className="menu menu-horizontal px-1">
            {menu.map((item, index) => (
              <NavMenuItem
                key={index}
                index={index}
                title={item.titleDe}
                link={item.link}
                selected={selectedMenuItem === item.link}
                handleClick={handleClick}
              />
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          <div className={`md:tooltip md:tooltip-sm mx-0 ${isTooltipOpen ? `md:tooltip-open` : ''} md:tooltip-left`} data-tip={settings.emailTooltipTextDe}>
          <a href={`mailto:${settings.email}`} className="btn btn-secondary text-white">@</a>
          </div>
        </div>
      </div>     
    </>
  );
};

export default Nav;