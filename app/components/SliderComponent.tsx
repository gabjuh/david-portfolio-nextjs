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
    <div
      className={`mt-4 lg:mt-10 mx-auto ${className}`}
      style={{
        width: `min(${width}px, 90vw)`,
        height: `min(${height}px, 90vw)`,
        maxWidth: '400px',
        maxHeight: '400px'
      }}
    >
      <MediaSlider slides={slides} />
    </div>
  );
};

export default SliderComponent;