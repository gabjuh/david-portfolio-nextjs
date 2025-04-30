export default interface IProjectItem {
  title?: string;
  mediaType?: 'image' | 'video' | string;
  youtubeId?: string;
  driveId?: string;
  fileName?: string;
  imgAlt?: string;
  imgDimension?: string;
  loaded?: boolean;
  text?: string;
  // children: React.ReactNode;
}