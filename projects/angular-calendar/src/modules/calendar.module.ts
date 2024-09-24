import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import {
  CalendarCommonModule,
  CalendarModuleConfig,
  CalendarEventTitleFormatter,
  CalendarDateFormatter,
  CalendarA11y,
} from './common/calendar-common.module';
import { CalendarMonthModule } from './month/calendar-month.module';
import { CalendarWeekModule } from './week/calendar-week.module';
import { CalendarDayModule } from './day/calendar-day.module';
import { CalendarResourceDayModule } from './resource-day/calendar-resource-day.module';
import { CalendarResourceWeekModule } from './resource-week/calendar-resource-week.module';
import { CalendarUtils } from './common/calendar-utils/calendar-utils.provider';
import { CalendarResourceMonthModule } from './resource-month/calendar-resource-month.module';
export { CalendarEvent, CalendarResource } from 'calendar-utils';

export * from './common/calendar-common.module';
export * from './month/calendar-month.module';
export * from './week/calendar-week.module';
export * from './resource-week/calendar-resource-week.module';
export * from './day/calendar-day.module';
export * from './resource-day/calendar-resource-day.module';
export * from './resource-month/calendar-resource-month.module';

/**
 * The main module of this library. Example usage:
 *
 * ```typescript
 * import { CalenderModule } from 'angular-calendar';
 *
 * @NgModule({
 *   imports: [
 *     CalenderModule.forRoot()
 *   ]
 * })
 * class MyModule {}
 * ```
 *
 */
@NgModule({
  imports: [
    CalendarCommonModule,
    CalendarMonthModule,
    CalendarWeekModule,
    CalendarDayModule,
    CalendarResourceDayModule,
    CalendarResourceWeekModule,
    CalendarResourceMonthModule,
  ],
  exports: [
    CalendarCommonModule,
    CalendarMonthModule,
    CalendarWeekModule,
    CalendarDayModule,
    CalendarResourceDayModule,
    CalendarResourceWeekModule,
    CalendarResourceMonthModule,
  ],
})
export class CalendarModule {
  static forRoot(
    dateAdapter: Provider,
    config: CalendarModuleConfig = {}
  ): ModuleWithProviders<CalendarModule> {
    return {
      ngModule: CalendarModule,
      providers: [
        dateAdapter,
        config.eventTitleFormatter || CalendarEventTitleFormatter,
        config.dateFormatter || CalendarDateFormatter,
        config.utils || CalendarUtils,
        config.a11y || CalendarA11y,
      ],
    };
  }
}
