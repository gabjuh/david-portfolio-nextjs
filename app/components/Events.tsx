'use client';

import React, { useState, useEffect } from "react";
import IData from "@/interfaces/IData";
import Title from "../components/Title";
import IEvents from '../../interfaces/IEvents';
import EventItem from "../components/EventItem";
import Link from "next/link";
import FilterEvents from "../components/FilterEvents";
import IEventsComponent from "@/interfaces/IEventsComponent";

const Events: React.FC<IEventsComponent> = ({ data }) => {

  const [comingEvents, setComingEvents] = useState<IEvents[]>([]);
  const [pastEvents, setPastEvents] = useState<IEvents[]>([]);
  const [archivedEvents, setArchivedEvents] = useState<IEvents[]>([]);

  const [eventTypes, setEventTypes] = useState<string[]>();
  const [selectedType, setSelectedType] = useState<string>('Alle');

  const [eventCities, setEventCities] = useState<string[]>();
  const [selectedCity, setSelectedCity] = useState<string>('Alle');

  const [selectedTimeBlock, setSelectedTimeBlock] = useState<string>('coming');
  const [selectedEvents, setSelectedEvents] = useState<IEvents[]>(); // The events that are currently selected

  const stringToDate = (date: string | undefined) => {
    if (date) {
      const dateArray = date.split('.');
      return `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`;
    }
    return '1900.01.01';
  };

  const getUpcomingEvents = () => {
    const upcomingEvents = data.events.filter((event) => {
      if (event.active === '1') {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set the time to midnight
        if (event) {
          const eventDate = new Date(stringToDate(event ? event.startDate : ''));
          eventDate.setHours(0, 0, 0, 0); // Set the time to midnight for the event date
          return eventDate >= today;
        }
      }
    });

    // Sort the upcoming events in an ascending order
    upcomingEvents.sort((a: any, b: any) => new Date(stringToDate(a.startDate)).getTime() - new Date(stringToDate(b.startDate)).getTime());

    // Filter the upcoming events by type
    upcomingEvents.filter((event) => event.category.trim() === 'Kurs');

    // Filter the upcoming events by type
    const filteredEvents = selectedType === 'Alle'
      ? upcomingEvents // No filter, all events
      : upcomingEvents.filter((event) => event.category.trim() === selectedType);

    // Filter the upcoming events by city
    const filteredCityEvents = selectedCity === 'Alle'
      ? filteredEvents // No filter, all events
      : filteredEvents.filter((event) => event.city && event.city.trim() === selectedCity);

    setComingEvents(filteredCityEvents);
  };

  const getPastEvents = () => {
    const pastEvents = data.events.filter((event) => {
      if (event.active === '1') {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set the time to midnight
        if (event) {
          const eventDate = new Date(stringToDate(event ? event.startDate : ''));
          eventDate.setHours(0, 0, 0, 0); // Set the time to midnight for the event date
          return eventDate < today;
        }
      }
    });

    // Sort the past events in a descending order
    pastEvents.sort((a: any, b: any) => new Date(stringToDate(b.startDate)).getTime() - new Date(stringToDate(a.startDate)).getTime());

    const filteredEvents = selectedType === 'Alle'
      ? pastEvents // No filter, all events
      : pastEvents.filter((event) => event.category.trim() === selectedType);

    const filteredCityEvents = selectedCity === 'Alle'
      ? filteredEvents // No filter, all events
      : filteredEvents.filter((event) => event.city && event.city.trim() === selectedCity);

    console.log(filteredCityEvents);
    setPastEvents(filteredCityEvents);
  };

  const getArchivedEvents = () => {
    const archivedEvents = data.events.filter((event) => {
      if (event.active === 'archive') {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set the time to midnight
        if (event) {
          const eventDate = new Date(stringToDate(event ? event.startDate : ''));
          eventDate.setHours(0, 0, 0, 0); // Set the time to midnight for the event date
          return eventDate < today;
        }
      }
    });

    // Sort the past events in a descending order
    archivedEvents.sort((a: any, b: any) => new Date(stringToDate(b.startDate)).getTime() - new Date(stringToDate(a.startDate)).getTime());

    const filteredEvents = selectedType === 'Alle'
      ? archivedEvents // No filter, all events
      : archivedEvents.filter((event) => event.category.trim() === selectedType);

    const filteredCityEvents = selectedCity === 'Alle'
      ? filteredEvents // No filter, all events
      : filteredEvents.filter((event) => event.city && event.city.trim() === selectedCity);

    setArchivedEvents(filteredCityEvents);
  };

  const getEventTypes = () => {
    const types: string[] = [];
    data.events.map((event) => {
      if (event.active === '1') {
        const category: string = event.category.trim(); // Remove the white spaces from the category
        if (!types.includes(category)) {
          types.push(category); // Add the category to the array if it's not already there
        }
      }
    });
    setEventTypes(types.sort()); // Sort the array alphabetically
  };

  const getEventCities = () => {
    const cities: string[] = [];
    data.events.map((event) => {
      if (event.active === '1' && event.city) {
        const city: string = event.city.trim(); // Remove the white spaces from the city
        if (!cities.includes(city)) {
          cities.push(city); // Add the city to the array if it's not already there
        }
      }
    });
    setEventCities(cities.sort()); // Sort the array alphabetically
  }

  useEffect((() => {
    // Get the events
    getUpcomingEvents();
    getPastEvents();
    getArchivedEvents();

    // Get the event types and cities
    getEventTypes();
    getEventCities();
  }), []);

  useEffect(() => {
    // Get the events again when the selected type changes
    getUpcomingEvents();
    getPastEvents();
    getArchivedEvents();
  }, [selectedType, selectedCity]);

  useEffect(() => {
    switch (selectedTimeBlock) {
      case 'coming':
        setSelectedEvents(comingEvents);
        break;
      case 'past':
        setSelectedEvents(pastEvents);
        break;
      case 'archive':
        setSelectedEvents(archivedEvents);
        break;
    }
  });

  const selectedTimeBlockText = () => {
    switch (selectedTimeBlock) {
      case 'coming':
        return 'Kommende';
      case 'past':
        return 'Vergangene';
      case 'archive':
        return 'Archivierte';
    }
  };

  return (
    <main className={`container mx-auto px-4 py-10 w-full`}>

      <Title title={data.events[0].pageTitle} />

      <FilterEvents
        eventTypes={eventTypes}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        eventCities={eventCities}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        setSelectedTimeBlock={setSelectedTimeBlock}
        selectedTimeBlock={selectedTimeBlock}
        nrOfTimeBlockEvents={[comingEvents?.length, pastEvents?.length, archivedEvents?.length]}
      />

      <>
        <div className="lg:w-[900px] xl:w-[1200px] w-full mx-auto">
          <h2 className="text-lg mb-10 mt-4 text-center sm:text-left">{selectedTimeBlockText()} Veranstaltungen</h2>

          {!selectedEvents && <p className="my-5 font-bold">Wird geladen...</p>}

          {selectedEvents?.length === 0 && <p className="my-5 italic">Keine Veranstaltungen gefunden.</p>}

          {selectedEvents?.map((event, index) => (
            <React.Fragment key={`actual-${index}`}>
              <EventItem
                title={event.title}
                category={event.category}
                startDate={event.startDate}
                endDate={event.endDate}
                startTime={event.startTime}
                // endTime={event.endTime}
                country={event.country}
                city={event.city}
                location={event.location}
                locationLink={event.locationLink}
                band={event.band}
                bandLink={event.bandLink}
                article={event.article}
                articleLink={event.articleLink}
                isPast={selectedTimeBlock !== 'coming'}
              />
            </React.Fragment>
          ))}
        </div>
      </>

    </main>
  );
};

export default Events;