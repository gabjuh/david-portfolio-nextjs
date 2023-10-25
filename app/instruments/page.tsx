import IData from "@/interfaces/IData";
import Link from "next/link";
import Image from "next/image";
import convertStringToUrlFriendly from "@/helpers/convertStringToUrlFriendly";
import Title from "../components/Title";
import ImageAndText from "../components/ImageAndText";

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
        return (
          <ImageAndText
            key={index}
            fileName={item.fileName}
            alt={item.imgAlt}
            imageLeft={item.imgOnSide?.toLowerCase() === 'left' ? true : false}
            loaded={true}
            text={item.text}
          />
        );
      })}

    </main>
  )
}
