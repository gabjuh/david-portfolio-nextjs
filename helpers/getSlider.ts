import { ISlide } from '@/app/components/MediaSlider';
import IData from '@/interfaces/IData';
import ISliders from '@/interfaces/ISlider';

export interface ISliderData {
  slides: ISlide[];
  found: boolean;
}

/**
 * Get slider data by slider ID from the main data object
 * @param data - Main data object containing sliders, images, and videos
 * @param sliderId - The ID of the slider to find
 * @returns Object containing slides array and found status
 */
export function getSliderDataFromSliderCollection(
  data: IData,
  sliderId: string
): ISliderData {

  // Find the slider by ID
  const slider: ISliders | undefined = data.sliders.find(
    (slider) => slider.sliderId === sliderId && slider.active === '1'
  );

  if (!slider) {
    return {
      slides: [],
      found: false
    };
  }

  const slides: ISlide[] = [];

  // Process images if they exist
  if (slider.images && slider.images.trim() !== '') {
    const imageIds = slider.images.split(',').map(id => id.trim());

    imageIds.forEach(imageId => {
      const image = data.images.find(img => img.imgId === imageId);
      if (image) {
        slides.push({
          type: 'image',
          src: [image.fileName, image.alt || ''],
          orientation: image.orientation || 'landscape',
          portraitVerticalFocus: image.portraitVerticalFocus,
          portraitAspect: image.portraitAspect
        });
      }
    });
  }

  // Process videos if they exist
  if (slider.videos && slider.videos.trim() !== '') {
    const videoIds = slider.videos.split(',').map(id => id.trim());

    videoIds.forEach(videoId => {
      const video = data.videos.find(vid => vid.sheetId === videoId);
      if (video) {
        slides.push({
          type: 'video',
          src: [video.youtubeId, video.title || '']
        });
      }
    });
  }

  return {
    slides,
    found: true
  };
}

export default getSliderDataFromSliderCollection;