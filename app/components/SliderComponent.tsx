import React from 'react';

import MediaSlider, { ISlide } from './MediaSlider';

interface SliderComponentProps {
  slides: ISlide[];
  width?: number;
  height?: number;
  className?: string;
}

const SliderComponent: React.FC<SliderComponentProps> = ({
  slides,
  width = 400,
  height = 400,
  className = ''
}) => {
  return (
    <div className={`w-[${width}px] h-[${height}px] mt-10 ${className}`}>
      <MediaSlider slides={slides} />
    </div>
  );
};

export default SliderComponent;