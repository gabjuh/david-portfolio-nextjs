import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import IImageAndText from '@/interfaces/IImageAndText';

import ImageForText from './ImageForText';

const ImageAndText: React.FC<IImageAndText> = ({
  title,
  driveId,
  fileName,
  alt,
  classNameForImg,
  imageLeft,
  text,
  textAlign,
  buttonText
}) => {

  const isJustified = true;

  return (
    <>
      <div className={`flex ${imageLeft ? 'flex-col' : 'flex-col-reverse'} md:flex-row mb-20`}>
        {imageLeft && <ImageForText fileName={fileName || ''} alt={alt || 'image'} classNameForImg={classNameForImg} driveId={""} />}
        <div className={`w-full md:w-[60%] flex flex-col ${!imageLeft ? 'items-end' : ''} justify-center`}>
          <div className={`${imageLeft ? `${isJustified ? 'text-justify' : 'md:text-left'} md:ml-0 lg:ml-5` : `${isJustified ? 'text-justify' : 'md:text-right'} md:mr-0 lg:mr-5`} ${imageLeft !== undefined ? 'text-justify' : ''} leading-8`}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              children={text ? text : ''}
              components={{
                a: ({ href, children, ...props }) => <CustomLink href={href} {...props}>{children}</CustomLink>,
              }}
            />
          </div>
        </div>
        {!imageLeft && <ImageForText fileName={fileName || ''} alt={alt || ''} classNameForImg={classNameForImg} driveId={""} />}
      </div>

    </>
  );
};

// Safe CustomLink component for handling external links in markdown
const CustomLink: React.FC<{ href?: string; children: React.ReactNode; [key: string]: any }> = ({
  href = "#",
  children,
  ...props
}) => {
  // Simple external link detection without hooks (server-safe)
  const isExternal = href.startsWith('http') && (
    typeof window === 'undefined' || !href.includes(window.location.hostname)
  );

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  );
};

export default ImageAndText;