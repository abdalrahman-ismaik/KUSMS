declare module 'react-big-calendar' {
  import { ComponentType } from 'react';

  export interface Event {
    id?: string;
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    resource?: any;
  }

  export interface CalendarProps {
    localizer: any;
    events: any[];
    startAccessor?: string | ((event: any) => Date);
    endAccessor?: string | ((event: any) => Date);
    style?: React.CSSProperties;
    onSelectEvent?: (event: any) => void;
    onSelectSlot?: (slotInfo: { start: Date; end: Date; action?: string }) => void;
    selectable?: boolean;
    view?: string;
    onView?: (view: any) => void;
    eventPropGetter?: (event: any) => { style?: React.CSSProperties; className?: string };
    [key: string]: any;
  }

  export const Calendar: ComponentType<CalendarProps>;

  export function dateFnsLocalizer(config: {
    format: (date: Date, formatStr: string, options?: any) => string;
    parse: (dateStr: string, formatStr: string, referenceDate: Date, options?: any) => Date;
    startOfWeek: (date: Date, options?: any) => Date;
    getDay: (date: Date) => number;
    locales: { [key: string]: any };
  }): any;
}
