import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

import ImageComponent from '@/app/components/ImageComponent';
import SliderComponent from '@/app/components/SliderComponent';
import VideoComponent from '@/app/components/VideoComponent';
import convertStringToUrlFriendly from '@/helpers/convertStringToUrlFriendly';
import { getSliderDataFromSliderCollection } from '@/helpers/getSlider';
import IData from '@/interfaces/IData';
import IProjectItem from '@/interfaces/IProjectItem';

interface IProjectItemProps extends IProjectItem {
  data?: IData;
}

const ProjectItem: React.FC<IProjectItemProps> = ({
  title,
  mediaType,
  youtubeId,
  sliderId,
  imgUrl,
  loaded,
  text,
  data
}) => {

  // Get slider data if mediaType is slider and data is available
  const getSliderSlides = () => {
    if (mediaType === 'slider' && data && sliderId) {
      const { slides, found } = getSliderDataFromSliderCollection(data, sliderId);
      if (found && slides.length > 0) {
        return slides;
      }
    }
    return [];
  };

  const sliderSlides = getSliderSlides();

  return (
    <>
      <div className="flex flex-row gap-6 mb-28">
        {/* Media Section - Image, Video, or Slider */}
        <div className="flex-shrink-0">
          {(mediaType === 'image' || mediaType === '') && imgUrl && (
            <ImageComponent
              src={imgUrl}
              alt={`${title} - Project Image`}
              title={title}
              width={400}
              height={400}
              priority={true}
            />
          )}

          {mediaType === 'video' && youtubeId && (
            <VideoComponent
              youtubeId={youtubeId}
              title={title}
              width={400}
              height={300}
            />
          )}

          {mediaType === 'slider' && sliderSlides.length > 0 && (
            <SliderComponent
              slides={sliderSlides}
              width={400}
              height={400}
            />
          )}
        </div>

        {/* Text Section */}
        <div className="flex-1 leading-8 lg:mt-0 mt-5 text-center lg:text-justify">
          <h3 className="text-2xl text-center lg:text-left font-semibold mb-3">{title}</h3>
          <div className="leading-8 lg:mt-0 mt-5 text-center lg:text-justify">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              children={loaded && text ? text : ''}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectItem;