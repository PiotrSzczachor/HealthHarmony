import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VisitsPerDay } from '../models/visits/visits-per-day.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { VisitsPerDayRequest } from '../models/visits/visits-per-day-request.model';
import { WeeklyWorkSchedule } from '../models/visits/weekly-work-schedule.model';
import { NonNullAssert } from '@angular/compiler';
import { Visit } from '../models/visits/visit.model';
import { GetAvaliableVisitsForSpecificDayRequest } from '../models/visits/get-avaliable-visits-for-specific-day-request.model';
import { VisitCalendarEvent } from '../models/visits/visit-calendar-event.model';
import { BookVisitRequest } from '../models/visits/book-visit-request.model';

@Injectable({
  providedIn: 'root'
})
export class VisitsService {
    private prefix: string = environment.apiUrl + "visits/"

    constructor(private http: HttpClient) { }

    getNumberOfAvaliableVisitsPerDay(request: VisitsPerDayRequest): Observable<VisitsPerDay[]> {
        if(request.specializationId && (request.clinicId || request.isRemote)){
            let params = new HttpParams()
                .set('specializationId', request.specializationId)
                .set('addDays', request.addDays)
                .set('isRemote', request.isRemote)
            if (request.clinicId) {
                params = params.set('clinicId', request.clinicId);
            }
            return this.http.get<VisitsPerDay[]>(this.prefix + 'per-day', {params: params});
        }
        return of();
    }

    getAvaliableVisitsForSpecificDate(request: GetAvaliableVisitsForSpecificDayRequest, visitDate: Date): Observable<Visit[]> {
        if(request.specializationId && (request.clinicId || request.isRemote)){
            visitDate = new Date(visitDate);
            const formattedDate = visitDate.toISOString();
            let params = new HttpParams()
                .set('specializationId', request.specializationId)
                .set('visitDate', formattedDate)
                .set('isRemote', request.isRemote)
            if (request.clinicId) {
                params = params.set('clinicId', request.clinicId);
            }
            return this.http.get<Visit[]>(this.prefix + 'avaliable', {params: params});
        }
        return of();
    }

    getPatientTakenVisits(): Observable<VisitCalendarEvent[]> {
        return this.http.get<VisitCalendarEvent[]>(this.prefix + 'taken');
    }

    getVisitById(id: string): Observable<Visit> {
        return this.http.get<Visit>(this.prefix + id);
    }

    getTakenVisitsAssignedToDoctor(): Observable<VisitCalendarEvent[]> {
        return this.http.get<VisitCalendarEvent[]>(this.prefix + 'assigned');
    }

    bookVisit(request: BookVisitRequest): Observable<any> {
        return this.http.patch(this.prefix + 'book', request);
    }

    addDoctorSchedule(schedule: WeeklyWorkSchedule): Observable<any> {
        return this.http.post<any>(this.prefix + 'schedule', schedule);
    }

    getDoctorSchedule(): Observable<WeeklyWorkSchedule> {
        return this.http.get<WeeklyWorkSchedule>(this.prefix + 'schedule');
    }

    updateDoctorSchedule(schedule: WeeklyWorkSchedule): Observable<any> {
        return this.http.put<any>(this.prefix + 'schedule', schedule);
    }
}
