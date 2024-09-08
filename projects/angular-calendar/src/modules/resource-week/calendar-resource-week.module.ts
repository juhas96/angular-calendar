import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizableModule } from 'angular-resizable-element';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CalendarWeekViewComponent } from './calendar-resource-week-view/calendar-resource-week-view.component';
import { CalendarWeekViewHeaderComponent } from './calendar-resource-week-view/calendar-resource-week-view-header/calendar-resource-week-view-header.component';
import { CalendarWeekViewEventComponent } from './calendar-resource-week-view/calendar-resource-week-view-event/calendar-resource-week-view-event.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarWeekViewRowSegmentComponent } from './calendar-resource-week-view/calendar-resource-week-view-row-segment/calendar-resource-week-view-row-segment.component';
import { CalendarWeekViewCurrentTimeMarkerComponent } from './calendar-resource-week-view/calendar-resource-week-view-current-time-marker/calendar-resource-week-view-current-time-marker.component';
import { PipeModule } from '../common/pipe/pipe.module';

export {
  CalendarWeekViewComponent as CalendarResourceWeekViewComponent,
  CalendarWeekViewBeforeRenderEvent as CalendarResourceWeekViewBeforeRenderEvent,
} from './calendar-resource-week-view/calendar-resource-week-view.component';
export {
  WeekViewAllDayEvent as CalendarWeekViewAllDayEvent,
  WeekViewAllDayEventRow as CalendarWeekViewAllDayEventRow,
  GetWeekViewArgs as CalendarGetWeekViewArgs,
} from 'calendar-utils';
export { getWeekViewPeriod } from '../common/util/util';

// needed for ivy, not part of the public api
export { CalendarWeekViewHeaderComponent as ɵCalendarResourceWeekViewHeaderComponent } from './calendar-resource-week-view/calendar-resource-week-view-header/calendar-resource-week-view-header.component';
export { CalendarWeekViewEventComponent as ɵCalendarResourceWeekViewEventComponent } from './calendar-resource-week-view/calendar-resource-week-view-event/calendar-resource-week-view-event.component';
export { CalendarWeekViewRowSegmentComponent as ɵCalendarResourceWeekViewRowSegmentComponent } from './calendar-resource-week-view/calendar-resource-week-view-row-segment/calendar-resource-week-view-row-segment.component';
export { CalendarWeekViewCurrentTimeMarkerComponent as ɵCalendarResourceWeekViewCurrentTimeMarkerComponent } from './calendar-resource-week-view/calendar-resource-week-view-current-time-marker/calendar-resource-week-view-current-time-marker.component';

@NgModule({
  imports: [
    CommonModule,
    ResizableModule,
    DragAndDropModule,
    CalendarCommonModule,
    PipeModule,
  ],
  declarations: [
    CalendarWeekViewComponent,
    CalendarWeekViewHeaderComponent,
    CalendarWeekViewEventComponent,
    CalendarWeekViewCurrentTimeMarkerComponent,
    CalendarWeekViewRowSegmentComponent,
  ],
  exports: [
    ResizableModule,
    DragAndDropModule,
    CalendarWeekViewComponent,
    CalendarWeekViewHeaderComponent,
    CalendarWeekViewEventComponent,
    CalendarWeekViewCurrentTimeMarkerComponent,
    CalendarWeekViewRowSegmentComponent,
  ],
})
export class CalendarResourceWeekModule {}
