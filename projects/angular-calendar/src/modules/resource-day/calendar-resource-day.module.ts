import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarResourceDayViewComponent } from './calendar-resource-day-view/calendar-resource-day-view.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarResourceWeekModule } from '../resource-week/calendar-resource-week.module';

export {
  CalendarResourceDayViewComponent as CalendarResourceDayViewComponent,
  CalendarDayViewBeforeRenderEvent as CalendarResourceDayViewBeforeRenderEvent,
} from './calendar-resource-day-view/calendar-resource-day-view.component';

@NgModule({
  imports: [CommonModule, CalendarCommonModule, CalendarResourceWeekModule],
  declarations: [CalendarResourceDayViewComponent],
  exports: [CalendarResourceDayViewComponent],
})
export class CalendarResourceDayModule {}
