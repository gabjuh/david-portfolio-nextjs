import ProjectItemNew from '@/app/components/ProjectItemNew';
import { getImageDataFromImageCollection } from '@/helpers/getimage';
import IData from '@/interfaces/IData';
import IImagesData from '@/interfaces/IImagesData';

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
    

    return (
        <main className={`container mx-auto px-4 py-10 w-full`}>

            <Title title={data.projects[0].pageTitle + ' NEW'}  />

            {data.projects.map((item, index) => {
                if (index > 0) {
                  return;
                }

                const [imgUrl, imgAlt, imgDimension] = getImageDataFromImageCollection(
                  data, 
                  item.imgId,
                  imagesData
                );

                if (item.active === '1') {
                    return (
                        <ProjectItemNew
                            key={index}
                            title={item.projectTitle}
                            mediaType={item.mediaType}
                            youtubeId={item.youtubeLink}
                            driveId={item.driveId}
                            fileName={imgUrl}
                            imgAlt={imgAlt}
                            imgDimension={imgDimension}
                            loaded={true}
                            text={item.text}
                        />
                    );
                }
            })}

        </main>
    )
}
