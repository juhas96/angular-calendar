import { ModuleWithProviders, Provider } from '@angular/core';
import { CalendarModuleConfig } from './common/calendar-common.module';
import * as i0 from "@angular/core";
import * as i1 from "./common/calendar-common.module";
import * as i2 from "./month/calendar-month.module";
import * as i3 from "./week/calendar-week.module";
import * as i4 from "./day/calendar-day.module";
import * as i5 from "./resource-day/calendar-resource-day.module";
import * as i6 from "./resource-week/calendar-resource-week.module";
export { CalendarEvent, CalendarResource } from 'calendar-utils';
export * from './common/calendar-common.module';
export * from './month/calendar-month.module';
export * from './week/calendar-week.module';
export * from './resource-week/calendar-resource-week.module';
export * from './day/calendar-day.module';
export * from './resource-day/calendar-resource-day.module';
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
export declare class CalendarModule {
    static forRoot(dateAdapter: Provider, config?: CalendarModuleConfig): ModuleWithProviders<CalendarModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CalendarModule, never, [typeof i1.CalendarCommonModule, typeof i2.CalendarMonthModule, typeof i3.CalendarWeekModule, typeof i4.CalendarDayModule, typeof i5.CalendarResourceDayModule, typeof i6.CalendarResourceWeekModule], [typeof i1.CalendarCommonModule, typeof i2.CalendarMonthModule, typeof i3.CalendarWeekModule, typeof i4.CalendarDayModule, typeof i5.CalendarResourceDayModule, typeof i6.CalendarResourceWeekModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CalendarModule>;
}
