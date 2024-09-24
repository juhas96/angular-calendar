import { TemplateRef } from '@angular/core';
import { ResourceWeekViewRowSegment } from 'calendar-utils';
import * as i0 from "@angular/core";
export declare class CalendarWeekViewRowSegmentComponent {
    segment: ResourceWeekViewRowSegment;
    segmentHeight: number;
    resourceLabel: string;
    daysInWeek: number;
    customTemplate: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarWeekViewRowSegmentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CalendarWeekViewRowSegmentComponent, "mwl-calendar-resource-week-view-row-segment", never, { "segment": "segment"; "segmentHeight": "segmentHeight"; "resourceLabel": "resourceLabel"; "daysInWeek": "daysInWeek"; "customTemplate": "customTemplate"; }, {}, never, never, false, never>;
}
