import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

import ImageComponent from '@/app/components/ImageComponent';
import SliderComponent from '@/app/components/SliderComponent';
import VideoComponent from '@/app/components/VideoComponent';
import { getSliderDataFromSliderCollection } from '@/helpers/getSlider';
import IData from '@/interfaces/IData';
import IInstruments from '@/interfaces/IInstruments';

interface IInstrumentItemProps extends IInstruments {
  data?: IData;
}

const InstrumentItem: React.FC<IInstrumentItemProps> = ({
  pageTitle,
  fileName,
  imgAlt,
  imgOnSide,
  text,
  mediaType,
  youtubeId,
  sliderId,
  data
}) => {

  // Debug logging for video troubleshooting
  if (mediaType === 'video' || youtubeId) {
    console.log('InstrumentItem Video Debug:', {
      pageTitle,
      mediaType,
      youtubeId,
      hasYoutubeId: !!youtubeId
    });
  }

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
            – {pageTitle} –
          </h3>
        </div>
      </>
    );
  }

  // Determine image positioning - default to legacy behavior if no mediaType is set
  const isImageLeft = imgOnSide?.toLowerCase() === 'left';
  const isImageRight = imgOnSide?.toLowerCase() === 'right';
  const showMedia = mediaType && (mediaType === 'image' || mediaType === 'video' || mediaType === 'slider');
  const showLegacyImage = !mediaType && fileName; // Legacy support for existing data

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-10 mt-8 lg:mt-16">

        {/* Media Section - Always first on mobile, positioned by imgOnSide on desktop */}
        {(showMedia || showLegacyImage) && (
          <div className={`w-full lg:w-auto lg:flex-shrink-0 flex justify-center lg:justify-start ${isImageRight ? 'lg:order-2' : 'lg:order-1'}`}>
            {/* Image media type or legacy image */}
            {((mediaType === 'image') || showLegacyImage) && fileName && (
              <ImageComponent
                src={fileName}
                alt={imgAlt || `${pageTitle} - Instrument Image`}
                title={pageTitle}
                width={400}
                height={400}
                priority={true}
              />
            )}

            {/* Video media type */}
            {mediaType === 'video' && youtubeId && (
              <VideoComponent
                youtubeId={youtubeId}
                title={pageTitle}
                width={400}
                height={300}
              />
            )}

            {/* Slider media type */}
            {mediaType === 'slider' && sliderSlides.length > 0 && (
              <SliderComponent
                slides={sliderSlides}
                width={400}
                height={400}
              />
            )}
          </div>
        )}

        {/* Text Section - Always second on mobile, positioned by imgOnSide on desktop */}
        <div className={`w-full lg:flex-1 lg:mt-0 mt-4 flex flex-col justify-center ${isImageRight ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="leading-7 md:leading-8 text-justify px-4 lg:px-0">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              children={text ? text : ''}
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

export default InstrumentItem;