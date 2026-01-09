import ProjectItemNew from '@/app/components/ProjectItemNew';
import { getImageDataFromImageCollection } from '@/helpers/getimage';
import { getVideoLinkFromVideoCollection } from '@/helpers/getVideo';
import IData from '@/interfaces/IData';
import IImagesData from '@/interfaces/IImagesData';
import IVideos from '@/interfaces/IVideos';

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

    async function getImageData() {
      const res = await fetch(`${apiUrl}/images.json`,
        { cache: 'no-store' }
      )
      if (!res.ok) {
          throw new Error('Failed to fetch data')
      }
      return res.json()
    }

    const imagesData: IImagesData[] = await getImageData();

    const videos: IVideos[] = data.videos;


    return (
        <main className={`container mx-auto px-4 py-10 w-full`}>

            <Title title={data.projects[0].pageTitle + ' NEW'}  />

            {data.projects.map((item, index) => {

                const {src, alt, orientation} = getImageDataFromImageCollection(
                  data,
                  item.imgId,
                  imagesData
                );
                const videoData = getVideoLinkFromVideoCollection(videos, item?.videoId);
                const youtubeId = videoData.youtubeLink;

                if (item.active === '1') {
                    return (
                        <ProjectItemNew
                            key={index}
                            title={item.projectTitle}
                            mediaType={item.mediaType}
                            youtubeId={youtubeId}
                            driveId={item.driveId}
                            fileName={src}
                            imgAlt={alt}
                            imgDimension={orientation}
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
