import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../../common/calendar-a11y/calendar-a11y.pipe";
export class CalendarMonthViewRowSegmentComponent {
}
CalendarMonthViewRowSegmentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarMonthViewRowSegmentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CalendarMonthViewRowSegmentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.3", type: CalendarMonthViewRowSegmentComponent, selector: "mwl-calendar-resource-month-view-row-segment", inputs: { segment: "segment", segmentHeight: "segmentHeight", resourceLabel: "resourceLabel", daysInWeek: "daysInWeek", customTemplate: "customTemplate" }, ngImport: i0, template: `
    <ng-template
      #defaultTemplate
      let-segment="segment"
      let-segmentHeight="segmentHeight"
      let-resourceLabel="resourceLabel"
      let-daysInWeek="daysInWeek"
    >
      <div
        [attr.aria-hidden]="
          {}
            | calendarA11y
              : (daysInWeek === 1
                  ? 'hideDayHourSegment'
                  : 'hideWeekHourSegment')
        "
        class="cal-row-segment"
        [style.height.px]="segmentHeight"
        [ngClass]="segment?.cssClass"
      >
        <div class="cal-time" *ngIf="resourceLabel">
          {{ resourceLabel }}
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        segment: segment,
        segmentHeight: segmentHeight,
        resourceLabel: resourceLabel,
        daysInWeek: daysInWeek
      }"
    >
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "pipe", type: i2.CalendarA11yPipe, name: "calendarA11y" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarMonthViewRowSegmentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mwl-calendar-resource-month-view-row-segment',
                    template: `
    <ng-template
      #defaultTemplate
      let-segment="segment"
      let-segmentHeight="segmentHeight"
      let-resourceLabel="resourceLabel"
      let-daysInWeek="daysInWeek"
    >
      <div
        [attr.aria-hidden]="
          {}
            | calendarA11y
              : (daysInWeek === 1
                  ? 'hideDayHourSegment'
                  : 'hideWeekHourSegment')
        "
        class="cal-row-segment"
        [style.height.px]="segmentHeight"
        [ngClass]="segment?.cssClass"
      >
        <div class="cal-time" *ngIf="resourceLabel">
          {{ resourceLabel }}
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        segment: segment,
        segmentHeight: segmentHeight,
        resourceLabel: resourceLabel,
        daysInWeek: daysInWeek
      }"
    >
    </ng-template>
  `,
                }]
        }], propDecorators: { segment: [{
                type: Input
            }], segmentHeight: [{
                type: Input
            }], resourceLabel: [{
                type: Input
            }], daysInWeek: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldy1yb3ctc2VnbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWNhbGVuZGFyL3NyYy9tb2R1bGVzL3Jlc291cmNlLW1vbnRoL2NhbGVuZGFyLXJlc291cmNlLW1vbnRoLXZpZXcvY2FsZW5kYXItcmVzb3VyY2UtbW9udGgtdmlldy1yb3ctc2VnbWVudC9jYWxlbmRhci1yZXNvdXJjZS1tb250aC12aWV3LXJvdy1zZWdtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBZSxNQUFNLGVBQWUsQ0FBQzs7OztBQTBDOUQsTUFBTSxPQUFPLG9DQUFvQzs7aUlBQXBDLG9DQUFvQztxSEFBcEMsb0NBQW9DLGdQQXJDckM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUNUOzJGQUVVLG9DQUFvQztrQkF2Q2hELFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDhDQUE4QztvQkFDeEQsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DVDtpQkFDRjs4QkFFVSxPQUFPO3NCQUFmLEtBQUs7Z0JBRUcsYUFBYTtzQkFBckIsS0FBSztnQkFFRyxhQUFhO3NCQUFyQixLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUcsY0FBYztzQkFBdEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXNvdXJjZVdlZWtWaWV3Um93U2VnbWVudCB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLXJlc291cmNlLW1vbnRoLXZpZXctcm93LXNlZ21lbnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxuICAgICAgbGV0LXNlZ21lbnQ9XCJzZWdtZW50XCJcbiAgICAgIGxldC1zZWdtZW50SGVpZ2h0PVwic2VnbWVudEhlaWdodFwiXG4gICAgICBsZXQtcmVzb3VyY2VMYWJlbD1cInJlc291cmNlTGFiZWxcIlxuICAgICAgbGV0LWRheXNJbldlZWs9XCJkYXlzSW5XZWVrXCJcbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgIFthdHRyLmFyaWEtaGlkZGVuXT1cIlxuICAgICAgICAgIHt9XG4gICAgICAgICAgICB8IGNhbGVuZGFyQTExeVxuICAgICAgICAgICAgICA6IChkYXlzSW5XZWVrID09PSAxXG4gICAgICAgICAgICAgICAgICA/ICdoaWRlRGF5SG91clNlZ21lbnQnXG4gICAgICAgICAgICAgICAgICA6ICdoaWRlV2Vla0hvdXJTZWdtZW50JylcbiAgICAgICAgXCJcbiAgICAgICAgY2xhc3M9XCJjYWwtcm93LXNlZ21lbnRcIlxuICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cInNlZ21lbnRIZWlnaHRcIlxuICAgICAgICBbbmdDbGFzc109XCJzZWdtZW50Py5jc3NDbGFzc1wiXG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtdGltZVwiICpuZ0lmPVwicmVzb3VyY2VMYWJlbFwiPlxuICAgICAgICAgIHt7IHJlc291cmNlTGFiZWwgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIHNlZ21lbnQ6IHNlZ21lbnQsXG4gICAgICAgIHNlZ21lbnRIZWlnaHQ6IHNlZ21lbnRIZWlnaHQsXG4gICAgICAgIHJlc291cmNlTGFiZWw6IHJlc291cmNlTGFiZWwsXG4gICAgICAgIGRheXNJbldlZWs6IGRheXNJbldlZWtcbiAgICAgIH1cIlxuICAgID5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vbnRoVmlld1Jvd1NlZ21lbnRDb21wb25lbnQge1xuICBASW5wdXQoKSBzZWdtZW50OiBSZXNvdXJjZVdlZWtWaWV3Um93U2VnbWVudDtcblxuICBASW5wdXQoKSBzZWdtZW50SGVpZ2h0OiBudW1iZXI7XG5cbiAgQElucHV0KCkgcmVzb3VyY2VMYWJlbDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGRheXNJbldlZWs6IG51bWJlcjtcblxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pjtcbn1cbiJdfQ==