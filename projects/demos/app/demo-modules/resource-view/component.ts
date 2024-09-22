import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
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
  CalendarEventAction,
  CalendarView,
  CalendarEvent,
  CalendarResource,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';

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
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
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

  events: CalendarEvent[] = [
    // Events assigned to resources
    {
      id: 1247,
      start: addHours(startOfWeek(new Date()), 8),
      end: addHours(startOfWeek(new Date()), 12),
      title: 'Workshop with Dassault System',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: false,
      resources: [this.getResourceById(1), this.getResourceById(4)],
    },
    {
      id: 1248,
      start: addHours(addDays(startOfWeek(new Date()), 1), 8),
      end: addHours(addDays(startOfWeek(new Date()), 1), 12),
      title: 'Workshop with Google',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: false,
      resources: [this.getResourceById(1), this.getResourceById(4)],
    },
    {
      id: 1249,
      start: addHours(addDays(startOfWeek(new Date()), 3), 8),
      end: addHours(addDays(startOfWeek(new Date()), 3), 12),
      title: 'Workshop with Netflix',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: false,
      resources: [this.getResourceById(1), this.getResourceById(2)],
    },
    {
      id: 1250,
      start: addHours(startOfWeek(new Date()), 14),
      end: addHours(startOfWeek(new Date()), 18),
      title: 'Product demonstration',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: false,
      resources: [this.getResourceById(2), this.getResourceById(4)],
    },
    {
      id: 1251,
      start: addHours(addDays(startOfWeek(new Date()), 2), 8),
      end: addHours(addDays(startOfWeek(new Date()), 2), 12),
      title: 'Call for tenders',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: false,
      resources: [this.getResourceById(3)],
    },
    {
      id: 1252,
      start: addHours(addDays(startOfWeek(new Date()), 4), 14),
      end: addHours(addDays(startOfWeek(new Date()), 4), 18),
      title: 'Call for tenders',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: false,
      resources: [this.getResourceById(3)],
    },
    {
      id: 1253,
      start: addHours(addDays(startOfWeek(new Date()), 4), 8),
      end: addHours(addDays(startOfWeek(new Date()), 4), 12),
      title: 'Workshop with Amazon',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: false,
      resources: [
        this.getResourceById(1),
        this.getResourceById(3),
        this.getResourceById(5),
      ],
    },
    {
      id: 1254,
      start: addHours(addDays(startOfWeek(new Date()), 3), 8),
      end: addHours(addDays(startOfWeek(new Date()), 3), 12),
      title: 'Customer weekly meeting',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: false,
      resources: [this.getResourceById(5)],
    },
    {
      id: 1255,
      start: addHours(addDays(startOfWeek(new Date()), 3), 13),
      end: addHours(addDays(startOfWeek(new Date()), 3), 15),
      title: 'App Insight Verification',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: false,
      resources: [this.getResourceById(5)],
    },
    {
      id: 1256,
      start: addHours(addDays(startOfWeek(new Date()), 3), 15),
      end: addHours(addDays(startOfWeek(new Date()), 3), 19),
      title: 'Customers Tickets Review',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: false,
      resources: [this.getResourceById(5)],
    },
    {
      id: 1257,
      start: addHours(addDays(startOfWeek(new Date()), 5), 8),
      end: addHours(addDays(startOfWeek(new Date()), 5), 12),
      title: 'Team Building',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: true,
      resources: [
        this.getResourceById(1),
        this.getResourceById(2),
        this.getResourceById(3),
        this.getResourceById(4),
        this.getResourceById(5),
      ],
    },
    // Events not assigned to a resource
    {
      id: 1258,
      start: startOfWeek(new Date()),
      end: addDays(startOfWeek(new Date()), 2),
      title: 'A 3 day event',
      color: { ...colors.red },
      actions: this.actions,
      allDay: true,
    },
    {
      id: 1259,
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: { ...colors.yellow },
      actions: this.actions,
    },
    {
      id: 1260,
      start: addDays(startOfWeek(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: { ...colors.blue },
      allDay: true,
    },
  ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
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

  handleEvent(action: string, event: CalendarEvent): void {
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

  deleteEvent(eventToDelete: CalendarEvent) {
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
