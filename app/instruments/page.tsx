
import { getImageDataFromImageCollection } from '@/helpers/getimage';
import IData from '@/interfaces/IData';

import ImageAndText from '../components/ImageAndText';
import Title from '../components/Title';

export default async function HomePage() {

  const apiUrl = `https://${process.env.NEXT_PUBLIC_BACKEND_API}`;

  async function getData() {
    const res = await fetch(`${apiUrl}/data.json`,
      { cache: 'no-store' }
    )
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  }

  const data: IData = await getData();
  
  return (
    <main className={`container mx-auto px-4 py-10 w-full`}>
      
      <Title title={data.instruments[0].pageTitle} />

      {data.instruments.map((item, index) => {

      const {src, alt} = getImageDataFromImageCollection(data, item.imgId);

        return (
          <ImageAndText
            key={index}
            fileName={src}
            alt={alt}
            imageLeft={item.imgOnSide?.toLowerCase() === 'left' ? true : false}
            loaded={true}
            text={item.text}
          />
        );
      })}

    </main>
  )
}
