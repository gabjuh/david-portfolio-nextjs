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
    <div
      className="mt-4 lg:mt-10 mx-auto flex items-center justify-center"
      style={{
        width: `min(${width}px, 90vw)`,
        height: `min(${height}px, 90vw)`,
        maxWidth: '400px',
        maxHeight: '400px'
      }}
    >
      <Image
        src={src.startsWith('http') ? src : `${apiUrl}${src}`}
        alt={alt || `${title} - Image`}
        quality="100"
        className={`max-w-full max-h-full object-contain rounded-md drop-shadow-xl ${className}`}
        width={width}
        height={height}
        priority={priority}
      />
    </div>
  );
};

export default ImageComponent;