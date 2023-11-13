import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { VisitsActions, getPatientTakenVisitsSelector } from '../../store';
import { Observable } from 'rxjs';
import { Visit } from 'src/app/models/visits/visit.model';
import { VisitCalendarEvent } from 'src/app/models/visits/visit-calendar-event.model';

@Component({
  selector: 'app-visits-calendar',
  templateUrl: './visits-calendar.component.html',
  styleUrls: ['./visits-calendar.component.scss']
})
export class VisitsCalendarComponent implements OnInit {
    
    takenVisitsCalendarEvents$!: Observable<VisitCalendarEvent[]>
    
    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin, timeGridPlugin],
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay' 
        },
        eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false,
            hour12: false
        },
        height: "100%",
        firstDay: 1
    };

    constructor(private store: Store<AppState>) { 
        this.selectTakenVisits();
    }

    ngOnInit(): void {
        this.dispatchTakenVisits();
    }

    dispatchTakenVisits(): void {
        this.store.dispatch(VisitsActions.getPatienTakenVisits());
    }

    selectTakenVisits(): void {
        this.takenVisitsCalendarEvents$ = this.store.select(getPatientTakenVisitsSelector);
    }
}
