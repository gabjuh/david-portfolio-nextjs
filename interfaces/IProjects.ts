export default interface IProjects {
  sheetId: string;
  pageTitle?: string;
  active: '1' | '0';
  id: number;
  projectTitle?: string;
  mediaType?: 'image' | 'video';
  youtubeId?: string;
  driveId?: string;
  imgAlt?: string;
  text?: string;
}