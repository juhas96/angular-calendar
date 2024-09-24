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
  CalendarResource,
  WeekViewHourColumn,
  WeekViewAllDayEventRow,
  ResourcesMaxRowNumber,
  ResourcesMaxRowsNumber,
  ResourceWeekView,
  ResourceWeekViewRowColumn,
} from 'calendar-utils';
import { CalendarUtils } from '../../common/calendar-utils/calendar-utils.provider';
import {
  validateEvents,
  trackByWeekDayHeaderDate,
  trackByHourSegment,
  trackByHour,
  getWeekViewPeriod,
  trackByWeekAllDayEvent,
  trackByWeekTimeEvent,
  trackByResourceWeekViewRowEvent,
  getMonthViewPeriod,
} from '../../common/util/util';
import { DateAdapter } from '../../../date-adapters/date-adapter';
import { PlacementArray } from 'positioning';

export interface CalendarMonthViewBeforeRenderEvent extends ResourceWeekView {
  header: WeekDay[];
}

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
@Component({
  selector: 'mwl-calendar-resource-month-view',
  template: `
    <div class="cal-resource-week-view" role="grid">
      <mwl-calendar-resource-month-view-header
        [days]="days"
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
})
export class CalendarMonthViewComponent
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
   * An array of resources to display on view
   */
  @Input() resources: CalendarResource[] = [];

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
   * The start number of the month.
   * This is ignored when the `daysInWeek` input is also set as the `viewDate` will be used as the start of the month instead.
   * Note, you should also pass this to the calendar title pipe so it shows the same days: {{ viewDate | calendarDate:(view + 'ViewTitle'):locale:weekStartsOn }}
   * If using the moment date adapter this option won't do anything and you'll need to set it globally like so:
   * ```
   * moment.updateLocale('en', {
   *   month: {
   *     dow: 1, // set start of month to monday instead
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
   * A custom template to use for month view events
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
  @Input() hourSegmentHeight: number = 50;

  /**
   * The minimum height in pixels of each event
   */
  @Input() minimumEventHeight: number = 50;

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
   * A custom template to use for the all day events label text
   */
  @Input() allDayEventsLabelTemplate: TemplateRef<any>;

  /**
   * The number of days in a month. Can be used to create a shorter or longer month view.
   * The first day of the month will always be the `viewDate` and `weekStartsOn` if set will be ignored
   */
  @Input() daysInWeek: number;

  /**
   * A custom template to use for the current time marker
   */
  @Input() currentTimeMarkerTemplate: TemplateRef<any>;

  /**
   * Should we display events without assigned resources
   */
  @Input() keepUnassignedEvents: boolean = true;

  /**
   * Name to display unassigned resource. This apply only if keepUnassignedEvents is equal to true
   */
  @Input() unassignedRessourceName: string = 'Unassigned';

  /**
   * Called when a header month day is clicked. Adding a `cssClass` property on `$event.day` will add that class to the header element
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
   * An output that will be called before the view is rendered for the current month.
   * If you add the `cssClass` property to a day in the header it will add that class to the cell element in the template
   */
  @Output() beforeViewRender =
    new EventEmitter<CalendarMonthViewBeforeRenderEvent>();

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
  calendarId = Symbol('angular calendar month view id');

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
  trackByResourceWeekViewRowEvent = trackByResourceWeekViewRowEvent;

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
  trackByRowColumn = (index: number, column: ResourceWeekViewRowColumn) =>
    column ? column.date.toISOString() : index;

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
  getResourceArrayFromResourceMaxRowNumber(
    resourcesMaxRowsNumber: ResourcesMaxRowsNumber
  ): ResourcesMaxRowNumber[] {
    const resources = [];
    for (let resourcesMaxRowNumber in resourcesMaxRowsNumber) {
      resources.push(resourcesMaxRowsNumber[resourcesMaxRowNumber]);
    }
    return resources;
  }

  protected refreshHeader(): void {
    this.days = this.utils.getWeekViewHeader({
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      weekendDays: this.weekendDays,
      ...getMonthViewPeriod(this.dateAdapter, this.viewDate, this.excludeDays),
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
    resources: CalendarResource[]
  ) {
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
      this.getResourceArrayFromResourceMaxRowNumber(
        resourceWeekView.resourcesMaxRowsNumber
      );
    return resourceWeekView;
  }
}
