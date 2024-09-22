import { Component, Input, Output, EventEmitter, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../../common/calendar-event-actions/calendar-event-actions.component";
import * as i3 from "../../../common/calendar-event-title/calendar-event-title.component";
import * as i4 from "../../../common/calendar-tooltip/calendar-tooltip.directive";
import * as i5 from "../../../common/click/click.directive";
import * as i6 from "../../../common/keydown-enter/keydown-enter.directive";
import * as i7 from "../../../common/calendar-event-title/calendar-event-title.pipe";
import * as i8 from "../../../common/calendar-a11y/calendar-a11y.pipe";
export class CalendarWeekViewEventComponent {
    constructor() {
        this.eventClicked = new EventEmitter();
    }
}
CalendarWeekViewEventComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CalendarWeekViewEventComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CalendarWeekViewEventComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: CalendarWeekViewEventComponent, selector: "mwl-calendar-resource-week-view-event", inputs: { locale: "locale", weekEvent: "weekEvent", tooltipPlacement: "tooltipPlacement", tooltipAppendToBody: "tooltipAppendToBody", tooltipDisabled: "tooltipDisabled", tooltipDelay: "tooltipDelay", customTemplate: "customTemplate", eventTitleTemplate: "eventTitleTemplate", eventActionsTemplate: "eventActionsTemplate", tooltipTemplate: "tooltipTemplate", column: "column", daysInWeek: "daysInWeek" }, outputs: { eventClicked: "eventClicked" }, ngImport: i0, template: `
    <ng-template
      #defaultTemplate
      let-weekEvent="weekEvent"
      let-tooltipPlacement="tooltipPlacement"
      let-eventClicked="eventClicked"
      let-tooltipTemplate="tooltipTemplate"
      let-tooltipAppendToBody="tooltipAppendToBody"
      let-tooltipDisabled="tooltipDisabled"
      let-tooltipDelay="tooltipDelay"
      let-column="column"
      let-daysInWeek="daysInWeek"
    >
      <div
        class="cal-event"
        [ngStyle]="{
          color: weekEvent.event.color?.secondaryText,
          backgroundColor: weekEvent.event.color?.secondary,
          borderColor: weekEvent.event.color?.primary
        }"
        [mwlCalendarTooltip]="
          !tooltipDisabled
            ? (weekEvent.event.title
              | calendarEventTitle
                : (daysInWeek === 1 ? 'dayTooltip' : 'weekTooltip')
                : weekEvent.tempEvent || weekEvent.event)
            : ''
        "
        [tooltipPlacement]="tooltipPlacement"
        [tooltipEvent]="weekEvent.tempEvent || weekEvent.event"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipAppendToBody]="tooltipAppendToBody"
        [tooltipDelay]="tooltipDelay"
        (mwlClick)="eventClicked.emit({ sourceEvent: $event })"
        (mwlKeydownEnter)="eventClicked.emit({ sourceEvent: $event })"
        tabindex="0"
        role="application"
        [attr.aria-label]="
          { event: weekEvent.tempEvent || weekEvent.event, locale: locale }
            | calendarA11y : 'eventDescription'
        "
      >
        <mwl-calendar-event-actions
          [event]="weekEvent.tempEvent || weekEvent.event"
          [customTemplate]="eventActionsTemplate"
        >
        </mwl-calendar-event-actions>
        &ngsp;
        <mwl-calendar-event-title
          [event]="weekEvent.tempEvent || weekEvent.event"
          [customTemplate]="eventTitleTemplate"
          [view]="daysInWeek === 1 ? 'day' : 'week'"
        >
        </mwl-calendar-event-title>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        weekEvent: weekEvent,
        tooltipPlacement: tooltipPlacement,
        eventClicked: eventClicked,
        tooltipTemplate: tooltipTemplate,
        tooltipAppendToBody: tooltipAppendToBody,
        tooltipDisabled: tooltipDisabled,
        tooltipDelay: tooltipDelay,
        column: column,
        daysInWeek: daysInWeek
      }"
    >
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i2.CalendarEventActionsComponent, selector: "mwl-calendar-event-actions", inputs: ["event", "customTemplate"] }, { kind: "component", type: i3.CalendarEventTitleComponent, selector: "mwl-calendar-event-title", inputs: ["event", "customTemplate", "view"] }, { kind: "directive", type: i4.CalendarTooltipDirective, selector: "[mwlCalendarTooltip]", inputs: ["mwlCalendarTooltip", "tooltipPlacement", "tooltipTemplate", "tooltipEvent", "tooltipAppendToBody", "tooltipDelay"] }, { kind: "directive", type: i5.ClickDirective, selector: "[mwlClick]", inputs: ["clickListenerDisabled"], outputs: ["mwlClick"] }, { kind: "directive", type: i6.KeydownEnterDirective, selector: "[mwlKeydownEnter]", outputs: ["mwlKeydownEnter"] }, { kind: "pipe", type: i7.CalendarEventTitlePipe, name: "calendarEventTitle" }, { kind: "pipe", type: i8.CalendarA11yPipe, name: "calendarA11y" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CalendarWeekViewEventComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mwl-calendar-resource-week-view-event',
                    template: `
    <ng-template
      #defaultTemplate
      let-weekEvent="weekEvent"
      let-tooltipPlacement="tooltipPlacement"
      let-eventClicked="eventClicked"
      let-tooltipTemplate="tooltipTemplate"
      let-tooltipAppendToBody="tooltipAppendToBody"
      let-tooltipDisabled="tooltipDisabled"
      let-tooltipDelay="tooltipDelay"
      let-column="column"
      let-daysInWeek="daysInWeek"
    >
      <div
        class="cal-event"
        [ngStyle]="{
          color: weekEvent.event.color?.secondaryText,
          backgroundColor: weekEvent.event.color?.secondary,
          borderColor: weekEvent.event.color?.primary
        }"
        [mwlCalendarTooltip]="
          !tooltipDisabled
            ? (weekEvent.event.title
              | calendarEventTitle
                : (daysInWeek === 1 ? 'dayTooltip' : 'weekTooltip')
                : weekEvent.tempEvent || weekEvent.event)
            : ''
        "
        [tooltipPlacement]="tooltipPlacement"
        [tooltipEvent]="weekEvent.tempEvent || weekEvent.event"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipAppendToBody]="tooltipAppendToBody"
        [tooltipDelay]="tooltipDelay"
        (mwlClick)="eventClicked.emit({ sourceEvent: $event })"
        (mwlKeydownEnter)="eventClicked.emit({ sourceEvent: $event })"
        tabindex="0"
        role="application"
        [attr.aria-label]="
          { event: weekEvent.tempEvent || weekEvent.event, locale: locale }
            | calendarA11y : 'eventDescription'
        "
      >
        <mwl-calendar-event-actions
          [event]="weekEvent.tempEvent || weekEvent.event"
          [customTemplate]="eventActionsTemplate"
        >
        </mwl-calendar-event-actions>
        &ngsp;
        <mwl-calendar-event-title
          [event]="weekEvent.tempEvent || weekEvent.event"
          [customTemplate]="eventTitleTemplate"
          [view]="daysInWeek === 1 ? 'day' : 'week'"
        >
        </mwl-calendar-event-title>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        weekEvent: weekEvent,
        tooltipPlacement: tooltipPlacement,
        eventClicked: eventClicked,
        tooltipTemplate: tooltipTemplate,
        tooltipAppendToBody: tooltipAppendToBody,
        tooltipDisabled: tooltipDisabled,
        tooltipDelay: tooltipDelay,
        column: column,
        daysInWeek: daysInWeek
      }"
    >
    </ng-template>
  `,
                }]
        }], propDecorators: { locale: [{
                type: Input
            }], weekEvent: [{
                type: Input
            }], tooltipPlacement: [{
                type: Input
            }], tooltipAppendToBody: [{
                type: Input
            }], tooltipDisabled: [{
                type: Input
            }], tooltipDelay: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }], eventTitleTemplate: [{
                type: Input
            }], eventActionsTemplate: [{
                type: Input
            }], tooltipTemplate: [{
                type: Input
            }], column: [{
                type: Input
            }], daysInWeek: [{
                type: Input
            }], eventClicked: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcmVzb3VyY2Utd2Vlay12aWV3LWV2ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItY2FsZW5kYXIvc3JjL21vZHVsZXMvcmVzb3VyY2Utd2Vlay9jYWxlbmRhci1yZXNvdXJjZS13ZWVrLXZpZXcvY2FsZW5kYXItcmVzb3VyY2Utd2Vlay12aWV3LWV2ZW50L2NhbGVuZGFyLXJlc291cmNlLXdlZWstdmlldy1ldmVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksR0FFYixNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7OztBQW1GdkIsTUFBTSxPQUFPLDhCQUE4QjtJQTNFM0M7UUFvR1ksaUJBQVksR0FBRyxJQUFJLFlBQVksRUFFckMsQ0FBQztLQUNOOzsySEE1QlksOEJBQThCOytHQUE5Qiw4QkFBOEIsNGdCQXpFL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUVUOzJGQUVVLDhCQUE4QjtrQkEzRTFDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHVDQUF1QztvQkFDakQsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVFVDtpQkFDRjs4QkFFVSxNQUFNO3NCQUFkLEtBQUs7Z0JBRUcsU0FBUztzQkFBakIsS0FBSztnQkFFRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBRUcsbUJBQW1CO3NCQUEzQixLQUFLO2dCQUVHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBRUcsWUFBWTtzQkFBcEIsS0FBSztnQkFFRyxjQUFjO3NCQUF0QixLQUFLO2dCQUVHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFFRyxvQkFBb0I7c0JBQTVCLEtBQUs7Z0JBRUcsZUFBZTtzQkFBdkIsS0FBSztnQkFFRyxNQUFNO3NCQUFkLEtBQUs7Z0JBRUcsVUFBVTtzQkFBbEIsS0FBSztnQkFFSSxZQUFZO3NCQUFyQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFRlbXBsYXRlUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFdlZWtWaWV3QWxsRGF5RXZlbnQsXG4gIFJlc291cmNlV2Vla1ZpZXdSb3dDb2x1bW4sXG4gIFJlc291cmNlV2Vla1ZpZXdSb3dFdmVudCxcbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgUGxhY2VtZW50QXJyYXkgfSBmcm9tICdwb3NpdGlvbmluZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci1yZXNvdXJjZS13ZWVrLXZpZXctZXZlbnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxuICAgICAgbGV0LXdlZWtFdmVudD1cIndlZWtFdmVudFwiXG4gICAgICBsZXQtdG9vbHRpcFBsYWNlbWVudD1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgbGV0LWV2ZW50Q2xpY2tlZD1cImV2ZW50Q2xpY2tlZFwiXG4gICAgICBsZXQtdG9vbHRpcFRlbXBsYXRlPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgIGxldC10b29sdGlwQXBwZW5kVG9Cb2R5PVwidG9vbHRpcEFwcGVuZFRvQm9keVwiXG4gICAgICBsZXQtdG9vbHRpcERpc2FibGVkPVwidG9vbHRpcERpc2FibGVkXCJcbiAgICAgIGxldC10b29sdGlwRGVsYXk9XCJ0b29sdGlwRGVsYXlcIlxuICAgICAgbGV0LWNvbHVtbj1cImNvbHVtblwiXG4gICAgICBsZXQtZGF5c0luV2Vlaz1cImRheXNJbldlZWtcIlxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnRcIlxuICAgICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgICAgY29sb3I6IHdlZWtFdmVudC5ldmVudC5jb2xvcj8uc2Vjb25kYXJ5VGV4dCxcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHdlZWtFdmVudC5ldmVudC5jb2xvcj8uc2Vjb25kYXJ5LFxuICAgICAgICAgIGJvcmRlckNvbG9yOiB3ZWVrRXZlbnQuZXZlbnQuY29sb3I/LnByaW1hcnlcbiAgICAgICAgfVwiXG4gICAgICAgIFttd2xDYWxlbmRhclRvb2x0aXBdPVwiXG4gICAgICAgICAgIXRvb2x0aXBEaXNhYmxlZFxuICAgICAgICAgICAgPyAod2Vla0V2ZW50LmV2ZW50LnRpdGxlXG4gICAgICAgICAgICAgIHwgY2FsZW5kYXJFdmVudFRpdGxlXG4gICAgICAgICAgICAgICAgOiAoZGF5c0luV2VlayA9PT0gMSA/ICdkYXlUb29sdGlwJyA6ICd3ZWVrVG9vbHRpcCcpXG4gICAgICAgICAgICAgICAgOiB3ZWVrRXZlbnQudGVtcEV2ZW50IHx8IHdlZWtFdmVudC5ldmVudClcbiAgICAgICAgICAgIDogJydcbiAgICAgICAgXCJcbiAgICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwidG9vbHRpcFBsYWNlbWVudFwiXG4gICAgICAgIFt0b29sdGlwRXZlbnRdPVwid2Vla0V2ZW50LnRlbXBFdmVudCB8fCB3ZWVrRXZlbnQuZXZlbnRcIlxuICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgIFt0b29sdGlwQXBwZW5kVG9Cb2R5XT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIlxuICAgICAgICBbdG9vbHRpcERlbGF5XT1cInRvb2x0aXBEZWxheVwiXG4gICAgICAgIChtd2xDbGljayk9XCJldmVudENsaWNrZWQuZW1pdCh7IHNvdXJjZUV2ZW50OiAkZXZlbnQgfSlcIlxuICAgICAgICAobXdsS2V5ZG93bkVudGVyKT1cImV2ZW50Q2xpY2tlZC5lbWl0KHsgc291cmNlRXZlbnQ6ICRldmVudCB9KVwiXG4gICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgIHJvbGU9XCJhcHBsaWNhdGlvblwiXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXG4gICAgICAgICAgeyBldmVudDogd2Vla0V2ZW50LnRlbXBFdmVudCB8fCB3ZWVrRXZlbnQuZXZlbnQsIGxvY2FsZTogbG9jYWxlIH1cbiAgICAgICAgICAgIHwgY2FsZW5kYXJBMTF5IDogJ2V2ZW50RGVzY3JpcHRpb24nXG4gICAgICAgIFwiXG4gICAgICA+XG4gICAgICAgIDxtd2wtY2FsZW5kYXItZXZlbnQtYWN0aW9uc1xuICAgICAgICAgIFtldmVudF09XCJ3ZWVrRXZlbnQudGVtcEV2ZW50IHx8IHdlZWtFdmVudC5ldmVudFwiXG4gICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImV2ZW50QWN0aW9uc1RlbXBsYXRlXCJcbiAgICAgICAgPlxuICAgICAgICA8L213bC1jYWxlbmRhci1ldmVudC1hY3Rpb25zPlxuICAgICAgICAmbmdzcDtcbiAgICAgICAgPG13bC1jYWxlbmRhci1ldmVudC10aXRsZVxuICAgICAgICAgIFtldmVudF09XCJ3ZWVrRXZlbnQudGVtcEV2ZW50IHx8IHdlZWtFdmVudC5ldmVudFwiXG4gICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImV2ZW50VGl0bGVUZW1wbGF0ZVwiXG4gICAgICAgICAgW3ZpZXddPVwiZGF5c0luV2VlayA9PT0gMSA/ICdkYXknIDogJ3dlZWsnXCJcbiAgICAgICAgPlxuICAgICAgICA8L213bC1jYWxlbmRhci1ldmVudC10aXRsZT5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcbiAgICAgICAgd2Vla0V2ZW50OiB3ZWVrRXZlbnQsXG4gICAgICAgIHRvb2x0aXBQbGFjZW1lbnQ6IHRvb2x0aXBQbGFjZW1lbnQsXG4gICAgICAgIGV2ZW50Q2xpY2tlZDogZXZlbnRDbGlja2VkLFxuICAgICAgICB0b29sdGlwVGVtcGxhdGU6IHRvb2x0aXBUZW1wbGF0ZSxcbiAgICAgICAgdG9vbHRpcEFwcGVuZFRvQm9keTogdG9vbHRpcEFwcGVuZFRvQm9keSxcbiAgICAgICAgdG9vbHRpcERpc2FibGVkOiB0b29sdGlwRGlzYWJsZWQsXG4gICAgICAgIHRvb2x0aXBEZWxheTogdG9vbHRpcERlbGF5LFxuICAgICAgICBjb2x1bW46IGNvbHVtbixcbiAgICAgICAgZGF5c0luV2VlazogZGF5c0luV2Vla1xuICAgICAgfVwiXG4gICAgPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyV2Vla1ZpZXdFdmVudENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHdlZWtFdmVudDogV2Vla1ZpZXdBbGxEYXlFdmVudCB8IFJlc291cmNlV2Vla1ZpZXdSb3dFdmVudDtcblxuICBASW5wdXQoKSB0b29sdGlwUGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheTtcblxuICBASW5wdXQoKSB0b29sdGlwQXBwZW5kVG9Cb2R5OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSB0b29sdGlwRGVsYXk6IG51bWJlciB8IG51bGw7XG5cbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgZXZlbnRUaXRsZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIGV2ZW50QWN0aW9uc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSBjb2x1bW46IFJlc291cmNlV2Vla1ZpZXdSb3dDb2x1bW47XG5cbiAgQElucHV0KCkgZGF5c0luV2VlazogbnVtYmVyO1xuXG4gIEBPdXRwdXQoKSBldmVudENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICBzb3VyY2VFdmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ7XG4gIH0+KCk7XG59XG4iXX0=