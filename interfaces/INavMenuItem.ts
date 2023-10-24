export default interface INavMenuItem {
  index: number;
  title: string;
  link: string;
  selected?: boolean;
  handleClick: (event: any, link: string) => void;
  isDropdown?: boolean;
  // handleClick: () => void;
}