export default interface IConcerts {
  sheetId: string;
  pageTitle?: string;
  active?: string;
  id: string;
  title?: string;
  categoryEn?: string;
  categoryDe?: string;
  categoryHu?: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  locationLink?: string;
  band?: string;
  bandLink?: string;
  concertLink?: string;
}