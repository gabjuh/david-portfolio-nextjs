'use client'

import React, { useState } from 'react';

import { getImageDataFromImageCollection } from '@/helpers/getimage';
import IData from '@/interfaces/IData';

import ImageAndText from './ImageAndText';

interface BiographyClientProps {
  data: IData;
}

const BiographyClient: React.FC<BiographyClientProps> = ({ data }) => {
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);

  const {src, alt} = getImageDataFromImageCollection(data, data.biography[0].imgId);

  // Debug logging for second image
  console.log('Biography data:', data.biography);
  console.log('Biography data length:', data.biography.length);
  if (data.biography[1]) {
    console.log('Second biography item:', data.biography[1]);
  }

  // Handle second biography item - fallback to first item if second doesn't exist
  const secondBiographyItem = data.biography[1] || data.biography[0];
  const {src: src2, alt: alt2} = getImageDataFromImageCollection(data, secondBiographyItem.imgId);

  console.log('Second image data:', {src2, alt2, secondBiographyItem});

  return (
    <>
      <ImageAndText
        fileName={src}
        alt={alt}
        imageLeft={data.biography[0].imgOnSide === 'left' ? true : false}
        loaded={true}
        text={data.biography[0].text ?? ''}
      />

      {/* Interactive Button Section with Transition */}
      <div className="relative">
        {/* Button and Question Section */}
        <div className={`transition-all duration-500 ease-in-out ${
          showAdditionalContent
            ? 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
            : 'opacity-100 scale-100 translate-y-0'
        }`}>
          <div className="text-center mt-12 px-4 lg:px-0">
            <p className="mb-4">
              {data.biography[0].question}
            </p>
            <button
              className="btn btn-secondary text-white transition-transform hover:scale-105"
              onClick={() => setShowAdditionalContent(true)}
            >
              {data.biography[0].buttonText}
            </button>
          </div>
        </div>

        {/* Additional Content Section */}
        <div className={`transition-all duration-500 ease-in-out ${
          showAdditionalContent
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none absolute top-0 w-full'
        }`}>
          <div className="">
            <ImageAndText
              fileName={src2 || 'placeholder-image.jpg'}
              alt={alt2 || 'Additional biography image'}
              imageLeft={secondBiographyItem?.imgOnSide === 'left' ? true : false}
              loaded={true}
              text={secondBiographyItem?.text ?? 'Additional biographical content will appear here. This is placeholder text that shows when the second biography entry is not available in the database.'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BiographyClient;