"use strict";(self.webpackChunkdemos=self.webpackChunkdemos||[]).push([[3245],{63245:(e,n,s)=>{s.r(n),s.d(n,{sources:()=>a});const a=[{filename:"component.ts",contents:{raw:s(15912),highlighted:s(49545)}},{filename:"template.html",contents:{raw:s(8043),highlighted:s(20981)}},{filename:"module.ts",contents:{raw:s(91179),highlighted:s(82321)}}]},49545:(e,n,s)=>{s.r(n),s.d(n,{default:()=>a});const a='<span class="hljs-keyword">import</span> { Component, ChangeDetectionStrategy } from <span class="hljs-string">\'@angular/core\'</span>;\n<span class="hljs-keyword">import</span> { Subject } from <span class="hljs-string">\'rxjs\'</span>;\n<span class="hljs-keyword">import</span> {\n  CalendarEvent,\n  CalendarEventTimesChangedEvent,\n  CalendarView,\n} from <span class="hljs-string">\'angular-calendar\'</span>;\n<span class="hljs-keyword">import</span> { colors } from <span class="hljs-string">\'../demo-utils/colors\'</span>;\n<span class="hljs-keyword">import</span> { addDays, addHours, endOfMonth, startOfDay, subDays } from <span class="hljs-string">\'date-fns\'</span>;\n\n@Component({\n  selector: <span class="hljs-string">\'mwl-demo-component\'</span>,\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  templateUrl: <span class="hljs-string">\'template.html\'</span>,\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> DemoComponent {\n  view: CalendarView = CalendarView.Month;\n\n  viewDate = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();\n\n  events: CalendarEvent[] = [\n    {\n      start: subDays(startOfDay(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()), <span class="hljs-number">1</span>),\n      end: addDays(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(), <span class="hljs-number">1</span>),\n      title: <span class="hljs-string">\'A 3 day event\'</span>,\n      color: colors.red,\n      allDay: <span class="hljs-literal">true</span>,\n      resizable: {\n        beforeStart: <span class="hljs-literal">true</span>,\n        afterEnd: <span class="hljs-literal">true</span>,\n      },\n      draggable: <span class="hljs-literal">true</span>,\n    },\n    {\n      start: startOfDay(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()),\n      title: <span class="hljs-string">\'An event with no end date\'</span>,\n      color: colors.yellow,\n    },\n    {\n      start: subDays(endOfMonth(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()), <span class="hljs-number">3</span>),\n      end: addDays(endOfMonth(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()), <span class="hljs-number">3</span>),\n      title: <span class="hljs-string">\'A long event that spans 2 months\'</span>,\n      color: colors.blue,\n      allDay: <span class="hljs-literal">true</span>,\n    },\n    {\n      start: addHours(startOfDay(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()), <span class="hljs-number">2</span>),\n      end: addHours(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(), <span class="hljs-number">2</span>),\n      title: <span class="hljs-string">\'A draggable and resizable event\'</span>,\n      color: colors.yellow,\n      resizable: {\n        beforeStart: <span class="hljs-literal">true</span>,\n        afterEnd: <span class="hljs-literal">true</span>,\n      },\n      draggable: <span class="hljs-literal">true</span>,\n    },\n  ];\n\n  refresh = <span class="hljs-keyword">new</span> Subject&lt;<span class="hljs-built_in">void</span>&gt;();\n\n  eventTimesChanged({\n    event,\n    newStart,\n    newEnd,\n  }: CalendarEventTimesChangedEvent): <span class="hljs-built_in">void</span> {\n    event.start = newStart;\n    event.end = newEnd;\n    <span class="hljs-keyword">this</span>.refresh.next();\n  }\n}\n'},82321:(e,n,s)=>{s.r(n),s.d(n,{default:()=>a});const a='<span class="hljs-keyword">import</span> { NgModule } from <span class="hljs-string">\'@angular/core\'</span>;\n<span class="hljs-keyword">import</span> { CommonModule } from <span class="hljs-string">\'@angular/common\'</span>;\n<span class="hljs-keyword">import</span> { RouterModule } from <span class="hljs-string">\'@angular/router\'</span>;\n<span class="hljs-keyword">import</span> { CalendarModule, DateAdapter } from <span class="hljs-string">\'angular-calendar\'</span>;\n<span class="hljs-keyword">import</span> { DemoUtilsModule } from <span class="hljs-string">\'../demo-utils/module\'</span>;\n<span class="hljs-keyword">import</span> { DemoComponent } from <span class="hljs-string">\'./component\'</span>;\n<span class="hljs-keyword">import</span> { adapterFactory } from <span class="hljs-string">\'angular-calendar/date-adapters/date-fns\'</span>;\n\n@NgModule({\n  imports: [\n    CommonModule,\n    CalendarModule.forRoot({\n      provide: DateAdapter,\n      useFactory: adapterFactory,\n    }),\n    DemoUtilsModule,\n    RouterModule.forChild([{ path: <span class="hljs-string">\'\'</span>, component: DemoComponent }]),\n  ],\n  declarations: [DemoComponent],\n  exports: [DemoComponent],\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> DemoModule {}\n'},20981:(e,n,s)=>{s.r(n),s.d(n,{default:()=>a});const a='<span class="hljs-tag">&lt;<span class="hljs-title">mwl-demo-utils-calendar-header</span> [(<span class="hljs-attribute">view</span>)]=<span class="hljs-value">"view"</span> [(<span class="hljs-attribute">viewDate</span>)]=<span class="hljs-value">"viewDate"</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-title">mwl-demo-utils-calendar-header</span>&gt;</span>\n\n<span class="hljs-tag">&lt;<span class="hljs-title">div</span> [<span class="hljs-attribute">ngSwitch</span>]=<span class="hljs-value">"view"</span> <span class="hljs-attribute">dir</span>=<span class="hljs-value">"rtl"</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-title">mwl-calendar-month-view</span>\n    *<span class="hljs-attribute">ngSwitchCase</span>=<span class="hljs-value">"\'month\'"</span>\n    [<span class="hljs-attribute">viewDate</span>]=<span class="hljs-value">"viewDate"</span>\n    [<span class="hljs-attribute">events</span>]=<span class="hljs-value">"events"</span>\n    [<span class="hljs-attribute">activeDayIsOpen</span>]=<span class="hljs-value">"true"</span>\n    [<span class="hljs-attribute">refresh</span>]=<span class="hljs-value">"refresh"</span>\n    (<span class="hljs-attribute">eventTimesChanged</span>)=<span class="hljs-value">"eventTimesChanged($event)"</span>\n  &gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-title">mwl-calendar-month-view</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-title">mwl-calendar-week-view</span>\n    *<span class="hljs-attribute">ngSwitchCase</span>=<span class="hljs-value">"\'week\'"</span>\n    [<span class="hljs-attribute">viewDate</span>]=<span class="hljs-value">"viewDate"</span>\n    [<span class="hljs-attribute">events</span>]=<span class="hljs-value">"events"</span>\n    [<span class="hljs-attribute">refresh</span>]=<span class="hljs-value">"refresh"</span>\n    (<span class="hljs-attribute">eventTimesChanged</span>)=<span class="hljs-value">"eventTimesChanged($event)"</span>\n  &gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-title">mwl-calendar-week-view</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-title">mwl-calendar-day-view</span>\n    *<span class="hljs-attribute">ngSwitchCase</span>=<span class="hljs-value">"\'day\'"</span>\n    [<span class="hljs-attribute">viewDate</span>]=<span class="hljs-value">"viewDate"</span>\n    [<span class="hljs-attribute">events</span>]=<span class="hljs-value">"events"</span>\n    [<span class="hljs-attribute">refresh</span>]=<span class="hljs-value">"refresh"</span>\n    (<span class="hljs-attribute">eventTimesChanged</span>)=<span class="hljs-value">"eventTimesChanged($event)"</span>\n  &gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-title">mwl-calendar-day-view</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>\n'},15912:(e,n,s)=>{s.r(n),s.d(n,{default:()=>a});const a="import { Component, ChangeDetectionStrategy } from '@angular/core';\nimport { Subject } from 'rxjs';\nimport {\n  CalendarEvent,\n  CalendarEventTimesChangedEvent,\n  CalendarView,\n} from 'angular-calendar';\nimport { colors } from '../demo-utils/colors';\nimport { addDays, addHours, endOfMonth, startOfDay, subDays } from 'date-fns';\n\n@Component({\n  selector: 'mwl-demo-component',\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  templateUrl: 'template.html',\n})\nexport class DemoComponent {\n  view: CalendarView = CalendarView.Month;\n\n  viewDate = new Date();\n\n  events: CalendarEvent[] = [\n    {\n      start: subDays(startOfDay(new Date()), 1),\n      end: addDays(new Date(), 1),\n      title: 'A 3 day event',\n      color: colors.red,\n      allDay: true,\n      resizable: {\n        beforeStart: true,\n        afterEnd: true,\n      },\n      draggable: true,\n    },\n    {\n      start: startOfDay(new Date()),\n      title: 'An event with no end date',\n      color: colors.yellow,\n    },\n    {\n      start: subDays(endOfMonth(new Date()), 3),\n      end: addDays(endOfMonth(new Date()), 3),\n      title: 'A long event that spans 2 months',\n      color: colors.blue,\n      allDay: true,\n    },\n    {\n      start: addHours(startOfDay(new Date()), 2),\n      end: addHours(new Date(), 2),\n      title: 'A draggable and resizable event',\n      color: colors.yellow,\n      resizable: {\n        beforeStart: true,\n        afterEnd: true,\n      },\n      draggable: true,\n    },\n  ];\n\n  refresh = new Subject<void>();\n\n  eventTimesChanged({\n    event,\n    newStart,\n    newEnd,\n  }: CalendarEventTimesChangedEvent): void {\n    event.start = newStart;\n    event.end = newEnd;\n    this.refresh.next();\n  }\n}\n"},91179:(e,n,s)=>{s.r(n),s.d(n,{default:()=>a});const a="import { NgModule } from '@angular/core';\nimport { CommonModule } from '@angular/common';\nimport { RouterModule } from '@angular/router';\nimport { CalendarModule, DateAdapter } from 'angular-calendar';\nimport { DemoUtilsModule } from '../demo-utils/module';\nimport { DemoComponent } from './component';\nimport { adapterFactory } from 'angular-calendar/date-adapters/date-fns';\n\n@NgModule({\n  imports: [\n    CommonModule,\n    CalendarModule.forRoot({\n      provide: DateAdapter,\n      useFactory: adapterFactory,\n    }),\n    DemoUtilsModule,\n    RouterModule.forChild([{ path: '', component: DemoComponent }]),\n  ],\n  declarations: [DemoComponent],\n  exports: [DemoComponent],\n})\nexport class DemoModule {}\n"},8043:(e,n,s)=>{s.r(n),s.d(n,{default:()=>a});const a='<mwl-demo-utils-calendar-header [(view)]="view" [(viewDate)]="viewDate">\n</mwl-demo-utils-calendar-header>\n\n<div [ngSwitch]="view" dir="rtl">\n  <mwl-calendar-month-view\n    *ngSwitchCase="\'month\'"\n    [viewDate]="viewDate"\n    [events]="events"\n    [activeDayIsOpen]="true"\n    [refresh]="refresh"\n    (eventTimesChanged)="eventTimesChanged($event)"\n  >\n  </mwl-calendar-month-view>\n  <mwl-calendar-week-view\n    *ngSwitchCase="\'week\'"\n    [viewDate]="viewDate"\n    [events]="events"\n    [refresh]="refresh"\n    (eventTimesChanged)="eventTimesChanged($event)"\n  >\n  </mwl-calendar-week-view>\n  <mwl-calendar-day-view\n    *ngSwitchCase="\'day\'"\n    [viewDate]="viewDate"\n    [events]="events"\n    [refresh]="refresh"\n    (eventTimesChanged)="eventTimesChanged($event)"\n  >\n  </mwl-calendar-day-view>\n</div>\n'}}]);