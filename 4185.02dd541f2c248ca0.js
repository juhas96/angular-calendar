"use strict";(self.webpackChunkdemos=self.webpackChunkdemos||[]).push([[4185],{64185:(l,n,s)=>{s.r(n),s.d(n,{sources:()=>a});const a=[{filename:"component.ts",contents:{raw:s(22381),highlighted:s(54128)}},{filename:"template.html",contents:{raw:s(52458),highlighted:s(34468)}},{filename:"module.ts",contents:{raw:s(58089),highlighted:s(90706)}}]},54128:(l,n,s)=>{s.r(n),s.d(n,{default:()=>a});const a='<span class="hljs-keyword">import</span> { Component, ChangeDetectionStrategy } from <span class="hljs-string">\'@angular/core\'</span>;\n<span class="hljs-keyword">import</span> { CalendarEvent } from <span class="hljs-string">\'angular-calendar\'</span>;\n<span class="hljs-keyword">import</span> { addDays, addHours, startOfDay } from <span class="hljs-string">\'date-fns\'</span>;\n<span class="hljs-keyword">import</span> { colors } from <span class="hljs-string">\'../demo-utils/colors\'</span>;\n\n@Component({\n  selector: <span class="hljs-string">\'mwl-demo-component\'</span>,\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  templateUrl: <span class="hljs-string">\'template.html\'</span>,\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> DemoComponent {\n  viewDate: <span class="hljs-built_in">Date</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();\n\n  events: CalendarEvent[] = [\n    {\n      start: addHours(startOfDay(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()), <span class="hljs-number">5</span>),\n      end: addHours(startOfDay(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()), <span class="hljs-number">17</span>),\n      title: <span class="hljs-string">\'Event 1\'</span>,\n      color: colors.red,\n      allDay: <span class="hljs-literal">true</span>,\n    },\n    {\n      start: addHours(startOfDay(addDays(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(), <span class="hljs-number">1</span>)), <span class="hljs-number">2</span>),\n      end: addHours(startOfDay(addDays(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(), <span class="hljs-number">1</span>)), <span class="hljs-number">18</span>),\n      title: <span class="hljs-string">\'Event 2\'</span>,\n      color: colors.blue,\n      allDay: <span class="hljs-literal">true</span>,\n    },\n    {\n      start: addHours(startOfDay(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()), <span class="hljs-number">8</span>),\n      title: <span class="hljs-string">\'Event 3\'</span>,\n      color: colors.blue,\n      allDay: <span class="hljs-literal">true</span>,\n    },\n  ];\n}\n'},90706:(l,n,s)=>{s.r(n),s.d(n,{default:()=>a});const a='<span class="hljs-keyword">import</span> { NgModule } from <span class="hljs-string">\'@angular/core\'</span>;\n<span class="hljs-keyword">import</span> { CommonModule } from <span class="hljs-string">\'@angular/common\'</span>;\n<span class="hljs-keyword">import</span> { RouterModule } from <span class="hljs-string">\'@angular/router\'</span>;\n<span class="hljs-keyword">import</span> { CalendarModule, DateAdapter } from <span class="hljs-string">\'angular-calendar\'</span>;\n<span class="hljs-keyword">import</span> { DemoUtilsModule } from <span class="hljs-string">\'../demo-utils/module\'</span>;\n<span class="hljs-keyword">import</span> { DemoComponent } from <span class="hljs-string">\'./component\'</span>;\n<span class="hljs-keyword">import</span> { adapterFactory } from <span class="hljs-string">\'angular-calendar/date-adapters/date-fns\'</span>;\n\n@NgModule({\n  imports: [\n    CommonModule,\n    CalendarModule.forRoot({\n      provide: DateAdapter,\n      useFactory: adapterFactory,\n    }),\n    DemoUtilsModule,\n    RouterModule.forChild([{ path: <span class="hljs-string">\'\'</span>, component: DemoComponent }]),\n  ],\n  declarations: [DemoComponent],\n  exports: [DemoComponent],\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> DemoModule {}\n'},34468:(l,n,s)=>{s.r(n),s.d(n,{default:()=>a});const a='<span class="hljs-tag">&lt;<span class="hljs-title">mwl-calendar-week-view</span>\n  <span class="hljs-attribute">precision</span>=<span class="hljs-value">"minutes"</span>\n  [<span class="hljs-attribute">viewDate</span>]=<span class="hljs-value">"viewDate"</span>\n  [<span class="hljs-attribute">events</span>]=<span class="hljs-value">"events"</span>\n&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-title">mwl-calendar-week-view</span>&gt;</span>\n'},22381:(l,n,s)=>{s.r(n),s.d(n,{default:()=>a});const a="import { Component, ChangeDetectionStrategy } from '@angular/core';\nimport { CalendarEvent } from 'angular-calendar';\nimport { addDays, addHours, startOfDay } from 'date-fns';\nimport { colors } from '../demo-utils/colors';\n\n@Component({\n  selector: 'mwl-demo-component',\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  templateUrl: 'template.html',\n})\nexport class DemoComponent {\n  viewDate: Date = new Date();\n\n  events: CalendarEvent[] = [\n    {\n      start: addHours(startOfDay(new Date()), 5),\n      end: addHours(startOfDay(new Date()), 17),\n      title: 'Event 1',\n      color: colors.red,\n      allDay: true,\n    },\n    {\n      start: addHours(startOfDay(addDays(new Date(), 1)), 2),\n      end: addHours(startOfDay(addDays(new Date(), 1)), 18),\n      title: 'Event 2',\n      color: colors.blue,\n      allDay: true,\n    },\n    {\n      start: addHours(startOfDay(new Date()), 8),\n      title: 'Event 3',\n      color: colors.blue,\n      allDay: true,\n    },\n  ];\n}\n"},58089:(l,n,s)=>{s.r(n),s.d(n,{default:()=>a});const a="import { NgModule } from '@angular/core';\nimport { CommonModule } from '@angular/common';\nimport { RouterModule } from '@angular/router';\nimport { CalendarModule, DateAdapter } from 'angular-calendar';\nimport { DemoUtilsModule } from '../demo-utils/module';\nimport { DemoComponent } from './component';\nimport { adapterFactory } from 'angular-calendar/date-adapters/date-fns';\n\n@NgModule({\n  imports: [\n    CommonModule,\n    CalendarModule.forRoot({\n      provide: DateAdapter,\n      useFactory: adapterFactory,\n    }),\n    DemoUtilsModule,\n    RouterModule.forChild([{ path: '', component: DemoComponent }]),\n  ],\n  declarations: [DemoComponent],\n  exports: [DemoComponent],\n})\nexport class DemoModule {}\n"},52458:(l,n,s)=>{s.r(n),s.d(n,{default:()=>a});const a='<mwl-calendar-week-view\n  precision="minutes"\n  [viewDate]="viewDate"\n  [events]="events"\n>\n</mwl-calendar-week-view>\n'}}]);