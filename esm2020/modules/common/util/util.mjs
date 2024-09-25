import { validateEvents as validateEventsWithoutLog, } from 'calendar-utils';
export const validateEvents = (events) => {
    const warn = (...args) => console.warn('angular-calendar', ...args);
    return validateEventsWithoutLog(events, warn);
};
export function isInsideLeftAndRight(outer, inner) {
    return (Math.floor(outer.left) <= Math.ceil(inner.left) &&
        Math.floor(inner.left) <= Math.ceil(outer.right) &&
        Math.floor(outer.left) <= Math.ceil(inner.right) &&
        Math.floor(inner.right) <= Math.ceil(outer.right));
}
function isInsideTopAndBottom(outer, inner) {
    return (Math.floor(outer.top) <= Math.ceil(inner.top) &&
        Math.floor(inner.top) <= Math.ceil(outer.bottom) &&
        Math.floor(outer.top) <= Math.ceil(inner.bottom) &&
        Math.floor(inner.bottom) <= Math.ceil(outer.bottom));
}
export function isInside(outer, inner) {
    return (isInsideLeftAndRight(outer, inner) && isInsideTopAndBottom(outer, inner));
}
export function roundToNearest(amount, precision) {
    return Math.round(amount / precision) * precision;
}
export const trackByEventId = (index, event) => event.id ? event.id : event;
export const trackByWeekDayHeaderDate = (index, day) => day.date.toISOString();
export const trackByHourSegment = (index, segment) => segment.date.toISOString();
export const trackByHour = (index, hour) => hour.segments[0].date.toISOString();
export const trackByWeekAllDayEvent = (index, weekEvent) => (weekEvent.event.id ? weekEvent.event.id : weekEvent.event);
export const trackByWeekTimeEvent = (index, weekEvent) => (weekEvent.event.id ? weekEvent.event.id : weekEvent.event);
export const trackByResourceWeekViewRowEvent = (index, resourceWeekViewRowEvent) => resourceWeekViewRowEvent.event.id
    ? resourceWeekViewRowEvent.event.id
    : resourceWeekViewRowEvent.event;
