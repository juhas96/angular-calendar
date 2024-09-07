import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarDayViewComponent } from './calendar-day-view/calendar-day-view.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarResourceWeekModule } from '../resource-week/calendar-resource-week.module';

export {
  CalendarDayViewComponent,
  CalendarDayViewBeforeRenderEvent,
} from './calendar-day-view/calendar-day-view.component';

@NgModule({
  imports: [CommonModule, CalendarCommonModule, CalendarResourceWeekModule],
  declarations: [CalendarDayViewComponent],
  exports: [CalendarDayViewComponent],
})
export class CalendarResourceDayModule {}
