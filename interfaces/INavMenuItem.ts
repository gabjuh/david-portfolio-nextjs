export default interface INavMenuItem {
  index: number;
  title: string;
  link: string;
  selected?: boolean;
  isDropdown?: boolean;
  handleMenuItemClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}