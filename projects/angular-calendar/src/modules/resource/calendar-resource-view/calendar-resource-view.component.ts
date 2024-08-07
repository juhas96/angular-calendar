import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnChanges,
  OnInit,
  OnDestroy,
  LOCALE_ID,
  Inject,
  TemplateRef,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {
  WeekDay,
  CalendarEvent,
  WeekViewAllDayEvent,
  WeekView,
  ViewPeriod,
  WeekViewHourColumn,
  WeekViewTimeEvent,
  WeekViewHourSegment,
  WeekViewHour,
  WeekViewAllDayEventRow,
  EventResource,
  ResourceWeekView,
} from 'calendar-utils';
import { ResizeCursors } from 'angular-resizable-element';
import { CalendarDragHelper } from '../../common/calendar-drag-helper/calendar-drag-helper.provider';
import {
  CalendarEventTimesChangedEvent,
  CalendarEventTimesChangedEventType,
} from '../../common/calendar-event-times-changed-event/calendar-event-times-changed-event.interface';
import { CalendarUtils } from '../../common/calendar-utils/calendar-utils.provider';
import {
  validateEvents,
  roundToNearest,
  trackByWeekDayHeaderDate,
  trackByHourSegment,
  trackByHour,
  getMinutesMoved,
  getDefaultEventEnd,
  addDaysWithExclusions,
  isDraggedWithinPeriod,
  shouldFireDroppedEvent,
  getWeekViewPeriod,
  trackByWeekAllDayEvent,
  trackByWeekTimeEvent,
} from '../../common/util/util';
import { DateAdapter } from '../../../date-adapters/date-adapter';
import {
  DragEndEvent,
  DropEvent,
  DragMoveEvent,
  ValidateDrag,
} from 'angular-draggable-droppable';
import { PlacementArray } from 'positioning';

export interface WeekViewAllDayEventResize {
  originalOffset: number;
  originalSpan: number;
  edge: string;
}

export interface CalendarResourceViewBeforeRenderEvent extends WeekView {
  header: WeekDay[];
}

/**
 * Shows all events on a given week. Example usage:
 *
 * ```typescript
 * <mwl-calendar-resource-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-resource-view>
 * ```
 */
