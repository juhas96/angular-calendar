import { Component, Input, Output, EventEmitter, ViewChildren, } from '@angular/core';
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
    scrollElements(scrollLeft) {
        this.headers.forEach((header) => (header.nativeElement.scrollLeft = scrollLeft));
    }
}
CalendarMonthViewHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarMonthViewHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CalendarMonthViewHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.3", type: CalendarMonthViewHeaderComponent, selector: "mwl-calendar-resource-month-view-header", inputs: { days: "days", weeks: "weeks", locale: "locale", customTemplate: "customTemplate" }, outputs: { dayHeaderClicked: "dayHeaderClicked", eventDropped: "eventDropped", dragEnter: "dragEnter" }, viewQueries: [{ propertyName: "headers", predicate: ["scrollContainer"], descendants: true }], ngImport: i0, template: `
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
            }], headers: [{
                type: ViewChildren,
                args: ['scrollContainer']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldy1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1jYWxlbmRhci9zcmMvbW9kdWxlcy9yZXNvdXJjZS1tb250aC9jYWxlbmRhci1yZXNvdXJjZS1tb250aC12aWV3L2NhbGVuZGFyLXJlc291cmNlLW1vbnRoLXZpZXctaGVhZGVyL2NhbGVuZGFyLXJlc291cmNlLW1vbnRoLXZpZXctaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUVaLFlBQVksR0FHYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7O0FBeUVyRSxNQUFNLE9BQU8sZ0NBQWdDO0lBdkU3QztRQStFWSxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFHekMsQ0FBQztRQUVLLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBR3JDLENBQUM7UUFFSyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQWtCLENBQUM7UUFNekQsNkJBQXdCLEdBQUcsd0JBQXdCLENBQUM7S0FPckQ7SUFMQyxjQUFjLENBQUMsVUFBa0I7UUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQ2xCLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxDQUMzRCxDQUFDO0lBQ0osQ0FBQzs7NkhBOUJVLGdDQUFnQztpSEFBaEMsZ0NBQWdDLHFYQXJFakM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtRVQ7MkZBRVUsZ0NBQWdDO2tCQXZFNUMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUseUNBQXlDO29CQUNuRCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtRVQ7aUJBQ0Y7OEJBRVUsSUFBSTtzQkFBWixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFFRyxNQUFNO3NCQUFkLEtBQUs7Z0JBRUcsY0FBYztzQkFBdEIsS0FBSztnQkFFSSxnQkFBZ0I7c0JBQXpCLE1BQU07Z0JBS0csWUFBWTtzQkFBckIsTUFBTTtnQkFLRyxTQUFTO3NCQUFsQixNQUFNO2dCQUUwQixPQUFPO3NCQUF2QyxZQUFZO3VCQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBRdWVyeUxpc3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudCwgV2Vla0RheSB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmltcG9ydCB7IHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZSB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi91dGlsL3V0aWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldy1oZWFkZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxuICAgICAgbGV0LWRheXM9XCJkYXlzXCJcbiAgICAgIGxldC1sb2NhbGU9XCJsb2NhbGVcIlxuICAgICAgbGV0LWRheUhlYWRlckNsaWNrZWQ9XCJkYXlIZWFkZXJDbGlja2VkXCJcbiAgICAgIGxldC1ldmVudERyb3BwZWQ9XCJldmVudERyb3BwZWRcIlxuICAgICAgbGV0LXRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZT1cInRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZVwiXG4gICAgICBsZXQtZHJhZ0VudGVyPVwiZHJhZ0VudGVyXCJcbiAgICA+XG4gICAgICA8ZGl2ICNoZWFkZXIgY2xhc3M9XCJjYWwtZGF5LWhlYWRlcnNcIiByb2xlPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtaGVhZGVyXCIgc3R5bGU9XCJtaW4td2lkdGg6IDEyMHB4OyBib3JkZXItcmlnaHQ6IDBcIj48L2Rpdj5cbiAgICAgICAgPGRpdiAjc2Nyb2xsQ29udGFpbmVyIGNsYXNzPVwiY2FsLWhlYWRlci1zY3JvbGxhYmxlLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGRheSBvZiBkYXlzXCIgY2xhc3M9XCJjYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICBUOiB7eyBkYXkuZGF0ZSB8IGNhbGVuZGFyRGF0ZSA6ICdnZXRXZWVrTnVtYmVyJyA6IGxvY2FsZSB9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiAjaGVhZGVyIGNsYXNzPVwiY2FsLWRheS1oZWFkZXJzXCIgcm9sZT1cInJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLWhlYWRlclwiIHN0eWxlPVwibWluLXdpZHRoOiAxMjBweDsgYm9yZGVyLXJpZ2h0OiAwXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgI3Njcm9sbENvbnRhaW5lciBjbGFzcz1cImNhbC1oZWFkZXItc2Nyb2xsYWJsZS1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cImNhbC1oZWFkZXJcIlxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGRheSBvZiBkYXlzOyB0cmFja0J5OiB0cmFja0J5V2Vla0RheUhlYWRlckRhdGVcIlxuICAgICAgICAgICAgW2NsYXNzLmNhbC1wYXN0XT1cImRheS5pc1Bhc3RcIlxuICAgICAgICAgICAgW2NsYXNzLmNhbC10b2RheV09XCJkYXkuaXNUb2RheVwiXG4gICAgICAgICAgICBbY2xhc3MuY2FsLWZ1dHVyZV09XCJkYXkuaXNGdXR1cmVcIlxuICAgICAgICAgICAgW2NsYXNzLmNhbC13ZWVrZW5kXT1cImRheS5pc1dlZWtlbmRcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwiZGF5LmNzc0NsYXNzXCJcbiAgICAgICAgICAgIChtd2xDbGljayk9XCJcbiAgICAgICAgICAgICAgZGF5SGVhZGVyQ2xpY2tlZC5lbWl0KHsgZGF5OiBkYXksIHNvdXJjZUV2ZW50OiAkZXZlbnQgfSlcbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgICBtd2xEcm9wcGFibGVcbiAgICAgICAgICAgIGRyYWdPdmVyQ2xhc3M9XCJjYWwtZHJhZy1vdmVyXCJcbiAgICAgICAgICAgIChkcm9wKT1cIlxuICAgICAgICAgICAgICBldmVudERyb3BwZWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgZXZlbnQ6ICRldmVudC5kcm9wRGF0YS5ldmVudCxcbiAgICAgICAgICAgICAgICBuZXdTdGFydDogZGF5LmRhdGVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAoZHJhZ0VudGVyKT1cImRyYWdFbnRlci5lbWl0KHsgZGF0ZTogZGF5LmRhdGUgfSlcIlxuICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgIHJvbGU9XCJjb2x1bW5oZWFkZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPnt7XG4gICAgICAgICAgICAgIGRheS5kYXRlIHwgY2FsZW5kYXJEYXRlIDogJ21vbnRoVmlld0NvbHVtbkhlYWRlcicgOiBsb2NhbGVcbiAgICAgICAgICAgIH19PC9iXG4gICAgICAgICAgICA+PGJyIC8+XG4gICAgICAgICAgICA8c3Bhbj57e1xuICAgICAgICAgICAgICBkYXkuZGF0ZSB8IGNhbGVuZGFyRGF0ZSA6ICdtb250aFZpZXdEYXlOdW1iZXInIDogbG9jYWxlXG4gICAgICAgICAgICB9fTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIGRheXM6IGRheXMsXG4gICAgICAgIGxvY2FsZTogbG9jYWxlLFxuICAgICAgICBkYXlIZWFkZXJDbGlja2VkOiBkYXlIZWFkZXJDbGlja2VkLFxuICAgICAgICBldmVudERyb3BwZWQ6IGV2ZW50RHJvcHBlZCxcbiAgICAgICAgZHJhZ0VudGVyOiBkcmFnRW50ZXIsXG4gICAgICAgIHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZTogdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlXG4gICAgICB9XCJcbiAgICA+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJNb250aFZpZXdIZWFkZXJDb21wb25lbnQge1xuICBASW5wdXQoKSBkYXlzOiBXZWVrRGF5W107XG4gIEBJbnB1dCgpIHdlZWtzOiBudW1iZXJbXTtcblxuICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZztcblxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBAT3V0cHV0KCkgZGF5SGVhZGVyQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGRheTogV2Vla0RheTtcbiAgICBzb3VyY2VFdmVudDogTW91c2VFdmVudDtcbiAgfT4oKTtcblxuICBAT3V0cHV0KCkgZXZlbnREcm9wcGVkID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XG4gICAgbmV3U3RhcnQ6IERhdGU7XG4gIH0+KCk7XG5cbiAgQE91dHB1dCgpIGRyYWdFbnRlciA9IG5ldyBFdmVudEVtaXR0ZXI8eyBkYXRlOiBEYXRlIH0+KCk7XG5cbiAgQFZpZXdDaGlsZHJlbignc2Nyb2xsQ29udGFpbmVyJykgaGVhZGVyczogUXVlcnlMaXN0PFxuICAgIEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+XG4gID47XG5cbiAgdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlID0gdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlO1xuXG4gIHNjcm9sbEVsZW1lbnRzKHNjcm9sbExlZnQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuaGVhZGVycy5mb3JFYWNoKFxuICAgICAgKGhlYWRlcikgPT4gKGhlYWRlci5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==