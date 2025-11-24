declare module 'react-big-calendar' {
  import { ComponentType } from 'react';

  export interface Event {
    id?: string;
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    resource?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }

  export interface CalendarProps {
    localizer: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    events: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
    startAccessor?: string | ((event: any) => Date); // eslint-disable-line @typescript-eslint/no-explicit-any
    endAccessor?: string | ((event: any) => Date); // eslint-disable-line @typescript-eslint/no-explicit-any
    style?: React.CSSProperties;
    onSelectEvent?: (event: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
    onSelectSlot?: (slotInfo: { start: Date; end: Date; action?: string }) => void;
    selectable?: boolean;
    view?: string;
    onView?: (view: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
    eventPropGetter?: (event: any) => { style?: React.CSSProperties; className?: string }; // eslint-disable-line @typescript-eslint/no-explicit-any
    [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }

  export const Calendar: ComponentType<CalendarProps>;

  export function dateFnsLocalizer(config: {
    format: (date: Date, formatStr: string, options?: any) => string; // eslint-disable-line @typescript-eslint/no-explicit-any
    parse: (dateStr: string, formatStr: string, referenceDate: Date, options?: any) => Date; // eslint-disable-line @typescript-eslint/no-explicit-any
    startOfWeek: (date: Date, options?: any) => Date; // eslint-disable-line @typescript-eslint/no-explicit-any
    getDay: (date: Date) => number;
    locales: { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
  }): any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
