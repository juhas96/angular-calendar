import * as i0 from "@angular/core";
import * as i1 from "./calendar-resource-month-view/calendar-resource-month-view.component";
import * as i2 from "./calendar-resource-month-view/calendar-resource-month-view-header/calendar-resource-month-view-header.component";
import * as i3 from "./calendar-resource-month-view/calendar-resource-month-view-event/calendar-resource-month-view-event.component";
import * as i4 from "./calendar-resource-month-view/calendar-resource-month-view-current-time-marker/calendar-resource-month-view-current-time-marker.component";
import * as i5 from "./calendar-resource-month-view/calendar-resource-month-view-row-segment/calendar-resource-month-view-row-segment.component";
import * as i6 from "@angular/common";
import * as i7 from "angular-resizable-element";
import * as i8 from "angular-draggable-droppable";
import * as i9 from "../common/calendar-common.module";
import * as i10 from "../common/pipe/pipe.module";
export { CalendarMonthViewComponent as CalendarResourceMonthViewComponent, CalendarMonthViewBeforeRenderEvent as CalendarResourceMonthViewBeforeRenderEvent, } from './calendar-resource-month-view/calendar-resource-month-view.component';
export { WeekViewAllDayEvent as CalendarWeekViewAllDayEvent, WeekViewAllDayEventRow as CalendarWeekViewAllDayEventRow, GetWeekViewArgs as CalendarGetWeekViewArgs, } from 'calendar-utils';
export { getWeekViewPeriod } from '../common/util/util';
export { CalendarMonthViewHeaderComponent as ɵCalendarResourceMonthViewHeaderComponent } from './calendar-resource-month-view/calendar-resource-month-view-header/calendar-resource-month-view-header.component';
export { CalendarMonthViewEventComponent as ɵCalendarResourceMonthViewEventComponent } from './calendar-resource-month-view/calendar-resource-month-view-event/calendar-resource-month-view-event.component';
export { CalendarMonthViewRowSegmentComponent as ɵCalendarResourceMonthViewRowSegmentComponent } from './calendar-resource-month-view/calendar-resource-month-view-row-segment/calendar-resource-month-view-row-segment.component';
export { CalendarMonthViewCurrentTimeMarkerComponent as ɵCalendarResourceMonthViewCurrentTimeMarkerComponent } from './calendar-resource-month-view/calendar-resource-month-view-current-time-marker/calendar-resource-month-view-current-time-marker.component';
export declare class CalendarResourceMonthModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarResourceMonthModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CalendarResourceMonthModule, [typeof i1.CalendarMonthViewComponent, typeof i2.CalendarMonthViewHeaderComponent, typeof i3.CalendarMonthViewEventComponent, typeof i4.CalendarMonthViewCurrentTimeMarkerComponent, typeof i5.CalendarMonthViewRowSegmentComponent], [typeof i6.CommonModule, typeof i7.ResizableModule, typeof i8.DragAndDropModule, typeof i9.CalendarCommonModule, typeof i10.PipeModule], [typeof i7.ResizableModule, typeof i8.DragAndDropModule, typeof i1.CalendarMonthViewComponent, typeof i2.CalendarMonthViewHeaderComponent, typeof i3.CalendarMonthViewEventComponent, typeof i4.CalendarMonthViewCurrentTimeMarkerComponent, typeof i5.CalendarMonthViewRowSegmentComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CalendarResourceMonthModule>;
}
