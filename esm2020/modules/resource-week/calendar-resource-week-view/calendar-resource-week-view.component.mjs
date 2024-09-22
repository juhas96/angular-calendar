import { Component, Input, Output, EventEmitter, LOCALE_ID, Inject, } from '@angular/core';
import { validateEvents, trackByWeekDayHeaderDate, trackByHourSegment, trackByHour, getWeekViewPeriod, trackByWeekAllDayEvent, trackByWeekTimeEvent, trackByResourceWeekViewRowEvent, } from '../../common/util/util';
import * as i0 from "@angular/core";
import * as i1 from "../../common/calendar-utils/calendar-utils.provider";
import * as i2 from "../../../date-adapters/date-adapter";
import * as i3 from "@angular/common";
import * as i4 from "angular-draggable-droppable";
import * as i5 from "./calendar-resource-week-view-header/calendar-resource-week-view-header.component";
import * as i6 from "./calendar-resource-week-view-event/calendar-resource-week-view-event.component";
import * as i7 from "./calendar-resource-week-view-row-segment/calendar-resource-week-view-row-segment.component";
/**
 * Shows all events on a given week for resources. Example usage:
 *
 * ```typescript
 * <mwl-calendar-resource-week-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-resource-week-view>
 * ```
 */
export class CalendarWeekViewComponent {
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
         * Called when a header week day is clicked. Adding a `cssClass` property on `$event.day` will add that class to the header element
         */
        this.dayHeaderClicked = new EventEmitter();
        /**
         * Called when an event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * An output that will be called before the view is rendered for the current week.
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
        this.calendarId = Symbol('angular calendar week view id');
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
            ...getWeekViewPeriod(this.dateAdapter, this.viewDate, this.weekStartsOn, this.excludeDays, this.daysInWeek),
        });
    }
    refreshBody() {
        this.view = this.getResourceWeekView(this.events, this.resources);
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
            ...getWeekViewPeriod(this.dateAdapter, this.viewDate, this.weekStartsOn, this.excludeDays, this.daysInWeek),
            keepUnassignedEvents: this.keepUnassignedEvents,
            unassignedRessourceName: this.unassignedRessourceName,
        });
        this.resourcesMaxRowsNumberAsArray =
            this.getResourceArrayFromResourceMaxRowNumber(resourceWeekView.resourcesMaxRowsNumber);
        return resourceWeekView;
    }
}
CalendarWeekViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CalendarWeekViewComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.CalendarUtils }, { token: LOCALE_ID }, { token: i2.DateAdapter }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
CalendarWeekViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: CalendarWeekViewComponent, selector: "mwl-calendar-resource-week-view", inputs: { viewDate: "viewDate", events: "events", resources: "resources", excludeDays: "excludeDays", refresh: "refresh", locale: "locale", tooltipPlacement: "tooltipPlacement", tooltipTemplate: "tooltipTemplate", tooltipAppendToBody: "tooltipAppendToBody", tooltipDelay: "tooltipDelay", weekStartsOn: "weekStartsOn", headerTemplate: "headerTemplate", eventTemplate: "eventTemplate", eventTitleTemplate: "eventTitleTemplate", eventActionsTemplate: "eventActionsTemplate", precision: "precision", weekendDays: "weekendDays", hourSegments: "hourSegments", hourDuration: "hourDuration", hourSegmentHeight: "hourSegmentHeight", minimumEventHeight: "minimumEventHeight", dayStartHour: "dayStartHour", dayStartMinute: "dayStartMinute", dayEndHour: "dayEndHour", dayEndMinute: "dayEndMinute", hourSegmentTemplate: "hourSegmentTemplate", allDayEventsLabelTemplate: "allDayEventsLabelTemplate", daysInWeek: "daysInWeek", currentTimeMarkerTemplate: "currentTimeMarkerTemplate", keepUnassignedEvents: "keepUnassignedEvents", unassignedRessourceName: "unassignedRessourceName" }, outputs: { dayHeaderClicked: "dayHeaderClicked", eventClicked: "eventClicked", beforeViewRender: "beforeViewRender", hourSegmentClicked: "hourSegmentClicked" }, usesOnChanges: true, ngImport: i0, template: `
    <div class="cal-resource-week-view" role="grid">
      <mwl-calendar-resource-week-view-header
        [days]="days"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (dayHeaderClicked)="dayHeaderClicked.emit($event)"
      >
      </mwl-calendar-resource-week-view-header>

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
            <mwl-calendar-resource-week-view-row-segment
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
            </mwl-calendar-resource-week-view-row-segment>
          </div>
        </div>
        <div class="cal-day-columns" #dayColumns>
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
                    <mwl-calendar-resource-week-view-event
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
                    </mwl-calendar-resource-week-view-event>
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
              <mwl-calendar-resource-week-view-row-segment
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
              </mwl-calendar-resource-week-view-row-segment>
            </div>
          </div>
        </div>
      </div>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i4.DroppableDirective, selector: "[mwlDroppable]", inputs: ["dragOverClass", "dragActiveClass", "validateDrop"], outputs: ["dragEnter", "dragLeave", "dragOver", "drop"] }, { kind: "component", type: i5.CalendarWeekViewHeaderComponent, selector: "mwl-calendar-resource-week-view-header", inputs: ["days", "locale", "customTemplate"], outputs: ["dayHeaderClicked", "eventDropped", "dragEnter"] }, { kind: "component", type: i6.CalendarWeekViewEventComponent, selector: "mwl-calendar-resource-week-view-event", inputs: ["locale", "weekEvent", "tooltipPlacement", "tooltipAppendToBody", "tooltipDisabled", "tooltipDelay", "customTemplate", "eventTitleTemplate", "eventActionsTemplate", "tooltipTemplate", "column", "daysInWeek"], outputs: ["eventClicked"] }, { kind: "component", type: i7.CalendarWeekViewRowSegmentComponent, selector: "mwl-calendar-resource-week-view-row-segment", inputs: ["segment", "segmentHeight", "resourceLabel", "daysInWeek", "customTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CalendarWeekViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mwl-calendar-resource-week-view',
                    template: `
    <div class="cal-resource-week-view" role="grid">
      <mwl-calendar-resource-week-view-header
        [days]="days"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (dayHeaderClicked)="dayHeaderClicked.emit($event)"
      >
      </mwl-calendar-resource-week-view-header>

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
            <mwl-calendar-resource-week-view-row-segment
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
            </mwl-calendar-resource-week-view-row-segment>
          </div>
        </div>
        <div class="cal-day-columns" #dayColumns>
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
                    <mwl-calendar-resource-week-view-event
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
                    </mwl-calendar-resource-week-view-event>
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
              <mwl-calendar-resource-week-view-row-segment
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
              </mwl-calendar-resource-week-view-row-segment>
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
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcmVzb3VyY2Utd2Vlay12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItY2FsZW5kYXIvc3JjL21vZHVsZXMvcmVzb3VyY2Utd2Vlay9jYWxlbmRhci1yZXNvdXJjZS13ZWVrLXZpZXcvY2FsZW5kYXItcmVzb3VyY2Utd2Vlay12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUtaLFNBQVMsRUFDVCxNQUFNLEdBSVAsTUFBTSxlQUFlLENBQUM7QUFjdkIsT0FBTyxFQUNMLGNBQWMsRUFDZCx3QkFBd0IsRUFDeEIsa0JBQWtCLEVBQ2xCLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsc0JBQXNCLEVBQ3RCLG9CQUFvQixFQUNwQiwrQkFBK0IsR0FDaEMsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Ozs7O0FBUWhDOzs7Ozs7Ozs7R0FTRztBQXFJSCxNQUFNLE9BQU8seUJBQXlCO0lBa1JwQzs7T0FFRztJQUNILFlBQ1ksR0FBc0IsRUFDdEIsS0FBb0IsRUFDWCxNQUFjLEVBQ3ZCLFdBQXdCLEVBQ3hCLE9BQWdDO1FBSmhDLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLFVBQUssR0FBTCxLQUFLLENBQWU7UUFFcEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFsUjVDOzs7V0FHRztRQUNNLFdBQU0sR0FBb0IsRUFBRSxDQUFDO1FBRXRDOztXQUVHO1FBQ00sY0FBUyxHQUF1QixFQUFFLENBQUM7UUFFNUM7O1dBRUc7UUFDTSxnQkFBVyxHQUFhLEVBQUUsQ0FBQztRQVlwQzs7V0FFRztRQUNNLHFCQUFnQixHQUFtQixNQUFNLENBQUM7UUFPbkQ7O1dBRUc7UUFDTSx3QkFBbUIsR0FBWSxJQUFJLENB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QkFBdEIsS0FBSztnQkFLRyxhQUFhO3NCQUFyQixLQUFLO2dCQUtHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFLRyxvQkFBb0I7c0JBQTVCLEtBQUs7Z0JBTUcsU0FBUztzQkFBakIsS0FBSztnQkFLRyxXQUFXO3NCQUFuQixLQUFLO2dCQUtHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBS0csWUFBWTtzQkFBcEIsS0FBSztnQkFLRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBS0csa0JBQWtCO3NCQUExQixLQUFLO2dCQUtHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBS0csY0FBYztzQkFBdEIsS0FBSztnQkFLRyxVQUFVO3NCQUFsQixLQUFLO2dCQUtHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBS0csbUJBQW1CO3NCQUEzQixLQUFLO2dCQUtHLHlCQUF5QjtzQkFBakMsS0FBSztnQkFNRyxVQUFVO3NCQUFsQixLQUFLO2dCQUtHLHlCQUF5QjtzQkFBakMsS0FBSztnQkFLRyxvQkFBb0I7c0JBQTVCLEtBQUs7Z0JBS0csdUJBQXVCO3NCQUEvQixLQUFLO2dCQUtJLGdCQUFnQjtzQkFBekIsTUFBTTtnQkFRRyxZQUFZO3NCQUFyQixNQUFNO2dCQVNHLGdCQUFnQjtzQkFBekIsTUFBTTtnQkFNRyxrQkFBa0I7c0JBQTNCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIExPQ0FMRV9JRCxcbiAgSW5qZWN0LFxuICBUZW1wbGF0ZVJlZixcbiAgRWxlbWVudFJlZixcbiAgQWZ0ZXJWaWV3SW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIFdlZWtEYXksXG4gIENhbGVuZGFyRXZlbnQsXG4gIENhbGVuZGFyUmVzb3VyY2UsXG4gIFdlZWtWaWV3SG91ckNvbHVtbixcbiAgV2Vla1ZpZXdBbGxEYXlFdmVudFJvdyxcbiAgUmVzb3VyY2VzTWF4Um93TnVtYmVyLFxuICBSZXNvdXJjZXNNYXhSb3dzTnVtYmVyLFxuICBSZXNvdXJjZVdlZWtWaWV3LFxuICBSZXNvdXJjZVdlZWtWaWV3Um93Q29sdW1uLFxufSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyBDYWxlbmRhclV0aWxzIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NhbGVuZGFyLXV0aWxzL2NhbGVuZGFyLXV0aWxzLnByb3ZpZGVyJztcbmltcG9ydCB7XG4gIHZhbGlkYXRlRXZlbnRzLFxuICB0cmFja0J5V2Vla0RheUhlYWRlckRhdGUsXG4gIHRyYWNrQnlIb3VyU2VnbWVudCxcbiAgdHJhY2tCeUhvdXIsXG4gIGdldFdlZWtWaWV3UGVyaW9kLFxuICB0cmFja0J5V2Vla0FsbERheUV2ZW50LFxuICB0cmFja0J5V2Vla1RpbWVFdmVudCxcbiAgdHJhY2tCeVJlc291cmNlV2Vla1ZpZXdSb3dFdmVudCxcbn0gZnJvbSAnLi4vLi4vY29tbW9uL3V0aWwvdXRpbCc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4uLy4uLy4uL2RhdGUtYWRhcHRlcnMvZGF0ZS1hZGFwdGVyJztcbmltcG9ydCB7IFBsYWNlbWVudEFycmF5IH0gZnJvbSAncG9zaXRpb25pbmcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENhbGVuZGFyV2Vla1ZpZXdCZWZvcmVSZW5kZXJFdmVudCBleHRlbmRzIFJlc291cmNlV2Vla1ZpZXcge1xuICBoZWFkZXI6IFdlZWtEYXlbXTtcbn1cblxuLyoqXG4gKiBTaG93cyBhbGwgZXZlbnRzIG9uIGEgZ2l2ZW4gd2VlayBmb3IgcmVzb3VyY2VzLiBFeGFtcGxlIHVzYWdlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIDxtd2wtY2FsZW5kYXItcmVzb3VyY2Utd2Vlay12aWV3XG4gKiAgW3ZpZXdEYXRlXT1cInZpZXdEYXRlXCJcbiAqICBbZXZlbnRzXT1cImV2ZW50c1wiPlxuICogPC9td2wtY2FsZW5kYXItcmVzb3VyY2Utd2Vlay12aWV3PlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci1yZXNvdXJjZS13ZWVrLXZpZXcnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjYWwtcmVzb3VyY2Utd2Vlay12aWV3XCIgcm9sZT1cImdyaWRcIj5cbiAgICAgIDxtd2wtY2FsZW5kYXItcmVzb3VyY2Utd2Vlay12aWV3LWhlYWRlclxuICAgICAgICBbZGF5c109XCJkYXlzXCJcbiAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiaGVhZGVyVGVtcGxhdGVcIlxuICAgICAgICAoZGF5SGVhZGVyQ2xpY2tlZCk9XCJkYXlIZWFkZXJDbGlja2VkLmVtaXQoJGV2ZW50KVwiXG4gICAgICA+XG4gICAgICA8L213bC1jYWxlbmRhci1yZXNvdXJjZS13ZWVrLXZpZXctaGVhZGVyPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiY2FsLXRpbWUtZXZlbnRzIGNhbC1yZXNvdXJjZS1ldmVudHNcIiBtd2xEcm9wcGFibGU+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtdGltZS1sYWJlbC1jb2x1bW5cIiAqbmdJZj1cInZpZXcucm93Q29sdW1ucy5sZW5ndGggPiAwXCI+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgKm5nRm9yPVwiXG4gICAgICAgICAgICAgIGxldCByZXNvdXJjZVJvdyBvZiByZXNvdXJjZXNNYXhSb3dzTnVtYmVyQXNBcnJheTtcbiAgICAgICAgICAgICAgbGV0IG9kZCA9IG9kZFxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgIGNsYXNzPVwiY2FsLWhvdXJcIlxuICAgICAgICAgICAgW2NsYXNzLmNhbC1yb3ctb2RkXT1cIm9kZFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG13bC1jYWxlbmRhci1yZXNvdXJjZS13ZWVrLXZpZXctcm93LXNlZ21lbnRcbiAgICAgICAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJcbiAgICAgICAgICAgICAgICBob3VyU2VnbWVudEhlaWdodCAqXG4gICAgICAgICAgICAgICAgKHJlc291cmNlUm93LmNvdW50ID4gMCA/IHJlc291cmNlUm93LmNvdW50IDogMSlcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgW3NlZ21lbnRIZWlnaHRdPVwiXG4gICAgICAgICAgICAgICAgaG91clNlZ21lbnRIZWlnaHQgKlxuICAgICAgICAgICAgICAgIChyZXNvdXJjZVJvdy5jb3VudCA+IDAgPyByZXNvdXJjZVJvdy5jb3VudCA6IDEpXG4gICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJob3VyU2VnbWVudFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgW3Jlc291cmNlTGFiZWxdPVwicmVzb3VyY2VSb3c/LnJlc291cmNlPy5uYW1lXCJcbiAgICAgICAgICAgICAgW2RheXNJbldlZWtdPVwiZGF5c0luV2Vla1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8L213bC1jYWxlbmRhci1yZXNvdXJjZS13ZWVrLXZpZXctcm93LXNlZ21lbnQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLWRheS1jb2x1bW5zXCIgI2RheUNvbHVtbnM+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJjYWwtZGF5LWNvbHVtblwiXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIHZpZXcucm93Q29sdW1uczsgdHJhY2tCeTogdHJhY2tCeVJvd0NvbHVtblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzcz1cImNhbC1ldmVudHMtY29udGFpbmVyXCJcbiAgICAgICAgICAgICAgKm5nRm9yPVwiXG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50c0NvbnRhaW5lciBvZiBjb2x1bW4uZXZlbnRzR3JvdXBlZEJ5UmVzb3VyY2U7XG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50Q29udGFpbmVySW5kZXggPSBpbmRleFxuICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICBbc3R5bGUudG9wXT1cIlxuICAgICAgICAgICAgICAgIHZpZXcucmVzb3VyY2VzTWF4Um93c051bWJlcltldmVudENvbnRhaW5lckluZGV4XS50b3AgKyAncHgnXG4gICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgICAqbmdJZj1cImV2ZW50c0NvbnRhaW5lci5ldmVudHM/Lmxlbmd0aDsgZWxzZSBlbXB0eUV2ZW50c1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAqbmdGb3I9XCJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWVFdmVudCBvZiBldmVudHNDb250YWluZXIuZXZlbnRzO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IGluZGV4O1xuICAgICAgICAgICAgICAgICAgICB0cmFja0J5OiB0cmFja0J5UmVzb3VyY2VXZWVrVmlld1Jvd0V2ZW50XG4gICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgI2V2ZW50XG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImNhbC1ldmVudC1jb250YWluZXJcIlxuICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwidGltZUV2ZW50LmV2ZW50LmNzc0NsYXNzXCJcbiAgICAgICAgICAgICAgICAgIFtoaWRkZW5dPVwidGltZUV2ZW50LmhlaWdodCA9PT0gMCAmJiB0aW1lRXZlbnQud2lkdGggPT09IDBcIlxuICAgICAgICAgICAgICAgICAgW3N0eWxlLnRvcC5weF09XCJ0aW1lRXZlbnQudG9wXCJcbiAgICAgICAgICAgICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwiaG91clNlZ21lbnRIZWlnaHRcIlxuICAgICAgICAgICAgICAgICAgW3N0eWxlLmxlZnQuJV09XCIwXCJcbiAgICAgICAgICAgICAgICAgIFtzdHlsZS53aWR0aC4lXT1cInRpbWVFdmVudC53aWR0aFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIndlZWtFdmVudFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgID48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICN3ZWVrRXZlbnRUZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPG13bC1jYWxlbmRhci1yZXNvdXJjZS13ZWVrLXZpZXctZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgW3dlZWtFdmVudF09XCJ0aW1lRXZlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICBbdG9vbHRpcEFwcGVuZFRvQm9keV09XCJ0b29sdGlwQXBwZW5kVG9Cb2R5XCJcbiAgICAgICAgICAgICAgICAgICAgICBbdG9vbHRpcERlbGF5XT1cInRvb2x0aXBEZWxheVwiXG4gICAgICAgICAgICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImV2ZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgIFtldmVudFRpdGxlVGVtcGxhdGVdPVwiZXZlbnRUaXRsZVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICBbZXZlbnRBY3Rpb25zVGVtcGxhdGVdPVwiZXZlbnRBY3Rpb25zVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgIFtjb2x1bW5dPVwiY29sdW1uXCJcbiAgICAgICAgICAgICAgICAgICAgICBbZGF5c0luV2Vla109XCJkYXlzSW5XZWVrXCJcbiAgICAgICAgICAgICAgICAgICAgICAoZXZlbnRDbGlja2VkKT1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRDbGlja2VkLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudDogdGltZUV2ZW50LmV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VFdmVudDogJGV2ZW50LnNvdXJjZUV2ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPC9td2wtY2FsZW5kYXItcmVzb3VyY2Utd2Vlay12aWV3LWV2ZW50PlxuICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZW1wdHlFdmVudHM+XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnQtY29udGFpbmVyXCJcbiAgICAgICAgICAgICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwiaG91clNlZ21lbnRIZWlnaHRcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgW3N0eWxlLmhlaWdodC5weF09XCJob3VyU2VnbWVudEhlaWdodFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHJvdyBvZiByZXNvdXJjZXNNYXhSb3dzTnVtYmVyQXNBcnJheTsgbGV0IG9kZCA9IG9kZFwiXG4gICAgICAgICAgICAgIGNsYXNzPVwiY2FsLWhvdXJcIlxuICAgICAgICAgICAgICBbY2xhc3MuY2FsLXJvdy1vZGRdPVwib2RkXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPG13bC1jYWxlbmRhci1yZXNvdXJjZS13ZWVrLXZpZXctcm93LXNlZ21lbnRcbiAgICAgICAgICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cIlxuICAgICAgICAgICAgICAgICAgaG91clNlZ21lbnRIZWlnaHQgKiAocm93LmNvdW50ID4gMCA/IHJvdy5jb3VudCA6IDEpXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICBbc2VnbWVudEhlaWdodF09XCJcbiAgICAgICAgICAgICAgICAgIGhvdXJTZWdtZW50SGVpZ2h0ICogKHJvdy5jb3VudCA+IDAgPyByb3cuY291bnQgOiAxKVxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgW3NlZ21lbnRdPVwie31cIlxuICAgICAgICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJob3VyU2VnbWVudFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbZGF5c0luV2Vla109XCJkYXlzSW5XZWVrXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8L213bC1jYWxlbmRhci1yZXNvdXJjZS13ZWVrLXZpZXctcm93LXNlZ21lbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJXZWVrVmlld0NvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXRcbntcbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHZpZXcgZGF0ZVxuICAgKi9cbiAgQElucHV0KCkgdmlld0RhdGU6IERhdGU7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGV2ZW50cyB0byBkaXNwbGF5IG9uIHZpZXdcbiAgICogVGhlIHNjaGVtYSBpcyBhdmFpbGFibGUgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL21hdHRsZXdpczkyL2NhbGVuZGFyLXV0aWxzL2Jsb2IvYzUxNjg5OTg1ZjU5YTI3MTk0MGUzMGJjNGUyYzRlMWZlZTNmY2I1Yy9zcmMvY2FsZW5kYXJVdGlscy50cyNMNDktTDYzXG4gICAqL1xuICBASW5wdXQoKSBldmVudHM6IENhbGVuZGFyRXZlbnRbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiByZXNvdXJjZXMgdG8gZGlzcGxheSBvbiB2aWV3XG4gICAqL1xuICBASW5wdXQoKSByZXNvdXJjZXM6IENhbGVuZGFyUmVzb3VyY2VbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBkYXkgaW5kZXhlcyAoMCA9IHN1bmRheSwgMSA9IG1vbmRheSBldGMpIHRoYXQgd2lsbCBiZSBoaWRkZW4gb24gdGhlIHZpZXdcbiAgICovXG4gIEBJbnB1dCgpIGV4Y2x1ZGVEYXlzOiBudW1iZXJbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHRoYXQgd2hlbiBlbWl0dGVkIG9uIHdpbGwgcmUtcmVuZGVyIHRoZSBjdXJyZW50IHZpZXdcbiAgICovXG4gIEBJbnB1dCgpIHJlZnJlc2g6IFN1YmplY3Q8YW55PjtcblxuICAvKipcbiAgICogVGhlIGxvY2FsZSB1c2VkIHRvIGZvcm1hdCBkYXRlc1xuICAgKi9cbiAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBwbGFjZW1lbnQgb2YgdGhlIGV2ZW50IHRvb2x0aXBcbiAgICovXG4gIEBJbnB1dCgpIHRvb2x0aXBQbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5ID0gJ2F1dG8nO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHRoZSBldmVudCB0b29sdGlwc1xuICAgKi9cbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGFwcGVuZCB0b29sdGlwcyB0byB0aGUgYm9keSBvciBuZXh0IHRvIHRoZSB0cmlnZ2VyIGVsZW1lbnRcbiAgICovXG4gIEBJbnB1dCgpIHRvb2x0aXBBcHBlbmRUb0JvZHk6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgZGVsYXkgaW4gbWlsbGlzZWNvbmRzIGJlZm9yZSB0aGUgdG9vbHRpcCBzaG91bGQgYmUgZGlzcGxheWVkLiBJZiBub3QgcHJvdmlkZWQgdGhlIHRvb2x0aXBcbiAgICogd2lsbCBiZSBkaXNwbGF5ZWQgaW1tZWRpYXRlbHkuXG4gICAqL1xuICBASW5wdXQoKSB0b29sdGlwRGVsYXk6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBUaGUgc3RhcnQgbnVtYmVyIG9mIHRoZSB3ZWVrLlxuICAgKiBUaGlzIGlzIGlnbm9yZWQgd2hlbiB0aGUgYGRheXNJbldlZWtgIGlucHV0IGlzIGFsc28gc2V0IGFzIHRoZSBgdmlld0RhdGVgIHdpbGwgYmUgdXNlZCBhcyB0aGUgc3RhcnQgb2YgdGhlIHdlZWsgaW5zdGVhZC5cbiAgICogTm90ZSwgeW91IHNob3VsZCBhbHNvIHBhc3MgdGhpcyB0byB0aGUgY2FsZW5kYXIgdGl0bGUgcGlwZSBzbyBpdCBzaG93cyB0aGUgc2FtZSBkYXlzOiB7eyB2aWV3RGF0ZSB8IGNhbGVuZGFyRGF0ZToodmlldyArICdWaWV3VGl0bGUnKTpsb2NhbGU6d2Vla1N0YXJ0c09uIH19XG4gICAqIElmIHVzaW5nIHRoZSBtb21lbnQgZGF0ZSBhZGFwdGVyIHRoaXMgb3B0aW9uIHdvbid0IGRvIGFueXRoaW5nIGFuZCB5b3UnbGwgbmVlZCB0byBzZXQgaXQgZ2xvYmFsbHkgbGlrZSBzbzpcbiAgICogYGBgXG4gICAqIG1vbWVudC51cGRhdGVMb2NhbGUoJ2VuJywge1xuICAgKiAgIHdlZWs6IHtcbiAgICogICAgIGRvdzogMSwgLy8gc2V0IHN0YXJ0IG9mIHdlZWsgdG8gbW9uZGF5IGluc3RlYWRcbiAgICogICAgIGRveTogMCxcbiAgICogICB9LFxuICAgKiB9KTtcbiAgICogYGBgXG4gICAqL1xuICBASW5wdXQoKSB3ZWVrU3RhcnRzT246IG51bWJlcjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIHRvIHJlcGxhY2UgdGhlIGhlYWRlclxuICAgKi9cbiAgQElucHV0KCkgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3Igd2VlayB2aWV3IGV2ZW50c1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBldmVudCB0aXRsZXNcbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50VGl0bGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBldmVudCBhY3Rpb25zXG4gICAqL1xuICBASW5wdXQoKSBldmVudEFjdGlvbnNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogVGhlIHByZWNpc2lvbiB0byBkaXNwbGF5IGV2ZW50cy5cbiAgICogYGRheXNgIHdpbGwgcm91bmQgZXZlbnQgc3RhcnQgYW5kIGVuZCBkYXRlcyB0byB0aGUgbmVhcmVzdCBkYXkgYW5kIGBtaW51dGVzYCB3aWxsIG5vdCBkbyB0aGlzIHJvdW5kaW5nXG4gICAqL1xuICBASW5wdXQoKSBwcmVjaXNpb246ICdkYXlzJyB8ICdtaW51dGVzJyA9ICdkYXlzJztcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgZGF5IGluZGV4ZXMgKDAgPSBzdW5kYXksIDEgPSBtb25kYXkgZXRjKSB0aGF0IGluZGljYXRlIHdoaWNoIGRheXMgYXJlIHdlZWtlbmRzXG4gICAqL1xuICBASW5wdXQoKSB3ZWVrZW5kRGF5czogbnVtYmVyW107XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2Ygc2VnbWVudHMgaW4gYW4gaG91ci4gTXVzdCBkaXZpZGUgZXF1YWxseSBpbnRvIDYwLlxuICAgKi9cbiAgQElucHV0KCkgaG91clNlZ21lbnRzOiBudW1iZXIgPSAyO1xuXG4gIC8qKlxuICAgKiBUaGUgZHVyYXRpb24gb2YgZWFjaCBzZWdtZW50IGdyb3VwIGluIG1pbnV0ZXNcbiAgICovXG4gIEBJbnB1dCgpIGhvdXJEdXJhdGlvbjogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgaGVpZ2h0IGluIHBpeGVscyBvZiBlYWNoIGhvdXIgc2VnbWVudFxuICAgKi9cbiAgQElucHV0KCkgaG91clNlZ21lbnRIZWlnaHQ6IG51bWJlciA9IDUwO1xuXG4gIC8qKlxuICAgKiBUaGUgbWluaW11bSBoZWlnaHQgaW4gcGl4ZWxzIG9mIGVhY2ggZXZlbnRcbiAgICovXG4gIEBJbnB1dCgpIG1pbmltdW1FdmVudEhlaWdodDogbnVtYmVyID0gNTA7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgc3RhcnQgaG91cnMgaW4gMjQgaG91ciB0aW1lLiBNdXN0IGJlIDAtMjNcbiAgICovXG4gIEBJbnB1dCgpIGRheVN0YXJ0SG91cjogbnVtYmVyID0gMDtcblxuICAvKipcbiAgICogVGhlIGRheSBzdGFydCBtaW51dGVzLiBNdXN0IGJlIDAtNTlcbiAgICovXG4gIEBJbnB1dCgpIGRheVN0YXJ0TWludXRlOiBudW1iZXIgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF5IGVuZCBob3VycyBpbiAyNCBob3VyIHRpbWUuIE11c3QgYmUgMC0yM1xuICAgKi9cbiAgQElucHV0KCkgZGF5RW5kSG91cjogbnVtYmVyID0gMjM7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgZW5kIG1pbnV0ZXMuIE11c3QgYmUgMC01OVxuICAgKi9cbiAgQElucHV0KCkgZGF5RW5kTWludXRlOiBudW1iZXIgPSA1OTtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIHRvIHJlcGxhY2UgdGhlIGhvdXIgc2VnbWVudFxuICAgKi9cbiAgQElucHV0KCkgaG91clNlZ21lbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciB0aGUgYWxsIGRheSBldmVudHMgbGFiZWwgdGV4dFxuICAgKi9cbiAgQElucHV0KCkgYWxsRGF5RXZlbnRzTGFiZWxUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBkYXlzIGluIGEgd2Vlay4gQ2FuIGJlIHVzZWQgdG8gY3JlYXRlIGEgc2hvcnRlciBvciBsb25nZXIgd2VlayB2aWV3LlxuICAgKiBUaGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrIHdpbGwgYWx3YXlzIGJlIHRoZSBgdmlld0RhdGVgIGFuZCBgd2Vla1N0YXJ0c09uYCBpZiBzZXQgd2lsbCBiZSBpZ25vcmVkXG4gICAqL1xuICBASW5wdXQoKSBkYXlzSW5XZWVrOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgdGhlIGN1cnJlbnQgdGltZSBtYXJrZXJcbiAgICovXG4gIEBJbnB1dCgpIGN1cnJlbnRUaW1lTWFya2VyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIFNob3VsZCB3ZSBkaXNwbGF5IGV2ZW50cyB3aXRob3V0IGFzc2lnbmVkIHJlc291cmNlc1xuICAgKi9cbiAgQElucHV0KCkga2VlcFVuYXNzaWduZWRFdmVudHM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBOYW1lIHRvIGRpc3BsYXkgdW5hc3NpZ25lZCByZXNvdXJjZS4gVGhpcyBhcHBseSBvbmx5IGlmIGtlZXBVbmFzc2lnbmVkRXZlbnRzIGlzIGVxdWFsIHRvIHRydWVcbiAgICovXG4gIEBJbnB1dCgpIHVuYXNzaWduZWRSZXNzb3VyY2VOYW1lOiBzdHJpbmcgPSAnVW5hc3NpZ25lZCc7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGEgaGVhZGVyIHdlZWsgZGF5IGlzIGNsaWNrZWQuIEFkZGluZyBhIGBjc3NDbGFzc2AgcHJvcGVydHkgb24gYCRldmVudC5kYXlgIHdpbGwgYWRkIHRoYXQgY2xhc3MgdG8gdGhlIGhlYWRlciBlbGVtZW50XG4gICAqL1xuICBAT3V0cHV0KCkgZGF5SGVhZGVyQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGRheTogV2Vla0RheTtcbiAgICBzb3VyY2VFdmVudDogTW91c2VFdmVudDtcbiAgfT4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYW4gZXZlbnQgdGl0bGUgaXMgY2xpY2tlZFxuICAgKi9cbiAgQE91dHB1dCgpIGV2ZW50Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xuICAgIHNvdXJjZUV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudDtcbiAgfT4oKTtcblxuICAvKipcbiAgICogQW4gb3V0cHV0IHRoYXQgd2lsbCBiZSBjYWxsZWQgYmVmb3JlIHRoZSB2aWV3IGlzIHJlbmRlcmVkIGZvciB0aGUgY3VycmVudCB3ZWVrLlxuICAgKiBJZiB5b3UgYWRkIHRoZSBgY3NzQ2xhc3NgIHByb3BlcnR5IHRvIGEgZGF5IGluIHRoZSBoZWFkZXIgaXQgd2lsbCBhZGQgdGhhdCBjbGFzcyB0byB0aGUgY2VsbCBlbGVtZW50IGluIHRoZSB0ZW1wbGF0ZVxuICAgKi9cbiAgQE91dHB1dCgpIGJlZm9yZVZpZXdSZW5kZXIgPVxuICAgIG5ldyBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJXZWVrVmlld0JlZm9yZVJlbmRlckV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhbiBob3VyIHNlZ21lbnQgaXMgY2xpY2tlZFxuICAgKi9cbiAgQE91dHB1dCgpIGhvdXJTZWdtZW50Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGRhdGU6IERhdGU7XG4gICAgc291cmNlRXZlbnQ6IE1vdXNlRXZlbnQ7XG4gIH0+KCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGRheXM6IFdlZWtEYXlbXTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdmlldzogUmVzb3VyY2VXZWVrVmlldztcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgcmVzb3VyY2VzTWF4Um93c051bWJlckFzQXJyYXk6IFJlc291cmNlc01heFJvd051bWJlcltdO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICByZWZyZXNoU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGRheUNvbHVtbldpZHRoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGNhbGVuZGFySWQgPSBTeW1ib2woJ2FuZ3VsYXIgY2FsZW5kYXIgd2VlayB2aWV3IGlkJyk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGxhc3REcmFnZ2VkRXZlbnQ6IENhbGVuZGFyRXZlbnQ7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHJ0bCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB0cmFja0J5V2Vla0RheUhlYWRlckRhdGUgPSB0cmFja0J5V2Vla0RheUhlYWRlckRhdGU7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlIb3VyU2VnbWVudCA9IHRyYWNrQnlIb3VyU2VnbWVudDtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdHJhY2tCeUhvdXIgPSB0cmFja0J5SG91cjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdHJhY2tCeVdlZWtBbGxEYXlFdmVudCA9IHRyYWNrQnlXZWVrQWxsRGF5RXZlbnQ7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlXZWVrVGltZUV2ZW50ID0gdHJhY2tCeVdlZWtUaW1lRXZlbnQ7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlSZXNvdXJjZVdlZWtWaWV3Um93RXZlbnQgPSB0cmFja0J5UmVzb3VyY2VXZWVrVmlld1Jvd0V2ZW50O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcm90ZWN0ZWQgdXRpbHM6IENhbGVuZGFyVXRpbHMsXG4gICAgQEluamVjdChMT0NBTEVfSUQpIGxvY2FsZTogc3RyaW5nLFxuICAgIHByb3RlY3RlZCBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXIsXG4gICAgcHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+XG4gICkge1xuICAgIHRoaXMubG9jYWxlID0gbG9jYWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlIb3VyQ29sdW1uID0gKGluZGV4OiBudW1iZXIsIGNvbHVtbjogV2Vla1ZpZXdIb3VyQ29sdW1uKSA9PlxuICAgIGNvbHVtbi5ob3Vyc1swXSA/IGNvbHVtbi5ob3Vyc1swXS5zZWdtZW50c1swXS5kYXRlLnRvSVNPU3RyaW5nKCkgOiBjb2x1bW47XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlSb3dDb2x1bW4gPSAoaW5kZXg6IG51bWJlciwgY29sdW1uOiBSZXNvdXJjZVdlZWtWaWV3Um93Q29sdW1uKSA9PlxuICAgIGNvbHVtbiA/IGNvbHVtbi5kYXRlLnRvSVNPU3RyaW5nKCkgOiBpbmRleDtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdHJhY2tCeUlkID0gKGluZGV4OiBudW1iZXIsIHJvdzogV2Vla1ZpZXdBbGxEYXlFdmVudFJvdykgPT4gcm93LmlkO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZWZyZXNoKSB7XG4gICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24gPSB0aGlzLnJlZnJlc2guc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5yZWZyZXNoQWxsKCk7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHJlZnJlc2hIZWFkZXIgPVxuICAgICAgY2hhbmdlcy52aWV3RGF0ZSB8fFxuICAgICAgY2hhbmdlcy5leGNsdWRlRGF5cyB8fFxuICAgICAgY2hhbmdlcy53ZWVrZW5kRGF5cyB8fFxuICAgICAgY2hhbmdlcy5kYXlzSW5XZWVrIHx8XG4gICAgICBjaGFuZ2VzLndlZWtTdGFydHNPbjtcblxuICAgIGNvbnN0IHJlZnJlc2hCb2R5ID1cbiAgICAgIGNoYW5nZXMudmlld0RhdGUgfHxcbiAgICAgIGNoYW5nZXMuZGF5U3RhcnRIb3VyIHx8XG4gICAgICBjaGFuZ2VzLmRheVN0YXJ0TWludXRlIHx8XG4gICAgICBjaGFuZ2VzLmRheUVuZEhvdXIgfHxcbiAgICAgIGNoYW5nZXMuZGF5RW5kTWludXRlIHx8XG4gICAgICBjaGFuZ2VzLmhvdXJTZWdtZW50cyB8fFxuICAgICAgY2hhbmdlcy5ob3VyRHVyYXRpb24gfHxcbiAgICAgIGNoYW5nZXMud2Vla1N0YXJ0c09uIHx8XG4gICAgICBjaGFuZ2VzLndlZWtlbmREYXlzIHx8XG4gICAgICBjaGFuZ2VzLmV4Y2x1ZGVEYXlzIHx8XG4gICAgICBjaGFuZ2VzLmhvdXJTZWdtZW50SGVpZ2h0IHx8XG4gICAgICBjaGFuZ2VzLmV2ZW50cyB8fFxuICAgICAgY2hhbmdlcy5kYXlzSW5XZWVrIHx8XG4gICAgICBjaGFuZ2VzLm1pbmltdW1FdmVudEhlaWdodDtcblxuICAgIGlmIChyZWZyZXNoSGVhZGVyKSB7XG4gICAgICB0aGlzLnJlZnJlc2hIZWFkZXIoKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5ldmVudHMpIHtcbiAgICAgIHZhbGlkYXRlRXZlbnRzKHRoaXMuZXZlbnRzKTtcbiAgICB9XG5cbiAgICBpZiAocmVmcmVzaEJvZHkpIHtcbiAgICAgIHRoaXMucmVmcmVzaEJvZHkoKTtcbiAgICB9XG5cbiAgICBpZiAocmVmcmVzaEhlYWRlciB8fCByZWZyZXNoQm9keSkge1xuICAgICAgdGhpcy5lbWl0QmVmb3JlVmlld1JlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMucnRsID1cbiAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KS5kaXJlY3Rpb24gPT09ICdydGwnO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBnZXREYXlDb2x1bW5XaWR0aChldmVudFJvd0NvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLmZsb29yKGV2ZW50Um93Q29udGFpbmVyLm9mZnNldFdpZHRoIC8gdGhpcy5kYXlzLmxlbmd0aCk7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgZ2V0UmVzb3VyY2VBcnJheUZyb21SZXNvdXJjZU1heFJvd051bWJlcihcbiAgICByZXNvdXJjZXNNYXhSb3dzTnVtYmVyOiBSZXNvdXJjZXNNYXhSb3dzTnVtYmVyXG4gICk6IFJlc291cmNlc01heFJvd051bWJlcltdIHtcbiAgICBjb25zdCByZXNvdXJjZXMgPSBbXTtcbiAgICBmb3IgKGxldCByZXNvdXJjZXNNYXhSb3dOdW1iZXIgaW4gcmVzb3VyY2VzTWF4Um93c051bWJlcikge1xuICAgICAgcmVzb3VyY2VzLnB1c2gocmVzb3VyY2VzTWF4Um93c051bWJlcltyZXNvdXJjZXNNYXhSb3dOdW1iZXJdKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc291cmNlcztcbiAgfVxuXG4gIHByb3RlY3RlZCByZWZyZXNoSGVhZGVyKCk6IHZvaWQge1xuICAgIHRoaXMuZGF5cyA9IHRoaXMudXRpbHMuZ2V0V2Vla1ZpZXdIZWFkZXIoe1xuICAgICAgdmlld0RhdGU6IHRoaXMudmlld0RhdGUsXG4gICAgICB3ZWVrU3RhcnRzT246IHRoaXMud2Vla1N0YXJ0c09uLFxuICAgICAgZXhjbHVkZWQ6IHRoaXMuZXhjbHVkZURheXMsXG4gICAgICB3ZWVrZW5kRGF5czogdGhpcy53ZWVrZW5kRGF5cyxcbiAgICAgIC4uLmdldFdlZWtWaWV3UGVyaW9kKFxuICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLFxuICAgICAgICB0aGlzLnZpZXdEYXRlLFxuICAgICAgICB0aGlzLndlZWtTdGFydHNPbixcbiAgICAgICAgdGhpcy5leGNsdWRlRGF5cyxcbiAgICAgICAgdGhpcy5kYXlzSW5XZWVrXG4gICAgICApLFxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlZnJlc2hCb2R5KCk6IHZvaWQge1xuICAgIHRoaXMudmlldyA9IHRoaXMuZ2V0UmVzb3VyY2VXZWVrVmlldyh0aGlzLmV2ZW50cywgdGhpcy5yZXNvdXJjZXMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlZnJlc2hBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5yZWZyZXNoSGVhZGVyKCk7XG4gICAgdGhpcy5yZWZyZXNoQm9keSgpO1xuICAgIHRoaXMuZW1pdEJlZm9yZVZpZXdSZW5kZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBlbWl0QmVmb3JlVmlld1JlbmRlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kYXlzICYmIHRoaXMudmlldykge1xuICAgICAgdGhpcy5iZWZvcmVWaWV3UmVuZGVyLmVtaXQoe1xuICAgICAgICBoZWFkZXI6IHRoaXMuZGF5cyxcbiAgICAgICAgLi4udGhpcy52aWV3LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldFJlc291cmNlV2Vla1ZpZXcoXG4gICAgZXZlbnRzOiBDYWxlbmRhckV2ZW50W10sXG4gICAgcmVzb3VyY2VzOiBDYWxlbmRhclJlc291cmNlW11cbiAgKSB7XG4gICAgY29uc3QgcmVzb3VyY2VXZWVrVmlldyA9IHRoaXMudXRpbHMuZ2V0UmVzb3VyY2VXZWVrVmlldyh7XG4gICAgICBldmVudHMsXG4gICAgICByZXNvdXJjZXMsXG4gICAgICB2aWV3RGF0ZTogdGhpcy52aWV3RGF0ZSxcbiAgICAgIHdlZWtTdGFydHNPbjogdGhpcy53ZWVrU3RhcnRzT24sXG4gICAgICBleGNsdWRlZDogdGhpcy5leGNsdWRlRGF5cyxcbiAgICAgIHByZWNpc2lvbjogdGhpcy5wcmVjaXNpb24sXG4gICAgICBhYnNvbHV0ZVBvc2l0aW9uZWRFdmVudHM6IHRydWUsXG4gICAgICBob3VyU2VnbWVudHM6IHRoaXMuaG91clNlZ21lbnRzLFxuICAgICAgZGF5U3RhcnQ6IHtcbiAgICAgICAgaG91cjogdGhpcy5kYXlTdGFydEhvdXIsXG4gICAgICAgIG1pbnV0ZTogdGhpcy5kYXlTdGFydE1pbnV0ZSxcbiAgICAgIH0sXG4gICAgICBkYXlFbmQ6IHtcbiAgICAgICAgaG91cjogdGhpcy5kYXlFbmRIb3VyLFxuICAgICAgICBtaW51dGU6IHRoaXMuZGF5RW5kTWludXRlLFxuICAgICAgfSxcbiAgICAgIHNlZ21lbnRIZWlnaHQ6IHRoaXMuaG91clNlZ21lbnRIZWlnaHQsXG4gICAgICB3ZWVrZW5kRGF5czogdGhpcy53ZWVrZW5kRGF5cyxcbiAgICAgIG1pbmltdW1FdmVudEhlaWdodDogdGhpcy5taW5pbXVtRXZlbnRIZWlnaHQsXG4gICAgICAuLi5nZXRXZWVrVmlld1BlcmlvZChcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcbiAgICAgICAgdGhpcy52aWV3RGF0ZSxcbiAgICAgICAgdGhpcy53ZWVrU3RhcnRzT24sXG4gICAgICAgIHRoaXMuZXhjbHVkZURheXMsXG4gICAgICAgIHRoaXMuZGF5c0luV2Vla1xuICAgICAgKSxcbiAgICAgIGtlZXBVbmFzc2lnbmVkRXZlbnRzOiB0aGlzLmtlZXBVbmFzc2lnbmVkRXZlbnRzLFxuICAgICAgdW5hc3NpZ25lZFJlc3NvdXJjZU5hbWU6IHRoaXMudW5hc3NpZ25lZFJlc3NvdXJjZU5hbWUsXG4gICAgfSk7XG4gICAgdGhpcy5yZXNvdXJjZXNNYXhSb3dzTnVtYmVyQXNBcnJheSA9XG4gICAgICB0aGlzLmdldFJlc291cmNlQXJyYXlGcm9tUmVzb3VyY2VNYXhSb3dOdW1iZXIoXG4gICAgICAgIHJlc291cmNlV2Vla1ZpZXcucmVzb3VyY2VzTWF4Um93c051bWJlclxuICAgICAgKTtcbiAgICByZXR1cm4gcmVzb3VyY2VXZWVrVmlldztcbiAgfVxufVxuIl19