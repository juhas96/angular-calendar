import {
  inject,
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
} from '@angular/core/testing';
import moment from 'moment';
import { expect } from 'chai';
import * as sinon from 'sinon';
import {
  CalendarEventTitleFormatter,
  CalendarEvent,
  CalendarMomentDateFormatter,
  CalendarDateFormatter,
  CalendarModule,
  MOMENT,
  CalendarResourceDayViewComponent,
  DateAdapter,
} from 'angular-calendar';
import { Subject } from 'rxjs';
import { triggerDomEvent, ExternalEventComponent } from '../../../test/util';
import { take } from 'rxjs/operators';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

describe('CalendarResourceDayViewComponent component', () => {
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
      declarations: [ExternalEventComponent],
      providers: [{ provide: MOMENT, useValue: moment }],
    });
  });

  let eventTitle: CalendarEventTitleFormatter;
  beforeEach(inject([CalendarEventTitleFormatter], (_eventTitle_) => {
    eventTitle = _eventTitle_;
  }));

  it('should generate the week view with one day visible', () => {
    const fixture: ComponentFixture<CalendarResourceDayViewComponent> =
      TestBed.createComponent(CalendarResourceDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-06-29'),
        title: 'foo',
        color: {
          primary: '',
          secondary: '',
        },
      },
    ];
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelectorAll('.cal-day-column').length
    ).to.equal(1);
  });

  it('should generate the day view with default colors for events', () => {
    const fixture: ComponentFixture<CalendarResourceDayViewComponent> =
      TestBed.createComponent(CalendarResourceDayViewComponent);

    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo',
      },
    ];

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

  it('should call the event clicked callback', () => {
    const fixture: ComponentFixture<CalendarResourceDayViewComponent> =
      TestBed.createComponent(CalendarResourceDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-06-29'),
        title: 'foo',
        color: {
          primary: '',
          secondary: '',
        },
      },
    ];

    fixture.detectChanges();
    const spy = sinon.spy();
    fixture.componentInstance.eventClicked.subscribe(spy);
    fixture.nativeElement.querySelector('.cal-event-title').click();
    const call = spy.getCall(0).args[0];
    expect(call.event).to.equal(fixture.componentInstance.events[0]);
    expect(call.sourceEvent).to.be.an.instanceOf(MouseEvent);
  });

  it('should call the event clicked callback on all day events', () => {
    const fixture: ComponentFixture<CalendarResourceDayViewComponent> =
      TestBed.createComponent(CalendarResourceDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-06-29'),
        title: 'foo',
        allDay: true,
        color: {
          primary: '',
          secondary: '',
        },
      },
    ];

    fixture.detectChanges();
    const spy = sinon.spy();
    fixture.componentInstance.eventClicked.subscribe(spy);
    fixture.nativeElement.querySelector('.cal-event-title').click();
    const call = spy.getCall(0).args[0];
    expect(call.event).to.equal(fixture.componentInstance.events[0]);
    expect(call.sourceEvent).to.be.an.instanceOf(MouseEvent);
  });

  it('should add a custom CSS class to events', () => {
    const fixture: ComponentFixture<CalendarResourceDayViewComponent> =
      TestBed.createComponent(CalendarResourceDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-06-01'),
        cssClass: 'foo',
        title: 'foo',
        color: {
          primary: 'blue',
          secondary: '',
        },
      },
    ];

    fixture.detectChanges();
    expect(
      fixture.nativeElement
        .querySelector('.cal-event-container')
        .classList.contains('foo')
    ).to.equal(true);
    fixture.destroy();
  });

  it('should add a custom CSS class to all day events', () => {
    const fixture: ComponentFixture<CalendarResourceDayViewComponent> =
      TestBed.createComponent(CalendarResourceDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-06-01'),
        cssClass: 'foo',
        title: 'foo',
        color: {
          primary: 'blue',
          secondary: '',
        },
        allDay: true,
      },
    ];

    fixture.detectChanges();
    expect(
      fixture.nativeElement
        .querySelector('.cal-all-day-events .cal-event-container')
        .classList.contains('foo')
    ).to.equal(true);
    fixture.destroy();
  });

  it('should call the hour segment clicked callback', () => {
    const fixture: ComponentFixture<CalendarResourceDayViewComponent> =
      TestBed.createComponent(CalendarResourceDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-01');

    fixture.detectChanges();
    const spy = sinon.spy();
    fixture.componentInstance.hourSegmentClicked.subscribe(spy);
    fixture.nativeElement.querySelectorAll('.cal-row-segment')[3].click();
    const args = spy.getCall(0).args[0];
    expect(args.date).to.deep.equal(
      moment('2016-06-01')
        .startOf('day')
        .add(1, 'hour')
        .add(30, 'minutes')
        .toDate()
    );
    expect(args.sourceEvent instanceof MouseEvent).to.be.true;
  });

  it('should allow the event title to be customised by the calendarConfig provider', () => {
    const fixture: ComponentFixture<CalendarResourceDayViewComponent> =
      TestBed.createComponent(CalendarResourceDayViewComponent);
    eventTitle.day = (event: CalendarEvent) => {
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

    fixture.detectChanges();
    const title: HTMLElement =
      fixture.nativeElement.querySelector('.cal-event-title');
    expect(title.innerHTML).to.equal('foo bar');
  });

  it('should add event actions to each event', () => {
    const fixture: ComponentFixture<CalendarResourceDayViewComponent> =
      TestBed.createComponent(CalendarResourceDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    const eventClicked = sinon.spy();
    fixture.componentInstance.eventClicked.subscribe(eventClicked);
    fixture.componentInstance.events = [
      {
        start: new Date('2016-06-26'),
        end: new Date('2016-06-28'),
        title: 'foo',
        color: {
          primary: 'blue',
          secondary: 'rgb(238, 238, 238)',
        },
        actions: [
          {
            label: '<i class="fa fa-fw fa-times"></i>',
            onClick: sinon.spy(),
            cssClass: 'foo',
          },
        ],
      },
    ];

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

  it('should show a tooltip on mouseover of the event', fakeAsync(() => {
    const fixture: ComponentFixture<CalendarResourceDayViewComponent> =
      TestBed.createComponent(CalendarResourceDayViewComponent);
    eventTitle.dayTooltip = (e: CalendarEvent) => {
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
    expect(tooltip.classList.contains('cal-tooltip-left-top')).to.equal(true);
    expect(!!tooltip.style.top).to.equal(true);
    expect(!!tooltip.style.left).to.equal(true);
    triggerDomEvent('mouseleave', event);
    fixture.detectChanges();
    expect(!!document.body.querySelector('.cal-tooltip')).to.equal(false);
    fixture.destroy();
  }));

  it('should disable the tooltip', fakeAsync(() => {
    const fixture: ComponentFixture<CalendarResourceDayViewComponent> =
      TestBed.createComponent(CalendarResourceDayViewComponent);
    eventTitle.dayTooltip = () => '';
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

    fixture.detectChanges();
    const event: HTMLElement =
      fixture.nativeElement.querySelector('.cal-event');
    triggerDomEvent('mouseenter', event);
    fixture.detectChanges();
    flush();
    expect(!!document.body.querySelector('.cal-tooltip')).to.equal(false);
    fixture.destroy();
  }));

  it('should log on invalid events', () => {
    const stub = sinon.stub(console, 'warn');
    const fixture: ComponentFixture<CalendarResourceDayViewComponent> =
      TestBed.createComponent(CalendarResourceDayViewComponent);
    fixture.componentInstance.events = [
      { start: 1234, title: '', color: { primary: '', secondary: '' } },
    ] as any;
    fixture.componentInstance.viewDate = new Date('2017-01-01');
    fixture.detectChanges();
    stub.restore();
    expect(stub).to.have.been.calledOnce; // eslint-disable-line
  });

  it('should allow the hour segment height to be customised', () => {
    const fixture: ComponentFixture<CalendarResourceDayViewComponent> =
      TestBed.createComponent(CalendarResourceDayViewComponent);
    fixture.componentInstance.hourSegmentHeight = 45;
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector(
        'mwl-calendar-resource-week-view-row-segment'
      ).style.height
    ).to.equal('45px');
    expect(
      fixture.nativeElement.querySelector('.cal-row-segment').style.height
    ).to.equal('45px');
  });

  it('should only call the beforeViewRender output once when refreshing the view', () => {
    const fixture: ComponentFixture<CalendarResourceDayViewComponent> =
      TestBed.createComponent(CalendarResourceDayViewComponent);
    fixture.componentInstance.refresh = new Subject();
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.detectChanges();
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
    const fixture: ComponentFixture<CalendarResourceDayViewComponent> =
      TestBed.createComponent(CalendarResourceDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.detectChanges();
    const beforeViewRenderCalled = sinon.spy();
    // use subscription to test that it was only called a max of one times
    const subscription = fixture.componentInstance.beforeViewRender.subscribe(
      beforeViewRenderCalled
    );
    fixture.componentInstance.viewDate = new Date('2016-06-28');
    fixture.detectChanges();
    expect(beforeViewRenderCalled).to.have.been.calledOnce;
    subscription.unsubscribe();
    fixture.destroy();
  });

  it('should expose the view period on the beforeViewRender output', () => {
    const fixture: ComponentFixture<CalendarResourceDayViewComponent> =
      TestBed.createComponent(CalendarResourceDayViewComponent);
    const beforeViewRenderCalled = sinon.spy();
    fixture.componentInstance.beforeViewRender
      .pipe(take(1))
      .subscribe(beforeViewRenderCalled);

    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.detectChanges();

    const { period } = beforeViewRenderCalled.getCall(0).args[0];
    expect(period.start).to.be.an.instanceOf(Date);
    expect(period.end).to.be.an.instanceOf(Date);
    expect(Array.isArray(period.events)).to.equal(true);
    fixture.destroy();
  });

  it('should expose the events on the beforeViewRender output', () => {
    const fixture: ComponentFixture<CalendarResourceDayViewComponent> =
      TestBed.createComponent(CalendarResourceDayViewComponent);
    const beforeViewRenderCalled = sinon.spy();
    fixture.componentInstance.beforeViewRender
      .pipe(take(1))
      .subscribe(beforeViewRenderCalled);

    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo',
      },
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'bar',
        allDay: true,
      },
      {
        start: new Date('2017-05-30'),
        end: new Date('2017-06-02'),
        title: 'bar',
        allDay: true,
      },
    ];
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.detectChanges();

    const {
      period: { events },
    } = beforeViewRenderCalled.getCall(0).args[0];
    expect(events).to.deep.equal([
      fixture.componentInstance.events[0],
      fixture.componentInstance.events[1],
    ]);
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
    const fixture: ComponentFixture<CalendarResourceDayViewComponent> =
      TestBed.createComponent(CalendarResourceDayViewComponent);

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
});
