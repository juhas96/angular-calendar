"use strict";(self.webpackChunkdemos=self.webpackChunkdemos||[]).push([[1172],{1172:(h,w,t)=>{t.r(w),t.d(w,{DemoModule:()=>s});var e=t(36895),c=t(49308),C=t(57820),u=t(90008),l=t(57671),D=t(4606),d=t(23999),n=t(94650);class v extends d.m{monthViewColumnHeader({date:o,locale:i}){return(0,e.p6)(o,"EEE",i)}monthViewTitle({date:o,locale:i}){return(0,e.p6)(o,"MMM y",i)}weekViewColumnHeader({date:o,locale:i}){return(0,e.p6)(o,"EEE",i)}dayViewHour({date:o,locale:i}){return(0,e.p6)(o,"HH:mm",i)}}v.\u0275fac=function(){let r;return function(i){return(r||(r=n.n5z(v)))(i||v)}}(),v.\u0275prov=n.Yz7({token:v,factory:v.\u0275fac});var a=t(62258),_=t(29498),m=t(50811),U=t(78767);function T(r,o){if(1&r&&(n.TgZ(0,"mwl-calendar-month-view",3),n._uU(1,"\n  "),n.qZA()),2&r){const i=n.oxw();n.Q6J("viewDate",i.viewDate)("events",i.events)}}function f(r,o){if(1&r&&(n.TgZ(0,"mwl-calendar-week-view",3),n._uU(1,"\n  "),n.qZA()),2&r){const i=n.oxw();n.Q6J("viewDate",i.viewDate)("events",i.events)}}function Z(r,o){if(1&r&&(n.TgZ(0,"mwl-calendar-day-view",3),n._uU(1,"\n  "),n.qZA()),2&r){const i=n.oxw();n.Q6J("viewDate",i.viewDate)("events",i.events)}}class p{constructor(){this.view=D.w.Month,this.viewDate=new Date,this.events=[]}}p.\u0275fac=function(o){return new(o||p)},p.\u0275cmp=n.Xpm({type:p,selectors:[["mwl-demo-component"]],features:[n._Bn([{provide:d.m,useClass:v}])],decls:12,vars:6,consts:[[3,"view","viewDate","viewChange","viewDateChange"],[3,"ngSwitch"],[3,"viewDate","events",4,"ngSwitchCase"],[3,"viewDate","events"]],template:function(o,i){1&o&&(n.TgZ(0,"mwl-demo-utils-calendar-header",0),n.NdJ("viewChange",function(g){return i.view=g})("viewDateChange",function(g){return i.viewDate=g}),n._uU(1,"\n"),n.qZA(),n._uU(2,"\n\n"),n.TgZ(3,"div",1),n._uU(4,"\n  "),n.YNc(5,T,2,2,"mwl-calendar-month-view",2),n._uU(6,"\n  "),n.YNc(7,f,2,2,"mwl-calendar-week-view",2),n._uU(8,"\n  "),n.YNc(9,Z,2,2,"mwl-calendar-day-view",2),n._uU(10,"\n"),n.qZA(),n._uU(11,"\n")),2&o&&(n.Q6J("view",i.view)("viewDate",i.viewDate),n.xp6(3),n.Q6J("ngSwitch",i.view),n.xp6(2),n.Q6J("ngSwitchCase","month"),n.xp6(2),n.Q6J("ngSwitchCase","week"),n.xp6(2),n.Q6J("ngSwitchCase","day"))},dependencies:[e.RF,e.n9,a.G,_.T,m.S,U.$],encapsulation:2,changeDetection:0});var E=t(75493);class s{}s.\u0275fac=function(o){return new(o||s)},s.\u0275mod=n.oAB({type:s}),s.\u0275inj=n.cJS({imports:[e.ez,C._8.forRoot({provide:u._,useFactory:E.x}),l.S,c.Bz.forChild([{path:"",component:p}])]})},78767:(h,w,t)=>{t.d(w,{$:()=>d});var e=t(94650),c=t(4606),C=t(31726),u=t(60897),l=t(22167),D=t(12153);class d{constructor(){this.locale="en",this.viewChange=new e.vpe,this.viewDateChange=new e.vpe,this.CalendarView=c.w}}d.\u0275fac=function(v){return new(v||d)},d.\u0275cmp=e.Xpm({type:d,selectors:[["mwl-demo-utils-calendar-header"]],inputs:{view:"view",viewDate:"viewDate",locale:"locale"},outputs:{viewChange:"viewChange",viewDateChange:"viewDateChange"},decls:43,vars:16,consts:[[1,"row","text-center"],[1,"col-md-4"],[1,"btn-group"],["mwlCalendarPreviousView","",1,"btn","btn-primary",3,"view","viewDate","viewDateChange"],["mwlCalendarToday","",1,"btn","btn-outline-secondary",3,"viewDate","viewDateChange"],["mwlCalendarNextView","",1,"btn","btn-primary",3,"view","viewDate","viewDateChange"],[1,"btn","btn-primary",3,"click"]],template:function(v,a){1&v&&(e._uU(0,"\n    "),e.TgZ(1,"div",0),e._uU(2,"\n      "),e.TgZ(3,"div",1),e._uU(4,"\n        "),e.TgZ(5,"div",2),e._uU(6,"\n          "),e.TgZ(7,"div",3),e.NdJ("viewDateChange",function(m){return a.viewDate=m})("viewDateChange",function(){return a.viewDateChange.next(a.viewDate)}),e._uU(8,"\n            Previous\n          "),e.qZA(),e._uU(9,"\n          "),e.TgZ(10,"div",4),e.NdJ("viewDateChange",function(m){return a.viewDate=m})("viewDateChange",function(){return a.viewDateChange.next(a.viewDate)}),e._uU(11,"\n            Today\n          "),e.qZA(),e._uU(12,"\n          "),e.TgZ(13,"div",5),e.NdJ("viewDateChange",function(m){return a.viewDate=m})("viewDateChange",function(){return a.viewDateChange.next(a.viewDate)}),e._uU(14,"\n            Next\n          "),e.qZA(),e._uU(15,"\n        "),e.qZA(),e._uU(16,"\n      "),e.qZA(),e._uU(17,"\n      "),e.TgZ(18,"div",1),e._uU(19,"\n        "),e.TgZ(20,"h3"),e._uU(21),e.ALo(22,"calendarDate"),e.qZA(),e._uU(23,"\n      "),e.qZA(),e._uU(24,"\n      "),e.TgZ(25,"div",1),e._uU(26,"\n        "),e.TgZ(27,"div",2),e._uU(28,"\n          "),e.TgZ(29,"div",6),e.NdJ("click",function(){return a.viewChange.emit(a.CalendarView.Month)}),e._uU(30,"\n            Month\n          "),e.qZA(),e._uU(31,"\n          "),e.TgZ(32,"div",6),e.NdJ("click",function(){return a.viewChange.emit(a.CalendarView.Week)}),e._uU(33,"\n            Week\n          "),e.qZA(),e._uU(34,"\n          "),e.TgZ(35,"div",6),e.NdJ("click",function(){return a.viewChange.emit(a.CalendarView.Day)}),e._uU(36,"\n            Day\n          "),e.qZA(),e._uU(37,"\n        "),e.qZA(),e._uU(38,"\n      "),e.qZA(),e._uU(39,"\n    "),e.qZA(),e._uU(40,"\n    "),e._UZ(41,"br"),e._uU(42,"\n  ")),2&v&&(e.xp6(7),e.Q6J("view",a.view)("viewDate",a.viewDate),e.xp6(3),e.Q6J("viewDate",a.viewDate),e.xp6(3),e.Q6J("view",a.view)("viewDate",a.viewDate),e.xp6(8),e.Oqu(e.Dn7(22,12,a.viewDate,a.view+"ViewTitle",a.locale)),e.xp6(8),e.ekj("active",a.view===a.CalendarView.Month),e.xp6(3),e.ekj("active",a.view===a.CalendarView.Week),e.xp6(3),e.ekj("active",a.view===a.CalendarView.Day))},dependencies:[C.O,u.T,l.i,D.J],encapsulation:2})},57671:(h,w,t)=>{t.d(w,{S:()=>l});var e=t(36895),c=t(90433),C=t(57820),u=t(94650);class l{}l.\u0275fac=function(d){return new(d||l)},l.\u0275mod=u.oAB({type:l}),l.\u0275inj=u.cJS({imports:[e.ez,c.u5,C._8]})}}]);