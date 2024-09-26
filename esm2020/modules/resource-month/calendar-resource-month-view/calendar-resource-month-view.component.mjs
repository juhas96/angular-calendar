import { Component, Input, Output, EventEmitter, LOCALE_ID, Inject, ViewChild, } from '@angular/core';
import { validateEvents, trackByWeekDayHeaderDate, trackByHourSegment, trackByHour, trackByWeekAllDayEvent, trackByWeekTimeEvent, trackByResourceWeekViewRowEvent, getMonthViewPeriod, } from '../../common/util/util';
import { CalendarMonthViewHeaderComponent } from './calendar-resource-month-view-header/calendar-resource-month-view-header.component';
import * as i0 from "@angular/core";
import * as i1 from "../../common/calendar-utils/calendar-utils.provider";
import * as i2 from "../../../date-adapters/date-adapter";
import * as i3 from "@angular/common";
import * as i4 from "angular-draggable-droppable";
import * as i5 from "./calendar-resource-month-view-header/calendar-resource-month-view-header.component";
import * as i6 from "./calendar-resource-month-view-event/calendar-resource-month-view-event.component";
import * as i7 from "./calendar-resource-month-view-row-segment/calendar-resource-month-view-row-segment.component";
/**
 * Shows all events on a given month for resources. Example usage:
 *
 * ```typescript
 * <mwl-calendar-resource-month-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-resource-month-view>
 * ```
 */
