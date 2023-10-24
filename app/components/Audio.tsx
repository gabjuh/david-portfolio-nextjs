'use client';

import { useContext, useEffect, useState } from 'react';
import { openSheetApiUrl } from '../../helpers/connect';

import ReactH5AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import IData from '@/interfaces/IData';
import Image from 'next/image';
import Title from './Title';

interface IAudio {
  data: IData;
}

interface IAudioData {
  pageTitle?: string;
  domain: string;
  active: '1' | '0';
  id: number;
  fileName: string;
  folderName?: string;
  title?: string;
  label?: string;
  band?: string;
  bandLink?: string;
  description: string;
  year?: string;
}

const Audio: React.FC<IAudio> = ({ data }) => {

  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(undefined);

  const domain: string = 'https://discography-franciskahajdu.web4musicians.eu';


  const handleSelectLabel = (title: string | undefined) => {
    title && title !== selectedLabel ? setSelectedLabel(title) : setSelectedLabel(undefined);
  };

  useEffect(() => {
    // console.log(selectedLabel);
  }, [selectedLabel]);


  const getTrackTitle = (fileName: string | null | undefined) => {
    // Split strings by '-_-'
    const trackTitles = fileName?.split('-_-');

    // Remove file extension
    const trackTitle = trackTitles && trackTitles[1].split('_sample')[0].split('_').join(' ').split('-').join(' ');

    // Between two numbers put a - (dash)
    const trackTitleWithDash = trackTitle?.replace(/(\d+)(\s)(\d+)/g, '$1-$3');

    return trackTitleWithDash;
  };

  return (
    <div className="mt-24 container mx-auto mb-16" id="discography">
      <>
        <Title title={data?.audio[0].pageTitle} className="mt-16 pb-24" />
        <div className="flex">
          {/* Labels, titles */}
          {data?.audio.map((item, index) => {
            return (
              <div key={`audio-${index}`} className="pb-10 mx-auto">
                {/* CD Title */}
                {/* {item.title && <p className="text-3xl mt-12 mb-6 text-center">{item.title}</p>} */}

                {/* CD Label */}
                {item.label &&
                  <div
                    className={`transition-all duration-300 ease-in-out shadow-md hover:shadow-xl hover:-translate-y-[2px] md:mx-3 xl:mx-10 cursor-pointer hover:scale-[1.03] ${selectedLabel && selectedLabel === item.title ? 'scale-[1.02] -translate-y-[1px] !shadow-xl' : ''}`}
                    onClick={() => handleSelectLabel(item.title)}
                  >
                    <Image
                      src={`${domain}/${item.folderName}/${item.label}`}
                      alt={`${item.title} label image`}
                      height="500"
                      width="500"
                      style={{
                        width: 'auto',
                        height: '400px',
                      }}
                      className={`mx-auto ${selectedLabel && selectedLabel !== item.title ? 'grayscale-[1] opacity-[.6]' : ''} transition-all duration-[.6s] ease-in-out`}
                    />
                  </div>}

                {/* Release year */}
                {item.year && <p className="uppercase text-center text-xs md:text-md lg:text-lg  my-3">{'Release year:'} <strong>{`${item.year}`}</strong></p>}

              </div>
            );
          })}
        </div>


        <div className="relative transition-all duration-300 ease-in-out h-[100%]">
          <div className={`left-0 right-0 transition-all duration-300 ease-in-out ${selectedLabel !== undefined ? 'opacity-1' : 'opacity-0'}`}>

          </div>
        </div>
      </>
    </div>
  );
};

export default Audio;