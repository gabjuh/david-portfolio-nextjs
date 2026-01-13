import React from 'react';

interface VideoComponentProps {
  youtubeId: string;
  title?: string;
  width?: number;
  height?: number;
  responsive?: boolean;
  autoplay?: boolean;
  className?: string;
}

const VideoComponent: React.FC<VideoComponentProps> = ({
  youtubeId,
  title = '',
  width = 400,
  height = 300,
  responsive = true,
  autoplay = false,
  className = ''
}) => {
  const baseUrl = 'https://www.youtube-nocookie.com/embed/';
  const autoplayParam = autoplay ? '?autoplay=1' : '';
  const embedUrl = `${baseUrl}${youtubeId}${autoplayParam}`;
  console.log(youtubeId)
  if (responsive) {
    return (
      <div
        className={`mt-4 lg:mt-10 mx-auto ${className}`}
        style={{
          width: `min(${width}px, 90vw)`,
          height: `min(${height * 0.75}px, 67.5vw)`, // 4:3 aspect ratio for video
          maxWidth: '400px',
          maxHeight: '300px'
        }}
      >
        <div className="relative w-full h-full">
          <iframe
            className="absolute inset-0 w-full h-full rounded-md"
            src={embedUrl}
            title={title || `Video ${youtubeId}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`mt-10 ${className}`}>
      <iframe
        width={width}
        height={height}
        src={embedUrl}
        title={title || `Video ${youtubeId}`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="rounded-md"
      />
    </div>
  );
};

export default VideoComponent;