export class CalendarMonthViewComponent {
    /**
     * @hidden
     */
    constructor(cdr, utils, locale, dateAdapter, element) {
        this.cdr = cdr;
        this.utils = utils;
        this.dateAdapter = dateAdapter;
        this.element = element;
        /**
         * An array of events to display on view
         * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
         */
        this.events = [];
        /**
         * An array of resources to display on view
         */
        this.resources = [];
        /**
         * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
         */
        this.excludeDays = [];
        /**
         * The placement of the event tooltip
         */
        this.tooltipPlacement = 'auto';
        /**
         * Whether to append tooltips to the body or next to the trigger element
         */
        this.tooltipAppendToBody = true;
        /**
         * The delay in milliseconds before the tooltip should be displayed. If not provided the tooltip
         * will be displayed immediately.
         */
        this.tooltipDelay = null;
        /**
         * The precision to display events.
         * `days` will round event start and end dates to the nearest day and `minutes` will not do this rounding
         */
        this.precision = 'days';
        /**
         * The number of segments in an hour. Must divide equally into 60.
         */
        this.hourSegments = 2;
        /**
         * The height in pixels of each hour segment
         */
        this.hourSegmentHeight = 50;
        /**
         * The minimum height in pixels of each event
         */
        this.minimumEventHeight = 50;
        /**
         * The day start hours in 24 hour time. Must be 0-23
         */
        this.dayStartHour = 0;
        /**
         * The day start minutes. Must be 0-59
         */
        this.dayStartMinute = 0;
        /**
         * The day end hours in 24 hour time. Must be 0-23
         */
        this.dayEndHour = 23;
        /**
         * The day end minutes. Must be 0-59
         */
        this.dayEndMinute = 59;
        /**
         * Should we display events without assigned resources
         */
        this.keepUnassignedEvents = true;
        /**
         * Name to display unassigned resource. This apply only if keepUnassignedEvents is equal to true
         */
        this.unassignedRessourceName = 'Unassigned';
        /**
         * Called when a header month day is clicked. Adding a `cssClass` property on `$event.day` will add that class to the header element
         */
        this.dayHeaderClicked = new EventEmitter();
        /**
         * Called when an event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * An output that will be called before the view is rendered for the current month.
         * If you add the `cssClass` property to a day in the header it will add that class to the cell element in the template
         */
        this.beforeViewRender = new EventEmitter();
        /**
         * Called when an hour segment is clicked
         */
        this.hourSegmentClicked = new EventEmitter();
        /**
         * @hidden
         */
        this.calendarId = Symbol('angular calendar month view id');
        /**
         * @hidden
         */
        this.rtl = false;
        /**
         * @hidden
         */
        this.trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;
        /**
         * @hidden
         */
        this.trackByHourSegment = trackByHourSegment;
        /**
         * @hidden
         */
        this.trackByHour = trackByHour;
        /**
         * @hidden
         */
        this.trackByWeekAllDayEvent = trackByWeekAllDayEvent;
        /**
         * @hidden
         */
        this.trackByWeekTimeEvent = trackByWeekTimeEvent;
        /**
         * @hidden
         */
        this.trackByResourceWeekViewRowEvent = trackByResourceWeekViewRowEvent;
        /**
         * @hidden
         */
        this.weeks = [];
        /**
         * @hidden
         */
        this.trackByHourColumn = (index, column) => column.hours[0] ? column.hours[0].segments[0].date.toISOString() : column;
        /**
         * @hidden
         */
        this.trackByRowColumn = (index, column) => column ? column.date.toISOString() : index;
        /**
         * @hidden
         */
        this.trackById = (index, row) => row.id;
        this.locale = locale;
    }
    /**
     * @hidden
     */
    ngOnInit() {
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(() => {
                this.refreshAll();
                this.cdr.markForCheck();
            });
        }
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
        const refreshHeader = changes.viewDate ||
            changes.excludeDays ||
            changes.weekendDays ||
            changes.daysInWeek ||
            changes.weeks ||
            changes.weekStartsOn;
        const refreshBody = changes.viewDate ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute ||
            changes.hourSegments ||
            changes.hourDuration ||
            changes.weekStartsOn ||
            changes.weekendDays ||
            changes.excludeDays ||
            changes.hourSegmentHeight ||
            changes.events ||
            changes.daysInWeek ||
            changes.minimumEventHeight;
        if (refreshHeader) {
            this.refreshHeader();
        }
        if (changes.events) {
            validateEvents(this.events);
        }
        if (refreshBody) {
            this.refreshBody();
        }
        if (refreshHeader || refreshBody) {
            this.emitBeforeViewRender();
        }
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    ngAfterViewInit() {
        this.rtl =
            typeof window !== 'undefined' &&
                getComputedStyle(this.element.nativeElement).direction === 'rtl';
        this.cdr.detectChanges();
    }
    /**
     * @hidden
     */
    getDayColumnWidth(eventRowContainer) {
        return Math.floor(eventRowContainer.offsetWidth / this.days.length);
    }
    /**
     * @hidden
     */
    getResourceArrayFromResourceMaxRowNumber(resourcesMaxRowsNumber) {
        const resources = [];
        for (let resourcesMaxRowNumber in resourcesMaxRowsNumber) {
            resources.push(resourcesMaxRowsNumber[resourcesMaxRowNumber]);
        }
        return resources;
    }
    refreshHeader() {
        this.days = this.utils.getWeekViewHeader({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            weekendDays: this.weekendDays,
            ...getMonthViewPeriod(this.dateAdapter, this.viewDate, this.excludeDays),
        });
        this.weeks = [
            ...new Set(this.days.map((day) => this.dateAdapter.getISOWeek(day.date))).values(),
        ];
    }
    refreshBody() {
        this.view = this.getResourceWeekView(this.events, this.resources);
        console.log(this.view);
    }
    refreshAll() {
        this.refreshHeader();
        this.refreshBody();
        this.emitBeforeViewRender();
    }
    emitBeforeViewRender() {
        if (this.days && this.view) {
            this.beforeViewRender.emit({
                header: this.days,
                ...this.view,
            });
        }
    }
    getResourceWeekView(events, resources) {
        const resourceWeekView = this.utils.getResourceWeekView({
            events,
            resources,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            precision: this.precision,
            absolutePositionedEvents: true,
            hourSegments: this.hourSegments,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute,
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute,
            },
            segmentHeight: this.hourSegmentHeight,
            weekendDays: this.weekendDays,
            minimumEventHeight: this.minimumEventHeight,
            ...getMonthViewPeriod(this.dateAdapter, this.viewDate, this.excludeDays),
            keepUnassignedEvents: this.keepUnassignedEvents,
            unassignedRessourceName: this.unassignedRessourceName,
        });
        this.resourcesMaxRowsNumberAsArray =
            this.getResourceArrayFromResourceMaxRowNumber(resourceWeekView.resourcesMaxRowsNumber);
        return resourceWeekView;
    }
    onScroll($event) {
        console.log($event.target['scrollLeft']);
        this.headers.scrollElements($event.target['scrollLeft']);
    }
}
CalendarMonthViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarMonthViewComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.CalendarUtils }, { token: LOCALE_ID }, { token: i2.DateAdapter }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
CalendarMonthViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.3", type: CalendarMonthViewComponent, selector: "mwl-calendar-resource-month-view", inputs: { viewDate: "viewDate", events: "events", resources: "resources", excludeDays: "excludeDays", refresh: "refresh", locale: "locale", tooltipPlacement: "tooltipPlacement", tooltipTemplate: "tooltipTemplate", tooltipAppendToBody: "tooltipAppendToBody", tooltipDelay: "tooltipDelay", weekStartsOn: "weekStartsOn", headerTemplate: "headerTemplate", eventTemplate: "eventTemplate", eventTitleTemplate: "eventTitleTemplate", eventActionsTemplate: "eventActionsTemplate", precision: "precision", weekendDays: "weekendDays", hourSegments: "hourSegments", hourDuration: "hourDuration", hourSegmentHeight: "hourSegmentHeight", minimumEventHeight: "minimumEventHeight", dayStartHour: "dayStartHour", dayStartMinute: "dayStartMinute", dayEndHour: "dayEndHour", dayEndMinute: "dayEndMinute", hourSegmentTemplate: "hourSegmentTemplate", allDayEventsLabelTemplate: "allDayEventsLabelTemplate", daysInWeek: "daysInWeek", currentTimeMarkerTemplate: "currentTimeMarkerTemplate", keepUnassignedEvents: "keepUnassignedEvents", unassignedRessourceName: "unassignedRessourceName" }, outputs: { dayHeaderClicked: "dayHeaderClicked", eventClicked: "eventClicked", beforeViewRender: "beforeViewRender", hourSegmentClicked: "hourSegmentClicked" }, viewQueries: [{ propertyName: "headers", first: true, predicate: CalendarMonthViewHeaderComponent, descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <div class="cal-resource-month-view" role="grid">
      <mwl-calendar-resource-month-view-header
        [days]="days"
        [weeks]="weeks"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (dayHeaderClicked)="dayHeaderClicked.emit($event)"
      >
      </mwl-calendar-resource-month-view-header>

      <div class="cal-time-events cal-resource-events" mwlDroppable>
        <div class="cal-time-label-column" *ngIf="view.rowColumns.length > 0">
          <div
            *ngFor="
              let resourceRow of resourcesMaxRowsNumberAsArray;
              let odd = odd
            "
            class="cal-hour"
            [class.cal-row-odd]="odd"
          >
            <mwl-calendar-resource-month-view-row-segment
              [style.height.px]="
                hourSegmentHeight *
                (resourceRow.count > 0 ? resourceRow.count : 1)
              "
              [segmentHeight]="
                hourSegmentHeight *
                (resourceRow.count > 0 ? resourceRow.count : 1)
              "
              [customTemplate]="hourSegmentTemplate"
              [resourceLabel]="resourceRow?.resource?.name"
              [daysInWeek]="daysInWeek"
            >
            </mwl-calendar-resource-month-view-row-segment>
          </div>
        </div>
        <div (scroll)="onScroll($event)" class="cal-day-columns" #dayColumns>
          <div
            class="cal-day-column"
            *ngFor="let column of view.rowColumns; trackBy: trackByRowColumn"
          >
            <div
              class="cal-events-container"
              *ngFor="
                let eventsContainer of column.eventsGroupedByResource;
                let eventContainerIndex = index
              "
              [style.top]="
                view.resourcesMaxRowsNumber[eventContainerIndex].top + 'px'
              "
            >
              <ng-container
                *ngIf="eventsContainer.events?.length; else emptyEvents"
              >
                <div
                  *ngFor="
                    let timeEvent of eventsContainer.events;
                    let i = index;
                    trackBy: trackByResourceWeekViewRowEvent
                  "
                  #event
                  class="cal-event-container"
                  [ngClass]="timeEvent.event.cssClass"
                  [hidden]="timeEvent.height === 0 && timeEvent.width === 0"
                  [style.top.px]="timeEvent.top"
                  [style.height.px]="hourSegmentHeight"
                  [style.left.%]="0"
                  [style.width.%]="timeEvent.width"
                >
                  <ng-template
                    [ngTemplateOutlet]="weekEventTemplate"
                  ></ng-template>
                  <ng-template #weekEventTemplate>
                    <mwl-calendar-resource-month-view-event
                      [locale]="locale"
                      [weekEvent]="timeEvent"
                      [tooltipPlacement]="tooltipPlacement"
                      [tooltipTemplate]="tooltipTemplate"
                      [tooltipAppendToBody]="tooltipAppendToBody"
                      [tooltipDelay]="tooltipDelay"
                      [customTemplate]="eventTemplate"
                      [eventTitleTemplate]="eventTitleTemplate"
                      [eventActionsTemplate]="eventActionsTemplate"
                      [column]="column"
                      [daysInWeek]="daysInWeek"
                      (eventClicked)="
                        eventClicked.emit({
                          event: timeEvent.event,
                          sourceEvent: $event.sourceEvent
                        })
                      "
                    >
                    </mwl-calendar-resource-month-view-event>
                  </ng-template>
                </div>
              </ng-container>
              <ng-template #emptyEvents>
                <div
                  class="cal-event-container"
                  [style.height.px]="hourSegmentHeight"
                >
                  <div [style.height.px]="hourSegmentHeight"></div>
                </div>
              </ng-template>
            </div>

            <div
              *ngFor="let row of resourcesMaxRowsNumberAsArray; let odd = odd"
              class="cal-hour"
              [class.cal-row-odd]="odd"
            >
              <mwl-calendar-resource-month-view-row-segment
                [style.height.px]="
                  hourSegmentHeight * (row.count > 0 ? row.count : 1)
                "
                [segmentHeight]="
                  hourSegmentHeight * (row.count > 0 ? row.count : 1)
                "
                [segment]="{}"
                [customTemplate]="hourSegmentTemplate"
                [daysInWeek]="daysInWeek"
              >
              </mwl-calendar-resource-month-view-row-segment>
            </div>
          </div>
        </div>
      </div>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i4.DroppableDirective, selector: "[mwlDroppable]", inputs: ["dragOverClass", "dragActiveClass", "validateDrop"], outputs: ["dragEnter", "dragLeave", "dragOver", "drop"] }, { kind: "component", type: i5.CalendarMonthViewHeaderComponent, selector: "mwl-calendar-resource-month-view-header", inputs: ["days", "weeks", "locale", "customTemplate"], outputs: ["dayHeaderClicked", "eventDropped", "dragEnter"] }, { kind: "component", type: i6.CalendarMonthViewEventComponent, selector: "mwl-calendar-resource-month-view-event", inputs: ["locale", "weekEvent", "tooltipPlacement", "tooltipAppendToBody", "tooltipDisabled", "tooltipDelay", "customTemplate", "eventTitleTemplate", "eventActionsTemplate", "tooltipTemplate", "column", "daysInWeek"], outputs: ["eventClicked"] }, { kind: "component", type: i7.CalendarMonthViewRowSegmentComponent, selector: "mwl-calendar-resource-month-view-row-segment", inputs: ["segment", "segmentHeight", "resourceLabel", "daysInWeek", "customTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarMonthViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mwl-calendar-resource-month-view',
                    template: `
    <div class="cal-resource-month-view" role="grid">
      <mwl-calendar-resource-month-view-header
        [days]="days"
        [weeks]="weeks"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (dayHeaderClicked)="dayHeaderClicked.emit($event)"
      >
      </mwl-calendar-resource-month-view-header>

      <div class="cal-time-events cal-resource-events" mwlDroppable>
        <div class="cal-time-label-column" *ngIf="view.rowColumns.length > 0">
          <div
            *ngFor="
              let resourceRow of resourcesMaxRowsNumberAsArray;
              let odd = odd
            "
            class="cal-hour"
            [class.cal-row-odd]="odd"
          >
            <mwl-calendar-resource-month-view-row-segment
              [style.height.px]="
                hourSegmentHeight *
                (resourceRow.count > 0 ? resourceRow.count : 1)
              "
              [segmentHeight]="
                hourSegmentHeight *
                (resourceRow.count > 0 ? resourceRow.count : 1)
              "
              [customTemplate]="hourSegmentTemplate"
              [resourceLabel]="resourceRow?.resource?.name"
              [daysInWeek]="daysInWeek"
            >
            </mwl-calendar-resource-month-view-row-segment>
          </div>
        </div>
        <div (scroll)="onScroll($event)" class="cal-day-columns" #dayColumns>
          <div
            class="cal-day-column"
            *ngFor="let column of view.rowColumns; trackBy: trackByRowColumn"
          >
            <div
              class="cal-events-container"
              *ngFor="
                let eventsContainer of column.eventsGroupedByResource;
                let eventContainerIndex = index
              "
              [style.top]="
                view.resourcesMaxRowsNumber[eventContainerIndex].top + 'px'
              "
            >
              <ng-container
                *ngIf="eventsContainer.events?.length; else emptyEvents"
              >
                <div
                  *ngFor="
                    let timeEvent of eventsContainer.events;
                    let i = index;
                    trackBy: trackByResourceWeekViewRowEvent
                  "
                  #event
                  class="cal-event-container"
                  [ngClass]="timeEvent.event.cssClass"
                  [hidden]="timeEvent.height === 0 && timeEvent.width === 0"
                  [style.top.px]="timeEvent.top"
                  [style.height.px]="hourSegmentHeight"
                  [style.left.%]="0"
                  [style.width.%]="timeEvent.width"
                >
                  <ng-template
                    [ngTemplateOutlet]="weekEventTemplate"
                  ></ng-template>
                  <ng-template #weekEventTemplate>
                    <mwl-calendar-resource-month-view-event
                      [locale]="locale"
                      [weekEvent]="timeEvent"
                      [tooltipPlacement]="tooltipPlacement"
                      [tooltipTemplate]="tooltipTemplate"
                      [tooltipAppendToBody]="tooltipAppendToBody"
                      [tooltipDelay]="tooltipDelay"
                      [customTemplate]="eventTemplate"
                      [eventTitleTemplate]="eventTitleTemplate"
                      [eventActionsTemplate]="eventActionsTemplate"
                      [column]="column"
                      [daysInWeek]="daysInWeek"
                      (eventClicked)="
                        eventClicked.emit({
                          event: timeEvent.event,
                          sourceEvent: $event.sourceEvent
                        })
                      "
                    >
                    </mwl-calendar-resource-month-view-event>
                  </ng-template>
                </div>
              </ng-container>
              <ng-template #emptyEvents>
                <div
                  class="cal-event-container"
                  [style.height.px]="hourSegmentHeight"
                >
                  <div [style.height.px]="hourSegmentHeight"></div>
                </div>
              </ng-template>
            </div>

            <div
              *ngFor="let row of resourcesMaxRowsNumberAsArray; let odd = odd"
              class="cal-hour"
              [class.cal-row-odd]="odd"
            >
              <mwl-calendar-resource-month-view-row-segment
                [style.height.px]="
                  hourSegmentHeight * (row.count > 0 ? row.count : 1)
                "
                [segmentHeight]="
                  hourSegmentHeight * (row.count > 0 ? row.count : 1)
                "
                [segment]="{}"
                [customTemplate]="hourSegmentTemplate"
                [daysInWeek]="daysInWeek"
              >
              </mwl-calendar-resource-month-view-row-segment>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.CalendarUtils }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [LOCALE_ID]
                }] }, { type: i2.DateAdapter }, { type: i0.ElementRef }]; }, propDecorators: { viewDate: [{
                type: Input
            }], events: [{
                type: Input
            }], resources: [{
                type: Input
            }], excludeDays: [{
                type: Input
            }], refresh: [{
                type: Input
            }], locale: [{
                type: Input
            }], tooltipPlacement: [{
                type: Input
            }], tooltipTemplate: [{
                type: Input
            }], tooltipAppendToBody: [{
                type: Input
            }], tooltipDelay: [{
                type: Input
            }], weekStartsOn: [{
                type: Input
            }], headerTemplate: [{
                type: Input
            }], eventTemplate: [{
                type: Input
            }], eventTitleTemplate: [{
                type: Input
            }], eventActionsTemplate: [{
                type: Input
            }], precision: [{
                type: Input
            }], weekendDays: [{
                type: Input
            }], hourSegments: [{
                type: Input
            }], hourDuration: [{
                type: Input
            }], hourSegmentHeight: [{
                type: Input
            }], minimumEventHeight: [{
                type: Input
            }], dayStartHour: [{
                type: Input
            }], dayStartMinute: [{
                type: Input
            }], dayEndHour: [{
                type: Input
            }], dayEndMinute: [{
                type: Input
            }], hourSegmentTemplate: [{
                type: Input
            }], allDayEventsLabelTemplate: [{
                type: Input
            }], daysInWeek: [{
                type: Input
            }], currentTimeMarkerTemplate: [{
                type: Input
            }], keepUnassignedEvents: [{
                type: Input
            }], unassignedRessourceName: [{
                type: Input
            }], dayHeaderClicked: [{
                type: Output
            }], eventClicked: [{
                type: Output
            }], beforeViewRender: [{
                type: Output
            }], hourSegmentClicked: [{
                type: Output
            }], headers: [{
                type: ViewChild,
                args: [CalendarMonthViewHeaderComponent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWNhbGVuZGFyL3NyYy9tb2R1bGVzL3Jlc291cmNlLW1vbnRoL2NhbGVuZGFyLXJlc291cmNlLW1vbnRoLXZpZXcvY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFLWixTQUFTLEVBQ1QsTUFBTSxFQUlOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQWN2QixPQUFPLEVBQ0wsY0FBYyxFQUNkLHdCQUF3QixFQUN4QixrQkFBa0IsRUFDbEIsV0FBVyxFQUVYLHNCQUFzQixFQUN0QixvQkFBb0IsRUFDcEIsK0JBQStCLEVBQy9CLGtCQUFrQixHQUNuQixNQUFNLHdCQUF3QixDQUFDO0FBR2hDLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHFGQUFxRixDQUFDOzs7Ozs7Ozs7QUFNdkk7Ozs7Ozs7OztHQVNHO0FBc0lILE1BQU0sT0FBTywwQkFBMEI7SUEwUnJDOztPQUVHO0lBQ0gsWUFDWSxHQUFzQixFQUN0QixLQUFvQixFQUNYLE1BQWMsRUFDdkIsV0FBd0IsRUFDeEIsT0FBZ0M7UUFKaEMsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsVUFBSyxHQUFMLEtBQUssQ0FBZTtRQUVwQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQTFSNUM7OztXQUdHO1FBQ00sV0FBTSxHQUFvQixFQUFFLENBQUM7UUFFdEM7O1dBRUc7UUFDTSxjQUFTLEdBQXVCLEVBQUUsQ0FBQztRQUU1Qzs7V0FFRztRQUNNLGdCQUFXLEdBQWEsRUFBRSxDQUFDO1FBWXBDOztXQUVHO1FBQ00s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O2dCQUtHLHVCQUF1QjtzQkFBL0IsS0FBSztnQkFLSSxnQkFBZ0I7c0JBQXpCLE1BQU07Z0JBUUcsWUFBWTtzQkFBckIsTUFBTTtnQkFTRyxnQkFBZ0I7c0JBQXpCLE1BQU07Z0JBTUcsa0JBQWtCO3NCQUEzQixNQUFNO2dCQU1QLE9BQU87c0JBRE4sU0FBUzt1QkFBQyxnQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIExPQ0FMRV9JRCxcbiAgSW5qZWN0LFxuICBUZW1wbGF0ZVJlZixcbiAgRWxlbWVudFJlZixcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgV2Vla0RheSxcbiAgQ2FsZW5kYXJFdmVudCxcbiAgQ2FsZW5kYXJSZXNvdXJjZSxcbiAgV2Vla1ZpZXdIb3VyQ29sdW1uLFxuICBXZWVrVmlld0FsbERheUV2ZW50Um93LFxuICBSZXNvdXJjZXNNYXhSb3dOdW1iZXIsXG4gIFJlc291cmNlc01heFJvd3NOdW1iZXIsXG4gIFJlc291cmNlV2Vla1ZpZXcsXG4gIFJlc291cmNlV2Vla1ZpZXdSb3dDb2x1bW4sXG59IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmltcG9ydCB7IENhbGVuZGFyVXRpbHMgfSBmcm9tICcuLi8uLi9jb21tb24vY2FsZW5kYXItdXRpbHMvY2FsZW5kYXItdXRpbHMucHJvdmlkZXInO1xuaW1wb3J0IHtcbiAgdmFsaWRhdGVFdmVudHMsXG4gIHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZSxcbiAgdHJhY2tCeUhvdXJTZWdtZW50LFxuICB0cmFja0J5SG91cixcbiAgZ2V0V2Vla1ZpZXdQZXJpb2QsXG4gIHRyYWNrQnlXZWVrQWxsRGF5RXZlbnQsXG4gIHRyYWNrQnlXZWVrVGltZUV2ZW50LFxuICB0cmFja0J5UmVzb3VyY2VXZWVrVmlld1Jvd0V2ZW50LFxuICBnZXRNb250aFZpZXdQZXJpb2QsXG59IGZyb20gJy4uLy4uL2NvbW1vbi91dGlsL3V0aWwnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICcuLi8uLi8uLi9kYXRlLWFkYXB0ZXJzL2RhdGUtYWRhcHRlcic7XG5pbXBvcnQgeyBQbGFjZW1lbnRBcnJheSB9IGZyb20gJ3Bvc2l0aW9uaW5nJztcbmltcG9ydCB7IENhbGVuZGFyTW9udGhWaWV3SGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1yZXNvdXJjZS1tb250aC12aWV3LWhlYWRlci9jYWxlbmRhci1yZXNvdXJjZS1tb250aC12aWV3LWhlYWRlci5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENhbGVuZGFyTW9udGhWaWV3QmVmb3JlUmVuZGVyRXZlbnQgZXh0ZW5kcyBSZXNvdXJjZVdlZWtWaWV3IHtcbiAgaGVhZGVyOiBXZWVrRGF5W107XG59XG5cbi8qKlxuICogU2hvd3MgYWxsIGV2ZW50cyBvbiBhIGdpdmVuIG1vbnRoIGZvciByZXNvdXJjZXMuIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogPG13bC1jYWxlbmRhci1yZXNvdXJjZS1tb250aC12aWV3XG4gKiAgW3ZpZXdEYXRlXT1cInZpZXdEYXRlXCJcbiAqICBbZXZlbnRzXT1cImV2ZW50c1wiPlxuICogPC9td2wtY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldz5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImNhbC1yZXNvdXJjZS1tb250aC12aWV3XCIgcm9sZT1cImdyaWRcIj5cbiAgICAgIDxtd2wtY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldy1oZWFkZXJcbiAgICAgICAgW2RheXNdPVwiZGF5c1wiXG4gICAgICAgIFt3ZWVrc109XCJ3ZWVrc1wiXG4gICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImhlYWRlclRlbXBsYXRlXCJcbiAgICAgICAgKGRheUhlYWRlckNsaWNrZWQpPVwiZGF5SGVhZGVyQ2xpY2tlZC5lbWl0KCRldmVudClcIlxuICAgICAgPlxuICAgICAgPC9td2wtY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldy1oZWFkZXI+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtdGltZS1ldmVudHMgY2FsLXJlc291cmNlLWV2ZW50c1wiIG13bERyb3BwYWJsZT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbC10aW1lLWxhYmVsLWNvbHVtblwiICpuZ0lmPVwidmlldy5yb3dDb2x1bW5zLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAqbmdGb3I9XCJcbiAgICAgICAgICAgICAgbGV0IHJlc291cmNlUm93IG9mIHJlc291cmNlc01heFJvd3NOdW1iZXJBc0FycmF5O1xuICAgICAgICAgICAgICBsZXQgb2RkID0gb2RkXG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgY2xhc3M9XCJjYWwtaG91clwiXG4gICAgICAgICAgICBbY2xhc3MuY2FsLXJvdy1vZGRdPVwib2RkXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8bXdsLWNhbGVuZGFyLXJlc291cmNlLW1vbnRoLXZpZXctcm93LXNlZ21lbnRcbiAgICAgICAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJcbiAgICAgICAgICAgICAgICBob3VyU2VnbWVudEhlaWdodCAqXG4gICAgICAgICAgICAgICAgKHJlc291cmNlUm93LmNvdW50ID4gMCA/IHJlc291cmNlUm93LmNvdW50IDogMSlcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgW3NlZ21lbnRIZWlnaHRdPVwiXG4gICAgICAgICAgICAgICAgaG91clNlZ21lbnRIZWlnaHQgKlxuICAgICAgICAgICAgICAgIChyZXNvdXJjZVJvdy5jb3VudCA+IDAgPyByZXNvdXJjZVJvdy5jb3VudCA6IDEpXG4gICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJob3VyU2VnbWVudFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgW3Jlc291cmNlTGFiZWxdPVwicmVzb3VyY2VSb3c/LnJlc291cmNlPy5uYW1lXCJcbiAgICAgICAgICAgICAgW2RheXNJbldlZWtdPVwiZGF5c0luV2Vla1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8L213bC1jYWxlbmRhci1yZXNvdXJjZS1tb250aC12aWV3LXJvdy1zZWdtZW50PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAoc2Nyb2xsKT1cIm9uU2Nyb2xsKCRldmVudClcIiBjbGFzcz1cImNhbC1kYXktY29sdW1uc1wiICNkYXlDb2x1bW5zPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwiY2FsLWRheS1jb2x1bW5cIlxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiB2aWV3LnJvd0NvbHVtbnM7IHRyYWNrQnk6IHRyYWNrQnlSb3dDb2x1bW5cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnRzLWNvbnRhaW5lclwiXG4gICAgICAgICAgICAgICpuZ0Zvcj1cIlxuICAgICAgICAgICAgICAgIGxldCBldmVudHNDb250YWluZXIgb2YgY29sdW1uLmV2ZW50c0dyb3VwZWRCeVJlc291cmNlO1xuICAgICAgICAgICAgICAgIGxldCBldmVudENvbnRhaW5lckluZGV4ID0gaW5kZXhcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgW3N0eWxlLnRvcF09XCJcbiAgICAgICAgICAgICAgICB2aWV3LnJlc291cmNlc01heFJvd3NOdW1iZXJbZXZlbnRDb250YWluZXJJbmRleF0udG9wICsgJ3B4J1xuICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJldmVudHNDb250YWluZXIuZXZlbnRzPy5sZW5ndGg7IGVsc2UgZW1wdHlFdmVudHNcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgKm5nRm9yPVwiXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aW1lRXZlbnQgb2YgZXZlbnRzQ29udGFpbmVyLmV2ZW50cztcbiAgICAgICAgICAgICAgICAgICAgbGV0IGkgPSBpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tCeTogdHJhY2tCeVJlc291cmNlV2Vla1ZpZXdSb3dFdmVudFxuICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICNldmVudFxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnQtY29udGFpbmVyXCJcbiAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInRpbWVFdmVudC5ldmVudC5jc3NDbGFzc1wiXG4gICAgICAgICAgICAgICAgICBbaGlkZGVuXT1cInRpbWVFdmVudC5oZWlnaHQgPT09IDAgJiYgdGltZUV2ZW50LndpZHRoID09PSAwXCJcbiAgICAgICAgICAgICAgICAgIFtzdHlsZS50b3AucHhdPVwidGltZUV2ZW50LnRvcFwiXG4gICAgICAgICAgICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImhvdXJTZWdtZW50SGVpZ2h0XCJcbiAgICAgICAgICAgICAgICAgIFtzdHlsZS5sZWZ0LiVdPVwiMFwiXG4gICAgICAgICAgICAgICAgICBbc3R5bGUud2lkdGguJV09XCJ0aW1lRXZlbnQud2lkdGhcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ3ZWVrRXZlbnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICA+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjd2Vla0V2ZW50VGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDxtd2wtY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldy1ldmVudFxuICAgICAgICAgICAgICAgICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgICAgICAgICAgICAgICBbd2Vla0V2ZW50XT1cInRpbWVFdmVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwidG9vbHRpcFBsYWNlbWVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgIFt0b29sdGlwQXBwZW5kVG9Cb2R5XT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIlxuICAgICAgICAgICAgICAgICAgICAgIFt0b29sdGlwRGVsYXldPVwidG9vbHRpcERlbGF5XCJcbiAgICAgICAgICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiZXZlbnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgW2V2ZW50VGl0bGVUZW1wbGF0ZV09XCJldmVudFRpdGxlVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgIFtldmVudEFjdGlvbnNUZW1wbGF0ZV09XCJldmVudEFjdGlvbnNUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgW2NvbHVtbl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICAgIFtkYXlzSW5XZWVrXT1cImRheXNJbldlZWtcIlxuICAgICAgICAgICAgICAgICAgICAgIChldmVudENsaWNrZWQpPVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudENsaWNrZWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiB0aW1lRXZlbnQuZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZUV2ZW50OiAkZXZlbnQuc291cmNlRXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8L213bC1jYWxlbmRhci1yZXNvdXJjZS1tb250aC12aWV3LWV2ZW50PlxuICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZW1wdHlFdmVudHM+XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnQtY29udGFpbmVyXCJcbiAgICAgICAgICAgICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwiaG91clNlZ21lbnRIZWlnaHRcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgW3N0eWxlLmhlaWdodC5weF09XCJob3VyU2VnbWVudEhlaWdodFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHJvdyBvZiByZXNvdXJjZXNNYXhSb3dzTnVtYmVyQXNBcnJheTsgbGV0IG9kZCA9IG9kZFwiXG4gICAgICAgICAgICAgIGNsYXNzPVwiY2FsLWhvdXJcIlxuICAgICAgICAgICAgICBbY2xhc3MuY2FsLXJvdy1vZGRdPVwib2RkXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPG13bC1jYWxlbmRhci1yZXNvdXJjZS1tb250aC12aWV3LXJvdy1zZWdtZW50XG4gICAgICAgICAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJcbiAgICAgICAgICAgICAgICAgIGhvdXJTZWdtZW50SGVpZ2h0ICogKHJvdy5jb3VudCA+IDAgPyByb3cuY291bnQgOiAxKVxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgW3NlZ21lbnRIZWlnaHRdPVwiXG4gICAgICAgICAgICAgICAgICBob3VyU2VnbWVudEhlaWdodCAqIChyb3cuY291bnQgPiAwID8gcm93LmNvdW50IDogMSlcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgIFtzZWdtZW50XT1cInt9XCJcbiAgICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiaG91clNlZ21lbnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW2RheXNJbldlZWtdPVwiZGF5c0luV2Vla1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPC9td2wtY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldy1yb3ctc2VnbWVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vbnRoVmlld0NvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXRcbntcbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHZpZXcgZGF0ZVxuICAgKi9cbiAgQElucHV0KCkgdmlld0RhdGU6IERhdGU7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGV2ZW50cyB0byBkaXNwbGF5IG9uIHZpZXdcbiAgICogVGhlIHNjaGVtYSBpcyBhdmFpbGFibGUgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL21hdHRsZXdpczkyL2NhbGVuZGFyLXV0aWxzL2Jsb2IvYzUxNjg5OTg1ZjU5YTI3MTk0MGUzMGJjNGUyYzRlMWZlZTNmY2I1Yy9zcmMvY2FsZW5kYXJVdGlscy50cyNMNDktTDYzXG4gICAqL1xuICBASW5wdXQoKSBldmVudHM6IENhbGVuZGFyRXZlbnRbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiByZXNvdXJjZXMgdG8gZGlzcGxheSBvbiB2aWV3XG4gICAqL1xuICBASW5wdXQoKSByZXNvdXJjZXM6IENhbGVuZGFyUmVzb3VyY2VbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBkYXkgaW5kZXhlcyAoMCA9IHN1bmRheSwgMSA9IG1vbmRheSBldGMpIHRoYXQgd2lsbCBiZSBoaWRkZW4gb24gdGhlIHZpZXdcbiAgICovXG4gIEBJbnB1dCgpIGV4Y2x1ZGVEYXlzOiBudW1iZXJbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHRoYXQgd2hlbiBlbWl0dGVkIG9uIHdpbGwgcmUtcmVuZGVyIHRoZSBjdXJyZW50IHZpZXdcbiAgICovXG4gIEBJbnB1dCgpIHJlZnJlc2g6IFN1YmplY3Q8YW55PjtcblxuICAvKipcbiAgICogVGhlIGxvY2FsZSB1c2VkIHRvIGZvcm1hdCBkYXRlc1xuICAgKi9cbiAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBwbGFjZW1lbnQgb2YgdGhlIGV2ZW50IHRvb2x0aXBcbiAgICovXG4gIEBJbnB1dCgpIHRvb2x0aXBQbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5ID0gJ2F1dG8nO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHRoZSBldmVudCB0b29sdGlwc1xuICAgKi9cbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGFwcGVuZCB0b29sdGlwcyB0byB0aGUgYm9keSBvciBuZXh0IHRvIHRoZSB0cmlnZ2VyIGVsZW1lbnRcbiAgICovXG4gIEBJbnB1dCgpIHRvb2x0aXBBcHBlbmRUb0JvZHk6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgZGVsYXkgaW4gbWlsbGlzZWNvbmRzIGJlZm9yZSB0aGUgdG9vbHRpcCBzaG91bGQgYmUgZGlzcGxheWVkLiBJZiBub3QgcHJvdmlkZWQgdGhlIHRvb2x0aXBcbiAgICogd2lsbCBiZSBkaXNwbGF5ZWQgaW1tZWRpYXRlbHkuXG4gICAqL1xuICBASW5wdXQoKSB0b29sdGlwRGVsYXk6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBUaGUgc3RhcnQgbnVtYmVyIG9mIHRoZSBtb250aC5cbiAgICogVGhpcyBpcyBpZ25vcmVkIHdoZW4gdGhlIGBkYXlzSW5XZWVrYCBpbnB1dCBpcyBhbHNvIHNldCBhcyB0aGUgYHZpZXdEYXRlYCB3aWxsIGJlIHVzZWQgYXMgdGhlIHN0YXJ0IG9mIHRoZSBtb250aCBpbnN0ZWFkLlxuICAgKiBOb3RlLCB5b3Ugc2hvdWxkIGFsc28gcGFzcyB0aGlzIHRvIHRoZSBjYWxlbmRhciB0aXRsZSBwaXBlIHNvIGl0IHNob3dzIHRoZSBzYW1lIGRheXM6IHt7IHZpZXdEYXRlIHwgY2FsZW5kYXJEYXRlOih2aWV3ICsgJ1ZpZXdUaXRsZScpOmxvY2FsZTp3ZWVrU3RhcnRzT24gfX1cbiAgICogSWYgdXNpbmcgdGhlIG1vbWVudCBkYXRlIGFkYXB0ZXIgdGhpcyBvcHRpb24gd29uJ3QgZG8gYW55dGhpbmcgYW5kIHlvdSdsbCBuZWVkIHRvIHNldCBpdCBnbG9iYWxseSBsaWtlIHNvOlxuICAgKiBgYGBcbiAgICogbW9tZW50LnVwZGF0ZUxvY2FsZSgnZW4nLCB7XG4gICAqICAgbW9udGg6IHtcbiAgICogICAgIGRvdzogMSwgLy8gc2V0IHN0YXJ0IG9mIG1vbnRoIHRvIG1vbmRheSBpbnN0ZWFkXG4gICAqICAgICBkb3k6IDAsXG4gICAqICAgfSxcbiAgICogfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgQElucHV0KCkgd2Vla1N0YXJ0c09uOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSB0byByZXBsYWNlIHRoZSBoZWFkZXJcbiAgICovXG4gIEBJbnB1dCgpIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIG1vbnRoIHZpZXcgZXZlbnRzXG4gICAqL1xuICBASW5wdXQoKSBldmVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIGV2ZW50IHRpdGxlc1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRUaXRsZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIGV2ZW50IGFjdGlvbnNcbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50QWN0aW9uc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBUaGUgcHJlY2lzaW9uIHRvIGRpc3BsYXkgZXZlbnRzLlxuICAgKiBgZGF5c2Agd2lsbCByb3VuZCBldmVudCBzdGFydCBhbmQgZW5kIGRhdGVzIHRvIHRoZSBuZWFyZXN0IGRheSBhbmQgYG1pbnV0ZXNgIHdpbGwgbm90IGRvIHRoaXMgcm91bmRpbmdcbiAgICovXG4gIEBJbnB1dCgpIHByZWNpc2lvbjogJ2RheXMnIHwgJ21pbnV0ZXMnID0gJ2RheXMnO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBkYXkgaW5kZXhlcyAoMCA9IHN1bmRheSwgMSA9IG1vbmRheSBldGMpIHRoYXQgaW5kaWNhdGUgd2hpY2ggZGF5cyBhcmUgd2Vla2VuZHNcbiAgICovXG4gIEBJbnB1dCgpIHdlZWtlbmREYXlzOiBudW1iZXJbXTtcblxuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBzZWdtZW50cyBpbiBhbiBob3VyLiBNdXN0IGRpdmlkZSBlcXVhbGx5IGludG8gNjAuXG4gICAqL1xuICBASW5wdXQoKSBob3VyU2VnbWVudHM6IG51bWJlciA9IDI7XG5cbiAgLyoqXG4gICAqIFRoZSBkdXJhdGlvbiBvZiBlYWNoIHNlZ21lbnQgZ3JvdXAgaW4gbWludXRlc1xuICAgKi9cbiAgQElucHV0KCkgaG91ckR1cmF0aW9uOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBoZWlnaHQgaW4gcGl4ZWxzIG9mIGVhY2ggaG91ciBzZWdtZW50XG4gICAqL1xuICBASW5wdXQoKSBob3VyU2VnbWVudEhlaWdodDogbnVtYmVyID0gNTA7XG5cbiAgLyoqXG4gICAqIFRoZSBtaW5pbXVtIGhlaWdodCBpbiBwaXhlbHMgb2YgZWFjaCBldmVudFxuICAgKi9cbiAgQElucHV0KCkgbWluaW11bUV2ZW50SGVpZ2h0OiBudW1iZXIgPSA1MDtcblxuICAvKipcbiAgICogVGhlIGRheSBzdGFydCBob3VycyBpbiAyNCBob3VyIHRpbWUuIE11c3QgYmUgMC0yM1xuICAgKi9cbiAgQElucHV0KCkgZGF5U3RhcnRIb3VyOiBudW1iZXIgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF5IHN0YXJ0IG1pbnV0ZXMuIE11c3QgYmUgMC01OVxuICAgKi9cbiAgQElucHV0KCkgZGF5U3RhcnRNaW51dGU6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgZW5kIGhvdXJzIGluIDI0IGhvdXIgdGltZS4gTXVzdCBiZSAwLTIzXG4gICAqL1xuICBASW5wdXQoKSBkYXlFbmRIb3VyOiBudW1iZXIgPSAyMztcblxuICAvKipcbiAgICogVGhlIGRheSBlbmQgbWludXRlcy4gTXVzdCBiZSAwLTU5XG4gICAqL1xuICBASW5wdXQoKSBkYXlFbmRNaW51dGU6IG51bWJlciA9IDU5O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgdG8gcmVwbGFjZSB0aGUgaG91ciBzZWdtZW50XG4gICAqL1xuICBASW5wdXQoKSBob3VyU2VnbWVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHRoZSBhbGwgZGF5IGV2ZW50cyBsYWJlbCB0ZXh0XG4gICAqL1xuICBASW5wdXQoKSBhbGxEYXlFdmVudHNMYWJlbFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIGRheXMgaW4gYSBtb250aC4gQ2FuIGJlIHVzZWQgdG8gY3JlYXRlIGEgc2hvcnRlciBvciBsb25nZXIgbW9udGggdmlldy5cbiAgICogVGhlIGZpcnN0IGRheSBvZiB0aGUgbW9udGggd2lsbCBhbHdheXMgYmUgdGhlIGB2aWV3RGF0ZWAgYW5kIGB3ZWVrU3RhcnRzT25gIGlmIHNldCB3aWxsIGJlIGlnbm9yZWRcbiAgICovXG4gIEBJbnB1dCgpIGRheXNJbldlZWs6IG51bWJlcjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciB0aGUgY3VycmVudCB0aW1lIG1hcmtlclxuICAgKi9cbiAgQElucHV0KCkgY3VycmVudFRpbWVNYXJrZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogU2hvdWxkIHdlIGRpc3BsYXkgZXZlbnRzIHdpdGhvdXQgYXNzaWduZWQgcmVzb3VyY2VzXG4gICAqL1xuICBASW5wdXQoKSBrZWVwVW5hc3NpZ25lZEV2ZW50czogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIE5hbWUgdG8gZGlzcGxheSB1bmFzc2lnbmVkIHJlc291cmNlLiBUaGlzIGFwcGx5IG9ubHkgaWYga2VlcFVuYXNzaWduZWRFdmVudHMgaXMgZXF1YWwgdG8gdHJ1ZVxuICAgKi9cbiAgQElucHV0KCkgdW5hc3NpZ25lZFJlc3NvdXJjZU5hbWU6IHN0cmluZyA9ICdVbmFzc2lnbmVkJztcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYSBoZWFkZXIgbW9udGggZGF5IGlzIGNsaWNrZWQuIEFkZGluZyBhIGBjc3NDbGFzc2AgcHJvcGVydHkgb24gYCRldmVudC5kYXlgIHdpbGwgYWRkIHRoYXQgY2xhc3MgdG8gdGhlIGhlYWRlciBlbGVtZW50XG4gICAqL1xuICBAT3V0cHV0KCkgZGF5SGVhZGVyQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGRheTogV2Vla0RheTtcbiAgICBzb3VyY2VFdmVudDogTW91c2VFdmVudDtcbiAgfT4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYW4gZXZlbnQgdGl0bGUgaXMgY2xpY2tlZFxuICAgKi9cbiAgQE91dHB1dCgpIGV2ZW50Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xuICAgIHNvdXJjZUV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudDtcbiAgfT4oKTtcblxuICAvKipcbiAgICogQW4gb3V0cHV0IHRoYXQgd2lsbCBiZSBjYWxsZWQgYmVmb3JlIHRoZSB2aWV3IGlzIHJlbmRlcmVkIGZvciB0aGUgY3VycmVudCBtb250aC5cbiAgICogSWYgeW91IGFkZCB0aGUgYGNzc0NsYXNzYCBwcm9wZXJ0eSB0byBhIGRheSBpbiB0aGUgaGVhZGVyIGl0IHdpbGwgYWRkIHRoYXQgY2xhc3MgdG8gdGhlIGNlbGwgZWxlbWVudCBpbiB0aGUgdGVtcGxhdGVcbiAgICovXG4gIEBPdXRwdXQoKSBiZWZvcmVWaWV3UmVuZGVyID1cbiAgICBuZXcgRXZlbnRFbWl0dGVyPENhbGVuZGFyTW9udGhWaWV3QmVmb3JlUmVuZGVyRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGFuIGhvdXIgc2VnbWVudCBpcyBjbGlja2VkXG4gICAqL1xuICBAT3V0cHV0KCkgaG91clNlZ21lbnRDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgZGF0ZTogRGF0ZTtcbiAgICBzb3VyY2VFdmVudDogTW91c2VFdmVudDtcbiAgfT4oKTtcblxuICBAVmlld0NoaWxkKENhbGVuZGFyTW9udGhWaWV3SGVhZGVyQ29tcG9uZW50KVxuICBoZWFkZXJzOiBDYWxlbmRhck1vbnRoVmlld0hlYWRlckNvbXBvbmVudDtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgZGF5czogV2Vla0RheVtdO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB2aWV3OiBSZXNvdXJjZVdlZWtWaWV3O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICByZXNvdXJjZXNNYXhSb3dzTnVtYmVyQXNBcnJheTogUmVzb3VyY2VzTWF4Um93TnVtYmVyW107XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHJlZnJlc2hTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgZGF5Q29sdW1uV2lkdGg6IG51bWJlcjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgY2FsZW5kYXJJZCA9IFN5bWJvbCgnYW5ndWxhciBjYWxlbmRhciBtb250aCB2aWV3IGlkJyk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGxhc3REcmFnZ2VkRXZlbnQ6IENhbGVuZGFyRXZlbnQ7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHJ0bCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB0cmFja0J5V2Vla0RheUhlYWRlckRhdGUgPSB0cmFja0J5V2Vla0RheUhlYWRlckRhdGU7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlIb3VyU2VnbWVudCA9IHRyYWNrQnlIb3VyU2VnbWVudDtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdHJhY2tCeUhvdXIgPSB0cmFja0J5SG91cjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdHJhY2tCeVdlZWtBbGxEYXlFdmVudCA9IHRyYWNrQnlXZWVrQWxsRGF5RXZlbnQ7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlXZWVrVGltZUV2ZW50ID0gdHJhY2tCeVdlZWtUaW1lRXZlbnQ7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlSZXNvdXJjZVdlZWtWaWV3Um93RXZlbnQgPSB0cmFja0J5UmVzb3VyY2VXZWVrVmlld1Jvd0V2ZW50O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB3ZWVrczogbnVtYmVyW10gPSBbXTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJvdGVjdGVkIHV0aWxzOiBDYWxlbmRhclV0aWxzLFxuICAgIEBJbmplY3QoTE9DQUxFX0lEKSBsb2NhbGU6IHN0cmluZyxcbiAgICBwcm90ZWN0ZWQgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyLFxuICAgIHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PlxuICApIHtcbiAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB0cmFja0J5SG91ckNvbHVtbiA9IChpbmRleDogbnVtYmVyLCBjb2x1bW46IFdlZWtWaWV3SG91ckNvbHVtbikgPT5cbiAgICBjb2x1bW4uaG91cnNbMF0gPyBjb2x1bW4uaG91cnNbMF0uc2VnbWVudHNbMF0uZGF0ZS50b0lTT1N0cmluZygpIDogY29sdW1uO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB0cmFja0J5Um93Q29sdW1uID0gKGluZGV4OiBudW1iZXIsIGNvbHVtbjogUmVzb3VyY2VXZWVrVmlld1Jvd0NvbHVtbikgPT5cbiAgICBjb2x1bW4gPyBjb2x1bW4uZGF0ZS50b0lTT1N0cmluZygpIDogaW5kZXg7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlJZCA9IChpbmRleDogbnVtYmVyLCByb3c6IFdlZWtWaWV3QWxsRGF5RXZlbnRSb3cpID0+IHJvdy5pZDtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVmcmVzaCkge1xuICAgICAgdGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uID0gdGhpcy5yZWZyZXNoLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVmcmVzaEFsbCgpO1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCByZWZyZXNoSGVhZGVyID1cbiAgICAgIGNoYW5nZXMudmlld0RhdGUgfHxcbiAgICAgIGNoYW5nZXMuZXhjbHVkZURheXMgfHxcbiAgICAgIGNoYW5nZXMud2Vla2VuZERheXMgfHxcbiAgICAgIGNoYW5nZXMuZGF5c0luV2VlayB8fFxuICAgICAgY2hhbmdlcy53ZWVrcyB8fFxuICAgICAgY2hhbmdlcy53ZWVrU3RhcnRzT247XG5cbiAgICBjb25zdCByZWZyZXNoQm9keSA9XG4gICAgICBjaGFuZ2VzLnZpZXdEYXRlIHx8XG4gICAgICBjaGFuZ2VzLmRheVN0YXJ0SG91ciB8fFxuICAgICAgY2hhbmdlcy5kYXlTdGFydE1pbnV0ZSB8fFxuICAgICAgY2hhbmdlcy5kYXlFbmRIb3VyIHx8XG4gICAgICBjaGFuZ2VzLmRheUVuZE1pbnV0ZSB8fFxuICAgICAgY2hhbmdlcy5ob3VyU2VnbWVudHMgfHxcbiAgICAgIGNoYW5nZXMuaG91ckR1cmF0aW9uIHx8XG4gICAgICBjaGFuZ2VzLndlZWtTdGFydHNPbiB8fFxuICAgICAgY2hhbmdlcy53ZWVrZW5kRGF5cyB8fFxuICAgICAgY2hhbmdlcy5leGNsdWRlRGF5cyB8fFxuICAgICAgY2hhbmdlcy5ob3VyU2VnbWVudEhlaWdodCB8fFxuICAgICAgY2hhbmdlcy5ldmVudHMgfHxcbiAgICAgIGNoYW5nZXMuZGF5c0luV2VlayB8fFxuICAgICAgY2hhbmdlcy5taW5pbXVtRXZlbnRIZWlnaHQ7XG5cbiAgICBpZiAocmVmcmVzaEhlYWRlcikge1xuICAgICAgdGhpcy5yZWZyZXNoSGVhZGVyKCk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMuZXZlbnRzKSB7XG4gICAgICB2YWxpZGF0ZUV2ZW50cyh0aGlzLmV2ZW50cyk7XG4gICAgfVxuXG4gICAgaWYgKHJlZnJlc2hCb2R5KSB7XG4gICAgICB0aGlzLnJlZnJlc2hCb2R5KCk7XG4gICAgfVxuXG4gICAgaWYgKHJlZnJlc2hIZWFkZXIgfHwgcmVmcmVzaEJvZHkpIHtcbiAgICAgIHRoaXMuZW1pdEJlZm9yZVZpZXdSZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnJ0bCA9XG4gICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCkuZGlyZWN0aW9uID09PSAncnRsJztcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgZ2V0RGF5Q29sdW1uV2lkdGgoZXZlbnRSb3dDb250YWluZXI6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihldmVudFJvd0NvbnRhaW5lci5vZmZzZXRXaWR0aCAvIHRoaXMuZGF5cy5sZW5ndGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGdldFJlc291cmNlQXJyYXlGcm9tUmVzb3VyY2VNYXhSb3dOdW1iZXIoXG4gICAgcmVzb3VyY2VzTWF4Um93c051bWJlcjogUmVzb3VyY2VzTWF4Um93c051bWJlclxuICApOiBSZXNvdXJjZXNNYXhSb3dOdW1iZXJbXSB7XG4gICAgY29uc3QgcmVzb3VyY2VzID0gW107XG4gICAgZm9yIChsZXQgcmVzb3VyY2VzTWF4Um93TnVtYmVyIGluIHJlc291cmNlc01heFJvd3NOdW1iZXIpIHtcbiAgICAgIHJlc291cmNlcy5wdXNoKHJlc291cmNlc01heFJvd3NOdW1iZXJbcmVzb3VyY2VzTWF4Um93TnVtYmVyXSk7XG4gICAgfVxuICAgIHJldHVybiByZXNvdXJjZXM7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVmcmVzaEhlYWRlcigpOiB2b2lkIHtcbiAgICB0aGlzLmRheXMgPSB0aGlzLnV0aWxzLmdldFdlZWtWaWV3SGVhZGVyKHtcbiAgICAgIHZpZXdEYXRlOiB0aGlzLnZpZXdEYXRlLFxuICAgICAgd2Vla1N0YXJ0c09uOiB0aGlzLndlZWtTdGFydHNPbixcbiAgICAgIGV4Y2x1ZGVkOiB0aGlzLmV4Y2x1ZGVEYXlzLFxuICAgICAgd2Vla2VuZERheXM6IHRoaXMud2Vla2VuZERheXMsXG4gICAgICAuLi5nZXRNb250aFZpZXdQZXJpb2QodGhpcy5kYXRlQWRhcHRlciwgdGhpcy52aWV3RGF0ZSwgdGhpcy5leGNsdWRlRGF5cyksXG4gICAgfSk7XG4gICAgdGhpcy53ZWVrcyA9IFtcbiAgICAgIC4uLm5ldyBTZXQoXG4gICAgICAgIHRoaXMuZGF5cy5tYXAoKGRheSkgPT4gdGhpcy5kYXRlQWRhcHRlci5nZXRJU09XZWVrKGRheS5kYXRlKSlcbiAgICAgICkudmFsdWVzKCksXG4gICAgXTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZWZyZXNoQm9keSgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXcgPSB0aGlzLmdldFJlc291cmNlV2Vla1ZpZXcodGhpcy5ldmVudHMsIHRoaXMucmVzb3VyY2VzKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnZpZXcpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlZnJlc2hBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5yZWZyZXNoSGVhZGVyKCk7XG4gICAgdGhpcy5yZWZyZXNoQm9keSgpO1xuICAgIHRoaXMuZW1pdEJlZm9yZVZpZXdSZW5kZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBlbWl0QmVmb3JlVmlld1JlbmRlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kYXlzICYmIHRoaXMudmlldykge1xuICAgICAgdGhpcy5iZWZvcmVWaWV3UmVuZGVyLmVtaXQoe1xuICAgICAgICBoZWFkZXI6IHRoaXMuZGF5cyxcbiAgICAgICAgLi4udGhpcy52aWV3LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldFJlc291cmNlV2Vla1ZpZXcoXG4gICAgZXZlbnRzOiBDYWxlbmRhckV2ZW50W10sXG4gICAgcmVzb3VyY2VzOiBDYWxlbmRhclJlc291cmNlW11cbiAgKSB7XG4gICAgY29uc3QgcmVzb3VyY2VXZWVrVmlldyA9IHRoaXMudXRpbHMuZ2V0UmVzb3VyY2VXZWVrVmlldyh7XG4gICAgICBldmVudHMsXG4gICAgICByZXNvdXJjZXMsXG4gICAgICB2aWV3RGF0ZTogdGhpcy52aWV3RGF0ZSxcbiAgICAgIHdlZWtTdGFydHNPbjogdGhpcy53ZWVrU3RhcnRzT24sXG4gICAgICBleGNsdWRlZDogdGhpcy5leGNsdWRlRGF5cyxcbiAgICAgIHByZWNpc2lvbjogdGhpcy5wcmVjaXNpb24sXG4gICAgICBhYnNvbHV0ZVBvc2l0aW9uZWRFdmVudHM6IHRydWUsXG4gICAgICBob3VyU2VnbWVudHM6IHRoaXMuaG91clNlZ21lbnRzLFxuICAgICAgZGF5U3RhcnQ6IHtcbiAgICAgICAgaG91cjogdGhpcy5kYXlTdGFydEhvdXIsXG4gICAgICAgIG1pbnV0ZTogdGhpcy5kYXlTdGFydE1pbnV0ZSxcbiAgICAgIH0sXG4gICAgICBkYXlFbmQ6IHtcbiAgICAgICAgaG91cjogdGhpcy5kYXlFbmRIb3VyLFxuICAgICAgICBtaW51dGU6IHRoaXMuZGF5RW5kTWludXRlLFxuICAgICAgfSxcbiAgICAgIHNlZ21lbnRIZWlnaHQ6IHRoaXMuaG91clNlZ21lbnRIZWlnaHQsXG4gICAgICB3ZWVrZW5kRGF5czogdGhpcy53ZWVrZW5kRGF5cyxcbiAgICAgIG1pbmltdW1FdmVudEhlaWdodDogdGhpcy5taW5pbXVtRXZlbnRIZWlnaHQsXG4gICAgICAuLi5nZXRNb250aFZpZXdQZXJpb2QodGhpcy5kYXRlQWRhcHRlciwgdGhpcy52aWV3RGF0ZSwgdGhpcy5leGNsdWRlRGF5cyksXG4gICAgICBrZWVwVW5hc3NpZ25lZEV2ZW50czogdGhpcy5rZWVwVW5hc3NpZ25lZEV2ZW50cyxcbiAgICAgIHVuYXNzaWduZWRSZXNzb3VyY2VOYW1lOiB0aGlzLnVuYXNzaWduZWRSZXNzb3VyY2VOYW1lLFxuICAgIH0pO1xuICAgIHRoaXMucmVzb3VyY2VzTWF4Um93c051bWJlckFzQXJyYXkgPVxuICAgICAgdGhpcy5nZXRSZXNvdXJjZUFycmF5RnJvbVJlc291cmNlTWF4Um93TnVtYmVyKFxuICAgICAgICByZXNvdXJjZVdlZWtWaWV3LnJlc291cmNlc01heFJvd3NOdW1iZXJcbiAgICAgICk7XG4gICAgcmV0dXJuIHJlc291cmNlV2Vla1ZpZXc7XG4gIH1cblxuICBvblNjcm9sbCgkZXZlbnQ6IEV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJGV2ZW50LnRhcmdldFsnc2Nyb2xsTGVmdCddKTtcbiAgICB0aGlzLmhlYWRlcnMuc2Nyb2xsRWxlbWVudHMoJGV2ZW50LnRhcmdldFsnc2Nyb2xsTGVmdCddKTtcbiAgfVxufVxuIl19