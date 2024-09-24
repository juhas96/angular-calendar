import { NgZone, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DateAdapter } from '../../../../date-adapters/date-adapter';
import * as i0 from "@angular/core";
export declare class CalendarMonthViewCurrentTimeMarkerComponent implements OnChanges {
    private dateAdapter;
    private zone;
    columnDate: Date;
    dayStartHour: number;
    dayStartMinute: number;
    dayEndHour: number;
    dayEndMinute: number;
    hourSegments: number;
    hourDuration: number;
    hourSegmentHeight: number;
    customTemplate: TemplateRef<any>;
    columnDate$: BehaviorSubject<Date>;
    marker$: Observable<{
        isVisible: boolean;
        top: number;
    }>;
    constructor(dateAdapter: DateAdapter, zone: NgZone);
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarMonthViewCurrentTimeMarkerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CalendarMonthViewCurrentTimeMarkerComponent, "mwl-calendar-resource-month-view-current-time-marker", never, { "columnDate": "columnDate"; "dayStartHour": "dayStartHour"; "dayStartMinute": "dayStartMinute"; "dayEndHour": "dayEndHour"; "dayEndMinute": "dayEndMinute"; "hourSegments": "hourSegments"; "hourDuration": "hourDuration"; "hourSegmentHeight": "hourSegmentHeight"; "customTemplate": "customTemplate"; }, {}, never, never, false, never>;
}
