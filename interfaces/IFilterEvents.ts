export default interface IFilterEvents {
  eventTypes?: string[];
  selectedType: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTimeBlock: React.Dispatch<React.SetStateAction<string>>;
  selectedTimeBlock: string;
  nrOfTimeBlockEvents: number[];
}