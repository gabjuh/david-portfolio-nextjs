import React from "react";
import IData from "@/interfaces/IData";
import Title from "../components/Title";
import IEvents from '../../interfaces/IEvents';
import EventItem from "../components/EventItem";
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

  const getUpcomingEvents = () => {
    const upcomingEvents = data.events.filter((event) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set the time to midnight
      if (event) {
        const eventDate = new Date(stringToDate(event ? event.startDate : ''));
        eventDate.setHours(0, 0, 0, 0); // Set the time to midnight for the event date
        return eventDate >= today;
      }
    });

    // Sort the upcoming events in an ascending order
    upcomingEvents.sort((a: any, b: any) => new Date(stringToDate(a.startDate)).getTime() - new Date(stringToDate(b.startDate)).getTime());

    return upcomingEvents;
  };

  const getPastEvents = () => {
    const pastEvents = data.events.filter((event) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set the time to midnight
      if (event) {
        const eventDate = new Date(stringToDate(event ? event.startDate : ''));
        eventDate.setHours(0, 0, 0, 0); // Set the time to midnight for the event date
        return eventDate < today;
      }
    });

    // Sort the past events in a descending order
    pastEvents.sort((a: any, b: any) => new Date(stringToDate(b.startDate)).getTime() - new Date(stringToDate(a.startDate)).getTime());

    return pastEvents;
  };

  return (
    <main className={`container mx-auto px-4 py-10 w-full`}>

      <Title title={data.events[0].pageTitle} />

      <>
        <div className="lg:w-[900px] xl:w-[1200px] w-full mx-auto">
          <h2 className="text-lg mb-10 text-center sm:text-left">Aktuelle Veranstaltungen</h2>
          {data && getUpcomingEvents()?.map((event, index) => (
            <React.Fragment key={`actual-${index}`}>
              {event.active === '1' && (
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
                  isPast={false}
                />
              )}
            </React.Fragment>
          ))}

          <h2 className="text-lg mb-10 text-center sm:text-left">Vergangene Veranstaltungen</h2>
          {data && getPastEvents()?.map((event, index) => (
            <React.Fragment key={`past-${index}`}>
              {event.active === '1' && (
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
          <Link href="/events/archive" className="btn btn-secondary text-white w-full">Archive anschauen</Link>
        </div>
      </>

    </main>
  );
}
