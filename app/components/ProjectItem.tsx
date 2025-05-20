import Image from 'next/image';
import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

import convertStringToUrlFriendly from '@/helpers/convertStringToUrlFriendly';
import IProjectItem from '@/interfaces/IProjectItem';

const ProjectItem: React.FC<IProjectItem> = ({
  title,
  mediaType,
  youtubeId,
  imgId,
  sliderId,
  imgUrl,
  loaded,
  text
}) => {

  return (
    <>
      <h3 className="text-2xl text-center lg:text-left font-semibold">{title}</h3>
      <div className={`${!mediaType ? '' : 'flex flex-col lg:flex-row'} mt-2 mb-28`}>
        <div className="w-full lg:w-1/2 flex justify-center mt-2.5">
          {(mediaType === 'image' || mediaType === '') && imgId &&
            <div className="lg:w-[300px] w-[450px] mr-0 lg:mr-7">
              <Image 
                src={`https://${process.env.NEXT_PUBLIC_BACKEND_API}/img/${imgUrl}`}
                alt="Project Image" 
                className="!w-[300px] mx-auto" 
                width="200"
                height="120"
              />
            </div>
          }
          {mediaType === 'video' &&
            <>
              {youtubeId &&
                <div className="mr-0 lg:mr-7 w-full">
                  <div className="w-[300px] mx-auto hidden lg:block">
                    <iframe width="300" height="170" src={`https://www.youtube-nocookie.com/embed/${youtubeId}`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                  </div>
                  <div className="w-full lg:w-full lg:hidden">
                    <div className="w-[450px] mx-auto">
                      <iframe width="450" height="280" src={`https://www.youtube-nocookie.com/embed/${youtubeId}`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                    </div>
                  </div>
                </div>
              }
            </>
          }
          {mediaType === 'slider' &&
            <>
              {sliderId &&
                <div className="mr-0 lg:mr-7 w-full">
                  <div className="w-[300px] mx-auto hidden lg:block">
                    <iframe width="300" height="170" src={`https://www.youtube-nocookie.com/embed/${youtubeId}`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                  </div>
                  <div className="w-full lg:w-full lg:hidden">
                    <div className="w-[450px] mx-auto">
                      <iframe width="450" height="280" src={`https://www.youtube-nocookie.com/embed/${youtubeId}`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                    </div>
                  </div>
                </div>
              }
            </>
          }
        </div>
        <div className="leading-8 lg:mt-0 mt-5 text-center lg:text-justify">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            children={loaded && text ? text : ''}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectItem;