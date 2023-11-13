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

@Injectable({
  providedIn: 'root'
})
export class VisitsService {
    private prefix: string = environment.apiUrl + "visits/"

    constructor(private http: HttpClient) { }

    getNumberOfAvaliableVisitsPerDay(request: VisitsPerDayRequest): Observable<VisitsPerDay[]> {
        if(request.specializationId && (request.clinicId || request.isRemote)){
            const formattedDate = request.startDate.toISOString();
            let params = new HttpParams()
                .set('specializationId', request.specializationId)
                .set('startDate', formattedDate)
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

    bookVisit(visitId: string): Observable<any> {
        return this.http.patch(this.prefix + visitId + '/book', {});
    }

    addDoctorSchedule(request: WeeklyWorkSchedule): Observable<any> {
        return this.http.post<any>(this.prefix + 'schedule', request);
    }
}
