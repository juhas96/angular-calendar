"use strict";(self.webpackChunkdemos=self.webpackChunkdemos||[]).push([[4657],{14657:(e,s,n)=>{n.r(s),n.d(s,{sources:()=>a});const a=[{filename:"component.ts",contents:{raw:n(8752),highlighted:n(25460)}},{filename:"template.html",contents:{raw:n(55710),highlighted:n(53399)}},{filename:"module.ts",contents:{raw:n(73320),highlighted:n(63446)}}]},25460:(e,s,n)=>{n.r(s),n.d(s,{default:()=>a});const a='<span class="hljs-keyword">import</span> { Component, ChangeDetectionStrategy, OnInit } from <span class="hljs-string">\'@angular/core\'</span>;\n<span class="hljs-keyword">import</span> {\n  CalendarEvent,\n  CalendarMonthViewDay,\n  CalendarView,\n} from <span class="hljs-string">\'angular-calendar\'</span>;\n<span class="hljs-keyword">import</span> { colors } from <span class="hljs-string">\'../demo-utils/colors\'</span>;\n<span class="hljs-keyword">import</span> { isSameMinute, startOfDay } from <span class="hljs-string">\'date-fns\'</span>;\n\n<span class="hljs-interface"><span class="hljs-keyword">interface</span> EventGroupMeta </span>{\n  <span class="hljs-keyword">type</span>: <span class="hljs-built_in">string</span>;\n}\n\n@Component({\n  selector: <span class="hljs-string">\'mwl-demo-component\'</span>,\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  templateUrl: <span class="hljs-string">\'./template.html\'</span>,\n  styles: [\n    `\n      .cell-totals {\n        margin: <span class="hljs-number">5</span>px;\n        text-align: center;\n      }\n      .badge {\n        margin-right: <span class="hljs-number">5</span>px;\n      }\n    `,\n  ],\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> DemoComponent <span class="hljs-keyword">implements</span> OnInit {\n  view: CalendarView = CalendarView.Month;\n\n  viewDate: <span class="hljs-built_in">Date</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();\n\n  events: CalendarEvent[] = [\n    {\n      title: <span class="hljs-string">\'Event 1\'</span>,\n      color: colors.yellow,\n      start: startOfDay(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()),\n      meta: {\n        <span class="hljs-keyword">type</span>: <span class="hljs-string">\'warning\'</span>,\n      },\n    },\n    {\n      title: <span class="hljs-string">\'Event 2\'</span>,\n      color: colors.yellow,\n      start: startOfDay(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()),\n      meta: {\n        <span class="hljs-keyword">type</span>: <span class="hljs-string">\'warning\'</span>,\n      },\n    },\n    {\n      title: <span class="hljs-string">\'Event 3\'</span>,\n      color: colors.blue,\n      start: startOfDay(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()),\n      meta: {\n        <span class="hljs-keyword">type</span>: <span class="hljs-string">\'info\'</span>,\n      },\n    },\n    {\n      title: <span class="hljs-string">\'Event 4\'</span>,\n      color: colors.red,\n      start: startOfDay(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()),\n      meta: {\n        <span class="hljs-keyword">type</span>: <span class="hljs-string">\'danger\'</span>,\n      },\n    },\n    {\n      title: <span class="hljs-string">\'Event 5\'</span>,\n      color: colors.red,\n      start: startOfDay(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()),\n      meta: {\n        <span class="hljs-keyword">type</span>: <span class="hljs-string">\'danger\'</span>,\n      },\n    },\n  ];\n\n  groupedSimilarEvents: CalendarEvent[] = [];\n\n  ngOnInit() {\n    <span class="hljs-comment">// group any events together that have the same type and dates</span>\n    <span class="hljs-comment">// use for when you have a lot of events on the week or day view at the same time</span>\n    <span class="hljs-keyword">this</span>.groupedSimilarEvents = [];\n    <span class="hljs-keyword">const</span> processedEvents = <span class="hljs-keyword">new</span> Set();\n    <span class="hljs-keyword">this</span>.events.forEach((event) =&gt; {\n      <span class="hljs-keyword">if</span> (processedEvents.has(event)) {\n        <span class="hljs-keyword">return</span>;\n      }\n      <span class="hljs-keyword">const</span> similarEvents = <span class="hljs-keyword">this</span>.events.filter((otherEvent) =&gt; {\n        <span class="hljs-keyword">return</span> (\n          otherEvent !== event &amp;&amp;\n          !processedEvents.has(otherEvent) &amp;&amp;\n          isSameMinute(otherEvent.start, event.start) &amp;&amp;\n          (isSameMinute(otherEvent.end, event.end) ||\n            (!otherEvent.end &amp;&amp; !event.end)) &amp;&amp;\n          otherEvent.color.primary === event.color.primary &amp;&amp;\n          otherEvent.color.secondary === event.color.secondary\n        );\n      });\n      processedEvents.add(event);\n      similarEvents.forEach((otherEvent) =&gt; {\n        processedEvents.add(otherEvent);\n      });\n      <span class="hljs-keyword">if</span> (similarEvents.length &gt; <span class="hljs-number">0</span>) {\n        <span class="hljs-keyword">this</span>.groupedSimilarEvents.push({\n          title: `${similarEvents.length + <span class="hljs-number">1</span>} events`,\n          color: event.color,\n          start: event.start,\n          end: event.end,\n          meta: {\n            groupedEvents: [event, ...similarEvents],\n          },\n        });\n      } <span class="hljs-keyword">else</span> {\n        <span class="hljs-keyword">this</span>.groupedSimilarEvents.push(event);\n      }\n    });\n  }\n\n  beforeMonthViewRender({\n    body,\n  }: {\n    body: CalendarMonthViewDay&lt;EventGroupMeta&gt;[];\n  }): <span class="hljs-built_in">void</span> {\n    <span class="hljs-comment">// month view has a different UX from the week and day view so we only really need to group by the type</span>\n    body.forEach((cell) =&gt; {\n      <span class="hljs-keyword">const</span> groups = {};\n      cell.events.forEach((event: CalendarEvent&lt;EventGroupMeta&gt;) =&gt; {\n        groups[event.meta.type] = groups[event.meta.type] || [];\n        groups[event.meta.type].push(event);\n      });\n      cell[<span class="hljs-string">\'eventGroups\'</span>] = <span class="hljs-built_in">Object</span>.entries(groups);\n    });\n  }\n}\n'},63446:(e,s,n)=>{n.r(s),n.d(s,{default:()=>a});const a='<span class="hljs-keyword">import</span> { NgModule } from <span class="hljs-string">\'@angular/core\'</span>;\n<span class="hljs-keyword">import</span> { CommonModule } from <span class="hljs-string">\'@angular/common\'</span>;\n<span class="hljs-keyword">import</span> { RouterModule } from <span class="hljs-string">\'@angular/router\'</span>;\n<span class="hljs-keyword">import</span> { CalendarModule, DateAdapter } from <span class="hljs-string">\'angular-calendar\'</span>;\n<span class="hljs-keyword">import</span> { DemoUtilsModule } from <span class="hljs-string">\'../demo-utils/module\'</span>;\n<span class="hljs-keyword">import</span> { DemoComponent } from <span class="hljs-string">\'./component\'</span>;\n<span class="hljs-keyword">import</span> { adapterFactory } from <span class="hljs-string">\'angular-calendar/date-adapters/date-fns\'</span>;\n<span class="hljs-keyword">import</span> { NgbPopoverModule } from <span class="hljs-string">\'@ng-bootstrap/ng-bootstrap\'</span>;\n\n@NgModule({\n  imports: [\n    CommonModule,\n    CalendarModule.forRoot({\n      provide: DateAdapter,\n      useFactory: adapterFactory,\n    }),\n    NgbPopoverModule,\n    DemoUtilsModule,\n    RouterModule.forChild([{ path: <span class="hljs-string">\'\'</span>, component: DemoComponent }]),\n  ],\n  declarations: [DemoComponent],\n  exports: [DemoComponent],\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> DemoModule {}\n'},53399:(e,s,n)=>{n.r(s),n.d(s,{default:()=>a});const a='<span class="hljs-tag">&lt;<span class="hljs-title">mwl-demo-utils-calendar-header</span> [(<span class="hljs-attribute">view</span>)]=<span class="hljs-value">"view"</span> [(<span class="hljs-attribute">viewDate</span>)]=<span class="hljs-value">"viewDate"</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-title">mwl-demo-utils-calendar-header</span>&gt;</span>\n\n<span class="hljs-tag">&lt;<span class="hljs-title">ng-template</span> #<span class="hljs-attribute">customCellTemplate</span> <span class="hljs-attribute">let-day</span>=<span class="hljs-value">"day"</span> <span class="hljs-attribute">let-locale</span>=<span class="hljs-value">"locale"</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"cal-cell-top"</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-title">span</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"cal-day-badge"</span> *<span class="hljs-attribute">ngIf</span>=<span class="hljs-value">"day.badgeTotal &gt; 0"</span>\n      &gt;</span>{{ day.badgeTotal }}<span class="hljs-tag">&lt;/<span class="hljs-title">span</span>\n    &gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-title">span</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"cal-day-number"</span>\n      &gt;</span>{{ day.date | calendarDate:\'monthViewDayNumber\':locale }}<span class="hljs-tag">&lt;/<span class="hljs-title">span</span>\n    &gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"cell-totals"</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-title">span</span>\n      *<span class="hljs-attribute">ngFor</span>=<span class="hljs-value">"let group of day.eventGroups"</span>\n      <span class="hljs-attribute">class</span>=<span class="hljs-value">"badge text-bg-{{ group[0] }}"</span>\n    &gt;</span>\n      {{ group[1].length }}\n    <span class="hljs-tag">&lt;/<span class="hljs-title">span</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-title">ng-template</span>&gt;</span>\n\n<span class="hljs-tag">&lt;<span class="hljs-title">ng-template</span>\n  #<span class="hljs-attribute">customEventTemplate</span>\n  <span class="hljs-attribute">let-weekEvent</span>=<span class="hljs-value">"weekEvent"</span>\n  <span class="hljs-attribute">let-tooltipPlacement</span>=<span class="hljs-value">"tooltipPlacement"</span>\n  <span class="hljs-attribute">let-eventClicked</span>=<span class="hljs-value">"eventClicked"</span>\n  <span class="hljs-attribute">let-tooltipTemplate</span>=<span class="hljs-value">"tooltipTemplate"</span>\n  <span class="hljs-attribute">let-tooltipAppendToBody</span>=<span class="hljs-value">"tooltipAppendToBody"</span>\n  <span class="hljs-attribute">let-tooltipDisabled</span>=<span class="hljs-value">"tooltipDisabled"</span>\n  <span class="hljs-attribute">let-tooltipDelay</span>=<span class="hljs-value">"tooltipDelay"</span>\n  <span class="hljs-attribute">let-column</span>=<span class="hljs-value">"column"</span>\n&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-title">ng-template</span> #<span class="hljs-attribute">groupedEventsTemplate</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">style</span>=<span class="hljs-value">"min-width: 150px"</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-title">div</span> *<span class="hljs-attribute">ngFor</span>=<span class="hljs-value">"let event of weekEvent.event.meta.groupedEvents"</span>&gt;</span>\n        <span class="hljs-tag">&lt;<span class="hljs-title">mwl-calendar-event-actions</span> [<span class="hljs-attribute">event</span>]=<span class="hljs-value">"event"</span>&gt;</span>\n        <span class="hljs-tag">&lt;/<span class="hljs-title">mwl-calendar-event-actions</span>&gt;</span>\n        &amp;ngsp;\n        <span class="hljs-tag">&lt;<span class="hljs-title">mwl-calendar-event-title</span> [<span class="hljs-attribute">event</span>]=<span class="hljs-value">"event"</span> <span class="hljs-attribute">view</span>=<span class="hljs-value">"week"</span>&gt;</span>\n        <span class="hljs-tag">&lt;/<span class="hljs-title">mwl-calendar-event-title</span>&gt;</span>\n      <span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>\n    <span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-title">ng-template</span>&gt;</span>\n\n  <span class="hljs-tag">&lt;<span class="hljs-title">div</span>\n    [<span class="hljs-attribute">ngbPopover</span>]=<span class="hljs-value">"groupedEventsTemplate"</span>\n    [<span class="hljs-attribute">disablePopover</span>]=<span class="hljs-value">"!weekEvent.event.meta.groupedEvents"</span>\n    <span class="hljs-attribute">class</span>=<span class="hljs-value">"cal-event"</span>\n    [<span class="hljs-attribute">ngStyle</span>]=<span class="hljs-value">"{\n          color: weekEvent.event.color?.secondaryText,\n          backgroundColor: weekEvent.event.color?.secondary,\n          borderColor: weekEvent.event.color?.primary\n        }"</span>\n    [<span class="hljs-attribute">mwlCalendarTooltip</span>]=<span class="hljs-value">"\n          !tooltipDisabled &amp;&amp; !weekEvent.event.meta.groupedEvents\n            ? (weekEvent.event.title\n              | calendarEventTitle: \'weekTooltip\':weekEvent.event)\n            : \'\'\n        "</span>\n    [<span class="hljs-attribute">tooltipPlacement</span>]=<span class="hljs-value">"tooltipPlacement"</span>\n    [<span class="hljs-attribute">tooltipEvent</span>]=<span class="hljs-value">"weekEvent.event"</span>\n    [<span class="hljs-attribute">tooltipTemplate</span>]=<span class="hljs-value">"tooltipTemplate"</span>\n    [<span class="hljs-attribute">tooltipAppendToBody</span>]=<span class="hljs-value">"tooltipAppendToBody"</span>\n    [<span class="hljs-attribute">tooltipDelay</span>]=<span class="hljs-value">"tooltipDelay"</span>\n    (<span class="hljs-attribute">mwlClick</span>)=<span class="hljs-value">"eventClicked.emit()"</span>\n  &gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-title">ng-container</span> *<span class="hljs-attribute">ngIf</span>=<span class="hljs-value">"!weekEvent.event.meta.groupedEvents"</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-title">mwl-calendar-event-actions</span> [<span class="hljs-attribute">event</span>]=<span class="hljs-value">"weekEvent.event"</span>&gt;</span>\n      <span class="hljs-tag">&lt;/<span class="hljs-title">mwl-calendar-event-actions</span>&gt;</span>\n      &amp;ngsp;\n    <span class="hljs-tag">&lt;/<span class="hljs-title">ng-container</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-title">mwl-calendar-event-title</span> [<span class="hljs-attribute">event</span>]=<span class="hljs-value">"weekEvent.event"</span> <span class="hljs-attribute">view</span>=<span class="hljs-value">"week"</span>&gt;</span>\n    <span class="hljs-tag">&lt;/<span class="hljs-title">mwl-calendar-event-title</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-title">ng-template</span>&gt;</span>\n\n<span class="hljs-tag">&lt;<span class="hljs-title">div</span> [<span class="hljs-attribute">ngSwitch</span>]=<span class="hljs-value">"view"</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-title">mwl-calendar-month-view</span>\n    *<span class="hljs-attribute">ngSwitchCase</span>=<span class="hljs-value">"\'month\'"</span>\n    [<span class="hljs-attribute">viewDate</span>]=<span class="hljs-value">"viewDate"</span>\n    [<span class="hljs-attribute">events</span>]=<span class="hljs-value">"events"</span>\n    [<span class="hljs-attribute">cellTemplate</span>]=<span class="hljs-value">"customCellTemplate"</span>\n    (<span class="hljs-attribute">beforeViewRender</span>)=<span class="hljs-value">"beforeMonthViewRender($event)"</span>\n    [<span class="hljs-attribute">activeDayIsOpen</span>]=<span class="hljs-value">"true"</span>\n  &gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-title">mwl-calendar-month-view</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-title">mwl-calendar-week-view</span>\n    *<span class="hljs-attribute">ngSwitchCase</span>=<span class="hljs-value">"\'week\'"</span>\n    [<span class="hljs-attribute">viewDate</span>]=<span class="hljs-value">"viewDate"</span>\n    [<span class="hljs-attribute">events</span>]=<span class="hljs-value">"groupedSimilarEvents"</span>\n    [<span class="hljs-attribute">eventTemplate</span>]=<span class="hljs-value">"customEventTemplate"</span>\n  &gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-title">mwl-calendar-week-view</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-title">mwl-calendar-day-view</span>\n    *<span class="hljs-attribute">ngSwitchCase</span>=<span class="hljs-value">"\'day\'"</span>\n    [<span class="hljs-attribute">viewDate</span>]=<span class="hljs-value">"viewDate"</span>\n    [<span class="hljs-attribute">events</span>]=<span class="hljs-value">"groupedSimilarEvents"</span>\n    [<span class="hljs-attribute">eventTemplate</span>]=<span class="hljs-value">"customEventTemplate"</span>\n  &gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-title">mwl-calendar-day-view</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>\n'},8752:(e,s,n)=>{n.r(s),n.d(s,{default:()=>a});const a="import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';\nimport {\n  CalendarEvent,\n  CalendarMonthViewDay,\n  CalendarView,\n} from 'angular-calendar';\nimport { colors } from '../demo-utils/colors';\nimport { isSameMinute, startOfDay } from 'date-fns';\n\ninterface EventGroupMeta {\n  type: string;\n}\n\n@Component({\n  selector: 'mwl-demo-component',\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  templateUrl: './template.html',\n  styles: [\n    `\n      .cell-totals {\n        margin: 5px;\n        text-align: center;\n      }\n      .badge {\n        margin-right: 5px;\n      }\n    `,\n  ],\n})\nexport class DemoComponent implements OnInit {\n  view: CalendarView = CalendarView.Month;\n\n  viewDate: Date = new Date();\n\n  events: CalendarEvent[] = [\n    {\n      title: 'Event 1',\n      color: colors.yellow,\n      start: startOfDay(new Date()),\n      meta: {\n        type: 'warning',\n      },\n    },\n    {\n      title: 'Event 2',\n      color: colors.yellow,\n      start: startOfDay(new Date()),\n      meta: {\n        type: 'warning',\n      },\n    },\n    {\n      title: 'Event 3',\n      color: colors.blue,\n      start: startOfDay(new Date()),\n      meta: {\n        type: 'info',\n      },\n    },\n    {\n      title: 'Event 4',\n      color: colors.red,\n      start: startOfDay(new Date()),\n      meta: {\n        type: 'danger',\n      },\n    },\n    {\n      title: 'Event 5',\n      color: colors.red,\n      start: startOfDay(new Date()),\n      meta: {\n        type: 'danger',\n      },\n    },\n  ];\n\n  groupedSimilarEvents: CalendarEvent[] = [];\n\n  ngOnInit() {\n    // group any events together that have the same type and dates\n    // use for when you have a lot of events on the week or day view at the same time\n    this.groupedSimilarEvents = [];\n    const processedEvents = new Set();\n    this.events.forEach((event) => {\n      if (processedEvents.has(event)) {\n        return;\n      }\n      const similarEvents = this.events.filter((otherEvent) => {\n        return (\n          otherEvent !== event &&\n          !processedEvents.has(otherEvent) &&\n          isSameMinute(otherEvent.start, event.start) &&\n          (isSameMinute(otherEvent.end, event.end) ||\n            (!otherEvent.end && !event.end)) &&\n          otherEvent.color.primary === event.color.primary &&\n          otherEvent.color.secondary === event.color.secondary\n        );\n      });\n      processedEvents.add(event);\n      similarEvents.forEach((otherEvent) => {\n        processedEvents.add(otherEvent);\n      });\n      if (similarEvents.length > 0) {\n        this.groupedSimilarEvents.push({\n          title: `${similarEvents.length + 1} events`,\n          color: event.color,\n          start: event.start,\n          end: event.end,\n          meta: {\n            groupedEvents: [event, ...similarEvents],\n          },\n        });\n      } else {\n        this.groupedSimilarEvents.push(event);\n      }\n    });\n  }\n\n  beforeMonthViewRender({\n    body,\n  }: {\n    body: CalendarMonthViewDay<EventGroupMeta>[];\n  }): void {\n    // month view has a different UX from the week and day view so we only really need to group by the type\n    body.forEach((cell) => {\n      const groups = {};\n      cell.events.forEach((event: CalendarEvent<EventGroupMeta>) => {\n        groups[event.meta.type] = groups[event.meta.type] || [];\n        groups[event.meta.type].push(event);\n      });\n      cell['eventGroups'] = Object.entries(groups);\n    });\n  }\n}\n"},73320:(e,s,n)=>{n.r(s),n.d(s,{default:()=>a});const a="import { NgModule } from '@angular/core';\nimport { CommonModule } from '@angular/common';\nimport { RouterModule } from '@angular/router';\nimport { CalendarModule, DateAdapter } from 'angular-calendar';\nimport { DemoUtilsModule } from '../demo-utils/module';\nimport { DemoComponent } from './component';\nimport { adapterFactory } from 'angular-calendar/date-adapters/date-fns';\nimport { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';\n\n@NgModule({\n  imports: [\n    CommonModule,\n    CalendarModule.forRoot({\n      provide: DateAdapter,\n      useFactory: adapterFactory,\n    }),\n    NgbPopoverModule,\n    DemoUtilsModule,\n    RouterModule.forChild([{ path: '', component: DemoComponent }]),\n  ],\n  declarations: [DemoComponent],\n  exports: [DemoComponent],\n})\nexport class DemoModule {}\n"},55710:(e,s,n)=>{n.r(s),n.d(s,{default:()=>a});const a='<mwl-demo-utils-calendar-header [(view)]="view" [(viewDate)]="viewDate">\n</mwl-demo-utils-calendar-header>\n\n<ng-template #customCellTemplate let-day="day" let-locale="locale">\n  <div class="cal-cell-top">\n    <span class="cal-day-badge" *ngIf="day.badgeTotal > 0"\n      >{{ day.badgeTotal }}</span\n    >\n    <span class="cal-day-number"\n      >{{ day.date | calendarDate:\'monthViewDayNumber\':locale }}</span\n    >\n  </div>\n  <div class="cell-totals">\n    <span\n      *ngFor="let group of day.eventGroups"\n      class="badge text-bg-{{ group[0] }}"\n    >\n      {{ group[1].length }}\n    </span>\n  </div>\n</ng-template>\n\n<ng-template\n  #customEventTemplate\n  let-weekEvent="weekEvent"\n  let-tooltipPlacement="tooltipPlacement"\n  let-eventClicked="eventClicked"\n  let-tooltipTemplate="tooltipTemplate"\n  let-tooltipAppendToBody="tooltipAppendToBody"\n  let-tooltipDisabled="tooltipDisabled"\n  let-tooltipDelay="tooltipDelay"\n  let-column="column"\n>\n  <ng-template #groupedEventsTemplate>\n    <div style="min-width: 150px">\n      <div *ngFor="let event of weekEvent.event.meta.groupedEvents">\n        <mwl-calendar-event-actions [event]="event">\n        </mwl-calendar-event-actions>\n        &ngsp;\n        <mwl-calendar-event-title [event]="event" view="week">\n        </mwl-calendar-event-title>\n      </div>\n    </div>\n  </ng-template>\n\n  <div\n    [ngbPopover]="groupedEventsTemplate"\n    [disablePopover]="!weekEvent.event.meta.groupedEvents"\n    class="cal-event"\n    [ngStyle]="{\n          color: weekEvent.event.color?.secondaryText,\n          backgroundColor: weekEvent.event.color?.secondary,\n          borderColor: weekEvent.event.color?.primary\n        }"\n    [mwlCalendarTooltip]="\n          !tooltipDisabled && !weekEvent.event.meta.groupedEvents\n            ? (weekEvent.event.title\n              | calendarEventTitle: \'weekTooltip\':weekEvent.event)\n            : \'\'\n        "\n    [tooltipPlacement]="tooltipPlacement"\n    [tooltipEvent]="weekEvent.event"\n    [tooltipTemplate]="tooltipTemplate"\n    [tooltipAppendToBody]="tooltipAppendToBody"\n    [tooltipDelay]="tooltipDelay"\n    (mwlClick)="eventClicked.emit()"\n  >\n    <ng-container *ngIf="!weekEvent.event.meta.groupedEvents">\n      <mwl-calendar-event-actions [event]="weekEvent.event">\n      </mwl-calendar-event-actions>\n      &ngsp;\n    </ng-container>\n    <mwl-calendar-event-title [event]="weekEvent.event" view="week">\n    </mwl-calendar-event-title>\n  </div>\n</ng-template>\n\n<div [ngSwitch]="view">\n  <mwl-calendar-month-view\n    *ngSwitchCase="\'month\'"\n    [viewDate]="viewDate"\n    [events]="events"\n    [cellTemplate]="customCellTemplate"\n    (beforeViewRender)="beforeMonthViewRender($event)"\n    [activeDayIsOpen]="true"\n  >\n  </mwl-calendar-month-view>\n  <mwl-calendar-week-view\n    *ngSwitchCase="\'week\'"\n    [viewDate]="viewDate"\n    [events]="groupedSimilarEvents"\n    [eventTemplate]="customEventTemplate"\n  >\n  </mwl-calendar-week-view>\n  <mwl-calendar-day-view\n    *ngSwitchCase="\'day\'"\n    [viewDate]="viewDate"\n    [events]="groupedSimilarEvents"\n    [eventTemplate]="customEventTemplate"\n  >\n  </mwl-calendar-day-view>\n</div>\n'}}]);