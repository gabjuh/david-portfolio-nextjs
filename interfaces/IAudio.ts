export default interface IAudio {
  sheetId?: string;
  pageTitle?: string;
  domain: string;
  active: '1' | '0';
  id: number;
  fileName?: string;
  folderName?: string;
  title?: string;
  label?: string;
  band?: string;
  bandLink?: string;
  description?: string;
  year?: string;
}