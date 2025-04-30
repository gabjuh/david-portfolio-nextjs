'use client'

import Link, { LinkProps } from 'next/link';
import React, {
    AnchorHTMLAttributes, forwardRef, PropsWithChildren, ReactNode, useEffect, useState
} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { setLinkTargets } from '@/helpers/setLinkTargets';
import IMarkdownText from '@/interfaces/IMarkdownText';

const MarkdownText: React.FC<IMarkdownText> = ({ text, classes }) => {
  // Correction: In string replace all \n to \n\n
  const correctedText = text.replace(/\n/g, "\n\n");

  // Create an array of paragraphs on $$
  const paragraphs = correctedText.split("$$");

  return (
    <div className={`markdown-block hyphens-auto ${classes}`}>
      {paragraphs.map((paragraph, i) => (
        <div className="mb-3" key={i}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            children={paragraph}
            components={{
              a: ({ node, ...props }) => <CustomLink {...props} />, // Ensures correct prop passing
            }}
          /> 
        </div>
      ))}
    </div>
  );
};

type CustomLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href?: LinkProps['href'];
  as?: LinkProps['as'];
  children?: ReactNode | ReactNode[]; // Explicitly allow ReactNode and ReactNode[]
};

const CustomLink: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href = "#", children, ...props }) => {
  const [target, setTarget] = useState<"_self" | "_blank">("_self"); // Default to `_self` for SSR

  useEffect(() => {
    setTarget(setLinkTargets(href)); // Update target on the client
  }, [href]);

  return (
    <Link href={href} target={target} {...props}>
      {children}
    </Link>
  );
};

CustomLink.displayName = 'CustomLink';

export default MarkdownText;