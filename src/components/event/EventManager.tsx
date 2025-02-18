// src/components/event/EventManager.tsx
import React from 'react';
import EventBlock, { EventBlockProps } from './EventBlock';

interface EventManagerProps {
  events: EventBlockProps[];
}

const EventManager: React.FC<EventManagerProps> = ({ events = [] }) => {
  // Check for overlapping events
  const checkOverlap = (event: EventBlockProps, index: number) => {
    return events.some((otherEvent, otherIndex) => {
      if (index === otherIndex) return false;
      
      const eventStart = parseInt(event.startTime.split(':')[0]);
      const eventEnd = parseInt(event.endTime.split(':')[0]);
      const otherStart = parseInt(otherEvent.startTime.split(':')[0]);
      const otherEnd = parseInt(otherEvent.endTime.split(':')[0]);
      
      return (eventStart < otherEnd && eventEnd > otherStart);
    });
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {events.map((event, index) => (
        <EventBlock
          key={`event-${index}`}
          {...event}
          isOverlapping={checkOverlap(event, index)}
        />
      ))}
    </div>
  );
};

export default EventManager;