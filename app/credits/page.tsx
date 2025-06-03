import { Metadata } from 'next';

import IData from '@/interfaces/IData';
import IImagesData from '@/interfaces/IImagesData';

import AllSliders from '../components/AllSliders';
import AllImages from '../components/debug/AllImages';
import MediaSlider from '../components/MediaSlider';
import PageContainer from '../components/PageContainer';
import Title from '../components/Title';

export const metadata: Metadata = {
  title: 'Credits'
}


export default async function MediaPage(){

  const apiUrl = `https://${process.env.NEXT_PUBLIC_BACKEND_API}`;

    async function getData() {
      const res = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_API}/data.json`)
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = res.json();
      return data;
    }
  
    const data: IData = await getData()

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
    <PageContainer>
      <Title title={"Credits"} />
      <AllImages 
        data={data}
        imagesData={imagesData}
      />
      {/* <h3 className="text-xl mb-7">Videos: (coming soon..)</h3> */}
     
    </PageContainer>
  )
}

