'use client';

import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';

interface IParallaxBannerImage {
  imgUrl: string;
}

import React from 'react';

const ParallaxBannerImage: React.FC<IParallaxBannerImage> = ({ imgUrl }) => {
  return (
    <ParallaxBanner style={{ aspectRatio: '2 / 1' }}>
      <ParallaxBannerLayer image={imgUrl} speed={-20} />
    </ParallaxBanner>
  );
};

export default ParallaxBannerImage;