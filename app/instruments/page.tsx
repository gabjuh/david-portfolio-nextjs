
import { getImageDataFromImageCollection } from '@/helpers/getimage';
import { getVideoLinkFromVideoCollection } from '@/helpers/getVideo';
import IData from '@/interfaces/IData';

import InstrumentItem from '../components/InstrumentItem';
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

        if (item.active !== '1') {
          return null;
        }

        // Get image data for legacy support when no mediaType is specified
        const {src, alt} = getImageDataFromImageCollection(data, item.imgId);
        // Get video data from video collection using videoId
        const videoData = getVideoLinkFromVideoCollection(data.videos, item?.videoId);
        const youtubeId = videoData.youtubeLink;

        return (
          <InstrumentItem
            key={index}
            {...item}
            fileName={item.fileName || src}
            imgAlt={item.imgAlt || alt}
            youtubeId={youtubeId || item.youtubeId}
            data={data}
          />
        );
      })}

    </main>
  )
}
