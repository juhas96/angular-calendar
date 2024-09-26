import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChildren,
  ElementRef,
  QueryList,
} from '@angular/core';
import { CalendarEvent, WeekDay } from 'calendar-utils';
import { trackByWeekDayHeaderDate } from '../../../common/util/util';

@Component({
  selector: 'mwl-calendar-resource-month-view-header',
  template: `
    <ng-template
      #defaultTemplate
      let-days="days"
      let-locale="locale"
      let-dayHeaderClicked="dayHeaderClicked"
      let-eventDropped="eventDropped"
      let-trackByWeekDayHeaderDate="trackByWeekDayHeaderDate"
      let-dragEnter="dragEnter"
    >
      <div #header class="cal-day-headers" role="row">
        <div class="cal-header" style="min-width: 120px; border-right: 0"></div>
        <div #scrollContainer class="cal-header-scrollable-container">
          <div *ngFor="let day of days" class="cal-header">
            T: {{ day.date | calendarDate : 'getWeekNumber' : locale }}
          </div>
        </div>
      </div>
      <div #header class="cal-day-headers" role="row">
        <div class="cal-header" style="min-width: 120px; border-right: 0"></div>
        <div #scrollContainer class="cal-header-scrollable-container">
          <div
            class="cal-header"
            *ngFor="let day of days; trackBy: trackByWeekDayHeaderDate"
            [class.cal-past]="day.isPast"
            [class.cal-today]="day.isToday"
            [class.cal-future]="day.isFuture"
            [class.cal-weekend]="day.isWeekend"
            [ngClass]="day.cssClass"
            (mwlClick)="
              dayHeaderClicked.emit({ day: day, sourceEvent: $event })
            "
            mwlDroppable
            dragOverClass="cal-drag-over"
            (drop)="
              eventDropped.emit({
                event: $event.dropData.event,
                newStart: day.date
              })
            "
            (dragEnter)="dragEnter.emit({ date: day.date })"
            tabindex="0"
            role="columnheader"
          >
            <b>{{
              day.date | calendarDate : 'monthViewColumnHeader' : locale
            }}</b
            ><br />
            <span>{{
              day.date | calendarDate : 'monthViewDayNumber' : locale
            }}</span>
          </div>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        days: days,
        locale: locale,
        dayHeaderClicked: dayHeaderClicked,
        eventDropped: eventDropped,
        dragEnter: dragEnter,
        trackByWeekDayHeaderDate: trackByWeekDayHeaderDate
      }"
    >
    </ng-template>
  `,
})
export class CalendarMonthViewHeaderComponent {
  @Input() days: WeekDay[];
  @Input() weeks: number[];

  @Input() locale: string;

  @Input() customTemplate: TemplateRef<any>;

  @Output() dayHeaderClicked = new EventEmitter<{
    day: WeekDay;
    sourceEvent: MouseEvent;
  }>();

  @Output() eventDropped = new EventEmitter<{
    event: CalendarEvent;
    newStart: Date;
  }>();

  @Output() dragEnter = new EventEmitter<{ date: Date }>();

  @ViewChildren('scrollContainer') headers: QueryList<
    ElementRef<HTMLDivElement>
  >;

  trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;

  scrollElements(scrollLeft: number): void {
    this.headers.forEach(
      (header) => (header.nativeElement.scrollLeft = scrollLeft)
    );
  }
}
