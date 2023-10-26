'use client';

import IFilterEvents from "@/interfaces/IFilterEvents";

const FilterEvents: React.FC<IFilterEvents> = ({
  eventTypes,
  selectedType,
  setSelectedType,
  eventCities,
  selectedCity,
  setSelectedCity,
  setSelectedTimeBlock,
  selectedTimeBlock,
  nrOfTimeBlockEvents
}) => {

  const handleTypeChange = (e: any) => {
    setSelectedType(e.target.value);
  };

  const handleCityChange = (e: any) => {
    setSelectedCity(e.target.value);
  }
  
  const handleTimeBlockButtonClick = (e: any) => {
    setSelectedTimeBlock(e.target.value);
  };

  return (
    <div className="bg-base-200 p-4 rounded-xl mb-8">
      <p className="mb-3">Veranstaltungen filtern nach</p>

      {/* Time block */}
      <span className="mr-5">Zeitraum: </span>
      <button
        className={`btn btn-xs btn-outline rounded-lg font-normal mr-2 }`}
        style={{
          backgroundColor: selectedTimeBlock === 'coming' ? '#666' : '',
          color: selectedTimeBlock === 'coming' ? '#fff' : ''
        }}
        value="coming"
        onClick={(handleTimeBlockButtonClick)}
      >
        Kommende ({nrOfTimeBlockEvents[0]})
      </button>
      <button
        className={`btn btn-xs btn-outline rounded-lg font-normal mr-2 }`}
        style={{
          backgroundColor: selectedTimeBlock === 'past' ? '#666' : '',
          color: selectedTimeBlock === 'past' ? '#fff' : ''
        }}
        value="past"
        onClick={handleTimeBlockButtonClick}
      >
        Vergangene ({nrOfTimeBlockEvents[1]})
      </button>
      <button
        className={`btn btn-xs btn-outline rounded-lg font-normal mr-2 }`}
        style={{
          backgroundColor: selectedTimeBlock === 'archive' ? '#666' : '',
          color: selectedTimeBlock === 'archive' ? '#fff' : ''
        }}
        value="archive"
        onClick={handleTimeBlockButtonClick}
      >
        Archiv ({nrOfTimeBlockEvents[2]})
      </button>

      {/* Type */}
      <span className="mr-5 ml-3">Typ:</span>
      <select
        className="min-w-[100px] text-center bg-white rounded h-[1.4rem] font-normal"
        onChange={handleTypeChange}
      >

        {eventTypes && eventTypes?.length > 1 ?
          <option value="Alle">Alle</option> :
          <option disabled>empty</option>}

        {eventTypes && eventTypes?.map((eventType, index) => (
          <option value={eventType} key={`eventType-${index}`}>{eventType}</option>
        ))}
      </select>

      {/* City */}
      <span className="mr-5 ml-5">Ort:</span>
      <select
        className="min-w-[100px] text-center bg-white rounded h-[1.4rem] font-normal"
        onChange={handleCityChange}
      >

        {eventCities && eventCities?.length > 1 ?
          <option value="Alle">Alle</option> :
          <option disabled>empty</option>}

        {eventCities && eventCities?.map((eventCity, index) => (
          <option value={eventCity} key={`eventCity-${index}`}>{eventCity}</option>
        ))}
      </select>
      
    </div>
  );
};

export default FilterEvents;
