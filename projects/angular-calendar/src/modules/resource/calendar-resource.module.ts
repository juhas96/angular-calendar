import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizableModule } from 'angular-resizable-element';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CalendarResourceViewComponent } from './calendar-resource-view/calendar-resource-view.component';
import { CalendarResourceViewHeaderComponent } from './calendar-resource-view/calendar-resource-view-header/calendar-resource-view-header.component';
import { CalendarResourceViewEventComponent } from './calendar-resource-view/calendar-resource-view-event/calendar-resource-view-event.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarResourceViewResourceSegmentComponent } from './calendar-resource-view/calendar-resource-view-resource-segment/calendar-resource-view-resource-segment.component';
import { CalendarResourceViewCurrentTimeMarkerComponent } from './calendar-resource-view/calendar-resource-view-current-time-marker/calendar-resource-view-current-time-marker.component';

export {
  CalendarResourceViewComponent,
  CalendarResourceViewBeforeRenderEvent,
} from './calendar-resource-view/calendar-resource-view.component';
export {
  WeekViewAllDayEvent as CalendarWeekViewAllDayEvent,
  WeekViewAllDayEventRow as CalendarWeekViewAllDayEventRow,
  GetWeekViewArgs as CalendarGetWeekViewArgs,
} from 'calendar-utils';
export { getWeekViewPeriod } from '../common/util/util';

// needed for ivy, not part of the public api
export { CalendarResourceViewHeaderComponent as ɵCalendarResourceViewHeaderComponent } from './calendar-resource-view/calendar-resource-view-header/calendar-resource-view-header.component';
export { CalendarResourceViewEventComponent as ɵCalendarResourceViewEventComponent } from './calendar-resource-view/calendar-resource-view-event/calendar-resource-view-event.component';
export { CalendarResourceViewResourceSegmentComponent as ɵCalendarResourceViewHourSegmentComponent } from './calendar-resource-view/calendar-resource-view-resource-segment/calendar-resource-view-resource-segment.component';
export { CalendarResourceViewCurrentTimeMarkerComponent as ɵCalendarResourceViewCurrentTimeMarkerComponent } from './calendar-resource-view/calendar-resource-view-current-time-marker/calendar-resource-view-current-time-marker.component';

@NgModule({
  imports: [
    CommonModule,
    ResizableModule,
    DragAndDropModule,
    CalendarCommonModule,
  ],
  declarations: [
    CalendarResourceViewComponent,
    CalendarResourceViewHeaderComponent,
    CalendarResourceViewEventComponent,
    CalendarResourceViewResourceSegmentComponent,
    CalendarResourceViewCurrentTimeMarkerComponent,
  ],
  exports: [
    ResizableModule,
    DragAndDropModule,
    CalendarResourceViewComponent,
    CalendarResourceViewHeaderComponent,
    CalendarResourceViewEventComponent,
    CalendarResourceViewResourceSegmentComponent,
    CalendarResourceViewCurrentTimeMarkerComponent,
  ],
})
export class CalendarResourceModule {}
