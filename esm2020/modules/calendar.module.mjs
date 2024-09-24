import { NgModule } from '@angular/core';
import { CalendarCommonModule, CalendarEventTitleFormatter, CalendarDateFormatter, CalendarA11y, } from './common/calendar-common.module';
import { CalendarMonthModule } from './month/calendar-month.module';
import { CalendarWeekModule } from './week/calendar-week.module';
import { CalendarDayModule } from './day/calendar-day.module';
import { CalendarResourceDayModule } from './resource-day/calendar-resource-day.module';
import { CalendarResourceWeekModule } from './resource-week/calendar-resource-week.module';
import { CalendarUtils } from './common/calendar-utils/calendar-utils.provider';
import { CalendarResourceMonthModule } from './resource-month/calendar-resource-month.module';
import * as i0 from "@angular/core";
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
export class CalendarModule {
    static forRoot(dateAdapter, config = {}) {
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
CalendarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CalendarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.3", ngImport: i0, type: CalendarModule, imports: [CalendarCommonModule,
        CalendarMonthModule,
        CalendarWeekModule,
        CalendarDayModule,
        CalendarResourceDayModule,
        CalendarResourceWeekModule,
        CalendarResourceMonthModule], exports: [CalendarCommonModule,
        CalendarMonthModule,
        CalendarWeekModule,
        CalendarDayModule,
        CalendarResourceDayModule,
        CalendarResourceWeekModule,
        CalendarResourceMonthModule] });
CalendarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarModule, imports: [CalendarCommonModule,
        CalendarMonthModule,
        CalendarWeekModule,
        CalendarDayModule,
        CalendarResourceDayModule,
        CalendarResourceWeekModule,
        CalendarResourceMonthModule, CalendarCommonModule,
        CalendarMonthModule,
        CalendarWeekModule,
        CalendarDayModule,
        CalendarResourceDayModule,
        CalendarResourceWeekModule,
        CalendarResourceMonthModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1jYWxlbmRhci9zcmMvbW9kdWxlcy9jYWxlbmRhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBaUMsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUNMLG9CQUFvQixFQUVwQiwyQkFBMkIsRUFDM0IscUJBQXFCLEVBQ3JCLFlBQVksR0FDYixNQUFNLGlDQUFpQyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzlELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUNoRixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQzs7QUFHOUYsY0FBYyxpQ0FBaUMsQ0FBQztBQUNoRCxjQUFjLCtCQUErQixDQUFDO0FBQzlDLGNBQWMsNkJBQTZCLENBQUM7QUFDNUMsY0FBYywrQ0FBK0MsQ0FBQztBQUM5RCxjQUFjLDJCQUEyQixDQUFDO0FBQzFDLGNBQWMsNkNBQTZDLENBQUM7QUFDNUQsY0FBYyxpREFBaUQsQ0FBQztBQUVoRTs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQXFCSCxNQUFNLE9BQU8sY0FBYztJQUN6QixNQUFNLENBQUMsT0FBTyxDQUNaLFdBQXFCLEVBQ3JCLFNBQStCLEVBQUU7UUFFakMsT0FBTztZQUNMLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDVCxXQUFXO2dCQUNYLE1BQU0sQ0FBQyxtQkFBbUIsSUFBSSwyQkFBMkI7Z0JBQ3pELE1BQU0sQ0FBQyxhQUFhLElBQUkscUJBQXFCO2dCQUM3QyxNQUFNLENBQUMsS0FBSyxJQUFJLGFBQWE7Z0JBQzdCLE1BQU0sQ0FBQyxJQUFJLElBQUksWUFBWTthQUM1QjtTQUNGLENBQUM7SUFDSixDQUFDOzsyR0FmVSxjQUFjOzRHQUFkLGNBQWMsWUFsQnZCLG9CQUFvQjtRQUNwQixtQkFBbUI7UUFDbkIsa0JBQWtCO1FBQ2xCLGlCQUFpQjtRQUNqQix5QkFBeUI7UUFDekIsMEJBQTBCO1FBQzFCLDJCQUEyQixhQUczQixvQkFBb0I7UUFDcEIsbUJBQW1CO1FBQ25CLGtCQUFrQjtRQUNsQixpQkFBaUI7UUFDakIseUJBQXlCO1FBQ3pCLDBCQUEwQjtRQUMxQiwyQkFBMkI7NEdBR2xCLGNBQWMsWUFsQnZCLG9CQUFvQjtRQUNwQixtQkFBbUI7UUFDbkIsa0JBQWtCO1FBQ2xCLGlCQUFpQjtRQUNqQix5QkFBeUI7UUFDekIsMEJBQTBCO1FBQzFCLDJCQUEyQixFQUczQixvQkFBb0I7UUFDcEIsbUJBQW1CO1FBQ25CLGtCQUFrQjtRQUNsQixpQkFBaUI7UUFDakIseUJBQXlCO1FBQ3pCLDBCQUEwQjtRQUMxQiwyQkFBMkI7MkZBR2xCLGNBQWM7a0JBcEIxQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxvQkFBb0I7d0JBQ3BCLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3dCQUNsQixpQkFBaUI7d0JBQ2pCLHlCQUF5Qjt3QkFDekIsMEJBQTBCO3dCQUMxQiwyQkFBMkI7cUJBQzVCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxvQkFBb0I7d0JBQ3BCLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3dCQUNsQixpQkFBaUI7d0JBQ2pCLHlCQUF5Qjt3QkFDekIsMEJBQTBCO3dCQUMxQiwyQkFBMkI7cUJBQzVCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDYWxlbmRhckNvbW1vbk1vZHVsZSxcbiAgQ2FsZW5kYXJNb2R1bGVDb25maWcsXG4gIENhbGVuZGFyRXZlbnRUaXRsZUZvcm1hdHRlcixcbiAgQ2FsZW5kYXJEYXRlRm9ybWF0dGVyLFxuICBDYWxlbmRhckExMXksXG59IGZyb20gJy4vY29tbW9uL2NhbGVuZGFyLWNvbW1vbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJNb250aE1vZHVsZSB9IGZyb20gJy4vbW9udGgvY2FsZW5kYXItbW9udGgubW9kdWxlJztcbmltcG9ydCB7IENhbGVuZGFyV2Vla01vZHVsZSB9IGZyb20gJy4vd2Vlay9jYWxlbmRhci13ZWVrLm1vZHVsZSc7XG5pbXBvcnQgeyBDYWxlbmRhckRheU1vZHVsZSB9IGZyb20gJy4vZGF5L2NhbGVuZGFyLWRheS5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJSZXNvdXJjZURheU1vZHVsZSB9IGZyb20gJy4vcmVzb3VyY2UtZGF5L2NhbGVuZGFyLXJlc291cmNlLWRheS5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJSZXNvdXJjZVdlZWtNb2R1bGUgfSBmcm9tICcuL3Jlc291cmNlLXdlZWsvY2FsZW5kYXItcmVzb3VyY2Utd2Vlay5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJVdGlscyB9IGZyb20gJy4vY29tbW9uL2NhbGVuZGFyLXV0aWxzL2NhbGVuZGFyLXV0aWxzLnByb3ZpZGVyJztcbmltcG9ydCB7IENhbGVuZGFyUmVzb3VyY2VNb250aE1vZHVsZSB9IGZyb20gJy4vcmVzb3VyY2UtbW9udGgvY2FsZW5kYXItcmVzb3VyY2UtbW9udGgubW9kdWxlJztcbmV4cG9ydCB7IENhbGVuZGFyRXZlbnQsIENhbGVuZGFyUmVzb3VyY2UgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5cbmV4cG9ydCAqIGZyb20gJy4vY29tbW9uL2NhbGVuZGFyLWNvbW1vbi5tb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9tb250aC9jYWxlbmRhci1tb250aC5tb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi93ZWVrL2NhbGVuZGFyLXdlZWsubW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vcmVzb3VyY2Utd2Vlay9jYWxlbmRhci1yZXNvdXJjZS13ZWVrLm1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL2RheS9jYWxlbmRhci1kYXkubW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vcmVzb3VyY2UtZGF5L2NhbGVuZGFyLXJlc291cmNlLWRheS5tb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9yZXNvdXJjZS1tb250aC9jYWxlbmRhci1yZXNvdXJjZS1tb250aC5tb2R1bGUnO1xuXG4vKipcbiAqIFRoZSBtYWluIG1vZHVsZSBvZiB0aGlzIGxpYnJhcnkuIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgQ2FsZW5kZXJNb2R1bGUgfSBmcm9tICdhbmd1bGFyLWNhbGVuZGFyJztcbiAqXG4gKiBATmdNb2R1bGUoe1xuICogICBpbXBvcnRzOiBbXG4gKiAgICAgQ2FsZW5kZXJNb2R1bGUuZm9yUm9vdCgpXG4gKiAgIF1cbiAqIH0pXG4gKiBjbGFzcyBNeU1vZHVsZSB7fVxuICogYGBgXG4gKlxuICovXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ2FsZW5kYXJDb21tb25Nb2R1bGUsXG4gICAgQ2FsZW5kYXJNb250aE1vZHVsZSxcbiAgICBDYWxlbmRhcldlZWtNb2R1bGUsXG4gICAgQ2FsZW5kYXJEYXlNb2R1bGUsXG4gICAgQ2FsZW5kYXJSZXNvdXJjZURheU1vZHVsZSxcbiAgICBDYWxlbmRhclJlc291cmNlV2Vla01vZHVsZSxcbiAgICBDYWxlbmRhclJlc291cmNlTW9udGhNb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDYWxlbmRhckNvbW1vbk1vZHVsZSxcbiAgICBDYWxlbmRhck1vbnRoTW9kdWxlLFxuICAgIENhbGVuZGFyV2Vla01vZHVsZSxcbiAgICBDYWxlbmRhckRheU1vZHVsZSxcbiAgICBDYWxlbmRhclJlc291cmNlRGF5TW9kdWxlLFxuICAgIENhbGVuZGFyUmVzb3VyY2VXZWVrTW9kdWxlLFxuICAgIENhbGVuZGFyUmVzb3VyY2VNb250aE1vZHVsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChcbiAgICBkYXRlQWRhcHRlcjogUHJvdmlkZXIsXG4gICAgY29uZmlnOiBDYWxlbmRhck1vZHVsZUNvbmZpZyA9IHt9XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Q2FsZW5kYXJNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IENhbGVuZGFyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIGRhdGVBZGFwdGVyLFxuICAgICAgICBjb25maWcuZXZlbnRUaXRsZUZvcm1hdHRlciB8fCBDYWxlbmRhckV2ZW50VGl0bGVGb3JtYXR0ZXIsXG4gICAgICAgIGNvbmZpZy5kYXRlRm9ybWF0dGVyIHx8IENhbGVuZGFyRGF0ZUZvcm1hdHRlcixcbiAgICAgICAgY29uZmlnLnV0aWxzIHx8IENhbGVuZGFyVXRpbHMsXG4gICAgICAgIGNvbmZpZy5hMTF5IHx8IENhbGVuZGFyQTExeSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19