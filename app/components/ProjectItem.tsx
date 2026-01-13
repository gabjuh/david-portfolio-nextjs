import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

import ImageComponent from '@/app/components/ImageComponent';
import SliderComponent from '@/app/components/SliderComponent';
import VideoComponent from '@/app/components/VideoComponent';
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

  // Special layout for title media type (full width centered)
  if (mediaType === 'title') {
    return (
      <>
        <div className="w-full mb-0 mt-14 lg:mt-20">
          <h3 className="text-2xl md:text-3xl font-bold text-center pb-0 mb-0 w-full">
            – {title} –
          </h3>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-10 mt-8 lg:mt-16">
        {/* Media Section - Image, Video, or Slider */}
        <div className="w-full lg:w-auto lg:flex-shrink-0 flex justify-center lg:justify-start">

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
        <div className="w-full lg:flex-1 lg:mt-0 mt-4">
          <h3 className="text-xl md:text-2xl text-center lg:text-left font-semibold mb-3 px-4 lg:px-0">{title}</h3>
          <div className="leading-7 md:leading-8 text-justify px-4 lg:px-0">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              children={loaded && text ? text : ''}
              components={{
                a: ({ href, children, ...props }) => <CustomLink href={href} {...props}>{children}</CustomLink>,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

// Safe CustomLink component for handling external links in markdown
const CustomLink: React.FC<{ href?: string; children: React.ReactNode; [key: string]: any }> = ({
  href = "#",
  children,
  ...props
}) => {
  // Simple external link detection without hooks (server-safe)
  const isExternal = href.startsWith('http') && (
    typeof window === 'undefined' || !href.includes(window.location.hostname)
  );

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  );
};

export default ProjectItem;