import { useMemo } from 'react';

import type IData from '@/interfaces/IData';
import type IImages from '@/interfaces/IImages';
import type IImagesData from '@/interfaces/IImagesData';

interface UseImageDataResult {
  src: string;
  alt: string;
  orientation: string;
  portraitVerticalFocus?: string;
  portraitAspect?: string;
}

const imagePlaceholderUrl = 'https://placehold.co/600x400';

export function useImageData(
  data: IData,
  imgId: string,
  imagesData?: IImagesData[]
): UseImageDataResult {
  return useMemo(() => {
    const item = data.images.find((image: IImages) => image.imgId === imgId);
    const imgData: IImagesData | undefined = imagesData?.find(images => images.imgId === imgId);
    return {
      src: item?.fileName ?? imagePlaceholderUrl,
      alt: item?.imgAlt ?? 'Alternative Bildbeschreibung fehlt',
      orientation: imgData?.metadata.dimension ?? '',
      portraitVerticalFocus: item?.portraitVerticalFocus ?? '',
      portraitAspect: item?.portraitAspect ?? '',
    };
  }, [data, imgId, imagesData]);
}
