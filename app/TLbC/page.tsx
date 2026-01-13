import { getImageDataFromImageCollection } from '@/helpers/getimage';
import { getVideoLinkFromVideoCollection } from '@/helpers/getVideo';
import IData from '@/interfaces/IData';
import IVideos from '@/interfaces/IVideos';

import ProjectItem from '../components/ProjectItem';
import Title from '../components/Title';

export default async function HomePage() {

  const apiUrl = `https://${process.env.NEXT_PUBLIC_BACKEND_API}`;

  async function getData() {
    try {
      const res = await fetch(`${apiUrl}/data.json`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(30000)
      })
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      return res.json()
    } catch (error) {
      console.error('TLbC page fetch failed, using fallback:', error);
      // Return minimal fallback data
      return {
        TLbC: [{ pageTitle: 'The Language beyond Culture' }],
        videos: [],
        images: [],
        sliders: []
      }
    }
  }

  const data: IData = await getData();

  const videos: IVideos[] = data.videos;
  
  return (
    <main className="container mx-auto px-4 lg:px-8 py-6 lg:py-10 w-full max-w-7xl">
      
      <Title title={data.TLbC[0].pageTitle} />

      {data.TLbC.map((item, index) => {

        const {src, alt} = getImageDataFromImageCollection(data, item.imgId); //orientation
        const videoData = getVideoLinkFromVideoCollection(videos, item?.videoId);
        const youtubeId = videoData.youtubeLink;

        if (item.active === '1') {
          return (
            // <ProjectItem
            //   key={index}
            //   title={item.projectTitle}
            //   mediaType={item.mediaType}
            //   youtubeId={youtubeId}
            //   driveId={item.driveId}
            //   imgId={item.imgId}
            //   imgUrl={src}
            //   imgAlt={alt}
            //   loaded={true}
            //   text={item.text}
            // />
          <ProjectItem
            key={index}
            title={item.projectTitle}
            mediaType={item.mediaType}
            youtubeId={youtubeId}
            driveId={item.driveId}
            imgUrl={src}
            imgAlt={alt}
            sliderId={item.sliderId}
            loaded={true}
            text={item.text}
            data={data}
          />
          );
        }
      })}

    </main>
  )
}