@Component({
  selector: 'mwl-calendar-resource-view',
  template: `
    <div class="cal-week-view" role="grid">
      <mwl-calendar-resource-view-header
        [days]="days"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (dayHeaderClicked)="dayHeaderClicked.emit($event)"
        (eventDropped)="
          eventDropped({ dropData: $event }, $event.newStart, true)
        "
        (dragEnter)="dateDragEnter($event.date)"
      >
      </mwl-calendar-resource-view-header>
      <div
        class="cal-time-events"
        mwlDroppable
        (dragEnter)="dragEnter('time')"
        (dragLeave)="dragLeave('time')"
      >
        <div class="cal-resource-label-column" *ngIf="daysInWeek !== 1">
          <div
            *ngFor="let resource of resources; let odd = odd"
            class="cal-resource-row"
            [class.cal-resource-row-odd]="odd"
          >
            {{ resource.title }}
          </div>
        </div>
        <div class="cal-day-columns" #dayColumns>
          <div
            class="cal-day-column"
            *ngFor="let column of view.hourColumns; trackBy: trackByHourColumn"
          >
            <mwl-calendar-resource-view-current-time-marker
              [columnDate]="column.date"
              [dayStartHour]="dayStartHour"
              [dayStartMinute]="dayStartMinute"
              [dayEndHour]="dayEndHour"
              [dayEndMinute]="dayEndMinute"
              [hourSegments]="hourSegments"
              [hourDuration]="hourDuration"
              [hourSegmentHeight]="hourSegmentHeight"
              [customTemplate]="currentTimeMarkerTemplate"
            ></mwl-calendar-resource-view-current-time-marker>
            <div class="cal-events-container">
              <div
                *ngFor="
                  let timeEvent of column.events;
                  trackBy: trackByWeekTimeEvent
                "
                #event
                class="cal-event-container"
                [class.cal-draggable]="timeEvent.event.draggable"
                [class.cal-starts-within-day]="!timeEvent.startsBeforeDay"
                [class.cal-ends-within-day]="!timeEvent.endsAfterDay"
                [ngClass]="timeEvent.event.cssClass"
                [hidden]="timeEvent.height === 0 && timeEvent.width === 0"
                [style.top.px]="timeEvent.top"
                [style.height.px]="timeEvent.height"
                [style.left.%]="timeEvent.left"
                [style.width.%]="timeEvent.width"
                mwlDraggable
                dragActiveClass="cal-drag-active"
                [dropData]="{ event: timeEvent.event, calendarId: calendarId }"
                [dragAxis]="{
                  x: timeEvent.event.draggable,
                  y: timeEvent.event.draggable
                }"
                [dragSnapGrid]="
                  snapDraggedEvents
                    ? {
                        x: dayColumnWidth,
                        y: eventSnapSize || hourSegmentHeight
                      }
                    : {}
                "
                [touchStartLongPress]="{ delay: 300, delta: 30 }"
                [ghostDragEnabled]="!snapDraggedEvents"
                [ghostElementTemplate]="weekEventTemplate"
                [validateDrag]="validateDrag"
                (dragStart)="dragStarted(dayColumns, event, timeEvent, true)"
                (dragging)="dragMove(timeEvent, $event)"
                (dragEnd)="dragEnded(timeEvent, $event, dayColumnWidth, true)"
              >
                <ng-template
                  [ngTemplateOutlet]="weekEventTemplate"
                ></ng-template>
                <ng-template #weekEventTemplate>
                  <mwl-calendar-resource-view-event
                    [locale]="locale"
                    [weekEvent]="timeEvent"
                    [tooltipPlacement]="tooltipPlacement"
                    [tooltipTemplate]="tooltipTemplate"
                    [tooltipAppendToBody]="tooltipAppendToBody"
                    [tooltipDisabled]="dragActive"
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
                  </mwl-calendar-resource-view-event>
                </ng-template>
              </div>
            </div>

            <div
              *ngFor="let resource of resources; let odd = odd"
              class="cal-resource-row"
              [class.cal-resource-row-odd]="odd"
            >
              <!-- Version finale à prendre
            <div
              *ngFor="
                let resource of resources;
                trackBy: trackByResource;
                let odd = odd
              "
              class="cal-resource-row"
              [class.cal-resource-row-odd]="odd"
            >-->
              Une ligne pour une ressource
              <!--
              <mwl-calendar-resource-view-resource-segment
                *ngFor="
                  let segment of hour.segments;
                  trackBy: trackByHourSegment
                "
                [style.height.px]="hourSegmentHeight"
                [segment]="segment"
                [segmentHeight]="hourSegmentHeight"
                [locale]="locale"
                [customTemplate]="hourSegmentTemplate"
                [daysInWeek]="daysInWeek"
                (mwlClick)="
                  hourSegmentClicked.emit({
                    date: segment.date,
                    sourceEvent: $event
                  })
                "
                [clickListenerDisabled]="
                  hourSegmentClicked.observers.length === 0
                "
                mwlDroppable
                [dragOverClass]="
                  !dragActive || !snapDraggedEvents ? 'cal-drag-over' : null
                "
                dragActiveClass="cal-drag-active"
                (drop)="eventDropped($event, segment.date, false)"
                (dragEnter)="dateDragEnter(segment.date)"
                [isTimeLabel]="daysInWeek === 1"
              >
              </mwl-calendar-resource-view-resource-segment>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CalendarResourceViewComponent
  implements OnChanges, OnInit, OnDestroy, AfterViewInit
{
  /**
   * The current view date
   */
  @Input() viewDate: Date;

  /**
   * An array of events to display on view
   * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
   */
  @Input() events: CalendarEvent[] = [];

  /**
   * An array of events to display on view
   */
  @Input() resources: EventResource[] = [];

  /**
   * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
   */
  @Input() excludeDays: number[] = [];

  /**
   * An observable that when emitted on will re-render the current view
   */
  @Input() refresh: Subject<any>;

  /**
   * The locale used to format dates
   */
  @Input() locale: string;

  /**
   * The placement of the event tooltip
   */
  @Input() tooltipPlacement: PlacementArray = 'auto';

  /**
   * A custom template to use for the event tooltips
   */
  @Input() tooltipTemplate: TemplateRef<any>;

  /**
   * Whether to append tooltips to the body or next to the trigger element
   */
  @Input() tooltipAppendToBody: boolean = true;

  /**
   * The delay in milliseconds before the tooltip should be displayed. If not provided the tooltip
   * will be displayed immediately.
   */
  @Input() tooltipDelay: number | null = null;

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
  @Input() weekStartsOn: number;

  /**
   * A custom template to use to replace the header
   */
  @Input() headerTemplate: TemplateRef<any>;

  /**
   * A custom template to use for week view events
   */
  @Input() eventTemplate: TemplateRef<any>;

  /**
   * A custom template to use for event titles
   */
  @Input() eventTitleTemplate: TemplateRef<any>;

  /**
   * A custom template to use for event actions
   */
  @Input() eventActionsTemplate: TemplateRef<any>;

  /**
   * The precision to display events.
   * `days` will round event start and end dates to the nearest day and `minutes` will not do this rounding
   */
  @Input() precision: 'days' | 'minutes' = 'days';

  /**
   * An array of day indexes (0 = sunday, 1 = monday etc) that indicate which days are weekends
   */
  @Input() weekendDays: number[];

  /**
   * Whether to snap events to a grid when dragging
   */
  @Input() snapDraggedEvents: boolean = true;

  /**
   * The number of segments in an hour. Must divide equally into 60.
   */
  @Input() hourSegments: number = 2;

  /**
   * The duration of each segment group in minutes
   */
  @Input() hourDuration: number;

  /**
   * The height in pixels of each hour segment
   */
  @Input() hourSegmentHeight: number = 60;

  /**
   * The minimum height in pixels of each event
   */
  @Input() minimumEventHeight: number = 60;

  /**
   * The day start hours in 24 hour time. Must be 0-23
   */
  @Input() dayStartHour: number = 0;

  /**
   * The day start minutes. Must be 0-59
   */
  @Input() dayStartMinute: number = 0;

  /**
   * The day end hours in 24 hour time. Must be 0-23
   */
  @Input() dayEndHour: number = 23;

  /**
   * The day end minutes. Must be 0-59
   */
  @Input() dayEndMinute: number = 59;

  /**
   * A custom template to use to replace the hour segment
   */
  @Input() hourSegmentTemplate: TemplateRef<any>;

  /**
   * The grid size to snap resizing and dragging of hourly events to
   */
  @Input() eventSnapSize: number;

  /**
   * A custom template to use for the all day events label text
   */
  @Input() allDayEventsLabelTemplate: TemplateRef<any>;

  /**
   * The number of days in a week. Can be used to create a shorter or longer week view.
   * The first day of the week will always be the `viewDate` and `weekStartsOn` if set will be ignored
   */
  @Input() daysInWeek: number;

  /**
   * A custom template to use for the current time marker
   */
  @Input() currentTimeMarkerTemplate: TemplateRef<any>;

  /**
   * Allow you to customise where events can be dragged to.
   * Return true to allow dragging and resizing to the new location, or false to prevent it
   */
  @Input() validateEventTimesChanged: (
    event: CalendarEventTimesChangedEvent
  ) => boolean;

  /**
   * Customise the document cursor when dragging to resize an event
   */
  @Input() resizeCursors: Partial<
    Pick<ResizeCursors, 'leftOrRight' | 'topOrBottom'>
  >;

  /**
   * Called when a header week day is clicked. Adding a `cssClass` property on `$event.day` will add that class to the header element
   */
  @Output() dayHeaderClicked = new EventEmitter<{
    day: WeekDay;
    sourceEvent: MouseEvent;
  }>();

  /**
   * Called when an event title is clicked
   */
  @Output() eventClicked = new EventEmitter<{
    event: CalendarEvent;
    sourceEvent: MouseEvent | KeyboardEvent;
  }>();

  /**
   * Called when an event is dragged and dropped
   */
  @Output() eventTimesChanged =
    new EventEmitter<CalendarEventTimesChangedEvent>();

  /**
   * An output that will be called before the view is rendered for the current week.
   * If you add the `cssClass` property to a day in the header it will add that class to the cell element in the template
   */
  @Output() beforeViewRender =
    new EventEmitter<CalendarResourceViewBeforeRenderEvent>();

  /**
   * Called when an hour segment is clicked
   */
  @Output() hourSegmentClicked = new EventEmitter<{
    date: Date;
    sourceEvent: MouseEvent;
  }>();

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
  refreshSubscription: Subscription;

  /**
   * @hidden
   */
  eventDragEnterByType = {
    allDay: 0,
    time: 0,
  };

  /**
   * @hidden
   */
  dragActive = false;

  /**
   * @hidden
   */
  dragAlreadyMoved = false;

  /**
   * @hidden
   */
  validateDrag: ValidateDrag;

  /**
   * @hidden
   */
  validateResize: (args: any) => boolean;

  /**
   * @hidden
   */
  dayColumnWidth: number;

  /**
   * @hidden
   */
  calendarId = Symbol('angular calendar week view id');

  /**
   * @hidden
   */
  lastDraggedEvent: CalendarEvent;

  /**
   * @hidden
   */
  rtl = false;

  /**
   * @hidden
   */
  trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;

  /**
   * @hidden
   */
  trackByHourSegment = trackByHourSegment;

  /**
   * @hidden
   */
  trackByHour = trackByHour;

  /**
   * @hidden
   */
  trackByWeekAllDayEvent = trackByWeekAllDayEvent;

  /**
   * @hidden
   */
  trackByWeekTimeEvent = trackByWeekTimeEvent;

  /**
   * @hidden
   */
  private lastDragEnterDate: Date;

  /**
   * @hidden
   */
  constructor(
    protected cdr: ChangeDetectorRef,
    protected utils: CalendarUtils,
    @Inject(LOCALE_ID) locale: string,
    protected dateAdapter: DateAdapter,
    protected element: ElementRef<HTMLElement>
  ) {
    this.locale = locale;
  }

  /**
   * @hidden
   */
  trackByHourColumn = (index: number, column: WeekViewHourColumn) =>
    column.hours[0] ? column.hours[0].segments[0].date.toISOString() : column;

  /**
   * @hidden
   */
  trackById = (index: number, row: WeekViewAllDayEventRow) => row.id;

  /**
   * @hidden
   */
  ngOnInit(): void {
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
  ngOnChanges(changes: any): void {
    const refreshHeader =
      changes.viewDate ||
      changes.excludeDays ||
      changes.weekendDays ||
      changes.daysInWeek ||
      changes.weekStartsOn;

    const refreshBody =
      changes.viewDate ||
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
  ngOnDestroy(): void {
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
  getDayColumnWidth(eventRowContainer: HTMLElement): number {
    return Math.floor(eventRowContainer.offsetWidth / this.days.length);
  }

  /**
   * @hidden
   */
  dateDragEnter(date: Date) {
    this.lastDragEnterDate = date;
  }

  /**
   * @hidden
   */
  eventDropped(
    dropEvent: Pick<
      DropEvent<{ event?: CalendarEvent; calendarId?: symbol }>,
      'dropData'
    >,
    date: Date,
    allDay: boolean
  ): void {
    if (
      shouldFireDroppedEvent(dropEvent, date, allDay, this.calendarId) &&
      this.lastDragEnterDate.getTime() === date.getTime() &&
      (!this.snapDraggedEvents ||
        dropEvent.dropData.event !== this.lastDraggedEvent)
    ) {
      this.eventTimesChanged.emit({
        type: CalendarEventTimesChangedEventType.Drop,
        event: dropEvent.dropData.event,
        newStart: date,
        allDay,
      });
    }
    this.lastDraggedEvent = null;
  }

  /**
   * @hidden
   */
  dragEnter(type: 'allDay' | 'time') {
    this.eventDragEnterByType[type]++;
  }

  /**
   * @hidden
   */
  dragLeave(type: 'allDay' | 'time') {
    this.eventDragEnterByType[type]--;
  }

  /**
   * @hidden
   */
  dragStarted(
    eventsContainerElement: HTMLElement,
    eventElement: HTMLElement,
    event: WeekViewTimeEvent | WeekViewAllDayEvent,
    useY: boolean
  ): void {
    this.dayColumnWidth = this.getDayColumnWidth(eventsContainerElement);
    const dragHelper: CalendarDragHelper = new CalendarDragHelper(
      eventsContainerElement,
      eventElement
    );
    this.validateDrag = ({ x, y, transform }) => {
      const isAllowed = dragHelper.validateDrag({
        x,
        y,
        snapDraggedEvents: this.snapDraggedEvents,
        dragAlreadyMoved: this.dragAlreadyMoved,
        transform,
      });
      if (isAllowed && this.validateEventTimesChanged) {
        const newEventTimes = this.getDragMovedEventTimes(
          event,
          { x, y },
          this.dayColumnWidth,
          useY
        );
        return this.validateEventTimesChanged({
          type: CalendarEventTimesChangedEventType.Drag,
          event: event.event,
          newStart: newEventTimes.start,
          newEnd: newEventTimes.end,
        });
      }

      return isAllowed;
    };
    this.dragActive = true;
    this.dragAlreadyMoved = false;
    this.lastDraggedEvent = null;
    this.eventDragEnterByType = {
      allDay: 0,
      time: 0,
    };
    if (!this.snapDraggedEvents && useY) {
      this.view.hourColumns.forEach((column) => {
        const linkedEvent = column.events.find(
          (columnEvent) =>
            columnEvent.event === event.event && columnEvent !== event
        );
        // hide any linked events while dragging
        if (linkedEvent) {
          linkedEvent.width = 0;
          linkedEvent.height = 0;
        }
      });
    }
    this.cdr.markForCheck();
  }

  /**
   * @hidden
   */
  dragMove(dayEvent: WeekViewTimeEvent, dragEvent: DragMoveEvent) {
    const newEventTimes = this.getDragMovedEventTimes(
      dayEvent,
      dragEvent,
      this.dayColumnWidth,
      true
    );
    const originalEvent = dayEvent.event;
    const adjustedEvent = { ...originalEvent, ...newEventTimes };
    const tempEvents = this.events.map((event) => {
      if (event === originalEvent) {
        return adjustedEvent;
      }
      return event;
    });
    this.restoreOriginalEvents(
      tempEvents,
      new Map([[adjustedEvent, originalEvent]]),
      this.snapDraggedEvents
    );
    this.dragAlreadyMoved = true;
  }

  /**
   * @hidden
   */
  dragEnded(
    weekEvent: WeekViewAllDayEvent | WeekViewTimeEvent,
    dragEndEvent: DragEndEvent,
    dayWidth: number,
    useY = false
  ): void {
    this.view = this.getResourceWeekView(this.events, this.resources);
    this.dragActive = false;
    this.validateDrag = null;
    const { start, end } = this.getDragMovedEventTimes(
      weekEvent,
      dragEndEvent,
      dayWidth,
      useY
    );
    if (
      (this.snapDraggedEvents ||
        this.eventDragEnterByType[useY ? 'time' : 'allDay'] > 0) &&
      isDraggedWithinPeriod(start, end, this.view.period)
    ) {
      this.lastDraggedEvent = weekEvent.event;
      this.eventTimesChanged.emit({
        newStart: start,
        newEnd: end,
        event: weekEvent.event,
        type: CalendarEventTimesChangedEventType.Drag,
        allDay: !useY,
      });
    }
  }

  protected refreshHeader(): void {
    this.days = this.utils.getWeekViewHeader({
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      weekendDays: this.weekendDays,
      ...getWeekViewPeriod(
        this.dateAdapter,
        this.viewDate,
        this.weekStartsOn,
        this.excludeDays,
        this.daysInWeek
      ),
    });
  }

  protected refreshBody(): void {
    this.view = this.getResourceWeekView(this.events, this.resources);
  }

  protected refreshAll(): void {
    this.refreshHeader();
    this.refreshBody();
    this.emitBeforeViewRender();
  }

  protected emitBeforeViewRender(): void {
    if (this.days && this.view) {
      this.beforeViewRender.emit({
        header: this.days,
        ...this.view,
      });
    }
  }

  protected getResourceWeekView(
    events: CalendarEvent[],
    resources: EventResource[]
  ) {
    return this.utils.getResourceWeekView({
      events,
      resources,
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      precision: this.precision,
      absolutePositionedEvents: true,
      hourSegments: this.hourSegments,
      hourDuration: this.hourDuration,
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
      ...getWeekViewPeriod(
        this.dateAdapter,
        this.viewDate,
        this.weekStartsOn,
        this.excludeDays,
        this.daysInWeek
      ),
    });
  }

  protected getDragMovedEventTimes(
    weekEvent: WeekViewAllDayEvent | WeekViewTimeEvent,
    dragEndEvent: DragEndEvent | DragMoveEvent,
    dayWidth: number,
    useY: boolean
  ) {
    const daysDragged =
      (roundToNearest(dragEndEvent.x, dayWidth) / dayWidth) *
      (this.rtl ? -1 : 1);
    const minutesMoved = useY
      ? getMinutesMoved(
          dragEndEvent.y,
          this.hourSegments,
          this.hourSegmentHeight,
          this.eventSnapSize,
          this.hourDuration
        )
      : 0;

    const start = this.dateAdapter.addMinutes(
      addDaysWithExclusions(
        this.dateAdapter,
        weekEvent.event.start,
        daysDragged,
        this.excludeDays
      ),
      minutesMoved
    );
    let end: Date;
    if (weekEvent.event.end) {
      end = this.dateAdapter.addMinutes(
        addDaysWithExclusions(
          this.dateAdapter,
          weekEvent.event.end,
          daysDragged,
          this.excludeDays
        ),
        minutesMoved
      );
    }

    return { start, end };
  }

  protected restoreOriginalEvents(
    tempEvents: CalendarEvent[],
    adjustedEvents: Map<CalendarEvent, CalendarEvent>,
    snapDraggedEvents = true
  ) {
    const previousView = this.view;
    if (snapDraggedEvents) {
      this.view = this.getResourceWeekView(tempEvents, this.resources);
    }

    const adjustedEventsArray = tempEvents.filter((event) =>
      adjustedEvents.has(event)
    );
    this.view.hourColumns.forEach((column, columnIndex) => {
      previousView.hourColumns[columnIndex].hours.forEach((hour, hourIndex) => {
        hour.segments.forEach((segment, segmentIndex) => {
          column.hours[hourIndex].segments[segmentIndex].cssClass =
            segment.cssClass;
        });
      });

      adjustedEventsArray.forEach((adjustedEvent) => {
        const originalEvent = adjustedEvents.get(adjustedEvent);
        const existingColumnEvent = column.events.find(
          (columnEvent) =>
            columnEvent.event ===
            (snapDraggedEvents ? adjustedEvent : originalEvent)
        );
        if (existingColumnEvent) {
          // restore the original event so trackBy kicks in and the dom isn't changed
          existingColumnEvent.event = originalEvent;
          existingColumnEvent['tempEvent'] = adjustedEvent;
          if (!snapDraggedEvents) {
            existingColumnEvent.height = 0;
            existingColumnEvent.width = 0;
          }
        } else {
          // add a dummy event to the drop so if the event was removed from the original column the drag doesn't end early
          const event = {
            event: originalEvent,
            left: 0,
            top: 0,
            height: 0,
            width: 0,
            startsBeforeDay: false,
            endsAfterDay: false,
            tempEvent: adjustedEvent,
          };
          column.events.push(event);
        }
      });
    });
    adjustedEvents.clear();
  }
}
