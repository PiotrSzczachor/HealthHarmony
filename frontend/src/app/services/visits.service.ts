import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VisitsPerDay } from '../models/visits/visits-per-day.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { VisitsPerDayRequest } from '../models/visits/visits-per-day-request.model';
import { WeeklyWorkSchedule } from '../models/visits/weekly-work-schedule.model';

@Injectable({
  providedIn: 'root'
})
export class VisitsService {
    private prefix: string = environment.apiUrl + "visits/"

    constructor(private http: HttpClient) { }

    getNumberOfAvaliableVisitsPerDay(request: VisitsPerDayRequest): Observable<VisitsPerDay[]> {
        return this.http.post<VisitsPerDay[]>(this.prefix + 'per-day', request);
    }

    addDoctorSchedule(request: WeeklyWorkSchedule): Observable<any> {
        return this.http.post<any>(this.prefix + 'schedule', request);
    }
}
