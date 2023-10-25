export default interface IEventItem {
  title?: string;
  category?: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
  location?: string;
  locationLink?: string;
  band?: string;
  bandLink?: string;
  article?: string;
  articleLink?: string;
  isPast?: boolean;
}