export default interface IVideos {
  sheetId: string;
  pageTitle: string;
  active: string;
  id: number;
  youtubeId: string;
  title: string;
  band?: string;
  bandLink?: string;
  fileName: string;
  description?: string;
  quality?: 'low' | undefined;
}