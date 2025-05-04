import IVideos from '@/interfaces/IVideos';

export const getVideoLinkFromVideoCollection = (videos: IVideos[], videoId?: string) => 
  videos?.find((v: IVideos) => v.videoId === videoId)?.youtubeLink ?? '';