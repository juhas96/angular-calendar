import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./calendar-event-title.pipe";
import * as i3 from "../calendar-a11y/calendar-a11y.pipe";
export class CalendarEventTitleComponent {
}
CalendarEventTitleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CalendarEventTitleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CalendarEventTitleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: CalendarEventTitleComponent, selector: "mwl-calendar-event-title", inputs: { event: "event", customTemplate: "customTemplate", view: "view" }, ngImport: i0, template: `
    <ng-template #defaultTemplate let-event="event" let-view="view">
      <span
        class="cal-event-title"
        [innerHTML]="
          (event.allDay
            ? 'All day'
            : (event.start | date : 'HH:mm') +
              ' - ' +
              (event.end | date : 'HH:mm')) +
          ' | ' +
          (event.title | calendarEventTitle : view : event)
        "
        [attr.aria-hidden]="{} | calendarA11y : 'hideEventTitle'"
      >
      </span>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
        view: view
      }"
    >
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "pipe", type: i1.DatePipe, name: "date" }, { kind: "pipe", type: i2.CalendarEventTitlePipe, name: "calendarEventTitle" }, { kind: "pipe", type: i3.CalendarA11yPipe, name: "calendarA11y" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CalendarEventTitleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mwl-calendar-event-title',
                    template: `
    <ng-template #defaultTemplate let-event="event" let-view="view">
      <span
        class="cal-event-title"
        [innerHTML]="
          (event.allDay
            ? 'All day'
            : (event.start | date : 'HH:mm') +
              ' - ' +
              (event.end | date : 'HH:mm')) +
          ' | ' +
          (event.title | calendarEventTitle : view : event)
        "
        [attr.aria-hidden]="{} | calendarA11y : 'hideEventTitle'"
      >
      </span>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
        view: view
      }"
    >
    </ng-template>
  `,
                }]
        }], propDecorators: { event: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }], view: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZXZlbnQtdGl0bGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1jYWxlbmRhci9zcmMvbW9kdWxlcy9jb21tb24vY2FsZW5kYXItZXZlbnQtdGl0bGUvY2FsZW5kYXItZXZlbnQtdGl0bGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFlLE1BQU0sZUFBZSxDQUFDOzs7OztBQWdDOUQsTUFBTSxPQUFPLDJCQUEyQjs7d0hBQTNCLDJCQUEyQjs0R0FBM0IsMkJBQTJCLDRJQTNCNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5QlQ7MkZBRVUsMkJBQTJCO2tCQTdCdkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5QlQ7aUJBQ0Y7OEJBRVUsS0FBSztzQkFBYixLQUFLO2dCQUVHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBRUcsSUFBSTtzQkFBWixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci1ldmVudC10aXRsZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0VGVtcGxhdGUgbGV0LWV2ZW50PVwiZXZlbnRcIiBsZXQtdmlldz1cInZpZXdcIj5cbiAgICAgIDxzcGFuXG4gICAgICAgIGNsYXNzPVwiY2FsLWV2ZW50LXRpdGxlXCJcbiAgICAgICAgW2lubmVySFRNTF09XCJcbiAgICAgICAgICAoZXZlbnQuYWxsRGF5XG4gICAgICAgICAgICA/ICdBbGwgZGF5J1xuICAgICAgICAgICAgOiAoZXZlbnQuc3RhcnQgfCBkYXRlIDogJ0hIOm1tJykgK1xuICAgICAgICAgICAgICAnIC0gJyArXG4gICAgICAgICAgICAgIChldmVudC5lbmQgfCBkYXRlIDogJ0hIOm1tJykpICtcbiAgICAgICAgICAnIHwgJyArXG4gICAgICAgICAgKGV2ZW50LnRpdGxlIHwgY2FsZW5kYXJFdmVudFRpdGxlIDogdmlldyA6IGV2ZW50KVxuICAgICAgICBcIlxuICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCJ7fSB8IGNhbGVuZGFyQTExeSA6ICdoaWRlRXZlbnRUaXRsZSdcIlxuICAgICAgPlxuICAgICAgPC9zcGFuPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcbiAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICB2aWV3OiB2aWV3XG4gICAgICB9XCJcbiAgICA+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJFdmVudFRpdGxlQ29tcG9uZW50IHtcbiAgQElucHV0KCkgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XG5cbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgdmlldzogc3RyaW5nO1xufVxuIl19