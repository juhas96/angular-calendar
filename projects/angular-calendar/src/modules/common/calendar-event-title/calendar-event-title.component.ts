import { Component, Input, TemplateRef } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-event-title',
  template: `
    <ng-template #defaultTemplate let-event="event" let-view="view">
      <span
        class="cal-event-title"
        [innerHTML]="
          (event.allDay
            ? 'All day'
            : (event.start | date : 'HH:mm') +
              ' - ' +
              (event.end | date : 'HH:mm')) +
          ' | ' +
          (event.title | calendarEventTitle : view : event)
        "
        [attr.aria-hidden]="{} | calendarA11y : 'hideEventTitle'"
      >
      </span>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
        view: view
      }"
    >
    </ng-template>
  `,
})
export class CalendarEventTitleComponent {
  @Input() event: CalendarEvent;

  @Input() customTemplate: TemplateRef<any>;

  @Input() view: string;
}
