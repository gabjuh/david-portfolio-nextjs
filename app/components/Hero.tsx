import IData from '@/interfaces/IData';
import Image from 'next/image';
// import getBase64 from '@/helpers/getPlaiceholder';
import UpcomingEvents from './UpcomingEvents';
// import ParallaxBannerImage from './ParallaxBannerImage';
// import getDriveId from '@/helpers/getDriveId';

export default async function Hero({ data }: { data: IData; }) {

  // const getFilenameWithThumbnails = () => {
  //   const filenameArray = hero[0].fileName ? hero[0].fileName.split('.') : '';
  //   // return `${filenameArray[0]}_thumbnail.${filenameArray[1]}`;
  //   return `${filenameArray[0]}_base64.txt`;
  // };

  const hero = data.hero;

  // const myBlurDataUrl = await getBase64(hero[0].fileName);

  // console.log(myBlurDataUrl);
  return (
    <>
      <div className="relative h-[90vh] mt-[60px]" id="hero">

        {/* <ParallaxBannerImage
          imgUrl={`https://${process.env.NEXT_PUBLIC_BACKEND_API}/img/${hero[0].fileName}`}
        /> */}

        {/* <Image
          // src={`https://api.franciskahajdu.de/img/thumbnails/${getFilenameWithThumbnails()}`}
          // blurDataURL={`https://api.franciskahajdu.de/img/thumbnails/${getFilenameWithThumbnails()}`}
          src={`https://${process.env.NEXT_PUBLIC_BACKEND_API}/img/${hero[0].fileName}`}
          // src={`https://api.franciskahajdu.de/img/franciska_hajdu_sei.png`}
          // src={`https://api.franciskahajdu.de/img/test.jpeg`}
          // placeholder="blur"
          // blurDataURL={myBlurDataUrl}
          alt="hero image"
          fill
          sizes="(min-width: 508px) 30vw, 80vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'right',
          }}
        />
        <UpcomingEvents data={data.concerts} /> */}
      </div>
    </>

  )
}
