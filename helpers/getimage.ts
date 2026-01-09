import IData from '@/interfaces/IData';
import IImages from '@/interfaces/IImages';
import IImagesData from '@/interfaces/IImagesData';

export interface IImagesDataJoined {
  src: string;
  alt: string;
  orientation?: string;
  portraitVerticalFocus?: string;
  portraitAspect?: string;
  creditName?: string,
  creditYear?: string,
  creditUrl?: string,
}

export function getImageDataFromImageCollection(
  data: IData,
  imgId: string,
  imagesData?: IImagesData[]
): IImagesDataJoined {
  const imageItem = data.images.find((img: IImages) => img.imgId === imgId);

  const metaItem = imagesData?.find((img: IImagesData) => img.imgId === imgId);

  // Destructuring with default values
  const {
    fileName = '',
    imgAlt = 'Alternative Bildbeschreibung fehlt',
    portraitVerticalFocus = '',
    portraitAspect = '',
    creditName = '',
    creditYear = '',
    creditUrl = ''
  } = imageItem || {};

  // Orientation from metas
  const orientation = metaItem?.metadata?.dimension || '';

  const output = {
    src: fileName,
    alt: imgAlt || 'Alternative Bildbeschreibung fehlt',
    orientation: metaItem?.metadata.dimension,
    portraitVerticalFocus: imageItem?.portraitVerticalFocus || portraitVerticalFocus,
    portraitAspect: imageItem?.portraitAspect || portraitAspect,
    creditName: imageItem?.creditName || creditName,
    creditYear: imageItem?.creditYear || creditYear,
    creditUrl: imageItem?.creditUrl || creditUrl,
  }

  return output;
}
