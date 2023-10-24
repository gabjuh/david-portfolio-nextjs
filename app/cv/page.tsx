import IData from '@/interfaces/IData';
import PageContainer from '../components/PageContainer';
import Title from '../components/Title';
import ImageAndText from '../components/ImageAndText';
import Link from 'next/link';

export default async function CVPage() {

  async function getData() {
    const res = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_API}/data.json`)
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = res.json();
    return data;
  }

  const data: IData = await getData();

  const cv = data.cv

  return (
    <PageContainer>

      <Title title={data ? cv[0].pageTitle : ''} />

      {cv.map((item, index) => {
        return (
          <ImageAndText
            key={index}
            driveId={item.driveId}
            fileName={item.fileName}
            alt={item.imgAlt}
            imageLeft={item.imgOnSide?.toLowerCase() === 'left' ? true : false}
            text={item.textEn}
          />
        );
      })}

      <p className="text-center mt-24">
        <Link
          className="btn btn-secondary text-white ml-4"
          href="/#about"
          // onClick={handleClick ? () => handleClick(1) : () => null}
        >
          {cv[0].buttonTextEn}
        </Link>
      </p>

    </PageContainer>
  )
}