import React from 'react';
import Title from './Title';
import IData from '../../interfaces/IData';
import EventItem from './EventItem';

export default function Events ({ data }: {data: IData}) {

  const stringToDate = (date: string | undefined) => {
    if (date) {
      const dateArray = date.split('.');
      return `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`;
    }
    return '01.01.1900';
  };

  // const getActualEvents = () => {
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0); // Set the time to midnight
  
  //   return data?.filter((event) => {
  //     if (event) {
  //       const eventDate = new Date(stringToDate(event ? event.startDate : ''));
  //       eventDate.setHours(0, 0, 0, 0); // Set the time to midnight for the event date
  //       return eventDate >= today;
  //     }
  //   });
  // };

  const getUpcomingEvents = () => {
    const upcomingEvents = data.concerts.filter((event) => {
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
    const pastEvents = data.concerts.filter((event) => {
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

  const comingEvents = getUpcomingEvents();
  const isAnyUpcomingEvents = comingEvents.some(event => event.active === '1');

  const pastEvents = getPastEvents();
  const isAnyPastEvents = pastEvents.some(event => event.active === '1');

  return (
    <>
      <div className="mb-32">
        <Title title={data.concerts[0].pageTitle} id="concerts" />
        <div className="lg:w-[900px] xl:w-[1200px] w-full mx-auto">
          {data && comingEvents?.map((event, index) => (
            <React.Fragment key={`actual-${index}`}>
              {event.active === '1' && (
                <EventItem
                  data={event}
                  isPast={false}
                />
              )}
            </React.Fragment>
          ))}
          {!isAnyUpcomingEvents && (
            <p className="text-center mt-5">Stay tuned! :-)</p>
          )}

          {isAnyPastEvents &&
            <>
            <Title title={"Past Concerts"} />
            {data && pastEvents?.map((event, index) => (
              <React.Fragment key={`past-${index}`}>
                {event.active === '1' && (
                  <EventItem
                    data={event}
                    isPast={true}
                  />
                )}
              </React.Fragment>
            ))
              }
            </>}
        </div>
      </div>
    </>
  );
};
