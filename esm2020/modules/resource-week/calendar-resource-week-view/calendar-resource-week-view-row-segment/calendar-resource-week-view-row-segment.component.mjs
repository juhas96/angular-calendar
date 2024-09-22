import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../../common/calendar-a11y/calendar-a11y.pipe";
export class CalendarWeekViewRowSegmentComponent {
}
CalendarWeekViewRowSegmentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CalendarWeekViewRowSegmentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CalendarWeekViewRowSegmentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: CalendarWeekViewRowSegmentComponent, selector: "mwl-calendar-resource-week-view-row-segment", inputs: { segment: "segment", segmentHeight: "segmentHeight", resourceLabel: "resourceLabel", daysInWeek: "daysInWeek", customTemplate: "customTemplate" }, ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CalendarWeekViewRowSegmentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mwl-calendar-resource-week-view-row-segment',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcmVzb3VyY2Utd2Vlay12aWV3LXJvdy1zZWdtZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItY2FsZW5kYXIvc3JjL21vZHVsZXMvcmVzb3VyY2Utd2Vlay9jYWxlbmRhci1yZXNvdXJjZS13ZWVrLXZpZXcvY2FsZW5kYXItcmVzb3VyY2Utd2Vlay12aWV3LXJvdy1zZWdtZW50L2NhbGVuZGFyLXJlc291cmNlLXdlZWstdmlldy1yb3ctc2VnbWVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWUsTUFBTSxlQUFlLENBQUM7Ozs7QUEwQzlELE1BQU0sT0FBTyxtQ0FBbUM7O2dJQUFuQyxtQ0FBbUM7b0hBQW5DLG1DQUFtQywrT0FyQ3BDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DVDsyRkFFVSxtQ0FBbUM7a0JBdkMvQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw2Q0FBNkM7b0JBQ3ZELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ1Q7aUJBQ0Y7OEJBRVUsT0FBTztzQkFBZixLQUFLO2dCQUVHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBRUcsYUFBYTtzQkFBckIsS0FBSztnQkFFRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVHLGNBQWM7c0JBQXRCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVzb3VyY2VXZWVrVmlld1Jvd1NlZ21lbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci1yZXNvdXJjZS13ZWVrLXZpZXctcm93LXNlZ21lbnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxuICAgICAgbGV0LXNlZ21lbnQ9XCJzZWdtZW50XCJcbiAgICAgIGxldC1zZWdtZW50SGVpZ2h0PVwic2VnbWVudEhlaWdodFwiXG4gICAgICBsZXQtcmVzb3VyY2VMYWJlbD1cInJlc291cmNlTGFiZWxcIlxuICAgICAgbGV0LWRheXNJbldlZWs9XCJkYXlzSW5XZWVrXCJcbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgIFthdHRyLmFyaWEtaGlkZGVuXT1cIlxuICAgICAgICAgIHt9XG4gICAgICAgICAgICB8IGNhbGVuZGFyQTExeVxuICAgICAgICAgICAgICA6IChkYXlzSW5XZWVrID09PSAxXG4gICAgICAgICAgICAgICAgICA/ICdoaWRlRGF5SG91clNlZ21lbnQnXG4gICAgICAgICAgICAgICAgICA6ICdoaWRlV2Vla0hvdXJTZWdtZW50JylcbiAgICAgICAgXCJcbiAgICAgICAgY2xhc3M9XCJjYWwtcm93LXNlZ21lbnRcIlxuICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cInNlZ21lbnRIZWlnaHRcIlxuICAgICAgICBbbmdDbGFzc109XCJzZWdtZW50Py5jc3NDbGFzc1wiXG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtdGltZVwiICpuZ0lmPVwicmVzb3VyY2VMYWJlbFwiPlxuICAgICAgICAgIHt7IHJlc291cmNlTGFiZWwgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIHNlZ21lbnQ6IHNlZ21lbnQsXG4gICAgICAgIHNlZ21lbnRIZWlnaHQ6IHNlZ21lbnRIZWlnaHQsXG4gICAgICAgIHJlc291cmNlTGFiZWw6IHJlc291cmNlTGFiZWwsXG4gICAgICAgIGRheXNJbldlZWs6IGRheXNJbldlZWtcbiAgICAgIH1cIlxuICAgID5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhcldlZWtWaWV3Um93U2VnbWVudENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHNlZ21lbnQ6IFJlc291cmNlV2Vla1ZpZXdSb3dTZWdtZW50O1xuXG4gIEBJbnB1dCgpIHNlZ21lbnRIZWlnaHQ6IG51bWJlcjtcblxuICBASW5wdXQoKSByZXNvdXJjZUxhYmVsOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgZGF5c0luV2VlazogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xufVxuIl19