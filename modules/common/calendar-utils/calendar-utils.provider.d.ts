import { GetMonthViewArgs, MonthView, GetWeekViewHeaderArgs, WeekDay, GetWeekViewArgs, WeekView, GetResourceWeekViewArgs, ResourceWeekView } from 'calendar-utils';
import { DateAdapter } from '../../../date-adapters/date-adapter';
import * as i0 from "@angular/core";
export declare class CalendarUtils {
    protected dateAdapter: DateAdapter;
    constructor(dateAdapter: DateAdapter);
    getMonthView(args: GetMonthViewArgs): MonthView;
    getWeekViewHeader(args: GetWeekViewHeaderArgs): WeekDay[];
    getWeekView(args: GetWeekViewArgs): WeekView;
    getResourceWeekView(args: GetResourceWeekViewArgs): ResourceWeekView;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarUtils, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CalendarUtils>;
}