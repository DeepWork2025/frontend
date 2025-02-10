import React, { useRef, useState, useEffect } from "react";
import EventCreator from '../addEvent/EventCreator';
import CreateEventForm from '../addEvent/CreateEventForm';

const TimeAxis: React.FC = () => {
  const hours = Array.from({ length: 24 }, (_, hour) => hour);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventTime, setEventTime] = useState({ startTime: '', endTime: ''});

  useEffect(() => {
    if (containerRef.current) {
      const scrollOffset = 8 * 48;
      containerRef.current.scrollTop = scrollOffset;
    }
  }, []);

  const handleCreateEvent = (startTime: string, endTime: string) => {
    setEventTime({startTime, endTime});
    setShowEventForm(true);
  }

  const handleEventSubmit = (eventData: any) => {
    // event submission logic
    console.log('Event created', eventData);
    setShowEventForm(false);
  }

  return (
    <div className="relative">
    <div
      className="h-[540px] w-full overflow-y-auto bg-gray-100 border border-gray-300 shadow-md rounded-md"
      ref={containerRef}
    >
      <EventCreator onCreateEvent={handleCreateEvent} />

      {hours.map((hour) => (
      <div>
        <div key={hour} className="flex items-center h-12  px-4">
          <div className="w-16 text-right text-gray-700 font-medium">
            {hour === 0
              ? "12 AM"
              : hour < 12
              ? `${hour} AM`
              : hour === 12
              ? "12 PM"
              : `${hour - 12} PM`}
          </div>

          <div className="flex-grow h-px bg-gray-300 ml-4"></div>
        </div>
      </div>))}
    </div>

    {showEventForm && (
      <CreateEventForm
        initialStartTime={eventTime.startTime}
        initialEndTime={eventTime.endTime}
        onSubmit={handleEventSubmit}
        onClose={()=> setShowEventForm(false)} />
    )}
  </div>
  );
};

export default TimeAxis;
