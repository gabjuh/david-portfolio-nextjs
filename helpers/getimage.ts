import IData from '@/interfaces/IData';
import IImages from '@/interfaces/IImages';
import IImagesData from '@/interfaces/IImagesData';

export const getImageDataFromImageCollection = (
  data: IData, 
  imgId: string,
  imagesData?: IImagesData[]
): string[] => {
  const item = data.images.find((image: IImages) => image.imgId === imgId)
  const imgData: IImagesData | undefined = imagesData?.find(images => images.imgId === imgId)
  const dimension = imgData?.metadata.dimension;
  return [
    item?.fileName ?? 'https://placehold.co/600x400', 
    item?.imgAlt ?? 'Alternative Bildbeschreibung fehlt',
    dimension ?? '',
    item?.portraitVerticalFocus ?? '',
    item?.portraitAspect ?? ''
  ];
}