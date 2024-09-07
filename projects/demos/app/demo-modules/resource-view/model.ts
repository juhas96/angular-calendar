import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

export interface ResourceCalendarEvent<
  MetaType = any,
  CalendarResourceMetaType = any
> extends CalendarEvent<MetaType> {
  resources?: CalendarResource<CalendarResourceMetaType>[];
}

export type CalendarResourceIdType = string | number;

export interface CalendarResource<CalendarResourceMetaType = any> {
  name: string;
  id: CalendarResourceIdType;
  meta?: CalendarResourceMetaType;
}
