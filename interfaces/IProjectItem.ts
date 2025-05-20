export default interface IProjectItem {
  title?: string;
  mediaType?: 'image' | 'video' | string;
  youtubeId?: string;
  videoId?: string;
  driveId?: string;
  sliderId?: string;
  imgUrl?: string;
  imgAlt?: string;
  fileName?: string;
  imgId?: string;
  imgDimension?: string;
  loaded?: boolean;
  text?: string;
  // children: React.ReactNode;
}