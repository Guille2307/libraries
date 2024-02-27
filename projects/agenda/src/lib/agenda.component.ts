import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AgendaService } from './service/agenda.service';

@Component({
  selector: 'whub-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgendaComponent implements OnInit, AfterViewChecked {

  @Input() selectedEvent?;
  @Input() sideSearchbar: MatSidenav;
  @Input() editAgenda = false;
  @Input() translations?;
  @Input() selectedMonth = 'all';
  @Input() query: any = '';

  currentTab?= null;

  daysTabs: any = [];
  schedule?= [];
  dayStarts?;
  dayEnds?;
  months = [];


  headerDay?;

  @Output() newEvent = new EventEmitter<any>();
  @Output() openMonthsPopover = new EventEmitter<any>();
  @Output() actionCard = new EventEmitter<any>();

  constructor(
    private cd: ChangeDetectorRef,
    private agendaSvc: AgendaService
  ) { }

  ngOnInit(): void {
    this.getEventInfo();
    if (this.translations) {
      this.agendaSvc.translations = this.translations;
    }
  }

  ngAfterViewChecked(): void {
    const tabs = document.getElementsByClassName('segment-button') as any;
    const tabSelected = document.getElementById(this.currentTab);
    if (tabSelected !== null) {
      if (tabs) {
        for (let tab of tabs) {
          tab.classList.remove('segment-button-checked');
        }
      }
      tabSelected.classList.add('segment-button-checked');
    }
    this.cd.detectChanges();
  }

  segmentChanged(ev: any) {
    const value = ev.detail.value;
    this.currentTab = value;
  }

  async getEventInfo() {
    if (this.selectedEvent) {
      this.schedule = this.selectedEvent.schedule;
      this.dayStarts = this.selectedEvent.starts;
      this.dayEnds = this.selectedEvent.ends;
      this.getDays();
    }
  }

  getDays() {
    let startDate = new Date().getTime();
    let endDate = new Date().getTime();

    if (this.dayStarts !== undefined) {
      const tSD = this.dayStarts.split(/[- :]/);
      const dSD = new Date(tSD[0], tSD[1] - 1, tSD[2], tSD[3], tSD[4], tSD[5]);
      startDate = new Date(dSD).getTime();
    }

    if (this.dayEnds !== undefined) {
      const tED = this.dayEnds.split(/[- :]/);
      const dED = new Date(tED[0], tED[1] - 1, tED[2], tED[3], tED[4], tED[5]);
      endDate = new Date(dED).getTime();
    }

    if (new Date(startDate).getDate() === new Date(endDate).getDate() && new Date(startDate).getMonth() === new Date(endDate).getMonth()) {

      const dayTab = {
        year: new Date(startDate).getFullYear(),
        month: new Date(startDate).getMonth(),
        day: ('0' + new Date(startDate).getDate()).slice(-2),
        weekday: new Date(startDate).getDay(),
        fulldate: new Date(startDate)
      };

      this.daysTabs.push(dayTab);
      this.currentTab = this.daysTabs[0].fulldate;

      this.schedule.forEach(item => {
        let daySchedule = new Date().getTime();
        const tSD = item.starts.split(/[- :]/);
        const dSD = new Date(tSD[0], tSD[1] - 1, tSD[2], tSD[3], tSD[4], tSD[5]);
        daySchedule = new Date(dSD).getTime();
        const day = ('0' + new Date(daySchedule).getDate()).slice(-2);
        this.daysTabs.forEach(child => {
          if (child.day === day) {
            item.day = day;
          }
        });
      });

    } else {
      const MS_PER_DAY: number = 1000 * 60 * 60 * 24;
      const daysBetweenDates: number = Math.ceil((endDate - startDate) / MS_PER_DAY);
      const dates: Date[] = Array.from(new Array(daysBetweenDates + 1),
        (v, i) => new Date(startDate + (i * MS_PER_DAY)));

      const dayTabs = [];
      dates.forEach(date => {
        const dayTab = {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: ('0' + date.getDate()).slice(-2),
          weekday: date.getDay(),
          fulldate: date
        };
        dayTabs.push(dayTab);
      });

      this.daysTabs = dayTabs;
      let flag = true;
      this.daysTabs.forEach(day => {
        if (flag) {
          if ((day.fulldate).getFullYear() === new Date().getFullYear()) {
            if ((day.fulldate).getDate() === new Date().getDate() && (day.fulldate).getMonth() === new Date().getMonth()) {
              this.currentTab = day.fulldate;
              flag = false;
            } else {
              this.currentTab = this.daysTabs[0].fulldate;
            }
          } else {
            this.currentTab = this.daysTabs[0].fulldate;
          }
        }
      });

      this.schedule.forEach(item => {
        let daySchedule = new Date().getTime();
        const tSD = item.starts.split(/[- :]/);
        const dSD = new Date(tSD[0], tSD[1] - 1, tSD[2], tSD[3], tSD[4], tSD[5]);
        daySchedule = new Date(dSD).getTime();
        const day = ('0' + new Date(daySchedule).getDate()).slice(-2);
        dayTabs.forEach(dayTab => {
          if (dayTab.day === day) {
            item.day = day;
          }
        });
      });
    }

    this.schedule.forEach(item => {
      this.months.push(this.getDate(item.starts));
    });
    this.months = Array.from(new Set(this.months));
  }

  separate(record, recordIndex, records) {
    let iosDate = new Date().getTime();
    const tSD = record.starts.split(/[- :]/);
    const dSD = new Date(tSD[0], tSD[1] - 1, tSD[2], tSD[3], tSD[4], tSD[5]);
    iosDate = new Date(dSD).getTime();

    if (recordIndex === 0) {
      if (record.starts !== undefined) {
        return new Date(iosDate).getMonth();
      }
    }

    let firstPrev;
    if (records[recordIndex - 1] !== undefined) {
      let iosDate2 = new Date().getTime();
      const tSD2 = records[recordIndex - 1].starts.split(/[- :]/);
      const dSD2 = new Date(tSD2[0], tSD2[1] - 1, tSD2[2], tSD2[3], tSD2[4], tSD2[5]);
      iosDate2 = new Date(dSD2).getTime();
      firstPrev = new Date(iosDate2).getMonth();
    }
    const firstCurrent = new Date(iosDate).getMonth();

    if (firstPrev !== firstCurrent) {
      return firstCurrent;
    }

    return null;
  }

  getDate(date) {
    let iosDate = new Date().getTime();
    const tSD = date.split(/[- :]/);
    const dSD = new Date(tSD[0], tSD[1] - 1, tSD[2], tSD[3], tSD[4], tSD[5]);
    iosDate = new Date(dSD).getTime();
    return new Date(iosDate).getMonth();
  }

  conditionDay(date, day) {
    let iosDate = new Date().getTime();
    const tSD = date.split(/[- :]/);
    const dSD = new Date(tSD[0], tSD[1] - 1, tSD[2], tSD[3], tSD[4], tSD[5]);
    iosDate = new Date(dSD).getTime();
    if (new Date(iosDate).getDate() === new Date(day).getDate() && new Date(iosDate).getMonth() === new Date(day).getMonth()) {
      return true;
    }
    return false;
  }

  showHeader(starts, i) {
    const day = starts[5] + starts[6];
    if (day !== this.headerDay || i === 0) {
      this.headerDay = day;
      return true;
    }
    return false;
  }

  getHeader(item) {
    const date = item.starts;
    const day = date[5] + date[6];
    return parseInt(day) - 1;
  }

  receiveActionCard(ev) {
    this.actionCard.emit({
      action: ev.action,
      id: ev.id
    });
  }
}
