import { Component, Input, Output, EventEmitter, } from '@angular/core';
import { trackByWeekDayHeaderDate } from '../../../common/util/util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "angular-draggable-droppable";
import * as i3 from "../../../common/click/click.directive";
import * as i4 from "../../../common/calendar-date/calendar-date.pipe";
export class CalendarMonthViewHeaderComponent {
    constructor() {
        this.dayHeaderClicked = new EventEmitter();
        this.eventDropped = new EventEmitter();
        this.dragEnter = new EventEmitter();
        this.trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;
    }
}
CalendarMonthViewHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarMonthViewHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CalendarMonthViewHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.3", type: CalendarMonthViewHeaderComponent, selector: "mwl-calendar-resource-month-view-header", inputs: { days: "days", weeks: "weeks", locale: "locale", customTemplate: "customTemplate" }, outputs: { dayHeaderClicked: "dayHeaderClicked", eventDropped: "eventDropped", dragEnter: "dragEnter" }, ngImport: i0, template: `
    <ng-template
      #defaultTemplate
      let-days="days"
      let-locale="locale"
      let-dayHeaderClicked="dayHeaderClicked"
      let-eventDropped="eventDropped"
      let-trackByWeekDayHeaderDate="trackByWeekDayHeaderDate"
      let-dragEnter="dragEnter"
    >
      <div class="cal-day-headers" role="row">
        <div *ngFor="let day of days" class="cal-header">
          T: {{ day.date | calendarDate : 'getWeekNumber' : locale }}
        </div>
      </div>
      <div class="cal-day-headers" role="row">
        <div
          class="cal-header"
          *ngFor="let day of days; trackBy: trackByWeekDayHeaderDate"
          [class.cal-past]="day.isPast"
          [class.cal-today]="day.isToday"
          [class.cal-future]="day.isFuture"
          [class.cal-weekend]="day.isWeekend"
          [ngClass]="day.cssClass"
          (mwlClick)="dayHeaderClicked.emit({ day: day, sourceEvent: $event })"
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
          <b>{{ day.date | calendarDate : 'monthViewColumnHeader' : locale }}</b
          ><br />
          <span>{{
            day.date | calendarDate : 'monthViewDayNumber' : locale
          }}</span>
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
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2.DroppableDirective, selector: "[mwlDroppable]", inputs: ["dragOverClass", "dragActiveClass", "validateDrop"], outputs: ["dragEnter", "dragLeave", "dragOver", "drop"] }, { kind: "directive", type: i3.ClickDirective, selector: "[mwlClick]", inputs: ["clickListenerDisabled"], outputs: ["mwlClick"] }, { kind: "pipe", type: i4.CalendarDatePipe, name: "calendarDate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarMonthViewHeaderComponent, decorators: [{
            type: Component,
            args: [{
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
      <div class="cal-day-headers" role="row">
        <div *ngFor="let day of days" class="cal-header">
          T: {{ day.date | calendarDate : 'getWeekNumber' : locale }}
        </div>
      </div>
      <div class="cal-day-headers" role="row">
        <div
          class="cal-header"
          *ngFor="let day of days; trackBy: trackByWeekDayHeaderDate"
          [class.cal-past]="day.isPast"
          [class.cal-today]="day.isToday"
          [class.cal-future]="day.isFuture"
          [class.cal-weekend]="day.isWeekend"
          [ngClass]="day.cssClass"
          (mwlClick)="dayHeaderClicked.emit({ day: day, sourceEvent: $event })"
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
          <b>{{ day.date | calendarDate : 'monthViewColumnHeader' : locale }}</b
          ><br />
          <span>{{
            day.date | calendarDate : 'monthViewDayNumber' : locale
          }}</span>
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
                }]
        }], propDecorators: { days: [{
                type: Input
            }], weeks: [{
                type: Input
            }], locale: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }], dayHeaderClicked: [{
                type: Output
            }], eventDropped: [{
                type: Output
            }], dragEnter: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldy1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1jYWxlbmRhci9zcmMvbW9kdWxlcy9yZXNvdXJjZS1tb250aC9jYWxlbmRhci1yZXNvdXJjZS1tb250aC12aWV3L2NhbGVuZGFyLXJlc291cmNlLW1vbnRoLXZpZXctaGVhZGVyL2NhbGVuZGFyLXJlc291cmNlLW1vbnRoLXZpZXctaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxHQUViLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7Ozs7QUErRHJFLE1BQU0sT0FBTyxnQ0FBZ0M7SUE3RDdDO1FBcUVZLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUd6QyxDQUFDO1FBRUssaUJBQVksR0FBRyxJQUFJLFlBQVksRUFHckMsQ0FBQztRQUVLLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBa0IsQ0FBQztRQUV6RCw2QkFBd0IsR0FBRyx3QkFBd0IsQ0FBQztLQUNyRDs7NkhBckJZLGdDQUFnQztpSEFBaEMsZ0NBQWdDLHNSQTNEakM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlEVDsyRkFFVSxnQ0FBZ0M7a0JBN0Q1QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx5Q0FBeUM7b0JBQ25ELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeURUO2lCQUNGOzhCQUVVLElBQUk7c0JBQVosS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsTUFBTTtzQkFBZCxLQUFLO2dCQUVHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBRUksZ0JBQWdCO3NCQUF6QixNQUFNO2dCQUtHLFlBQVk7c0JBQXJCLE1BQU07Z0JBS0csU0FBUztzQkFBbEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50LCBXZWVrRGF5IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL3V0aWwvdXRpbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci1yZXNvdXJjZS1tb250aC12aWV3LWhlYWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICAjZGVmYXVsdFRlbXBsYXRlXG4gICAgICBsZXQtZGF5cz1cImRheXNcIlxuICAgICAgbGV0LWxvY2FsZT1cImxvY2FsZVwiXG4gICAgICBsZXQtZGF5SGVhZGVyQ2xpY2tlZD1cImRheUhlYWRlckNsaWNrZWRcIlxuICAgICAgbGV0LWV2ZW50RHJvcHBlZD1cImV2ZW50RHJvcHBlZFwiXG4gICAgICBsZXQtdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlPVwidHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlXCJcbiAgICAgIGxldC1kcmFnRW50ZXI9XCJkcmFnRW50ZXJcIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZGF5LWhlYWRlcnNcIiByb2xlPVwicm93XCI+XG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGRheSBvZiBkYXlzXCIgY2xhc3M9XCJjYWwtaGVhZGVyXCI+XG4gICAgICAgICAgVDoge3sgZGF5LmRhdGUgfCBjYWxlbmRhckRhdGUgOiAnZ2V0V2Vla051bWJlcicgOiBsb2NhbGUgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZGF5LWhlYWRlcnNcIiByb2xlPVwicm93XCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cImNhbC1oZWFkZXJcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBkYXkgb2YgZGF5czsgdHJhY2tCeTogdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlXCJcbiAgICAgICAgICBbY2xhc3MuY2FsLXBhc3RdPVwiZGF5LmlzUGFzdFwiXG4gICAgICAgICAgW2NsYXNzLmNhbC10b2RheV09XCJkYXkuaXNUb2RheVwiXG4gICAgICAgICAgW2NsYXNzLmNhbC1mdXR1cmVdPVwiZGF5LmlzRnV0dXJlXCJcbiAgICAgICAgICBbY2xhc3MuY2FsLXdlZWtlbmRdPVwiZGF5LmlzV2Vla2VuZFwiXG4gICAgICAgICAgW25nQ2xhc3NdPVwiZGF5LmNzc0NsYXNzXCJcbiAgICAgICAgICAobXdsQ2xpY2spPVwiZGF5SGVhZGVyQ2xpY2tlZC5lbWl0KHsgZGF5OiBkYXksIHNvdXJjZUV2ZW50OiAkZXZlbnQgfSlcIlxuICAgICAgICAgIG13bERyb3BwYWJsZVxuICAgICAgICAgIGRyYWdPdmVyQ2xhc3M9XCJjYWwtZHJhZy1vdmVyXCJcbiAgICAgICAgICAoZHJvcCk9XCJcbiAgICAgICAgICAgIGV2ZW50RHJvcHBlZC5lbWl0KHtcbiAgICAgICAgICAgICAgZXZlbnQ6ICRldmVudC5kcm9wRGF0YS5ldmVudCxcbiAgICAgICAgICAgICAgbmV3U3RhcnQ6IGRheS5kYXRlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIFwiXG4gICAgICAgICAgKGRyYWdFbnRlcik9XCJkcmFnRW50ZXIuZW1pdCh7IGRhdGU6IGRheS5kYXRlIH0pXCJcbiAgICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgIHJvbGU9XCJjb2x1bW5oZWFkZXJcIlxuICAgICAgICA+XG4gICAgICAgICAgPGI+e3sgZGF5LmRhdGUgfCBjYWxlbmRhckRhdGUgOiAnbW9udGhWaWV3Q29sdW1uSGVhZGVyJyA6IGxvY2FsZSB9fTwvYlxuICAgICAgICAgID48YnIgLz5cbiAgICAgICAgICA8c3Bhbj57e1xuICAgICAgICAgICAgZGF5LmRhdGUgfCBjYWxlbmRhckRhdGUgOiAnbW9udGhWaWV3RGF5TnVtYmVyJyA6IGxvY2FsZVxuICAgICAgICAgIH19PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcbiAgICAgICAgZGF5czogZGF5cyxcbiAgICAgICAgbG9jYWxlOiBsb2NhbGUsXG4gICAgICAgIGRheUhlYWRlckNsaWNrZWQ6IGRheUhlYWRlckNsaWNrZWQsXG4gICAgICAgIGV2ZW50RHJvcHBlZDogZXZlbnREcm9wcGVkLFxuICAgICAgICBkcmFnRW50ZXI6IGRyYWdFbnRlcixcbiAgICAgICAgdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlOiB0cmFja0J5V2Vla0RheUhlYWRlckRhdGVcbiAgICAgIH1cIlxuICAgID5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vbnRoVmlld0hlYWRlckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGRheXM6IFdlZWtEYXlbXTtcbiAgQElucHV0KCkgd2Vla3M6IG51bWJlcltdO1xuXG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBPdXRwdXQoKSBkYXlIZWFkZXJDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgZGF5OiBXZWVrRGF5O1xuICAgIHNvdXJjZUV2ZW50OiBNb3VzZUV2ZW50O1xuICB9PigpO1xuXG4gIEBPdXRwdXQoKSBldmVudERyb3BwZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICBldmVudDogQ2FsZW5kYXJFdmVudDtcbiAgICBuZXdTdGFydDogRGF0ZTtcbiAgfT4oKTtcblxuICBAT3V0cHV0KCkgZHJhZ0VudGVyID0gbmV3IEV2ZW50RW1pdHRlcjx7IGRhdGU6IERhdGUgfT4oKTtcblxuICB0cmFja0J5V2Vla0RheUhlYWRlckRhdGUgPSB0cmFja0J5V2Vla0RheUhlYWRlckRhdGU7XG59XG4iXX0=