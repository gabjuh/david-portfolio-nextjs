// import React, { useContext, useEffect, useState } from 'react';
import YoutubeVideo from './YoutubeVideo';
import Title from './Title';
import IVideos from '../../interfaces/IVideos';
import IData from '@/interfaces/IData';
import getVideoId from '@/helpers/getVideoId';

const Videos = ({ data }: { data: IData; }) => {

  // sort video objects in increasing order of data.video.id-s
  const videos = data.videos.sort((a, b) => {
    return b.id - a.id;
  });

  const activeVideos = videos.filter((item: IVideos) => item.active === '1');

  return (
    <>
      <Title title="Videos" id="videos" className="pb-20" />

      <div className="flex flex-row overflow-auto max-h-[800px] pb-20 mb-10 md:px-4">
        {activeVideos.map((item: IVideos, index: number) => {

          const videoId = getVideoId(item.youtubeId);

          return (

            <div className="mx-5" key={`video-${index}`}>

              {/* Video */}
              <YoutubeVideo
                key={`video-${index}`}
                youtubeId={videoId}
                quality={item.quality}
              />

              {/* Title */}
              <p className="text-2xl font-semibold mt-2">{item.title}</p>

              {/* Band */}
              {item.band && (
                item.bandLink === undefined ? <p className="text-lg mt-2">{item.band}</p> :
                  <a className="text-primary" href={item.bandLink} target="_blank">
                    <p className="text-lg mt-2">{item.band}</p>
                  </a>
              )}

              {/* Description */}
              {item.description && <p className="text-sm mt-2">{item.description}</p>}

            </div>
          );
        })}
      </div>    
    </>
  );

};

export default Videos;