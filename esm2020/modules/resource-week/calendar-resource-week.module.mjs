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
import * as i0 from "@angular/core";
export { CalendarWeekViewComponent as CalendarResourceWeekViewComponent, } from './calendar-resource-week-view/calendar-resource-week-view.component';
export { getWeekViewPeriod } from '../common/util/util';
// needed for ivy, not part of the public api
export { CalendarWeekViewHeaderComponent as ɵCalendarResourceWeekViewHeaderComponent } from './calendar-resource-week-view/calendar-resource-week-view-header/calendar-resource-week-view-header.component';
export { CalendarWeekViewEventComponent as ɵCalendarResourceWeekViewEventComponent } from './calendar-resource-week-view/calendar-resource-week-view-event/calendar-resource-week-view-event.component';
export { CalendarWeekViewRowSegmentComponent as ɵCalendarResourceWeekViewRowSegmentComponent } from './calendar-resource-week-view/calendar-resource-week-view-row-segment/calendar-resource-week-view-row-segment.component';
export { CalendarWeekViewCurrentTimeMarkerComponent as ɵCalendarResourceWeekViewCurrentTimeMarkerComponent } from './calendar-resource-week-view/calendar-resource-week-view-current-time-marker/calendar-resource-week-view-current-time-marker.component';
export class CalendarResourceWeekModule {
}
CalendarResourceWeekModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CalendarResourceWeekModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CalendarResourceWeekModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: CalendarResourceWeekModule, declarations: [CalendarWeekViewComponent,
        CalendarWeekViewHeaderComponent,
        CalendarWeekViewEventComponent,
        CalendarWeekViewCurrentTimeMarkerComponent,
        CalendarWeekViewRowSegmentComponent], imports: [CommonModule,
        ResizableModule,
        DragAndDropModule,
        CalendarCommonModule,
        PipeModule], exports: [ResizableModule,
        DragAndDropModule,
        CalendarWeekViewComponent,
        CalendarWeekViewHeaderComponent,
        CalendarWeekViewEventComponent,
        CalendarWeekViewCurrentTimeMarkerComponent,
        CalendarWeekViewRowSegmentComponent] });
CalendarResourceWeekModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CalendarResourceWeekModule, imports: [CommonModule,
        ResizableModule,
        DragAndDropModule,
        CalendarCommonModule,
        PipeModule, ResizableModule,
        DragAndDropModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CalendarResourceWeekModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcmVzb3VyY2Utd2Vlay5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWNhbGVuZGFyL3NyYy9tb2R1bGVzL3Jlc291cmNlLXdlZWsvY2FsZW5kYXItcmVzb3VyY2Utd2Vlay5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHFFQUFxRSxDQUFDO0FBQ2hILE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLCtHQUErRyxDQUFDO0FBQ2hLLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLDZHQUE2RyxDQUFDO0FBQzdKLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLHlIQUF5SCxDQUFDO0FBQzlLLE9BQU8sRUFBRSwwQ0FBMEMsRUFBRSxNQUFNLHlJQUF5SSxDQUFDO0FBQ3JNLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7QUFFeEQsT0FBTyxFQUNMLHlCQUF5QixJQUFJLGlDQUFpQyxHQUUvRCxNQUFNLHFFQUFxRSxDQUFDO0FBTTdFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXhELDZDQUE2QztBQUM3QyxPQUFPLEVBQUUsK0JBQStCLElBQUksd0NBQXdDLEVBQUUsTUFBTSwrR0FBK0csQ0FBQztBQUM1TSxPQUFPLEVBQUUsOEJBQThCLElBQUksdUNBQXVDLEVBQUUsTUFBTSw2R0FBNkcsQ0FBQztBQUN4TSxPQUFPLEVBQUUsbUNBQW1DLElBQUksNENBQTRDLEVBQUUsTUFBTSx5SEFBeUgsQ0FBQztBQUM5TixPQUFPLEVBQUUsMENBQTBDLElBQUksbURBQW1ELEVBQUUsTUFBTSx5SUFBeUksQ0FBQztBQTJCNVAsTUFBTSxPQUFPLDBCQUEwQjs7dUhBQTFCLDBCQUEwQjt3SEFBMUIsMEJBQTBCLGlCQWhCbkMseUJBQXlCO1FBQ3pCLCtCQUErQjtRQUMvQiw4QkFBOEI7UUFDOUIsMENBQTBDO1FBQzFDLG1DQUFtQyxhQVhuQyxZQUFZO1FBQ1osZUFBZTtRQUNmLGlCQUFpQjtRQUNqQixvQkFBb0I7UUFDcEIsVUFBVSxhQVVWLGVBQWU7UUFDZixpQkFBaUI7UUFDakIseUJBQXlCO1FBQ3pCLCtCQUErQjtRQUMvQiw4QkFBOEI7UUFDOUIsMENBQTBDO1FBQzFDLG1DQUFtQzt3SEFHMUIsMEJBQTBCLFlBdkJuQyxZQUFZO1FBQ1osZUFBZTtRQUNmLGlCQUFpQjtRQUNqQixvQkFBb0I7UUFDcEIsVUFBVSxFQVVWLGVBQWU7UUFDZixpQkFBaUI7MkZBUVIsMEJBQTBCO2tCQXpCdEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixlQUFlO3dCQUNmLGlCQUFpQjt3QkFDakIsb0JBQW9CO3dCQUNwQixVQUFVO3FCQUNYO29CQUNELFlBQVksRUFBRTt3QkFDWix5QkFBeUI7d0JBQ3pCLCtCQUErQjt3QkFDL0IsOEJBQThCO3dCQUM5QiwwQ0FBMEM7d0JBQzFDLG1DQUFtQztxQkFDcEM7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGVBQWU7d0JBQ2YsaUJBQWlCO3dCQUNqQix5QkFBeUI7d0JBQ3pCLCtCQUErQjt3QkFDL0IsOEJBQThCO3dCQUM5QiwwQ0FBMEM7d0JBQzFDLG1DQUFtQztxQkFDcEM7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJlc2l6YWJsZU1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItcmVzaXphYmxlLWVsZW1lbnQnO1xuaW1wb3J0IHsgRHJhZ0FuZERyb3BNb2R1bGUgfSBmcm9tICdhbmd1bGFyLWRyYWdnYWJsZS1kcm9wcGFibGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJXZWVrVmlld0NvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItcmVzb3VyY2Utd2Vlay12aWV3L2NhbGVuZGFyLXJlc291cmNlLXdlZWstdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJXZWVrVmlld0hlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItcmVzb3VyY2Utd2Vlay12aWV3L2NhbGVuZGFyLXJlc291cmNlLXdlZWstdmlldy1oZWFkZXIvY2FsZW5kYXItcmVzb3VyY2Utd2Vlay12aWV3LWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJXZWVrVmlld0V2ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1yZXNvdXJjZS13ZWVrLXZpZXcvY2FsZW5kYXItcmVzb3VyY2Utd2Vlay12aWV3LWV2ZW50L2NhbGVuZGFyLXJlc291cmNlLXdlZWstdmlldy1ldmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItY29tbW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBDYWxlbmRhcldlZWtWaWV3Um93U2VnbWVudENvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItcmVzb3VyY2Utd2Vlay12aWV3L2NhbGVuZGFyLXJlc291cmNlLXdlZWstdmlldy1yb3ctc2VnbWVudC9jYWxlbmRhci1yZXNvdXJjZS13ZWVrLXZpZXctcm93LXNlZ21lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IENhbGVuZGFyV2Vla1ZpZXdDdXJyZW50VGltZU1hcmtlckNvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItcmVzb3VyY2Utd2Vlay12aWV3L2NhbGVuZGFyLXJlc291cmNlLXdlZWstdmlldy1jdXJyZW50LXRpbWUtbWFya2VyL2NhbGVuZGFyLXJlc291cmNlLXdlZWstdmlldy1jdXJyZW50LXRpbWUtbWFya2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL3BpcGUvcGlwZS5tb2R1bGUnO1xuXG5leHBvcnQge1xuICBDYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50IGFzIENhbGVuZGFyUmVzb3VyY2VXZWVrVmlld0NvbXBvbmVudCxcbiAgQ2FsZW5kYXJXZWVrVmlld0JlZm9yZVJlbmRlckV2ZW50IGFzIENhbGVuZGFyUmVzb3VyY2VXZWVrVmlld0JlZm9yZVJlbmRlckV2ZW50LFxufSBmcm9tICcuL2NhbGVuZGFyLXJlc291cmNlLXdlZWstdmlldy9jYWxlbmRhci1yZXNvdXJjZS13ZWVrLXZpZXcuY29tcG9uZW50JztcbmV4cG9ydCB7XG4gIFdlZWtWaWV3QWxsRGF5RXZlbnQgYXMgQ2FsZW5kYXJXZWVrVmlld0FsbERheUV2ZW50LFxuICBXZWVrVmlld0FsbERheUV2ZW50Um93IGFzIENhbGVuZGFyV2Vla1ZpZXdBbGxEYXlFdmVudFJvdyxcbiAgR2V0V2Vla1ZpZXdBcmdzIGFzIENhbGVuZGFyR2V0V2Vla1ZpZXdBcmdzLFxufSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5leHBvcnQgeyBnZXRXZWVrVmlld1BlcmlvZCB9IGZyb20gJy4uL2NvbW1vbi91dGlsL3V0aWwnO1xuXG4vLyBuZWVkZWQgZm9yIGl2eSwgbm90IHBhcnQgb2YgdGhlIHB1YmxpYyBhcGlcbmV4cG9ydCB7IENhbGVuZGFyV2Vla1ZpZXdIZWFkZXJDb21wb25lbnQgYXMgybVDYWxlbmRhclJlc291cmNlV2Vla1ZpZXdIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXJlc291cmNlLXdlZWstdmlldy9jYWxlbmRhci1yZXNvdXJjZS13ZWVrLXZpZXctaGVhZGVyL2NhbGVuZGFyLXJlc291cmNlLXdlZWstdmlldy1oZWFkZXIuY29tcG9uZW50JztcbmV4cG9ydCB7IENhbGVuZGFyV2Vla1ZpZXdFdmVudENvbXBvbmVudCBhcyDJtUNhbGVuZGFyUmVzb3VyY2VXZWVrVmlld0V2ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1yZXNvdXJjZS13ZWVrLXZpZXcvY2FsZW5kYXItcmVzb3VyY2Utd2Vlay12aWV3LWV2ZW50L2NhbGVuZGFyLXJlc291cmNlLXdlZWstdmlldy1ldmVudC5jb21wb25lbnQnO1xuZXhwb3J0IHsgQ2FsZW5kYXJXZWVrVmlld1Jvd1NlZ21lbnRDb21wb25lbnQgYXMgybVDYWxlbmRhclJlc291cmNlV2Vla1ZpZXdSb3dTZWdtZW50Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1yZXNvdXJjZS13ZWVrLXZpZXcvY2FsZW5kYXItcmVzb3VyY2Utd2Vlay12aWV3LXJvdy1zZWdtZW50L2NhbGVuZGFyLXJlc291cmNlLXdlZWstdmlldy1yb3ctc2VnbWVudC5jb21wb25lbnQnO1xuZXhwb3J0IHsgQ2FsZW5kYXJXZWVrVmlld0N1cnJlbnRUaW1lTWFya2VyQ29tcG9uZW50IGFzIMm1Q2FsZW5kYXJSZXNvdXJjZVdlZWtWaWV3Q3VycmVudFRpbWVNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXJlc291cmNlLXdlZWstdmlldy9jYWxlbmRhci1yZXNvdXJjZS13ZWVrLXZpZXctY3VycmVudC10aW1lLW1hcmtlci9jYWxlbmRhci1yZXNvdXJjZS13ZWVrLXZpZXctY3VycmVudC10aW1lLW1hcmtlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJlc2l6YWJsZU1vZHVsZSxcbiAgICBEcmFnQW5kRHJvcE1vZHVsZSxcbiAgICBDYWxlbmRhckNvbW1vbk1vZHVsZSxcbiAgICBQaXBlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50LFxuICAgIENhbGVuZGFyV2Vla1ZpZXdIZWFkZXJDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJXZWVrVmlld0V2ZW50Q29tcG9uZW50LFxuICAgIENhbGVuZGFyV2Vla1ZpZXdDdXJyZW50VGltZU1hcmtlckNvbXBvbmVudCxcbiAgICBDYWxlbmRhcldlZWtWaWV3Um93U2VnbWVudENvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFJlc2l6YWJsZU1vZHVsZSxcbiAgICBEcmFnQW5kRHJvcE1vZHVsZSxcbiAgICBDYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50LFxuICAgIENhbGVuZGFyV2Vla1ZpZXdIZWFkZXJDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJXZWVrVmlld0V2ZW50Q29tcG9uZW50LFxuICAgIENhbGVuZGFyV2Vla1ZpZXdDdXJyZW50VGltZU1hcmtlckNvbXBvbmVudCxcbiAgICBDYWxlbmRhcldlZWtWaWV3Um93U2VnbWVudENvbXBvbmVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJSZXNvdXJjZVdlZWtNb2R1bGUge31cbiJdfQ==