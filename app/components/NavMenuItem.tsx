import INavMenuItem from "@/interfaces/INavMenuItem";
import Link from "next/link";

const NavMenuItem: React.FC<INavMenuItem> = ({
  index,
  title,
  link,
  selected,
  isDropdown,
  handleMenuItemClick
}) => {

  return (
    <li className={isDropdown && selected ? `bg-secondary` : ''}>
      <Link
        href={"/" + link}
        className={`menuButton ${selected ? 'bg-secondary text-white focus:text-white !focus:gb-secondary ' : 'text-gray-700'}`}
        id={link}
        onClick={handleMenuItemClick}
      >
        {title}
      </Link>
    </li>
  );
};

export default NavMenuItem;