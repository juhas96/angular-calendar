import { Component, Input, TemplateRef } from '@angular/core';
import { ResourceWeekViewRowSegment } from '../../../common/calendar-utils/local-calendar-utils';

@Component({
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
})
export class CalendarWeekViewRowSegmentComponent {
  @Input() segment: ResourceWeekViewRowSegment;

  @Input() segmentHeight: number;

  @Input() resourceLabel: string;

  @Input() daysInWeek: number;

  @Input() customTemplate: TemplateRef<any>;
}
