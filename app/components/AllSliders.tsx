import IData from '@/interfaces/IData';
import IImagesData from '@/interfaces/IImagesData';

import { getImageDataFromImageCollection } from '../../helpers/getimage';
import MediaSlider, { ISlide } from './MediaSlider';

const AllSliders = ({
  data,
  imagesData
}: {
  data: IData;
  imagesData: IImagesData[];
}) => {

  const { images = [], videos = [], sliders = [] } = data;

  return (
    <div className="space-y-10">
      {sliders
        .filter(slider => slider.active === '1')
        .map(slider => {
          const slideArray: ISlide[] = [];

          // ---- Images ----
          const imgIds = slider.images ? slider.images.split(',').map(s => s.trim()) : [];
          imgIds.forEach(imgId => {
            const image = images.find(img => img.imgId === imgId && img.active === '1');
            if (image) {
              // USE imagesData here:
              const [src, alt, orientation, portraitVerticalFocus, portraitAspect] = getImageDataFromImageCollection(data, imgId, imagesData);

              slideArray.push({
                type: 'image',
                src: [src, alt],
                orientation: orientation || 'landscape', // fallback
                portraitVerticalFocus: portraitVerticalFocus,
                portraitAspect: portraitAspect
              });
            }
          });

          // ---- Videos ----
          const videoIds = slider.videos ? slider.videos.split(',').map(s => s.trim()) : [];
          videoIds.forEach(videoId => {
            const video = videos.find(v => v.videoId === videoId && v.active === '1');
            if (video) {
              slideArray.push({
                type: 'video',
                src: [video.youtubeLink]
              });
            }
          });

          if (slideArray.length === 0) return null;

          return (
            <div key={slider.sliderId}>
              <h3 className="text-xl font-bold mb-4">Slider: {slider.sliderId}</h3>
              <MediaSlider slides={slideArray} />
            </div>
          );
        })}
    </div>
  );
};

export default AllSliders;
