import {
  inject,
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
} from '@angular/core/testing';
import moment from 'moment';
import { expect } from 'chai';
import {
  CalendarEventTitleFormatter,
  CalendarEvent,
  CalendarMomentDateFormatter,
  CalendarDateFormatter,
  CalendarModule,
  MOMENT,
  DAYS_OF_WEEK,
  CalendarResourceWeekViewComponent,
  DateAdapter,
} from 'angular-calendar';
import { Subject } from 'rxjs';
import * as sinon from 'sinon';
import { triggerDomEvent, ExternalEventComponent } from '../../../test/util';
import { take } from 'rxjs/operators';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { Component } from '@angular/core';
import * as fakeTimers from '@sinonjs/fake-timers';

@Component({
  template: `
    <mwl-calendar-resource-week-view
      [viewDate]="viewDate"
      [events]="events"
      (eventTimesChanged)="eventTimesChanged($event)"
    ></mwl-calendar-resource-week-view>
    <mwl-external-event></mwl-external-event>
  `,
})
class TestComponent {
  viewDate: Date;
  events: CalendarEvent[];
  eventTimesChanged = sinon.spy();
}

describe('calendarWeekView component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CalendarModule.forRoot(
          {
            provide: DateAdapter,
            useFactory: adapterFactory,
          },
          {
            dateFormatter: {
              provide: CalendarDateFormatter,
              useClass: CalendarMomentDateFormatter,
            },
          }
        ),
      ],
      declarations: [ExternalEventComponent, TestComponent],
      providers: [{ provide: MOMENT, useValue: moment }],
    });
  });

  let eventTitle: CalendarEventTitleFormatter;
  beforeEach(inject([CalendarEventTitleFormatter], (_eventTitle_) => {
    eventTitle = _eventTitle_;
  }));

  it('should generate the week view', () => {
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    expect(fixture.componentInstance.days.length).to.equal(7);
    expect(fixture.componentInstance.days[0].date).to.deep.equal(
      moment('2016-06-26').toDate()
    );
  });

  it('should generate the week view without excluded days', () => {
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
    fixture.componentInstance.excludeDays = [0, 6];
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    expect(fixture.componentInstance.days.length).to.equal(5);
    fixture.destroy();
  });

  it('should update the week view when excluded days changed', () => {
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
    fixture.componentInstance.excludeDays = [0, 6];
    fixture.componentInstance.ngOnChanges({ excludeDays: {} });
    expect(fixture.componentInstance.days.length).to.equal(5);
    expect(fixture.nativeElement.querySelector('.cal-weekend')).to.equal(null);

    fixture.componentInstance.excludeDays = [1];
    fixture.componentInstance.ngOnChanges({ excludeDays: [] });
    fixture.detectChanges();
    expect(fixture.componentInstance.days.length).to.equal(6);
    expect(fixture.nativeElement.querySelector('.cal-weekend')).not.to.equal(
      null
    );

    fixture.destroy();
  });

  it('should support excluding non consecutive days', () => {
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
    fixture.componentInstance.excludeDays = [4, 6];
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    expect(fixture.componentInstance.days.length).to.equal(5);
    fixture.destroy();
  });

  it('should support excluding all but 1 day', () => {
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
    fixture.componentInstance.excludeDays = [0, 1, 2, 3, 4, 5];
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    expect(fixture.componentInstance.days.length).to.equal(1);
    fixture.destroy();
  });

  it('should generate the week view with default colors for events', () => {
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo',
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();

    const computedStyles: CSSStyleDeclaration = window.getComputedStyle(
      fixture.nativeElement.querySelector('.cal-event')
    );
    expect(computedStyles.getPropertyValue('background-color')).to.equal(
      'rgb(209, 232, 255)'
    );
    expect(computedStyles.getPropertyValue('border-color')).to.equal(
      'rgb(30, 144, 255)'
    );
    expect(computedStyles.getPropertyValue('color')).to.equal(
      'rgb(30, 144, 255)'
    );
    fixture.destroy();
  });

  it('should emit on the dayHeaderClicked output', (done) => {
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    fixture.detectChanges();
    fixture.componentInstance.dayHeaderClicked.subscribe((val) => {
      expect(val).to.deep.equal({
        day: fixture.componentInstance.days[0],
        sourceEvent: window['event'],
      });
      done();
    });
    fixture.nativeElement.querySelector('.cal-header').click();
  });

  it('should add a custom CSS class to events', () => {
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        cssClass: 'foo',
        title: 'foo',
        color: {
          primary: 'blue',
          secondary: '',
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    expect(
      fixture.nativeElement
        .querySelector('.cal-event-container')
        .classList.contains('foo')
    ).to.equal(true);
    fixture.destroy();
  });

  it('should call the event clicked callback', (done) => {
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: '<span>foo</span>',
        color: {
          primary: 'blue',
          secondary: '',
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const title: HTMLElement =
      fixture.nativeElement.querySelector('.cal-event-title');
    expect(title.innerHTML).to.equal('<span>foo</span>');
    fixture.componentInstance.eventClicked.subscribe((val) => {
      expect(val).to.deep.equal({
        event: fixture.componentInstance.events[0],
        sourceEvent: window['event'],
      });
      done();
    });
    title.click();
  });

  it('should refresh the view when the refresh observable is emitted on', () => {
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    fixture.componentInstance.refresh = new Subject();
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    const event: CalendarEvent = {
      start: new Date('2016-06-01'),
      end: new Date('2016-06-02'),
      title: 'foo',
      allDay: true,
    };
    fixture.componentInstance.events.push(event);
    fixture.componentInstance.refresh.next(true);
    expect(
      fixture.componentInstance.view.allDayEventRows[0].row[0].event
    ).to.deep.equal(event);
    fixture.destroy();
  });

  it('should allow the event title to be customised', () => {
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    eventTitle.week = (event: CalendarEvent) => {
      return `foo ${event.title}`;
    };
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'bar',
        color: {
          primary: 'blue',
          secondary: '',
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const title: HTMLElement =
      fixture.nativeElement.querySelector('.cal-event-title');
    expect(title.innerHTML).to.equal('foo bar');
  });

  it('should allow the locale to be changed', () => {
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    fixture.componentInstance.locale = 'de';
    fixture.componentInstance.viewDate = new Date();
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.cal-header b').innerHTML.trim()
    ).to.equal('Sonntag');
  });

  it('should show a tooltip on mouseover of the event', fakeAsync(() => {
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    eventTitle.weekTooltip = (e: CalendarEvent) => {
      return `title: ${e.title}`;
    };
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo <b>bar</b>',
        color: {
          primary: 'blue',
          secondary: '',
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const event: HTMLElement =
      fixture.nativeElement.querySelector('.cal-event');
    triggerDomEvent('mouseenter', event);
    fixture.detectChanges();
    flush();
    const tooltip: HTMLElement = document.body.querySelector(
      '.cal-tooltip'
    ) as HTMLElement;
    expect(tooltip.querySelector('.cal-tooltip-inner').innerHTML).to.equal(
      'title: foo <b>bar</b>'
    );
    expect(tooltip.classList.contains('cal-tooltip-top')).to.equal(true);
    expect(!!tooltip.style.top).to.equal(true);
    expect(!!tooltip.style.left).to.equal(true);
    triggerDomEvent('mouseleave', event);
    fixture.detectChanges();
    expect(!!document.body.querySelector('.cal-tooltip')).to.equal(false);
    fixture.destroy();
  }));

  it('should disable the tooltip', fakeAsync(() => {
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    eventTitle.weekTooltip = () => '';
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo <b>bar</b>',
        color: {
          primary: 'blue',
          secondary: '',
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const event: HTMLElement =
      fixture.nativeElement.querySelector('.cal-event');
    triggerDomEvent('mouseenter', event);
    fixture.detectChanges();
    flush();
    expect(!!document.body.querySelector('.cal-tooltip')).to.equal(false);
    fixture.destroy();
  }));

  it('should allow the start of the week to be changed', () => {
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.weekStartsOn = 1;
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.cal-day-headers b').innerText
    ).to.deep.equal('Monday');
    fixture.destroy();
  });

  it('should allow the weekend days to be customised', () => {
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2017-06-25');
    fixture.componentInstance.weekendDays = [
      DAYS_OF_WEEK.FRIDAY,
      DAYS_OF_WEEK.SATURDAY,
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, weekendDays: {} });
    fixture.detectChanges();
    const headerCells: HTMLElement[] =
      fixture.nativeElement.querySelectorAll('.cal-header');
    expect(headerCells[0].classList.contains('cal-weekend')).to.equal(false);
    expect(headerCells[5].classList.contains('cal-weekend')).to.equal(true);
    expect(headerCells[6].classList.contains('cal-weekend')).to.equal(true);
    fixture.destroy();
  });

  it('should add a custom CSS class to headers via the beforeViewRender output', () => {
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.beforeViewRender
      .pipe(take(1))
      .subscribe(({ header }) => {
        header[0].cssClass = 'foo';
      });
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    expect(
      fixture.nativeElement
        .querySelector('.cal-header')
        .classList.contains('foo')
    ).to.equal(true);
    fixture.destroy();
  });

  it('should log on invalid events', () => {
    const stub = sinon.stub(console, 'warn');
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    fixture.componentInstance.events = [
      { start: 1234, title: '', color: { primary: '', secondary: '' } },
    ] as any;
    fixture.componentInstance.viewDate = new Date('2017-01-01');
    fixture.componentInstance.ngOnChanges({ events: {}, viewDate: {} });
    fixture.detectChanges();
    stub.restore();
    expect(stub).to.have.been.calledOnce; // eslint-disable-line
  });

  it('should only call the beforeViewRender output once when refreshing the view', () => {
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    fixture.componentInstance.refresh = new Subject();
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    const beforeViewRenderCalled = sinon.spy();
    // use subscription to test that it was only called a max of one times
    const subscription = fixture.componentInstance.beforeViewRender.subscribe(
      beforeViewRenderCalled
    );
    fixture.componentInstance.refresh.next(true);
    expect(beforeViewRenderCalled).to.have.been.calledOnce;
    subscription.unsubscribe();
    fixture.destroy();
  });

  it('should only call the beforeViewRender output once when changing the view date', () => {
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    const beforeViewRenderCalled = sinon.spy();
    // use subscription to test that it was only called a max of one times
    const subscription = fixture.componentInstance.beforeViewRender.subscribe(
      beforeViewRenderCalled
    );
    fixture.componentInstance.viewDate = new Date('2016-06-28');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    expect(beforeViewRenderCalled).to.have.been.calledOnce;
    subscription.unsubscribe();
    fixture.destroy();
  });

  it('should expose the view period on the beforeViewRender output', () => {
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    const beforeViewRenderCalled = sinon.spy();
    fixture.componentInstance.beforeViewRender
      .pipe(take(1))
      .subscribe(beforeViewRenderCalled);
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    const data = beforeViewRenderCalled.getCall(0).args[0];
    expect(data.period.start).to.be.an.instanceOf(Date);
    expect(data.period.end).to.be.an.instanceOf(Date);
    expect(Array.isArray(data.period.events)).to.equal(true);
    expect(Array.isArray(data.allDayEventRows)).to.be.true;
    expect(Array.isArray(data.hourColumns)).to.be.true;
  });

  it('should add event actions to each event', () => {
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    const eventClicked = sinon.spy();
    fixture.componentInstance.eventClicked.subscribe(eventClicked);
    fixture.componentInstance.events = [
      {
        start: new Date('2016-06-26'),
        end: new Date('2016-06-28'),
        title: 'foo',
        actions: [
          {
            label: '<i class="fa fa-fw fa-times"></i>',
            onClick: sinon.spy(),
            cssClass: 'foo',
          },
        ],
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const action: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event .cal-event-action'
    );
    expect(action.innerHTML).to.equal('<i class="fa fa-fw fa-times"></i>');
    expect(action.classList.contains('foo')).to.equal(true);
    action.querySelector('i').click();
    const actionSpy = fixture.componentInstance.events[0].actions[0]
      .onClick as sinon.SinonSpy;
    expect(actionSpy.getCall(0).args[0].event).to.equal(
      fixture.componentInstance.events[0]
    );
    expect(actionSpy.getCall(0).args[0].sourceEvent instanceof MouseEvent).to.be
      .true;
    expect(eventClicked).not.to.have.been.called;
  });

  it('should make a 4 day week', () => {
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2018-07-29');
    fixture.componentInstance.daysInWeek = 4;
    fixture.componentInstance.events = [
      {
        start: new Date('2018-07-29'),
        title: 'foo',
        allDay: true,
      },
    ];
    fixture.componentInstance.ngOnChanges({
      daysInWeek: {},
      events: {},
      viewDate: {},
    });
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelectorAll('.cal-header').length
    ).to.equal(4);
    expect(
      fixture.nativeElement.querySelectorAll(
        '.cal-all-day-events .cal-day-column'
      ).length
    ).to.equal(4);
    expect(
      fixture.nativeElement.querySelectorAll('.cal-time-events .cal-day-column')
        .length
    ).to.equal(4);
  });

  it('should allow css variables for colors', () => {
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerText = `
    :root {
        --white: #fff;
        --black: #000;
      }
    `;
    document.head.appendChild(style);
    const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
      TestBed.createComponent(CalendarResourceWeekViewComponent);
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo',
        color: {
          primary: 'var(--white)',
          secondary: 'var(--black)',
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();

    const computedStyles: CSSStyleDeclaration = window.getComputedStyle(
      fixture.nativeElement.querySelector('.cal-event')
    );
    expect(computedStyles.getPropertyValue('background-color')).to.equal(
      'rgb(0, 0, 0)'
    );
    expect(computedStyles.getPropertyValue('border-color')).to.equal(
      'rgb(255, 255, 255)'
    );
    document.head.appendChild(style);
  });

  it('should set a minimum event height', () => {
    const fixture = TestBed.createComponent(CalendarResourceWeekViewComponent);
    fixture.componentInstance.viewDate = moment().startOf('week').toDate();
    fixture.componentInstance.events = [
      {
        start: moment().startOf('week').toDate(),
        end: moment().startOf('week').add(5, 'minutes').toDate(),
        title: 'foo',
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.cal-event-container').offsetHeight
    ).to.equal(30);
    fixture.destroy();
  });

  describe('current time marker', () => {
    let clock: any;
    beforeEach(() => {
      clock = fakeTimers.install({
        now: new Date('2019-09-30T11:30:25.288Z').getTime(),
        toFake: ['Date'],
      });
    });

    afterEach(() => {
      clock.uninstall();
    });

    it('should show a current time marker', () => {
      const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
        TestBed.createComponent(CalendarResourceWeekViewComponent);
      fixture.componentInstance.viewDate = new Date();
      fixture.componentInstance.ngOnChanges({
        viewDate: {},
        hourSegmentHeight: {},
      });
      fixture.detectChanges();
      const marker = fixture.nativeElement.querySelector(
        '.cal-day-columns .cal-day-column:nth-child(2) .cal-current-time-marker'
      );
      expect(marker.style.top).to.equal('690px');
    });

    it('should respect the start time', () => {
      const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
        TestBed.createComponent(CalendarResourceWeekViewComponent);
      fixture.componentInstance.viewDate = new Date();
      fixture.componentInstance.dayStartHour = 3;
      fixture.componentInstance.dayStartMinute = 30;
      fixture.componentInstance.ngOnChanges({
        viewDate: {},
        hourSegmentHeight: {},
      });
      fixture.detectChanges();
      const marker = fixture.nativeElement.querySelector(
        '.cal-day-columns .cal-day-column:nth-child(2) .cal-current-time-marker'
      );
      expect(marker.style.top).to.equal('480px');
    });

    it('should respect the end time', () => {
      const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
        TestBed.createComponent(CalendarResourceWeekViewComponent);
      fixture.componentInstance.viewDate = new Date();
      fixture.componentInstance.dayEndHour = 3;
      fixture.componentInstance.ngOnChanges({
        viewDate: {},
        hourSegmentHeight: {},
      });
      fixture.detectChanges();
      const marker = fixture.nativeElement.querySelector(
        '.cal-day-columns .cal-day-column:nth-child(2) .cal-current-time-marker'
      );
      expect(marker).to.equal(null);
    });

    it('should respect the hour segment count and height', () => {
      const fixture: ComponentFixture<CalendarResourceWeekViewComponent> =
        TestBed.createComponent(CalendarResourceWeekViewComponent);
      fixture.componentInstance.viewDate = new Date();
      fixture.componentInstance.hourSegments = 4;
      fixture.componentInstance.hourSegmentHeight = 60;
      fixture.componentInstance.ngOnChanges({
        viewDate: {},
        hourSegmentHeight: {},
      });
      fixture.detectChanges();
      const marker = fixture.nativeElement.querySelector(
        '.cal-day-columns .cal-day-column:nth-child(2) .cal-current-time-marker'
      );
      expect(marker.style.top).to.equal('2760px');
    });
  });
});
