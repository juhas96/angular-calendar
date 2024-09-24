import { EventEmitter, ChangeDetectorRef, OnChanges, OnInit, OnDestroy, TemplateRef, ElementRef, AfterViewInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { WeekDay, CalendarEvent, CalendarResource, WeekViewHourColumn, WeekViewAllDayEventRow, ResourcesMaxRowNumber, ResourcesMaxRowsNumber, ResourceWeekView, ResourceWeekViewRowColumn } from 'calendar-utils';
import { CalendarUtils } from '../../common/calendar-utils/calendar-utils.provider';
import { DateAdapter } from '../../../date-adapters/date-adapter';
import { PlacementArray } from 'positioning';
import * as i0 from "@angular/core";
export interface CalendarWeekViewBeforeRenderEvent extends ResourceWeekView {
    header: WeekDay[];
}
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
export declare class CalendarWeekViewComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit {
    protected cdr: ChangeDetectorRef;
    protected utils: CalendarUtils;
    protected dateAdapter: DateAdapter;
    protected element: ElementRef<HTMLElement>;
    /**
     * The current view date
     */
    viewDate: Date;
    /**
     * An array of events to display on view
     * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
     */
    events: CalendarEvent[];
    /**
     * An array of resources to display on view
     */
    resources: CalendarResource[];
    /**
     * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
     */
    excludeDays: number[];
    /**
     * An observable that when emitted on will re-render the current view
     */
    refresh: Subject<any>;
    /**
     * The locale used to format dates
     */
    locale: string;
    /**
     * The placement of the event tooltip
     */
    tooltipPlacement: PlacementArray;
    /**
     * A custom template to use for the event tooltips
     */
    tooltipTemplate: TemplateRef<any>;
    /**
     * Whether to append tooltips to the body or next to the trigger element
     */
    tooltipAppendToBody: boolean;
    /**
     * The delay in milliseconds before the tooltip should be displayed. If not provided the tooltip
     * will be displayed immediately.
     */
    tooltipDelay: number | null;
    /**
     * The start number of the week.
     * This is ignored when the `daysInWeek` input is also set as the `viewDate` will be used as the start of the week instead.
     * Note, you should also pass this to the calendar title pipe so it shows the same days: {{ viewDate | calendarDate:(view + 'ViewTitle'):locale:weekStartsOn }}
     * If using the moment date adapter this option won't do anything and you'll need to set it globally like so:
     * ```
     * moment.updateLocale('en', {
     *   week: {
     *     dow: 1, // set start of week to monday instead
     *     doy: 0,
     *   },
     * });
     * ```
     */
    weekStartsOn: number;
    /**
     * A custom template to use to replace the header
     */
    headerTemplate: TemplateRef<any>;
    /**
     * A custom template to use for week view events
     */
    eventTemplate: TemplateRef<any>;
    /**
     * A custom template to use for event titles
     */
    eventTitleTemplate: TemplateRef<any>;
    /**
     * A custom template to use for event actions
     */
    eventActionsTemplate: TemplateRef<any>;
    /**
     * The precision to display events.
     * `days` will round event start and end dates to the nearest day and `minutes` will not do this rounding
     */
    precision: 'days' | 'minutes';
    /**
     * An array of day indexes (0 = sunday, 1 = monday etc) that indicate which days are weekends
     */
    weekendDays: number[];
    /**
     * The number of segments in an hour. Must divide equally into 60.
     */
    hourSegments: number;
    /**
     * The duration of each segment group in minutes
     */
    hourDuration: number;
    /**
     * The height in pixels of each hour segment
     */
    hourSegmentHeight: number;
    /**
     * The minimum height in pixels of each event
     */
    minimumEventHeight: number;
    /**
     * The day start hours in 24 hour time. Must be 0-23
     */
    dayStartHour: number;
    /**
     * The day start minutes. Must be 0-59
     */
    dayStartMinute: number;
    /**
     * The day end hours in 24 hour time. Must be 0-23
     */
    dayEndHour: number;
    /**
     * The day end minutes. Must be 0-59
     */
    dayEndMinute: number;
    /**
     * A custom template to use to replace the hour segment
     */
    hourSegmentTemplate: TemplateRef<any>;
    /**
     * A custom template to use for the all day events label text
     */
    allDayEventsLabelTemplate: TemplateRef<any>;
    /**
     * The number of days in a week. Can be used to create a shorter or longer week view.
     * The first day of the week will always be the `viewDate` and `weekStartsOn` if set will be ignored
     */
    daysInWeek: number;
    /**
     * A custom template to use for the current time marker
     */
    currentTimeMarkerTemplate: TemplateRef<any>;
    /**
     * Should we display events without assigned resources
     */
    keepUnassignedEvents: boolean;
    /**
     * Name to display unassigned resource. This apply only if keepUnassignedEvents is equal to true
     */
    unassignedRessourceName: string;
    /**
     * Called when a header week day is clicked. Adding a `cssClass` property on `$event.day` will add that class to the header element
     */
    dayHeaderClicked: EventEmitter<{
        day: WeekDay;
        sourceEvent: MouseEvent;
    }>;
    /**
     * Called when an event title is clicked
     */
    eventClicked: EventEmitter<{
        event: CalendarEvent;
        sourceEvent: MouseEvent | KeyboardEvent;
    }>;
    /**
     * An output that will be called before the view is rendered for the current week.
     * If you add the `cssClass` property to a day in the header it will add that class to the cell element in the template
     */
    beforeViewRender: EventEmitter<CalendarWeekViewBeforeRenderEvent>;
    /**
     * Called when an hour segment is clicked
     */
    hourSegmentClicked: EventEmitter<{
        date: Date;
        sourceEvent: MouseEvent;
    }>;
    /**
     * @hidden
     */
    days: WeekDay[];
    /**
     * @hidden
     */
    view: ResourceWeekView;
    /**
     * @hidden
     */
    resourcesMaxRowsNumberAsArray: ResourcesMaxRowNumber[];
    /**
     * @hidden
     */
    refreshSubscription: Subscription;
    /**
     * @hidden
     */
    dayColumnWidth: number;
    /**
     * @hidden
     */
    calendarId: symbol;
    /**
     * @hidden
     */
    lastDraggedEvent: CalendarEvent;
    /**
     * @hidden
     */
    rtl: boolean;
    /**
     * @hidden
     */
    trackByWeekDayHeaderDate: (index: number, day: WeekDay) => string;
    /**
     * @hidden
     */
    trackByHourSegment: (index: number, segment: import("calendar-utils").WeekViewHourSegment) => string;
    /**
     * @hidden
     */
    trackByHour: (index: number, hour: import("calendar-utils").WeekViewHour) => string;
    /**
     * @hidden
     */
    trackByWeekAllDayEvent: (index: number, weekEvent: import("calendar-utils").WeekViewAllDayEvent) => string | number | CalendarEvent<any, any>;
    /**
     * @hidden
     */
    trackByWeekTimeEvent: (index: number, weekEvent: import("calendar-utils").WeekViewTimeEvent) => string | number | CalendarEvent<any, any>;
    /**
     * @hidden
     */
    trackByResourceWeekViewRowEvent: (index: number, resourceWeekViewRowEvent: import("calendar-utils").ResourceWeekViewRowEvent<any>) => string | number | CalendarEvent<any, any>;
    /**
     * @hidden
     */
    constructor(cdr: ChangeDetectorRef, utils: CalendarUtils, locale: string, dateAdapter: DateAdapter, element: ElementRef<HTMLElement>);
    /**
     * @hidden
     */
    trackByHourColumn: (index: number, column: WeekViewHourColumn) => string | WeekViewHourColumn;
    /**
     * @hidden
     */
    trackByRowColumn: (index: number, column: ResourceWeekViewRowColumn) => string | number;
    /**
     * @hidden
     */
    trackById: (index: number, row: WeekViewAllDayEventRow) => string;
    /**
     * @hidden
     */
    ngOnInit(): void;
    /**
     * @hidden
     */
    ngOnChanges(changes: any): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    ngAfterViewInit(): void;
    /**
     * @hidden
     */
    getDayColumnWidth(eventRowContainer: HTMLElement): number;
    /**
     * @hidden
     */
    getResourceArrayFromResourceMaxRowNumber(resourcesMaxRowsNumber: ResourcesMaxRowsNumber): ResourcesMaxRowNumber[];
    protected refreshHeader(): void;
    protected refreshBody(): void;
    protected refreshAll(): void;
    protected emitBeforeViewRender(): void;
    protected getResourceWeekView(events: CalendarEvent[], resources: CalendarResource[]): ResourceWeekView<any, any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarWeekViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CalendarWeekViewComponent, "mwl-calendar-resource-week-view", never, { "viewDate": "viewDate"; "events": "events"; "resources": "resources"; "excludeDays": "excludeDays"; "refresh": "refresh"; "locale": "locale"; "tooltipPlacement": "tooltipPlacement"; "tooltipTemplate": "tooltipTemplate"; "tooltipAppendToBody": "tooltipAppendToBody"; "tooltipDelay": "tooltipDelay"; "weekStartsOn": "weekStartsOn"; "headerTemplate": "headerTemplate"; "eventTemplate": "eventTemplate"; "eventTitleTemplate": "eventTitleTemplate"; "eventActionsTemplate": "eventActionsTemplate"; "precision": "precision"; "weekendDays": "weekendDays"; "hourSegments": "hourSegments"; "hourDuration": "hourDuration"; "hourSegmentHeight": "hourSegmentHeight"; "minimumEventHeight": "minimumEventHeight"; "dayStartHour": "dayStartHour"; "dayStartMinute": "dayStartMinute"; "dayEndHour": "dayEndHour"; "dayEndMinute": "dayEndMinute"; "hourSegmentTemplate": "hourSegmentTemplate"; "allDayEventsLabelTemplate": "allDayEventsLabelTemplate"; "daysInWeek": "daysInWeek"; "currentTimeMarkerTemplate": "currentTimeMarkerTemplate"; "keepUnassignedEvents": "keepUnassignedEvents"; "unassignedRessourceName": "unassignedRessourceName"; }, { "dayHeaderClicked": "dayHeaderClicked"; "eventClicked": "eventClicked"; "beforeViewRender": "beforeViewRender"; "hourSegmentClicked": "hourSegmentClicked"; }, never, never, false, never>;
}
