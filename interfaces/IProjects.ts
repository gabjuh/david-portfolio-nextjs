export default interface IProjects {
  sheetId: string;
  pageTitle?: string;
  active: '1' | '0';
  id: number;
  projectTitle?: string;
  mediaType?: 'image' | 'video';
  youtubeLink?: string;
  fileName?: string;
  driveId?: string;
  imgAlt?: string;
  text?: string;
}