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
      
      <Title title={data.biography[0].pageTitle} />

      <ImageAndText
        fileName={data.biography[0].fileName}
        alt={data.biography[0].imgAlt}
        imageLeft={data.biography[0].imgOnSide === 'left' ? true : false}
        // classNameForImg="rounded-full"
        loaded={true}
        text={data.biography[0].text ?? ''}
      />

      <p className="text-center mt-24">
        {data.biography[0].question}
        <Link
          className="btn btn-secondary text-white ml-4"
          href="/instruments"
          // onClick={() => handleClick(1)}
        >
          {data.biography[0].buttonText}
        </Link>
      </p>
    </main>
  )
}
