import Image from 'next/image';
import React from 'react';

interface ImageComponentProps {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  alt,
  title = '',
  width = 400,
  height = 400,
  className = '',
  priority = false
}) => {
  const apiUrl = `https://${process.env.NEXT_PUBLIC_BACKEND_API}/img/`;

  return (
    <div className={`w-[${width}px] h-[${height}px] mt-10`}>
      <Image
        src={src.startsWith('http') ? src : `${apiUrl}${src}`}
        alt={alt || `${title} - Image`}
        quality="100"
        className={`!h-[${height}px] w-auto mx-auto rounded-md drop-shadow-xl ${className}`}
        width={width}
        height={height}
        priority={priority}
      />
    </div>
  );
};

export default ImageComponent;