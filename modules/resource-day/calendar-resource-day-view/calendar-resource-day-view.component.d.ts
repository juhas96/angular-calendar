import { EventEmitter, TemplateRef } from '@angular/core';
import { CalendarEvent, CalendarResource } from 'calendar-utils';
import { Subject } from 'rxjs';
import { PlacementArray } from 'positioning';
import { CalendarResourceWeekViewBeforeRenderEvent } from '../../resource-week/calendar-resource-week.module';
import { ResizeCursors } from 'angular-resizable-element';
import * as i0 from "@angular/core";
export declare type CalendarDayViewBeforeRenderEvent = CalendarResourceWeekViewBeforeRenderEvent;
/**
 * Shows all events on a given day for resources. Example usage:
 *
 * ```typescript
 * <mwl-calendar-resource-day-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-resource-day-view>
 * ```
 */
export declare class CalendarResourceDayViewComponent {
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
     * The number of segments in an hour. Must divide equally into 60.
     */
    hourSegments: number;
    /**
     * The height in pixels of each hour segment
     */
    hourSegmentHeight: number;
    /**
     * The duration of each segment group in minutes
     */
    hourDuration: number;
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
     * An observable that when emitted on will re-render the current view
     */
    refresh: Subject<any>;
    /**
     * The locale used to format dates
     */
    locale: string;
    /**
     * The grid size to snap resizing and dragging of events to
     */
    eventSnapSize: number;
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
     * A custom template to use to replace the hour segment
     */
    hourSegmentTemplate: TemplateRef<any>;
    /**
     * A custom template to use for day view events
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
     * Whether to snap events to a grid when dragging
     */
    snapDraggedEvents: boolean;
    /**
     * A custom template to use for the all day events label text
     */
    allDayEventsLabelTemplate: TemplateRef<any>;
    /**
     * A custom template to use for the current time marker
     */
    currentTimeMarkerTemplate: TemplateRef<any>;
    /**
     * Customise the document cursor when dragging to resize an event
     */
    resizeCursors: Partial<Pick<ResizeCursors, 'leftOrRight' | 'topOrBottom'>>;
    /**
     * Should we display events without assigned resources
     */
    keepUnassignedEvents: boolean;
    /**
     * Name to display unassigned resource. This apply only if keepUnassignedEvents is equal to true
     */
    unassignedRessourceName: string;
    /**
     * Called when an event title is clicked
     */
    eventClicked: EventEmitter<{
        event: CalendarEvent;
        sourceEvent: MouseEvent | KeyboardEvent;
    }>;
    /**
     * Called when an hour segment is clicked
     */
    hourSegmentClicked: EventEmitter<{
        date: Date;
        sourceEvent: MouseEvent;
    }>;
    /**
     * An output that will be called before the view is rendered for the current day.
     * If you add the `cssClass` property to an hour grid segment it will add that class to the hour segment in the template
     */
    beforeViewRender: EventEmitter<CalendarResourceWeekViewBeforeRenderEvent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarResourceDayViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CalendarResourceDayViewComponent, "mwl-calendar-resource-day-view", never, { "viewDate": "viewDate"; "events": "events"; "resources": "resources"; "hourSegments": "hourSegments"; "hourSegmentHeight": "hourSegmentHeight"; "hourDuration": "hourDuration"; "minimumEventHeight": "minimumEventHeight"; "dayStartHour": "dayStartHour"; "dayStartMinute": "dayStartMinute"; "dayEndHour": "dayEndHour"; "dayEndMinute": "dayEndMinute"; "refresh": "refresh"; "locale": "locale"; "eventSnapSize": "eventSnapSize"; "tooltipPlacement": "tooltipPlacement"; "tooltipTemplate": "tooltipTemplate"; "tooltipAppendToBody": "tooltipAppendToBody"; "tooltipDelay": "tooltipDelay"; "hourSegmentTemplate": "hourSegmentTemplate"; "eventTemplate": "eventTemplate"; "eventTitleTemplate": "eventTitleTemplate"; "eventActionsTemplate": "eventActionsTemplate"; "snapDraggedEvents": "snapDraggedEvents"; "allDayEventsLabelTemplate": "allDayEventsLabelTemplate"; "currentTimeMarkerTemplate": "currentTimeMarkerTemplate"; "resizeCursors": "resizeCursors"; "keepUnassignedEvents": "keepUnassignedEvents"; "unassignedRessourceName": "unassignedRessourceName"; }, { "eventClicked": "eventClicked"; "hourSegmentClicked": "hourSegmentClicked"; "beforeViewRender": "beforeViewRender"; }, never, never, false, never>;
}
