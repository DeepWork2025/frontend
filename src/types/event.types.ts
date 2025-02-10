export interface EventData {
  id?: string;
  title: string;
    startTime: Date;
    endTime: Date;
    description?: string;
    label: string;
  }

  export interface EventFormProps {
    initialDateTime?: Date;
    onSubmit: (event: EventData) => void;
    onClose: () => void;
  }