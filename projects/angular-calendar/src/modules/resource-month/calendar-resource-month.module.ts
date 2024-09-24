import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizableModule } from 'angular-resizable-element';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CalendarMonthViewComponent } from './calendar-resource-month-view/calendar-resource-month-view.component';
import { CalendarMonthViewHeaderComponent } from './calendar-resource-month-view/calendar-resource-month-view-header/calendar-resource-month-view-header.component';
import { CalendarMonthViewEventComponent } from './calendar-resource-month-view/calendar-resource-month-view-event/calendar-resource-month-view-event.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarMonthViewRowSegmentComponent } from './calendar-resource-month-view/calendar-resource-month-view-row-segment/calendar-resource-month-view-row-segment.component';
import { CalendarMonthViewCurrentTimeMarkerComponent } from './calendar-resource-month-view/calendar-resource-month-view-current-time-marker/calendar-resource-month-view-current-time-marker.component';
import { PipeModule } from '../common/pipe/pipe.module';

export {
  CalendarMonthViewComponent as CalendarResourceMonthViewComponent,
  CalendarMonthViewBeforeRenderEvent as CalendarResourceMonthViewBeforeRenderEvent,
} from './calendar-resource-month-view/calendar-resource-month-view.component';
export {
  WeekViewAllDayEvent as CalendarWeekViewAllDayEvent,
  WeekViewAllDayEventRow as CalendarWeekViewAllDayEventRow,
  GetWeekViewArgs as CalendarGetWeekViewArgs,
} from 'calendar-utils';
export { getWeekViewPeriod } from '../common/util/util';

// needed for ivy, not part of the public api
export { CalendarMonthViewHeaderComponent as ɵCalendarResourceMonthViewHeaderComponent } from './calendar-resource-month-view/calendar-resource-month-view-header/calendar-resource-month-view-header.component';
export { CalendarMonthViewEventComponent as ɵCalendarResourceMonthViewEventComponent } from './calendar-resource-month-view/calendar-resource-month-view-event/calendar-resource-month-view-event.component';
export { CalendarMonthViewRowSegmentComponent as ɵCalendarResourceMonthViewRowSegmentComponent } from './calendar-resource-month-view/calendar-resource-month-view-row-segment/calendar-resource-month-view-row-segment.component';
export { CalendarMonthViewCurrentTimeMarkerComponent as ɵCalendarResourceMonthViewCurrentTimeMarkerComponent } from './calendar-resource-month-view/calendar-resource-month-view-current-time-marker/calendar-resource-month-view-current-time-marker.component';

@NgModule({
  imports: [
    CommonModule,
    ResizableModule,
    DragAndDropModule,
    CalendarCommonModule,
    PipeModule,
  ],
  declarations: [
    CalendarMonthViewComponent,
    CalendarMonthViewHeaderComponent,
    CalendarMonthViewEventComponent,
    CalendarMonthViewCurrentTimeMarkerComponent,
    CalendarMonthViewRowSegmentComponent,
  ],
  exports: [
    ResizableModule,
    DragAndDropModule,
    CalendarMonthViewComponent,
    CalendarMonthViewHeaderComponent,
    CalendarMonthViewEventComponent,
    CalendarMonthViewCurrentTimeMarkerComponent,
    CalendarMonthViewRowSegmentComponent,
  ],
})
export class CalendarResourceMonthModule {}
