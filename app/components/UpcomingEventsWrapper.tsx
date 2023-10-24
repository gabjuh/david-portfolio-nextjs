import React from "react";

interface IUpcomingEventsWrapper {
  children?: React.ReactNode;
}

const UpcomingEventsWrapper: React.FC<IUpcomingEventsWrapper> = ({ children }) => {

  return (
    <>
      <div className={`hidden lg:block absolute left-[8%] top-[12%] bg-[#0002] rounded-md text-white lg:w-[300px] xl:w-[400px] 2xl:w-[500px] px-3 py-8 box-content max-h-[75%] overflow-auto`}>
        {children}
      </div>
      <div className="lg:hidden container mx-auto text-center my-16">
        {children}
      </div>
    </>
  );
};

export default UpcomingEventsWrapper;