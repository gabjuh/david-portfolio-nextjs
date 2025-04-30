import { getImageDataFromImageCollection } from '@/helpers/getimage';
import IData from '@/interfaces/IData';

import ProjectItem from '../components/ProjectItem';
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
      
      <Title title={data.projects[0].pageTitle} />

      {data.projects.map((item, index) => {

        const [imgUrl, imgAlt] = getImageDataFromImageCollection(data, item.imgId);

        if (item.active === '1') {
          return (
            <ProjectItem
              key={index}
              title={item.projectTitle}
              mediaType={item.mediaType}
              youtubeId={item.youtubeLink}
              driveId={item.driveId}
              fileName={imgUrl}
              imgAlt={imgAlt}
              loaded={true}
              text={item.text}
            />
          );
        }
      })}

    </main>
  )
}
