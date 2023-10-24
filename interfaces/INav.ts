import IMenu from './IMenu';
import ISettings from './ISettings';

export default interface INav {
  data: [
    IMenu[],
    ISettings[]
  ]
}

// menuItems: IMenuItem[];
// selected: number;
// handleClick: (index: number) => void;
// homepageTitle?: string;
// email?: string;
// emailTooltipText?: string;
// darkTheme?: string;
// lightTheme?: string;