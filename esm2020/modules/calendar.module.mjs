import { NgModule } from '@angular/core';
import { CalendarCommonModule, CalendarEventTitleFormatter, CalendarDateFormatter, CalendarA11y, } from './common/calendar-common.module';
import { CalendarMonthModule } from './month/calendar-month.module';
import { CalendarWeekModule } from './week/calendar-week.module';
import { CalendarDayModule } from './day/calendar-day.module';
import { CalendarResourceDayModule } from './resource-day/calendar-resource-day.module';
import { CalendarResourceWeekModule } from './resource-week/calendar-resource-week.module';
import { CalendarUtils } from './common/calendar-utils/calendar-utils.provider';
import * as i0 from "@angular/core";
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
CalendarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CalendarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CalendarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: CalendarModule, imports: [CalendarCommonModule,
        CalendarMonthModule,
        CalendarWeekModule,
        CalendarDayModule,
        CalendarResourceDayModule,
        CalendarResourceWeekModule], exports: [CalendarCommonModule,
        CalendarMonthModule,
        CalendarWeekModule,
        CalendarDayModule,
        CalendarResourceDayModule,
        CalendarResourceWeekModule] });
CalendarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CalendarModule, imports: [CalendarCommonModule,
        CalendarMonthModule,
        CalendarWeekModule,
        CalendarDayModule,
        CalendarResourceDayModule,
        CalendarResourceWeekModule, CalendarCommonModule,
        CalendarMonthModule,
        CalendarWeekModule,
        CalendarDayModule,
        CalendarResourceDayModule,
        CalendarResourceWeekModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CalendarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CalendarCommonModule,
                        CalendarMonthModule,
                        CalendarWeekModule,
                        CalendarDayModule,
                        CalendarResourceDayModule,
                        CalendarResourceWeekModule,
                    ],
                    exports: [
                        CalendarCommonModule,
                        CalendarMonthModule,
                        CalendarWeekModule,
                        CalendarDayModule,
                        CalendarResourceDayModule,
                        CalendarResourceWeekModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1jYWxlbmRhci9zcmMvbW9kdWxlcy9jYWxlbmRhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBaUMsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUNMLG9CQUFvQixFQUVwQiwyQkFBMkIsRUFDM0IscUJBQXFCLEVBQ3JCLFlBQVksR0FDYixNQUFNLGlDQUFpQyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzlELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpREFBaUQsQ0FBQzs7QUFHaEYsY0FBYyxpQ0FBaUMsQ0FBQztBQUNoRCxjQUFjLCtCQUErQixDQUFDO0FBQzlDLGNBQWMsNkJBQTZCLENBQUM7QUFDNUMsY0FBYywrQ0FBK0MsQ0FBQztBQUM5RCxjQUFjLDJCQUEyQixDQUFDO0FBQzFDLGNBQWMsNkNBQTZDLENBQUM7QUFFNUQ7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFtQkgsTUFBTSxPQUFPLGNBQWM7SUFDekIsTUFBTSxDQUFDLE9BQU8sQ0FDWixXQUFxQixFQUNyQixTQUErQixFQUFFO1FBRWpDLE9BQU87WUFDTCxRQUFRLEVBQUUsY0FBYztZQUN4QixTQUFTLEVBQUU7Z0JBQ1QsV0FBVztnQkFDWCxNQUFNLENBQUMsbUJBQW1CLElBQUksMkJBQTJCO2dCQUN6RCxNQUFNLENBQUMsYUFBYSxJQUFJLHFCQUFxQjtnQkFDN0MsTUFBTSxDQUFDLEtBQUssSUFBSSxhQUFhO2dCQUM3QixNQUFNLENBQUMsSUFBSSxJQUFJLFlBQVk7YUFDNUI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7MkdBZlUsY0FBYzs0R0FBZCxjQUFjLFlBaEJ2QixvQkFBb0I7UUFDcEIsbUJBQW1CO1FBQ25CLGtCQUFrQjtRQUNsQixpQkFBaUI7UUFDakIseUJBQXlCO1FBQ3pCLDBCQUEwQixhQUcxQixvQkFBb0I7UUFDcEIsbUJBQW1CO1FBQ25CLGtCQUFrQjtRQUNsQixpQkFBaUI7UUFDakIseUJBQXlCO1FBQ3pCLDBCQUEwQjs0R0FHakIsY0FBYyxZQWhCdkIsb0JBQW9CO1FBQ3BCLG1CQUFtQjtRQUNuQixrQkFBa0I7UUFDbEIsaUJBQWlCO1FBQ2pCLHlCQUF5QjtRQUN6QiwwQkFBMEIsRUFHMUIsb0JBQW9CO1FBQ3BCLG1CQUFtQjtRQUNuQixrQkFBa0I7UUFDbEIsaUJBQWlCO1FBQ2pCLHlCQUF5QjtRQUN6QiwwQkFBMEI7MkZBR2pCLGNBQWM7a0JBbEIxQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxvQkFBb0I7d0JBQ3BCLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3dCQUNsQixpQkFBaUI7d0JBQ2pCLHlCQUF5Qjt3QkFDekIsMEJBQTBCO3FCQUMzQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1Asb0JBQW9CO3dCQUNwQixtQkFBbUI7d0JBQ25CLGtCQUFrQjt3QkFDbEIsaUJBQWlCO3dCQUNqQix5QkFBeUI7d0JBQ3pCLDBCQUEwQjtxQkFDM0I7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENhbGVuZGFyQ29tbW9uTW9kdWxlLFxuICBDYWxlbmRhck1vZHVsZUNvbmZpZyxcbiAgQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyLFxuICBDYWxlbmRhckRhdGVGb3JtYXR0ZXIsXG4gIENhbGVuZGFyQTExeSxcbn0gZnJvbSAnLi9jb21tb24vY2FsZW5kYXItY29tbW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBDYWxlbmRhck1vbnRoTW9kdWxlIH0gZnJvbSAnLi9tb250aC9jYWxlbmRhci1tb250aC5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJXZWVrTW9kdWxlIH0gZnJvbSAnLi93ZWVrL2NhbGVuZGFyLXdlZWsubW9kdWxlJztcbmltcG9ydCB7IENhbGVuZGFyRGF5TW9kdWxlIH0gZnJvbSAnLi9kYXkvY2FsZW5kYXItZGF5Lm1vZHVsZSc7XG5pbXBvcnQgeyBDYWxlbmRhclJlc291cmNlRGF5TW9kdWxlIH0gZnJvbSAnLi9yZXNvdXJjZS1kYXkvY2FsZW5kYXItcmVzb3VyY2UtZGF5Lm1vZHVsZSc7XG5pbXBvcnQgeyBDYWxlbmRhclJlc291cmNlV2Vla01vZHVsZSB9IGZyb20gJy4vcmVzb3VyY2Utd2Vlay9jYWxlbmRhci1yZXNvdXJjZS13ZWVrLm1vZHVsZSc7XG5pbXBvcnQgeyBDYWxlbmRhclV0aWxzIH0gZnJvbSAnLi9jb21tb24vY2FsZW5kYXItdXRpbHMvY2FsZW5kYXItdXRpbHMucHJvdmlkZXInO1xuZXhwb3J0IHsgQ2FsZW5kYXJFdmVudCwgQ2FsZW5kYXJSZXNvdXJjZSB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcblxuZXhwb3J0ICogZnJvbSAnLi9jb21tb24vY2FsZW5kYXItY29tbW9uLm1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL21vbnRoL2NhbGVuZGFyLW1vbnRoLm1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL3dlZWsvY2FsZW5kYXItd2Vlay5tb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9yZXNvdXJjZS13ZWVrL2NhbGVuZGFyLXJlc291cmNlLXdlZWsubW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vZGF5L2NhbGVuZGFyLWRheS5tb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9yZXNvdXJjZS1kYXkvY2FsZW5kYXItcmVzb3VyY2UtZGF5Lm1vZHVsZSc7XG5cbi8qKlxuICogVGhlIG1haW4gbW9kdWxlIG9mIHRoaXMgbGlicmFyeS4gRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDYWxlbmRlck1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItY2FsZW5kYXInO1xuICpcbiAqIEBOZ01vZHVsZSh7XG4gKiAgIGltcG9ydHM6IFtcbiAqICAgICBDYWxlbmRlck1vZHVsZS5mb3JSb290KClcbiAqICAgXVxuICogfSlcbiAqIGNsYXNzIE15TW9kdWxlIHt9XG4gKiBgYGBcbiAqXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDYWxlbmRhckNvbW1vbk1vZHVsZSxcbiAgICBDYWxlbmRhck1vbnRoTW9kdWxlLFxuICAgIENhbGVuZGFyV2Vla01vZHVsZSxcbiAgICBDYWxlbmRhckRheU1vZHVsZSxcbiAgICBDYWxlbmRhclJlc291cmNlRGF5TW9kdWxlLFxuICAgIENhbGVuZGFyUmVzb3VyY2VXZWVrTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ2FsZW5kYXJDb21tb25Nb2R1bGUsXG4gICAgQ2FsZW5kYXJNb250aE1vZHVsZSxcbiAgICBDYWxlbmRhcldlZWtNb2R1bGUsXG4gICAgQ2FsZW5kYXJEYXlNb2R1bGUsXG4gICAgQ2FsZW5kYXJSZXNvdXJjZURheU1vZHVsZSxcbiAgICBDYWxlbmRhclJlc291cmNlV2Vla01vZHVsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChcbiAgICBkYXRlQWRhcHRlcjogUHJvdmlkZXIsXG4gICAgY29uZmlnOiBDYWxlbmRhck1vZHVsZUNvbmZpZyA9IHt9XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Q2FsZW5kYXJNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IENhbGVuZGFyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIGRhdGVBZGFwdGVyLFxuICAgICAgICBjb25maWcuZXZlbnRUaXRsZUZvcm1hdHRlciB8fCBDYWxlbmRhckV2ZW50VGl0bGVGb3JtYXR0ZXIsXG4gICAgICAgIGNvbmZpZy5kYXRlRm9ybWF0dGVyIHx8IENhbGVuZGFyRGF0ZUZvcm1hdHRlcixcbiAgICAgICAgY29uZmlnLnV0aWxzIHx8IENhbGVuZGFyVXRpbHMsXG4gICAgICAgIGNvbmZpZy5hMTF5IHx8IENhbGVuZGFyQTExeSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19