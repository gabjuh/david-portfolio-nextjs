'use client'

import INavMenuItem from "@/interfaces/INavMenuItem";
import Link from "next/link";

const NavMenuItem: React.FC<INavMenuItem> = ({
  index,
  title,
  link,
  selected,
  handleClick,
  isDropdown
}) => {
  return (
    <li className={isDropdown && selected ? `bg-secondary` : ''}>
      <Link
        href={link}
        className={`block hover:bg-base-200 focus:bg-secondary ${selected ? 'bg-secondary text-white focus:text-white active:text-white' : 'text-gray-700'}`}
        onClick={(e) => handleClick(e, link)}
      >
        {title}
      </Link>
    </li>
  );
};

export default NavMenuItem;