import React from "react";
import IData from "@/interfaces/IData";
import Title from "../../components/Title";
import IEvents from '../../../interfaces/IEvents';
import EventItem from "../../components/EventItem";
import Link from "next/link";

export default async function HomePage() {

  const apiUrl = `https://${process.env.NEXT_PUBLIC_BACKEND_API}`;

  async function getData() {
    const res = await fetch(`${apiUrl}/data.json`,
      { cache: 'no-store' }
    );
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }

  const data: IData = await getData();


  const stringToDate = (date: string | undefined) => {
    if (date) {
      const dateArray = date.split('.');
      return `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`;
    }
    return '1900.01.01';
  };

  data.events.sort((a: any, b: any) => new Date(stringToDate(b.startDate)).getTime() - new Date(stringToDate(a.startDate)).getTime());

  return (
    <main className={`container mx-auto px-4 py-10 w-full`}>

      <Title title={'Archivierte Termine'} />
      <>
        <div className="lg:w-[900px] xl:w-[1200px] w-full mx-auto">

          {data && data.events.map((event, index) => (
            <React.Fragment key={`past-${index}`}>
              {event.active === 'archive' && (
                <EventItem
                  title={event.title}
                  category={event.category}
                  startDate={event.startDate}
                  endDate={event.endDate}
                  startTime={event.startTime}
                  // endTime={event.endTime}
                  location={event.location}
                  locationLink={event.locationLink}
                  band={event.band}
                  bandLink={event.bandLink}
                  article={event.article}
                  articleLink={event.articleLink}
                  isPast={true}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mx-auto w-[250px] mb-[75px]">
          <Link href="/events" className="btn btn-secondary text-white w-full">Zurück zu Termine</Link>
        </div>
      </>
    </main>
  );
}
