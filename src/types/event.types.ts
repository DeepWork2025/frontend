// 假设仅有day view的事件，不包含日期
export interface EventData {
  id?: string;
  title: string;
    startTime: string;
    endTime: string;
    description?: string;
    label: string;
  }

  export interface EventFormProps {
    // initialDateTime?: Date;
    onSubmit: (event: EventData) => void;
    onClose: () => void;
  }