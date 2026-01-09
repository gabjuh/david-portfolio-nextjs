import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

import ImageComponent from '@/app/components/ImageComponent';
import SliderComponent from '@/app/components/SliderComponent';
import VideoComponent from '@/app/components/VideoComponent';
import convertStringToUrlFriendly from '@/helpers/convertStringToUrlFriendly';
import { IImagesDataJoined } from '@/helpers/getimage';
import { getSliderDataFromSliderCollection } from '@/helpers/getSlider';
import { IVideoDataJoined } from '@/helpers/getVideo';
import IData from '@/interfaces/IData';
import IProjectItem from '@/interfaces/IProjectItem';

import { ISlide } from './MediaSlider';

interface IProjectItemNewProps extends IProjectItem {
    data?: IData;
}

const ProjectItem: React.FC<IProjectItemNewProps> = ({
    title,
    mediaType,
    youtubeId,
    driveId,
    fileName,
    imgDimension,
    sliderId,
    loaded,
    text,
    data
}) => {

    const friendlyFileName = convertStringToUrlFriendly(fileName ?? '');

    // console.log({mediaType})

    // Get slider data if mediaType is slider and data is available
    const getSliderSlides = (): ISlide[] => {
        if (mediaType === 'slider' && data && sliderId) {
            console.log('Attempting to get slider data for:', sliderId);
            console.log('Available sliders:', data.sliders?.map(s => ({ id: s.sliderId, active: s.active })));

            const { slides, found } = getSliderDataFromSliderCollection(data, sliderId);
            console.log('Slider search result:', { found, slidesCount: slides.length, slides });

            if (found && slides.length > 0) {
                return slides;
            }
        }

        console.log('Using fallback slides for mediaType:', mediaType, 'sliderId:', sliderId);
        // Fallback to dummy slides if no real data available
        return [
            {
                type: 'image',
                src: ['Lyren_03-kicsi-3.jpg', 'Lyra instrument']
            },
            {
                type: 'image',
                src: ['Violone-1.jpg', 'Violone instrument']
            },
            {
                type: 'video',
                src: ['ScMzIvxBSi4', 'Music video']
            }
        ];
    };

    const sliderSlides = getSliderSlides();

    interface IProjectMediaData {
      image: IImagesDataJoined | {},
      video: IVideoDataJoined | {},
    }

    // {video: IVideoDataJoined} | 
    const projectMediaData: IProjectMediaData = {
      image: {},
      video: {},
      // slider: {}
    };
    // const projectMediaData: any = {};

    switch (mediaType) {
      case 'image':

        // const {} = getImageDataFromImageCollection()
        projectMediaData.image = {
          fileName,
          imgDimension,
        };
        console.log(projectMediaData)
        
        break;
      case 'video':
        
        
        break;
      case 'slider':
        
        
        break;
    
      default:
        // console.log('mediaType falsch geschrieben');
        break;
    }

    return (
        <>
            <div className="flex flex-row gap-6 mb-28">
              {/* Media Section - Image, Video, or Slider */}
              <div className="flex-shrink-0">
                {mediaType === 'image' && (
                  <ImageComponent
                    src={fileName || ''}
                    alt={`${title} - Project Image`}
                    title={title}
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

                {mediaType === 'slider' && (
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