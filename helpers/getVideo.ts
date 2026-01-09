import IVideos from '@/interfaces/IVideos';

export interface IVideoDataJoined {
  active: string;
  category: string;
  youtubeLink: string;
  creditName: string;
  creditYear: string;
  creditUrl: string;
}

export function getVideoLinkFromVideoCollection(
  videos: IVideos[], 
  videoId?: string
): IVideoDataJoined {
  videos.find((v: IVideos) => v.videoId === videoId)?.youtubeLink ?? '';

  const videoItem = videos.find((v: IVideos) => v.videoId === videoId);

  const {
    active = '0',
    category = '',
    youtubeLink = '',
    creditName = '',
    creditYear = '',
    creditUrl = '',
  } = videoItem || {};

  const output = {
    active: videoItem?.active || active,
    category: videoItem?.category || category,
    youtubeLink: videoItem?.youtubeLink || youtubeLink,
    creditName: videoItem?.creditName || creditName,
    creditYear: videoItem?.creditYear || creditYear,
    creditUrl: videoItem?.creditUrl || creditUrl,
  }

  return output;
}
  