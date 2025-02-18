import React, { useRef, useState, useEffect } from "react";
import EventCreator from '../event/EventCreator';
import CreateEventForm from '../event/CreateEventForm';
import EventManager from '../event/EventManager';
import { EventBlockProps } from "../event/EventBlock";

interface TimeAxisProps {
  events: EventBlockProps[];
  onEventCreate?: (event: EventBlockProps) => void;
}

const TimeAxis: React.FC<TimeAxisProps> = ({
  events = [],
  onEventCreate
}) => {
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
    setEventTime({ startTime, endTime });
    setShowEventForm(true);
  };

  const handleEventSubmit = (eventData: EventBlockProps) => {
    onEventCreate?.(eventData);
    setShowEventForm(false);
  };

  return (
    <div className="relative">
      <div
        className="h-[540px] w-full overflow-y-auto bg-gray-100 border border-gray-300 shadow-md rounded-md"
        ref={containerRef}
      >
        <div className="relative">
          <EventCreator onCreateEvent={handleCreateEvent} />
          <EventManager events={events} />

          {/* Time axis */}
          {hours.map((hour) => (
            <div key={`hour-${hour}`} className="flex items-center h-12 px-4">
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
          ))}
        </div>
      </div>

      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="relative bg-base-100 rounded-lg max-h-[90vh] overflow-y-auto">
            <CreateEventForm
              initialStartTime={eventTime.startTime}
              initialEndTime={eventTime.endTime}
              onSubmit={handleEventSubmit}
              onClose={() => setShowEventForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeAxis;
