import { Component, Input, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { VisitsActions, getPatientTakenVisitsSelector, getTakenVisitsAssignedToDoctorSelector } from '../../store';
import { Observable } from 'rxjs';
import { VisitCalendarEvent } from 'src/app/models/visits/visit-calendar-event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visits-calendar',
  templateUrl: './visits-calendar.component.html',
  styleUrls: ['./visits-calendar.component.scss']
})
export class VisitsCalendarComponent implements OnInit {
    
    visitsCalendarEvents$!: Observable<VisitCalendarEvent[]>
    @Input() isPatient: boolean = true;
    
    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        eventClick: this.handleDateClick.bind(this),
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

    constructor(private store: Store<AppState>, private router: Router) { 
        
    }

    ngOnInit(): void {
        this.selectTakenVisits();
        this.dispatchVisits();
    }

    dispatchVisits(): void {
        if(this.isPatient) {
            this.store.dispatch(VisitsActions.getPatienTakenVisits());
        } else {
            this.store.dispatch(VisitsActions.getTakenVisitsAssignedToDoctor());
        }
    }

    selectTakenVisits(): void {
        this.visitsCalendarEvents$ = this.isPatient ? this.store.select(getPatientTakenVisitsSelector) : this.store.select(getTakenVisitsAssignedToDoctorSelector);
    }

    handleDateClick(arg: any) {
        
        if(this.isPatient){

        } else {
            this.router.navigateByUrl('dashboard/visits/' + arg.event._def.publicId)
        }
    }
}
