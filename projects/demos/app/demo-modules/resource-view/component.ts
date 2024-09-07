import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  startOfWeek,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { CalendarResource, ResourceCalendarEvent } from './model';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  templateUrl: 'template.html',
})
export class DemoComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: ResourceCalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: ResourceCalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: ResourceCalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  resources: CalendarResource[] = [
    {
      id: 1,
      name: 'Jean-Donald',
    },
    {
      id: 2,
      name: 'Laeticia',
    },
    {
      id: 3,
      name: 'Mateo',
    },
    {
      id: 4,
      name: 'Khephren',
    },
    {
      id: 5,
      name: 'Diane',
    },
  ];

  events: ResourceCalendarEvent[] = [
    // Events with loaded resources
    {
      start: startOfWeek(new Date()),
      end: addHours(startOfWeek(new Date()), 8),
      title: 'RDV 1',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      resources: [this.getResourceById(1), this.getResourceById(4)],
    },
    {
      start: addDays(startOfWeek(new Date()), 1),
      end: addHours(addDays(startOfWeek(new Date()), 1), 8),
      title: 'RDV 2',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      resources: [this.getResourceById(1), this.getResourceById(4)],
    },
    {
      start: addDays(startOfWeek(new Date()), 3),
      end: addHours(addDays(startOfWeek(new Date()), 3), 8),
      title: 'RDV 3',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      resources: [this.getResourceById(1)],
    },
    {
      start: startOfWeek(new Date()),
      end: addDays(startOfWeek(new Date()), 1),
      title: 'RDV 4',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      resources: [this.getResourceById(2), this.getResourceById(4)],
    },
    {
      start: addDays(startOfWeek(new Date()), 2),
      end: addHours(addDays(startOfWeek(new Date()), 2), 8),
      title: 'RDV 5',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      resources: [this.getResourceById(3)],
    },
    {
      start: addHours(addDays(startOfWeek(new Date()), 4), 8),
      end: addHours(addDays(startOfWeek(new Date()), 4), 12),
      title: 'RDV 6',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      resources: [this.getResourceById(3)],
    },
    {
      start: addHours(addDays(startOfWeek(new Date()), 4), 14),
      end: addHours(addDays(startOfWeek(new Date()), 4), 18),
      title: 'RDV 7',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      resources: [this.getResourceById(3)],
    },
    {
      start: addHours(addDays(startOfWeek(new Date()), 3), 8),
      end: addHours(addDays(startOfWeek(new Date()), 3), 12),
      title: 'RDV 8',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      resources: [this.getResourceById(5)],
    },
    {
      start: addHours(addDays(startOfWeek(new Date()), 3), 12),
      end: addHours(addDays(startOfWeek(new Date()), 3), 15),
      title: 'RDV 9',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      resources: [this.getResourceById(5)],
    },
    {
      start: addHours(addDays(startOfWeek(new Date()), 3), 15),
      end: addHours(addDays(startOfWeek(new Date()), 3), 19),
      title: 'RDV 10',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      resources: [this.getResourceById(5)],
    },

    // Events without loaded resources
    {
      start: startOfWeek(new Date()),
      end: addDays(startOfWeek(new Date()), 1),
      title: 'A 3 day event',
      color: { ...colors.red },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      resources: [this.getResourceById(2)],
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: { ...colors.yellow },
      actions: this.actions,
      resources: [],
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: { ...colors.blue },
      allDay: true,
      resources: [],
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: { ...colors.yellow },
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      resources: [],
    },
  ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal) {}

  dayClicked({
    date,
    events,
  }: {
    date: Date;
    events: ResourceCalendarEvent[];
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: ResourceCalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: ResourceCalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  private getResourceById(id: number): CalendarResource {
    return this.resources.find((resource) => resource.id === id);
  }
}
