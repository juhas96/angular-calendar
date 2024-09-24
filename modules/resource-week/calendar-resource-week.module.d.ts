import * as i0 from "@angular/core";
import * as i1 from "./calendar-resource-week-view/calendar-resource-week-view.component";
import * as i2 from "./calendar-resource-week-view/calendar-resource-week-view-header/calendar-resource-week-view-header.component";
import * as i3 from "./calendar-resource-week-view/calendar-resource-week-view-event/calendar-resource-week-view-event.component";
import * as i4 from "./calendar-resource-week-view/calendar-resource-week-view-current-time-marker/calendar-resource-week-view-current-time-marker.component";
import * as i5 from "./calendar-resource-week-view/calendar-resource-week-view-row-segment/calendar-resource-week-view-row-segment.component";
import * as i6 from "@angular/common";
import * as i7 from "angular-resizable-element";
import * as i8 from "angular-draggable-droppable";
import * as i9 from "../common/calendar-common.module";
import * as i10 from "../common/pipe/pipe.module";
export { CalendarWeekViewComponent as CalendarResourceWeekViewComponent, CalendarWeekViewBeforeRenderEvent as CalendarResourceWeekViewBeforeRenderEvent, } from './calendar-resource-week-view/calendar-resource-week-view.component';
export { WeekViewAllDayEvent as CalendarWeekViewAllDayEvent, WeekViewAllDayEventRow as CalendarWeekViewAllDayEventRow, GetWeekViewArgs as CalendarGetWeekViewArgs, } from 'calendar-utils';
export { getWeekViewPeriod } from '../common/util/util';
export { CalendarWeekViewHeaderComponent as ɵCalendarResourceWeekViewHeaderComponent } from './calendar-resource-week-view/calendar-resource-week-view-header/calendar-resource-week-view-header.component';
export { CalendarWeekViewEventComponent as ɵCalendarResourceWeekViewEventComponent } from './calendar-resource-week-view/calendar-resource-week-view-event/calendar-resource-week-view-event.component';
export { CalendarWeekViewRowSegmentComponent as ɵCalendarResourceWeekViewRowSegmentComponent } from './calendar-resource-week-view/calendar-resource-week-view-row-segment/calendar-resource-week-view-row-segment.component';
export { CalendarWeekViewCurrentTimeMarkerComponent as ɵCalendarResourceWeekViewCurrentTimeMarkerComponent } from './calendar-resource-week-view/calendar-resource-week-view-current-time-marker/calendar-resource-week-view-current-time-marker.component';
export declare class CalendarResourceWeekModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarResourceWeekModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CalendarResourceWeekModule, [typeof i1.CalendarWeekViewComponent, typeof i2.CalendarWeekViewHeaderComponent, typeof i3.CalendarWeekViewEventComponent, typeof i4.CalendarWeekViewCurrentTimeMarkerComponent, typeof i5.CalendarWeekViewRowSegmentComponent], [typeof i6.CommonModule, typeof i7.ResizableModule, typeof i8.DragAndDropModule, typeof i9.CalendarCommonModule, typeof i10.PipeModule], [typeof i7.ResizableModule, typeof i8.DragAndDropModule, typeof i1.CalendarWeekViewComponent, typeof i2.CalendarWeekViewHeaderComponent, typeof i3.CalendarWeekViewEventComponent, typeof i4.CalendarWeekViewCurrentTimeMarkerComponent, typeof i5.CalendarWeekViewRowSegmentComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CalendarResourceWeekModule>;
}
