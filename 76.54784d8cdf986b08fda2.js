(window.webpackJsonp=window.webpackJsonp||[]).push([[76],{"9h5u":function(n,s){n.exports="import { Component, ChangeDetectionStrategy } from '@angular/core';\nimport { CalendarEvent } from 'angular-calendar';\nimport { addDays, addHours, startOfDay } from 'date-fns';\nimport { colors } from '../demo-utils/colors';\n\n@Component({\n  selector: 'mwl-demo-component',\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  templateUrl: 'template.html'\n})\nexport class DemoComponent {\n  viewDate: Date = new Date();\n\n  events: CalendarEvent[] = [\n    {\n      start: addHours(startOfDay(new Date()), 5),\n      end: addHours(startOfDay(new Date()), 17),\n      title: 'Event 1',\n      color: colors.red,\n      allDay: true\n    },\n    {\n      start: addHours(startOfDay(addDays(new Date(), 1)), 2),\n      end: addHours(startOfDay(addDays(new Date(), 1)), 18),\n      title: 'Event 2',\n      color: colors.blue,\n      allDay: true\n    },\n    {\n      start: addHours(startOfDay(new Date()), 8),\n      title: 'Event 3',\n      color: colors.blue,\n      allDay: true\n    }\n  ];\n}\n"},C5CQ:function(n,s){n.exports='<mwl-calendar-week-view\n  precision="minutes"\n  [viewDate]="viewDate"\n  [events]="events">\n</mwl-calendar-week-view>'},EOii:function(n,s){n.exports='<span class="hljs-keyword">import</span> { NgModule } from <span class="hljs-string">\'@angular/core\'</span>;\n<span class="hljs-keyword">import</span> { CommonModule } from <span class="hljs-string">\'@angular/common\'</span>;\n<span class="hljs-keyword">import</span> { RouterModule } from <span class="hljs-string">\'@angular/router\'</span>;\n<span class="hljs-keyword">import</span> { CalendarModule, DateAdapter } from <span class="hljs-string">\'angular-calendar\'</span>;\n<span class="hljs-keyword">import</span> { DemoUtilsModule } from <span class="hljs-string">\'../demo-utils/module\'</span>;\n<span class="hljs-keyword">import</span> { DemoComponent } from <span class="hljs-string">\'./component\'</span>;\n<span class="hljs-keyword">import</span> { adapterFactory } from <span class="hljs-string">\'angular-calendar/date-adapters/date-fns\'</span>;\n\n@NgModule({\n  imports: [\n    CommonModule,\n    CalendarModule.forRoot({\n      provide: DateAdapter,\n      useFactory: adapterFactory\n    }),\n    DemoUtilsModule,\n    RouterModule.forChild([{ path: <span class="hljs-string">\'\'</span>, component: DemoComponent }])\n  ],\n  declarations: [DemoComponent],\n  exports: [DemoComponent]\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> DemoModule {}\n'},KVap:function(n,s,a){"use strict";a.r(s),a.d(s,"sources",function(){return e});var e=[{filename:"component.ts",contents:{raw:a("9h5u"),highlighted:a("nuFG")}},{filename:"template.html",contents:{raw:a("C5CQ"),highlighted:a("Q4Th")}},{filename:"module.ts",contents:{raw:a("aKFZ"),highlighted:a("EOii")}}]},Q4Th:function(n,s){n.exports='<span class="hljs-tag">&lt;<span class="hljs-title">mwl-calendar-week-view</span>\n  <span class="hljs-attribute">precision</span>=<span class="hljs-value">"minutes"</span>\n  [<span class="hljs-attribute">viewDate</span>]=<span class="hljs-value">"viewDate"</span>\n  [<span class="hljs-attribute">events</span>]=<span class="hljs-value">"events"</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-title">mwl-calendar-week-view</span>&gt;</span>'},aKFZ:function(n,s){n.exports="import { NgModule } from '@angular/core';\nimport { CommonModule } from '@angular/common';\nimport { RouterModule } from '@angular/router';\nimport { CalendarModule, DateAdapter } from 'angular-calendar';\nimport { DemoUtilsModule } from '../demo-utils/module';\nimport { DemoComponent } from './component';\nimport { adapterFactory } from 'angular-calendar/date-adapters/date-fns';\n\n@NgModule({\n  imports: [\n    CommonModule,\n    CalendarModule.forRoot({\n      provide: DateAdapter,\n      useFactory: adapterFactory\n    }),\n    DemoUtilsModule,\n    RouterModule.forChild([{ path: '', component: DemoComponent }])\n  ],\n  declarations: [DemoComponent],\n  exports: [DemoComponent]\n})\nexport class DemoModule {}\n"},nuFG:function(n,s){n.exports='<span class="hljs-keyword">import</span> { Component, ChangeDetectionStrategy } from <span class="hljs-string">\'@angular/core\'</span>;\n<span class="hljs-keyword">import</span> { CalendarEvent } from <span class="hljs-string">\'angular-calendar\'</span>;\n<span class="hljs-keyword">import</span> { addDays, addHours, startOfDay } from <span class="hljs-string">\'date-fns\'</span>;\n<span class="hljs-keyword">import</span> { colors } from <span class="hljs-string">\'../demo-utils/colors\'</span>;\n\n@Component({\n  selector: <span class="hljs-string">\'mwl-demo-component\'</span>,\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  templateUrl: <span class="hljs-string">\'template.html\'</span>\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> DemoComponent {\n  viewDate: <span class="hljs-built_in">Date</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();\n\n  events: CalendarEvent[] = [\n    {\n      start: addHours(startOfDay(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()), <span class="hljs-number">5</span>),\n      end: addHours(startOfDay(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()), <span class="hljs-number">17</span>),\n      title: <span class="hljs-string">\'Event 1\'</span>,\n      color: colors.red,\n      allDay: <span class="hljs-literal">true</span>\n    },\n    {\n      start: addHours(startOfDay(addDays(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(), <span class="hljs-number">1</span>)), <span class="hljs-number">2</span>),\n      end: addHours(startOfDay(addDays(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(), <span class="hljs-number">1</span>)), <span class="hljs-number">18</span>),\n      title: <span class="hljs-string">\'Event 2\'</span>,\n      color: colors.blue,\n      allDay: <span class="hljs-literal">true</span>\n    },\n    {\n      start: addHours(startOfDay(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()), <span class="hljs-number">8</span>),\n      title: <span class="hljs-string">\'Event 3\'</span>,\n      color: colors.blue,\n      allDay: <span class="hljs-literal">true</span>\n    }\n  ];\n}\n'}}]);