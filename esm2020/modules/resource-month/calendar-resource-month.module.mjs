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
import * as i0 from "@angular/core";
export { CalendarMonthViewComponent as CalendarResourceMonthViewComponent, } from './calendar-resource-month-view/calendar-resource-month-view.component';
export { getWeekViewPeriod } from '../common/util/util';
// needed for ivy, not part of the public api
export { CalendarMonthViewHeaderComponent as ɵCalendarResourceMonthViewHeaderComponent } from './calendar-resource-month-view/calendar-resource-month-view-header/calendar-resource-month-view-header.component';
export { CalendarMonthViewEventComponent as ɵCalendarResourceMonthViewEventComponent } from './calendar-resource-month-view/calendar-resource-month-view-event/calendar-resource-month-view-event.component';
export { CalendarMonthViewRowSegmentComponent as ɵCalendarResourceMonthViewRowSegmentComponent } from './calendar-resource-month-view/calendar-resource-month-view-row-segment/calendar-resource-month-view-row-segment.component';
export { CalendarMonthViewCurrentTimeMarkerComponent as ɵCalendarResourceMonthViewCurrentTimeMarkerComponent } from './calendar-resource-month-view/calendar-resource-month-view-current-time-marker/calendar-resource-month-view-current-time-marker.component';
export class CalendarResourceMonthModule {
}
CalendarResourceMonthModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarResourceMonthModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CalendarResourceMonthModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.3", ngImport: i0, type: CalendarResourceMonthModule, declarations: [CalendarMonthViewComponent,
        CalendarMonthViewHeaderComponent,
        CalendarMonthViewEventComponent,
        CalendarMonthViewCurrentTimeMarkerComponent,
        CalendarMonthViewRowSegmentComponent], imports: [CommonModule,
        ResizableModule,
        DragAndDropModule,
        CalendarCommonModule,
        PipeModule], exports: [ResizableModule,
        DragAndDropModule,
        CalendarMonthViewComponent,
        CalendarMonthViewHeaderComponent,
        CalendarMonthViewEventComponent,
        CalendarMonthViewCurrentTimeMarkerComponent,
        CalendarMonthViewRowSegmentComponent] });
CalendarResourceMonthModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarResourceMonthModule, imports: [CommonModule,
        ResizableModule,
        DragAndDropModule,
        CalendarCommonModule,
        PipeModule, ResizableModule,
        DragAndDropModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarResourceMonthModule, decorators: [{
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcmVzb3VyY2UtbW9udGgubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1jYWxlbmRhci9zcmMvbW9kdWxlcy9yZXNvdXJjZS1tb250aC9jYWxlbmRhci1yZXNvdXJjZS1tb250aC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHVFQUF1RSxDQUFDO0FBQ25ILE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLGtIQUFrSCxDQUFDO0FBQ3BLLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLGdIQUFnSCxDQUFDO0FBQ2pLLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLDRIQUE0SCxDQUFDO0FBQ2xMLE9BQU8sRUFBRSwyQ0FBMkMsRUFBRSxNQUFNLDRJQUE0SSxDQUFDO0FBQ3pNLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7QUFFeEQsT0FBTyxFQUNMLDBCQUEwQixJQUFJLGtDQUFrQyxHQUVqRSxNQUFNLHVFQUF1RSxDQUFDO0FBTS9FLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXhELDZDQUE2QztBQUM3QyxPQUFPLEVBQUUsZ0NBQWdDLElBQUkseUNBQXlDLEVBQUUsTUFBTSxrSEFBa0gsQ0FBQztBQUNqTixPQUFPLEVBQUUsK0JBQStCLElBQUksd0NBQXdDLEVBQUUsTUFBTSxnSEFBZ0gsQ0FBQztBQUM3TSxPQUFPLEVBQUUsb0NBQW9DLElBQUksNkNBQTZDLEVBQUUsTUFBTSw0SEFBNEgsQ0FBQztBQUNuTyxPQUFPLEVBQUUsMkNBQTJDLElBQUksb0RBQW9ELEVBQUUsTUFBTSw0SUFBNEksQ0FBQztBQTJCalEsTUFBTSxPQUFPLDJCQUEyQjs7d0hBQTNCLDJCQUEyQjt5SEFBM0IsMkJBQTJCLGlCQWhCcEMsMEJBQTBCO1FBQzFCLGdDQUFnQztRQUNoQywrQkFBK0I7UUFDL0IsMkNBQTJDO1FBQzNDLG9DQUFvQyxhQVhwQyxZQUFZO1FBQ1osZUFBZTtRQUNmLGlCQUFpQjtRQUNqQixvQkFBb0I7UUFDcEIsVUFBVSxhQVVWLGVBQWU7UUFDZixpQkFBaUI7UUFDakIsMEJBQTBCO1FBQzFCLGdDQUFnQztRQUNoQywrQkFBK0I7UUFDL0IsMkNBQTJDO1FBQzNDLG9DQUFvQzt5SEFHM0IsMkJBQTJCLFlBdkJwQyxZQUFZO1FBQ1osZUFBZTtRQUNmLGlCQUFpQjtRQUNqQixvQkFBb0I7UUFDcEIsVUFBVSxFQVVWLGVBQWU7UUFDZixpQkFBaUI7MkZBUVIsMkJBQTJCO2tCQXpCdkMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixlQUFlO3dCQUNmLGlCQUFpQjt3QkFDakIsb0JBQW9CO3dCQUNwQixVQUFVO3FCQUNYO29CQUNELFlBQVksRUFBRTt3QkFDWiwwQkFBMEI7d0JBQzFCLGdDQUFnQzt3QkFDaEMsK0JBQStCO3dCQUMvQiwyQ0FBMkM7d0JBQzNDLG9DQUFvQztxQkFDckM7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGVBQWU7d0JBQ2YsaUJBQWlCO3dCQUNqQiwwQkFBMEI7d0JBQzFCLGdDQUFnQzt3QkFDaEMsK0JBQStCO3dCQUMvQiwyQ0FBMkM7d0JBQzNDLG9DQUFvQztxQkFDckM7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJlc2l6YWJsZU1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItcmVzaXphYmxlLWVsZW1lbnQnO1xuaW1wb3J0IHsgRHJhZ0FuZERyb3BNb2R1bGUgfSBmcm9tICdhbmd1bGFyLWRyYWdnYWJsZS1kcm9wcGFibGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJNb250aFZpZXdDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXJlc291cmNlLW1vbnRoLXZpZXcvY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJNb250aFZpZXdIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXJlc291cmNlLW1vbnRoLXZpZXcvY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldy1oZWFkZXIvY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldy1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IENhbGVuZGFyTW9udGhWaWV3RXZlbnRDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXJlc291cmNlLW1vbnRoLXZpZXcvY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldy1ldmVudC9jYWxlbmRhci1yZXNvdXJjZS1tb250aC12aWV3LWV2ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYWxlbmRhckNvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1jb21tb24ubW9kdWxlJztcbmltcG9ydCB7IENhbGVuZGFyTW9udGhWaWV3Um93U2VnbWVudENvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldy9jYWxlbmRhci1yZXNvdXJjZS1tb250aC12aWV3LXJvdy1zZWdtZW50L2NhbGVuZGFyLXJlc291cmNlLW1vbnRoLXZpZXctcm93LXNlZ21lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IENhbGVuZGFyTW9udGhWaWV3Q3VycmVudFRpbWVNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXJlc291cmNlLW1vbnRoLXZpZXcvY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldy1jdXJyZW50LXRpbWUtbWFya2VyL2NhbGVuZGFyLXJlc291cmNlLW1vbnRoLXZpZXctY3VycmVudC10aW1lLW1hcmtlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9waXBlL3BpcGUubW9kdWxlJztcblxuZXhwb3J0IHtcbiAgQ2FsZW5kYXJNb250aFZpZXdDb21wb25lbnQgYXMgQ2FsZW5kYXJSZXNvdXJjZU1vbnRoVmlld0NvbXBvbmVudCxcbiAgQ2FsZW5kYXJNb250aFZpZXdCZWZvcmVSZW5kZXJFdmVudCBhcyBDYWxlbmRhclJlc291cmNlTW9udGhWaWV3QmVmb3JlUmVuZGVyRXZlbnQsXG59IGZyb20gJy4vY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldy9jYWxlbmRhci1yZXNvdXJjZS1tb250aC12aWV3LmNvbXBvbmVudCc7XG5leHBvcnQge1xuICBXZWVrVmlld0FsbERheUV2ZW50IGFzIENhbGVuZGFyV2Vla1ZpZXdBbGxEYXlFdmVudCxcbiAgV2Vla1ZpZXdBbGxEYXlFdmVudFJvdyBhcyBDYWxlbmRhcldlZWtWaWV3QWxsRGF5RXZlbnRSb3csXG4gIEdldFdlZWtWaWV3QXJncyBhcyBDYWxlbmRhckdldFdlZWtWaWV3QXJncyxcbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuZXhwb3J0IHsgZ2V0V2Vla1ZpZXdQZXJpb2QgfSBmcm9tICcuLi9jb21tb24vdXRpbC91dGlsJztcblxuLy8gbmVlZGVkIGZvciBpdnksIG5vdCBwYXJ0IG9mIHRoZSBwdWJsaWMgYXBpXG5leHBvcnQgeyBDYWxlbmRhck1vbnRoVmlld0hlYWRlckNvbXBvbmVudCBhcyDJtUNhbGVuZGFyUmVzb3VyY2VNb250aFZpZXdIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXJlc291cmNlLW1vbnRoLXZpZXcvY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldy1oZWFkZXIvY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldy1oZWFkZXIuY29tcG9uZW50JztcbmV4cG9ydCB7IENhbGVuZGFyTW9udGhWaWV3RXZlbnRDb21wb25lbnQgYXMgybVDYWxlbmRhclJlc291cmNlTW9udGhWaWV3RXZlbnRDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXJlc291cmNlLW1vbnRoLXZpZXcvY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldy1ldmVudC9jYWxlbmRhci1yZXNvdXJjZS1tb250aC12aWV3LWV2ZW50LmNvbXBvbmVudCc7XG5leHBvcnQgeyBDYWxlbmRhck1vbnRoVmlld1Jvd1NlZ21lbnRDb21wb25lbnQgYXMgybVDYWxlbmRhclJlc291cmNlTW9udGhWaWV3Um93U2VnbWVudENvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldy9jYWxlbmRhci1yZXNvdXJjZS1tb250aC12aWV3LXJvdy1zZWdtZW50L2NhbGVuZGFyLXJlc291cmNlLW1vbnRoLXZpZXctcm93LXNlZ21lbnQuY29tcG9uZW50JztcbmV4cG9ydCB7IENhbGVuZGFyTW9udGhWaWV3Q3VycmVudFRpbWVNYXJrZXJDb21wb25lbnQgYXMgybVDYWxlbmRhclJlc291cmNlTW9udGhWaWV3Q3VycmVudFRpbWVNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXJlc291cmNlLW1vbnRoLXZpZXcvY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldy1jdXJyZW50LXRpbWUtbWFya2VyL2NhbGVuZGFyLXJlc291cmNlLW1vbnRoLXZpZXctY3VycmVudC10aW1lLW1hcmtlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJlc2l6YWJsZU1vZHVsZSxcbiAgICBEcmFnQW5kRHJvcE1vZHVsZSxcbiAgICBDYWxlbmRhckNvbW1vbk1vZHVsZSxcbiAgICBQaXBlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDYWxlbmRhck1vbnRoVmlld0NvbXBvbmVudCxcbiAgICBDYWxlbmRhck1vbnRoVmlld0hlYWRlckNvbXBvbmVudCxcbiAgICBDYWxlbmRhck1vbnRoVmlld0V2ZW50Q29tcG9uZW50LFxuICAgIENhbGVuZGFyTW9udGhWaWV3Q3VycmVudFRpbWVNYXJrZXJDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJNb250aFZpZXdSb3dTZWdtZW50Q29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgUmVzaXphYmxlTW9kdWxlLFxuICAgIERyYWdBbmREcm9wTW9kdWxlLFxuICAgIENhbGVuZGFyTW9udGhWaWV3Q29tcG9uZW50LFxuICAgIENhbGVuZGFyTW9udGhWaWV3SGVhZGVyQ29tcG9uZW50LFxuICAgIENhbGVuZGFyTW9udGhWaWV3RXZlbnRDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJNb250aFZpZXdDdXJyZW50VGltZU1hcmtlckNvbXBvbmVudCxcbiAgICBDYWxlbmRhck1vbnRoVmlld1Jvd1NlZ21lbnRDb21wb25lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyUmVzb3VyY2VNb250aE1vZHVsZSB7fVxuIl19