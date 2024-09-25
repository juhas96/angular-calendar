import { EventEmitter, TemplateRef } from '@angular/core';
import { CalendarEvent, WeekDay } from 'calendar-utils';
import * as i0 from "@angular/core";
export declare class CalendarMonthViewHeaderComponent {
    days: WeekDay[];
    weeks: number[];
    locale: string;
    customTemplate: TemplateRef<any>;
    dayHeaderClicked: EventEmitter<{
        day: WeekDay;
        sourceEvent: MouseEvent;
    }>;
    eventDropped: EventEmitter<{
        event: CalendarEvent;
        newStart: Date;
    }>;
    dragEnter: EventEmitter<{
        date: Date;
    }>;
    trackByWeekDayHeaderDate: (index: number, day: WeekDay) => string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarMonthViewHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CalendarMonthViewHeaderComponent, "mwl-calendar-resource-month-view-header", never, { "days": "days"; "weeks": "weeks"; "locale": "locale"; "customTemplate": "customTemplate"; }, { "dayHeaderClicked": "dayHeaderClicked"; "eventDropped": "eventDropped"; "dragEnter": "dragEnter"; }, never, never, false, never>;
}
