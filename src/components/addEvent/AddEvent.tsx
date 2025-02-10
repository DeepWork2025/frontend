import EventForm from './CreateEventForm';
import { EventData } from '../../types/event.types';
import {useState} from 'react';

function AddEvent() {
  const [showEventForm, setShowEventForm] = useState(false);

  const handleEventSubmit = (eventData: EventData) => {
    //Handle successful event creation
    console.log('Event created:'
    , eventData);
    setShowEventForm(false); // Close form after submission
  }
  return (
    <div>
      <button
      className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
      onClick={()=> setShowEventForm(true)}
      >Create Event</button>

      {/* Event Form Modal */}
      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="relative bg-base-100 rounded-lg max-h-[90vh] overflow-y-auto">
          <EventForm
            initialDateTime={new Date()}
            onSubmit={handleEventSubmit}
            onClose={() => setShowEventForm(false)}
          />
        </div>
      </div>
      )}
    </div>
  )
}

export default AddEvent