const MINUTES_IN_HOUR = 60;
function getPixelAmountInMinutes(hourSegments, hourSegmentHeight, hourDuration) {
    return (hourDuration || MINUTES_IN_HOUR) / (hourSegments * hourSegmentHeight);
}
export function getMinutesMoved(movedY, hourSegments, hourSegmentHeight, eventSnapSize, hourDuration) {
    const draggedInPixelsSnapSize = roundToNearest(movedY, eventSnapSize || hourSegmentHeight);
    const pixelAmountInMinutes = getPixelAmountInMinutes(hourSegments, hourSegmentHeight, hourDuration);
    return draggedInPixelsSnapSize * pixelAmountInMinutes;
}
export function getDefaultEventEnd(dateAdapter, event, minimumMinutes) {
    if (event.end) {
        return event.end;
    }
    else {
        return dateAdapter.addMinutes(event.start, minimumMinutes);
    }
}
export function addDaysWithExclusions(dateAdapter, date, days, excluded) {
    let daysCounter = 0;
    let daysToAdd = 0;
    const changeDays = days < 0 ? dateAdapter.subDays : dateAdapter.addDays;
    let result = date;
    while (daysToAdd <= Math.abs(days)) {
        result = changeDays(date, daysCounter);
        const day = dateAdapter.getDay(result);
        if (excluded.indexOf(day) === -1) {
            daysToAdd++;
        }
        daysCounter++;
    }
    return result;
}
export function isDraggedWithinPeriod(newStart, newEnd, period) {
    const end = newEnd || newStart;
    return ((period.start <= newStart && newStart <= period.end) ||
        (period.start <= end && end <= period.end));
}
export function shouldFireDroppedEvent(dropEvent, date, allDay, calendarId) {
    return (dropEvent.dropData &&
        dropEvent.dropData.event &&
        (dropEvent.dropData.calendarId !== calendarId ||
            (dropEvent.dropData.event.allDay && !allDay) ||
            (!dropEvent.dropData.event.allDay && allDay)));
}
export function getWeekViewPeriod(dateAdapter, viewDate, weekStartsOn, excluded = [], daysInWeek) {
    let viewStart = daysInWeek
        ? dateAdapter.startOfDay(viewDate)
        : dateAdapter.startOfWeek(viewDate, { weekStartsOn });
    const endOfWeek = dateAdapter.endOfWeek(viewDate, { weekStartsOn });
    while (excluded.indexOf(dateAdapter.getDay(viewStart)) > -1 &&
        viewStart < endOfWeek) {
        viewStart = dateAdapter.addDays(viewStart, 1);
    }
    if (daysInWeek) {
        const viewEnd = dateAdapter.endOfDay(addDaysWithExclusions(dateAdapter, viewStart, daysInWeek - 1, excluded));
        return { viewStart, viewEnd };
    }
    else {
        let viewEnd = endOfWeek;
        while (excluded.indexOf(dateAdapter.getDay(viewEnd)) > -1 &&
            viewEnd > viewStart) {
            viewEnd = dateAdapter.subDays(viewEnd, 1);
        }
        return { viewStart, viewEnd };
    }
}
export function getMonthViewPeriod(dateAdapter, viewDate, excluded = []) {
    // Get the start of the month
    let viewStart = dateAdapter.startOfMonth(viewDate);
    const endOfMonth = new Date('12/31/2024');
    // Adjust viewStart based on exclusions
    while (excluded.indexOf(dateAdapter.getDay(viewStart)) > -1 &&
        viewStart < endOfMonth) {
        viewStart = dateAdapter.addDays(viewStart, 1);
    }
    // Adjust viewEnd based on exclusions
    let viewEnd = endOfMonth;
    while (excluded.indexOf(dateAdapter.getDay(viewEnd)) > -1 &&
        viewEnd > viewStart) {
        viewEnd = dateAdapter.subDays(viewEnd, 1);
    }
    return { viewStart, viewEnd };
}
export function isWithinThreshold({ x, y }) {
    const DRAG_THRESHOLD = 1;
    return Math.abs(x) > DRAG_THRESHOLD || Math.abs(y) > DRAG_THRESHOLD;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItY2FsZW5kYXIvc3JjL21vZHVsZXMvY29tbW9uL3V0aWwvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBS0wsY0FBYyxJQUFJLHdCQUF3QixHQUszQyxNQUFNLGdCQUFnQixDQUFDO0FBR3hCLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxDQUFDLE1BQXVCLEVBQUUsRUFBRTtJQUN4RCxNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDcEUsT0FBTyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDaEQsQ0FBQyxDQUFDO0FBRUYsTUFBTSxVQUFVLG9CQUFvQixDQUNsQyxLQUFpQixFQUNqQixLQUFpQjtJQUVqQixPQUFPLENBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQy9DLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDaEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQ2xELENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxvQkFBb0IsQ0FBQyxLQUFp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QTZCO0lBQzdCLElBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkQsTUFBTSxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFMUMsdUNBQXVDO0lBQ3ZDLE9BQ0UsUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELFNBQVMsR0FBRyxVQUFVLEVBQ3RCO1FBQ0EsU0FBUyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQy9DO0lBRUQscUNBQXFDO0lBQ3JDLElBQUksT0FBTyxHQUFHLFVBQVUsQ0FBQztJQUN6QixPQUNFLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRCxPQUFPLEdBQUcsU0FBUyxFQUNuQjtRQUNBLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztLQUMzQztJQUVELE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLENBQUM7QUFDaEMsQ0FBQztBQUVELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQTRCO0lBQ2xFLE1BQU0sY0FBYyxHQUFHLENBQUMsQ0FBQztJQUN6QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsY0FBYyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDO0FBQ3RFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDYWxlbmRhckV2ZW50LFxuICBXZWVrVmlld1RpbWVFdmVudCxcbiAgV2Vla1ZpZXdIb3VyLFxuICBXZWVrVmlld0hvdXJTZWdtZW50LFxuICB2YWxpZGF0ZUV2ZW50cyBhcyB2YWxpZGF0ZUV2ZW50c1dpdGhvdXRMb2csXG4gIFZpZXdQZXJpb2QsXG4gIFdlZWtEYXksXG4gIFdlZWtWaWV3QWxsRGF5RXZlbnQsXG4gIFJlc291cmNlV2Vla1ZpZXdSb3dFdmVudCxcbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICcuLi8uLi8uLi9kYXRlLWFkYXB0ZXJzL2RhdGUtYWRhcHRlcic7XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUV2ZW50cyA9IChldmVudHM6IENhbGVuZGFyRXZlbnRbXSkgPT4ge1xuICBjb25zdCB3YXJuID0gKC4uLmFyZ3MpID0+IGNvbnNvbGUud2FybignYW5ndWxhci1jYWxlbmRhcicsIC4uLmFyZ3MpO1xuICByZXR1cm4gdmFsaWRhdGVFdmVudHNXaXRob3V0TG9nKGV2ZW50cywgd2Fybik7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNJbnNpZGVMZWZ0QW5kUmlnaHQoXG4gIG91dGVyOiBDbGllbnRSZWN0LFxuICBpbm5lcjogQ2xpZW50UmVjdFxuKTogYm9vbGVhbiB7XG4gIHJldHVybiAoXG4gICAgTWF0aC5mbG9vcihvdXRlci5sZWZ0KSA8PSBNYXRoLmNlaWwoaW5uZXIubGVmdCkgJiZcbiAgICBNYXRoLmZsb29yKGlubmVyLmxlZnQpIDw9IE1hdGguY2VpbChvdXRlci5yaWdodCkgJiZcbiAgICBNYXRoLmZsb29yKG91dGVyLmxlZnQpIDw9IE1hdGguY2VpbChpbm5lci5yaWdodCkgJiZcbiAgICBNYXRoLmZsb29yKGlubmVyLnJpZ2h0KSA8PSBNYXRoLmNlaWwob3V0ZXIucmlnaHQpXG4gICk7XG59XG5cbmZ1bmN0aW9uIGlzSW5zaWRlVG9wQW5kQm90dG9tKG91dGVyOiBDbGllbnRSZWN0LCBpbm5lcjogQ2xpZW50UmVjdCk6IGJvb2xlYW4ge1xuICByZXR1cm4gKFxuICAgIE1hdGguZmxvb3Iob3V0ZXIudG9wKSA8PSBNYXRoLmNlaWwoaW5uZXIudG9wKSAmJlxuICAgIE1hdGguZmxvb3IoaW5uZXIudG9wKSA8PSBNYXRoLmNlaWwob3V0ZXIuYm90dG9tKSAmJlxuICAgIE1hdGguZmxvb3Iob3V0ZXIudG9wKSA8PSBNYXRoLmNlaWwoaW5uZXIuYm90dG9tKSAmJlxuICAgIE1hdGguZmxvb3IoaW5uZXIuYm90dG9tKSA8PSBNYXRoLmNlaWwob3V0ZXIuYm90dG9tKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJbnNpZGUob3V0ZXI6IENsaWVudFJlY3QsIGlubmVyOiBDbGllbnRSZWN0KTogYm9vbGVhbiB7XG4gIHJldHVybiAoXG4gICAgaXNJbnNpZGVMZWZ0QW5kUmlnaHQob3V0ZXIsIGlubmVyKSAmJiBpc0luc2lkZVRvcEFuZEJvdHRvbShvdXRlciwgaW5uZXIpXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3VuZFRvTmVhcmVzdChhbW91bnQ6IG51bWJlciwgcHJlY2lzaW9uOiBudW1iZXIpIHtcbiAgcmV0dXJuIE1hdGgucm91bmQoYW1vdW50IC8gcHJlY2lzaW9uKSAqIHByZWNpc2lvbjtcbn1cblxuZXhwb3J0IGNvbnN0IHRyYWNrQnlFdmVudElkID0gKGluZGV4OiBudW1iZXIsIGV2ZW50OiBDYWxlbmRhckV2ZW50KSA9PlxuICBldmVudC5pZCA/IGV2ZW50LmlkIDogZXZlbnQ7XG5cbmV4cG9ydCBjb25zdCB0cmFja0J5V2Vla0RheUhlYWRlckRhdGUgPSAoaW5kZXg6IG51bWJlciwgZGF5OiBXZWVrRGF5KSA9PlxuICBkYXkuZGF0ZS50b0lTT1N0cmluZygpO1xuXG5leHBvcnQgY29uc3QgdHJhY2tCeUhvdXJTZWdtZW50ID0gKFxuICBpbmRleDogbnVtYmVyLFxuICBzZWdtZW50OiBXZWVrVmlld0hvdXJTZWdtZW50XG4pID0+IHNlZ21lbnQuZGF0ZS50b0lTT1N0cmluZygpO1xuXG5leHBvcnQgY29uc3QgdHJhY2tCeUhvdXIgPSAoaW5kZXg6IG51bWJlciwgaG91cjogV2Vla1ZpZXdIb3VyKSA9PlxuICBob3VyLnNlZ21lbnRzWzBdLmRhdGUudG9JU09TdHJpbmcoKTtcblxuZXhwb3J0IGNvbnN0IHRyYWNrQnlXZWVrQWxsRGF5RXZlbnQgPSAoXG4gIGluZGV4OiBudW1iZXIsXG4gIHdlZWtFdmVudDogV2Vla1ZpZXdBbGxEYXlFdmVudFxuKSA9PiAod2Vla0V2ZW50LmV2ZW50LmlkID8gd2Vla0V2ZW50LmV2ZW50LmlkIDogd2Vla0V2ZW50LmV2ZW50KTtcblxuZXhwb3J0IGNvbnN0IHRyYWNrQnlXZWVrVGltZUV2ZW50ID0gKFxuICBpbmRleDogbnVtYmVyLFxuICB3ZWVrRXZlbnQ6IFdlZWtWaWV3VGltZUV2ZW50XG4pID0+ICh3ZWVrRXZlbnQuZXZlbnQuaWQgPyB3ZWVrRXZlbnQuZXZlbnQuaWQgOiB3ZWVrRXZlbnQuZXZlbnQpO1xuXG5leHBvcnQgY29uc3QgdHJhY2tCeVJlc291cmNlV2Vla1ZpZXdSb3dFdmVudCA9IChcbiAgaW5kZXg6IG51bWJlcixcbiAgcmVzb3VyY2VXZWVrVmlld1Jvd0V2ZW50OiBSZXNvdXJjZVdlZWtWaWV3Um93RXZlbnRcbikgPT5cbiAgcmVzb3VyY2VXZWVrVmlld1Jvd0V2ZW50LmV2ZW50LmlkXG4gICAgPyByZXNvdXJjZVdlZWtWaWV3Um93RXZlbnQuZXZlbnQuaWRcbiAgICA6IHJlc291cmNlV2Vla1ZpZXdSb3dFdmVudC5ldmVudDtcblxuY29uc3QgTUlOVVRFU19JTl9IT1VSID0gNjA7XG5cbmZ1bmN0aW9uIGdldFBpeGVsQW1vdW50SW5NaW51dGVzKFxuICBob3VyU2VnbWVudHM6IG51bWJlcixcbiAgaG91clNlZ21lbnRIZWlnaHQ6IG51bWJlcixcbiAgaG91ckR1cmF0aW9uPzogbnVtYmVyXG4pIHtcbiAgcmV0dXJuIChob3VyRHVyYXRpb24gfHwgTUlOVVRFU19JTl9IT1VSKSAvIChob3VyU2VnbWVudHMgKiBob3VyU2VnbWVudEhlaWdodCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNaW51dGVzTW92ZWQoXG4gIG1vdmVkWTogbnVtYmVyLFxuICBob3VyU2VnbWVudHM6IG51bWJlcixcbiAgaG91clNlZ21lbnRIZWlnaHQ6IG51bWJlcixcbiAgZXZlbnRTbmFwU2l6ZTogbnVtYmVyLFxuICBob3VyRHVyYXRpb24/OiBudW1iZXJcbik6IG51bWJlciB7XG4gIGNvbnN0IGRyYWdnZWRJblBpeGVsc1NuYXBTaXplID0gcm91bmRUb05lYXJlc3QoXG4gICAgbW92ZWRZLFxuICAgIGV2ZW50U25hcFNpemUgfHwgaG91clNlZ21lbnRIZWlnaHRcbiAgKTtcbiAgY29uc3QgcGl4ZWxBbW91bnRJbk1pbnV0ZXMgPSBnZXRQaXhlbEFtb3VudEluTWludXRlcyhcbiAgICBob3VyU2VnbWVudHMsXG4gICAgaG91clNlZ21lbnRIZWlnaHQsXG4gICAgaG91ckR1cmF0aW9uXG4gICk7XG4gIHJldHVybiBkcmFnZ2VkSW5QaXhlbHNTbmFwU2l6ZSAqIHBpeGVsQW1vdW50SW5NaW51dGVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdEV2ZW50RW5kKFxuICBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXIsXG4gIGV2ZW50OiBDYWxlbmRhckV2ZW50LFxuICBtaW5pbXVtTWludXRlczogbnVtYmVyXG4pOiBEYXRlIHtcbiAgaWYgKGV2ZW50LmVuZCkge1xuICAgIHJldHVybiBldmVudC5lbmQ7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGRhdGVBZGFwdGVyLmFkZE1pbnV0ZXMoZXZlbnQuc3RhcnQsIG1pbmltdW1NaW51dGVzKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkRGF5c1dpdGhFeGNsdXNpb25zKFxuICBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXIsXG4gIGRhdGU6IERhdGUsXG4gIGRheXM6IG51bWJlcixcbiAgZXhjbHVkZWQ6IG51bWJlcltdXG4pOiBEYXRlIHtcbiAgbGV0IGRheXNDb3VudGVyID0gMDtcbiAgbGV0IGRheXNUb0FkZCA9IDA7XG4gIGNvbnN0IGNoYW5nZURheXMgPSBkYXlzIDwgMCA/IGRhdGVBZGFwdGVyLnN1YkRheXMgOiBkYXRlQWRhcHRlci5hZGREYXlzO1xuICBsZXQgcmVzdWx0ID0gZGF0ZTtcbiAgd2hpbGUgKGRheXNUb0FkZCA8PSBNYXRoLmFicyhkYXlzKSkge1xuICAgIHJlc3VsdCA9IGNoYW5nZURheXMoZGF0ZSwgZGF5c0NvdW50ZXIpO1xuICAgIGNvbnN0IGRheSA9IGRhdGVBZGFwdGVyLmdldERheShyZXN1bHQpO1xuICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGRheSkgPT09IC0xKSB7XG4gICAgICBkYXlzVG9BZGQrKztcbiAgICB9XG4gICAgZGF5c0NvdW50ZXIrKztcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEcmFnZ2VkV2l0aGluUGVyaW9kKFxuICBuZXdTdGFydDogRGF0ZSxcbiAgbmV3RW5kOiBEYXRlLFxuICBwZXJpb2Q6IFZpZXdQZXJpb2Rcbik6IGJvb2xlYW4ge1xuICBjb25zdCBlbmQgPSBuZXdFbmQgfHwgbmV3U3RhcnQ7XG4gIHJldHVybiAoXG4gICAgKHBlcmlvZC5zdGFydCA8PSBuZXdTdGFydCAmJiBuZXdTdGFydCA8PSBwZXJpb2QuZW5kKSB8fFxuICAgIChwZXJpb2Quc3RhcnQgPD0gZW5kICYmIGVuZCA8PSBwZXJpb2QuZW5kKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvdWxkRmlyZURyb3BwZWRFdmVudChcbiAgZHJvcEV2ZW50OiB7IGRyb3BEYXRhPzogeyBldmVudD86IENhbGVuZGFyRXZlbnQ7IGNhbGVuZGFySWQ/OiBzeW1ib2wgfSB9LFxuICBkYXRlOiBEYXRlLFxuICBhbGxEYXk6IGJvb2xlYW4sXG4gIGNhbGVuZGFySWQ6IHN5bWJvbFxuKSB7XG4gIHJldHVybiAoXG4gICAgZHJvcEV2ZW50LmRyb3BEYXRhICYmXG4gICAgZHJvcEV2ZW50LmRyb3BEYXRhLmV2ZW50ICYmXG4gICAgKGRyb3BFdmVudC5kcm9wRGF0YS5jYWxlbmRhcklkICE9PSBjYWxlbmRhcklkIHx8XG4gICAgICAoZHJvcEV2ZW50LmRyb3BEYXRhLmV2ZW50LmFsbERheSAmJiAhYWxsRGF5KSB8fFxuICAgICAgKCFkcm9wRXZlbnQuZHJvcERhdGEuZXZlbnQuYWxsRGF5ICYmIGFsbERheSkpXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXZWVrVmlld1BlcmlvZChcbiAgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyLFxuICB2aWV3RGF0ZTogRGF0ZSxcbiAgd2Vla1N0YXJ0c09uOiBudW1iZXIsXG4gIGV4Y2x1ZGVkOiBudW1iZXJbXSA9IFtdLFxuICBkYXlzSW5XZWVrPzogbnVtYmVyXG4pOiB7IHZpZXdTdGFydDogRGF0ZTsgdmlld0VuZDogRGF0ZSB9IHtcbiAgbGV0IHZpZXdTdGFydCA9IGRheXNJbldlZWtcbiAgICA/IGRhdGVBZGFwdGVyLnN0YXJ0T2ZEYXkodmlld0RhdGUpXG4gICAgOiBkYXRlQWRhcHRlci5zdGFydE9mV2Vlayh2aWV3RGF0ZSwgeyB3ZWVrU3RhcnRzT24gfSk7XG4gIGNvbnN0IGVuZE9mV2VlayA9IGRhdGVBZGFwdGVyLmVuZE9mV2Vlayh2aWV3RGF0ZSwgeyB3ZWVrU3RhcnRzT24gfSk7XG4gIHdoaWxlIChcbiAgICBleGNsdWRlZC5pbmRleE9mKGRhdGVBZGFwdGVyLmdldERheSh2aWV3U3RhcnQpKSA+IC0xICYmXG4gICAgdmlld1N0YXJ0IDwgZW5kT2ZXZWVrXG4gICkge1xuICAgIHZpZXdTdGFydCA9IGRhdGVBZGFwdGVyLmFkZERheXModmlld1N0YXJ0LCAxKTtcbiAgfVxuICBpZiAoZGF5c0luV2Vlaykge1xuICAgIGNvbnN0IHZpZXdFbmQgPSBkYXRlQWRhcHRlci5lbmRPZkRheShcbiAgICAgIGFkZERheXNXaXRoRXhjbHVzaW9ucyhkYXRlQWRhcHRlciwgdmlld1N0YXJ0LCBkYXlzSW5XZWVrIC0gMSwgZXhjbHVkZWQpXG4gICAgKTtcbiAgICByZXR1cm4geyB2aWV3U3RhcnQsIHZpZXdFbmQgfTtcbiAgfSBlbHNlIHtcbiAgICBsZXQgdmlld0VuZCA9IGVuZE9mV2VlaztcbiAgICB3aGlsZSAoXG4gICAgICBleGNsdWRlZC5pbmRleE9mKGRhdGVBZGFwdGVyLmdldERheSh2aWV3RW5kKSkgPiAtMSAmJlxuICAgICAgdmlld0VuZCA+IHZpZXdTdGFydFxuICAgICkge1xuICAgICAgdmlld0VuZCA9IGRhdGVBZGFwdGVyLnN1YkRheXModmlld0VuZCwgMSk7XG4gICAgfVxuICAgIHJldHVybiB7IHZpZXdTdGFydCwgdmlld0VuZCB9O1xuICB9XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9udGhWaWV3UGVyaW9kKFxuICBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXIsXG4gIHZpZXdEYXRlOiBEYXRlLFxuICBleGNsdWRlZDogbnVtYmVyW10gPSBbXVxuKTogeyB2aWV3U3RhcnQ6IERhdGU7IHZpZXdFbmQ6IERhdGUgfSB7XG4gIC8vIEdldCB0aGUgc3RhcnQgb2YgdGhlIG1vbnRoXG4gIGxldCB2aWV3U3RhcnQgPSBkYXRlQWRhcHRlci5zdGFydE9mTW9udGgodmlld0RhdGUpO1xuICBjb25zdCBlbmRPZk1vbnRoID0gbmV3IERhdGUoJzEyLzMxLzIwMjQnKTtcblxuICAvLyBBZGp1c3Qgdmlld1N0YXJ0IGJhc2VkIG9uIGV4Y2x1c2lvbnNcbiAgd2hpbGUgKFxuICAgIGV4Y2x1ZGVkLmluZGV4T2YoZGF0ZUFkYXB0ZXIuZ2V0RGF5KHZpZXdTdGFydCkpID4gLTEgJiZcbiAgICB2aWV3U3RhcnQgPCBlbmRPZk1vbnRoXG4gICkge1xuICAgIHZpZXdTdGFydCA9IGRhdGVBZGFwdGVyLmFkZERheXModmlld1N0YXJ0LCAxKTtcbiAgfVxuXG4gIC8vIEFkanVzdCB2aWV3RW5kIGJhc2VkIG9uIGV4Y2x1c2lvbnNcbiAgbGV0IHZpZXdFbmQgPSBlbmRPZk1vbnRoO1xuICB3aGlsZSAoXG4gICAgZXhjbHVkZWQuaW5kZXhPZihkYXRlQWRhcHRlci5nZXREYXkodmlld0VuZCkpID4gLTEgJiZcbiAgICB2aWV3RW5kID4gdmlld1N0YXJ0XG4gICkge1xuICAgIHZpZXdFbmQgPSBkYXRlQWRhcHRlci5zdWJEYXlzKHZpZXdFbmQsIDEpO1xuICB9XG5cbiAgcmV0dXJuIHsgdmlld1N0YXJ0LCB2aWV3RW5kIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1dpdGhpblRocmVzaG9sZCh7IHgsIHkgfTogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9KSB7XG4gIGNvbnN0IERSQUdfVEhSRVNIT0xEID0gMTtcbiAgcmV0dXJuIE1hdGguYWJzKHgpID4gRFJBR19USFJFU0hPTEQgfHwgTWF0aC5hYnMoeSkgPiBEUkFHX1RIUkVTSE9MRDtcbn1cbiJdfQ==