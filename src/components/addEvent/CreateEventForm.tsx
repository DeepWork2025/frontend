import { useState} from 'react';
import { EventFormProps, EventData } from '../../types/event.types';
import { validateEventData } from '../../utils/eventValidation';
import { createEvent } from '../../api/eventApi';

const CreateEventForm: React.FC<EventFormProps> = ({
    initialDateTime,
    onSubmit,
    onClose
}) => {
  // Form state
    const [formData, setFormData] = useState<EventData>({
        title: '',
        start: initialDateTime || new Date(),
        end: new Date((initialDateTime || Date.now()) + 3600000),
        description: '',
        label: ''
    });

    const [errors, setErrors] = useState<Record<string,string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setFormData(prev => ({...prev, [name]: value}));

      // Clear error when field is changed
      if(errors[name]){
        setErrors(prev => ({...prev, [name]: ''}));
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors = validateEventData(formData);

      if(Object.keys(newErrors).length === 0){
        setIsSubmitting(true);
        try {
          await createEvent(formData);
          onSubmit(formData);
          onClose();
        } catch(error) {
          setErrors({submit: 'Failed to create event'});
        } finally {
          setIsSubmitting(false);
        }
      };

    };

return (
  <div>
     <div className="card w-full max-w-md bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Create New Event</h2>

        <form
        className='w-full'
        onSubmit={handleSubmit}>
          {errors.submit && (
            <div className="alert alert-error">{errors.submit}</div>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Event Title *</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`input input-bordered ${errors.title ? 'input-error' : ''}`}
            />
            {errors.title && (
              <span className="text-error text-sm mt-1">{errors.title}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 my-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Start Time *</span>
              </label>
              <input
                type="datetime-local"
                name="start"
                value={formData.start.toISOString().slice(0, 16)}
                onChange={handleChange}
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">End Time *</span>
              </label>
              <input
                type="datetime-local"
                name="end"
                value={formData.end.toISOString().slice(0, 16)}
                onChange={handleChange}
                className={`input input-bordered ${errors.end ? 'input-error' : ''}`}
              />
              {errors.end && (
                <span className="text-error text-sm mt-1">{errors.end}</span>
              )}
            </div>
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered"
              rows={3}
            />
          </div>

          <div className="card-actions justify-end mt-6">
            <button 
              type="button" 
              className="btn btn-ghost" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)

}

export default CreateEventForm