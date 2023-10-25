import IData from "@/interfaces/IData";
import Link from "next/link";
import Image from "next/image";
import convertStringToUrlFriendly from "@/helpers/convertStringToUrlFriendly";

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
      <div className="mt-12">
        <Image
          className="lg:max-w-[400px] w-full mx-auto rounded-md drop-shadow-xl"
          src={`${apiUrl}/img/${convertStringToUrlFriendly(data.biography[0].fileName)}`}
          alt={data.biography[0].imgAlt}
          width={400}
          height={200}
          priority={true}
        />
      </div>
      <div className="w-full mt-10 text-center">
        <Link
          href="/biography"
          className="btn btn-secondary text-white"
          // onClick={() => handleClick(0)}
        >
          {data.home[0].buttonText}
        </Link>
      </div>
    </main>
  )
}
