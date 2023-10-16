import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clinic } from '../models/clinics/clinic.model';
import { environment } from 'src/environments/environments';

@Injectable({
  	providedIn: 'root'
})
export class ClinicsService {
	private prefix: string = environment.apiUrl + "clinics/"

  	constructor(private http: HttpClient) { }

	getClinicById(id: string): Observable<Clinic> {
		return this.http.get<Clinic>(this.prefix + id);
	}

	getClinicByIdWithAddress(id: string): Observable<Clinic> {
		return this.http.get<Clinic>(this.prefix + "with-address/" + id);
	}

	getAllClinics(): Observable<Clinic[]> {
		return this.http.get<Clinic[]>(this.prefix);
	}

	getAllClinicsWithAddresses(): Observable<Clinic[]> {
        console.log("test")
		return this.http.get<Clinic[]>(this.prefix + "with-address");
	}

	addClinic(clinic: Clinic): Observable<any> {
		return this.http.post(this.prefix, clinic);
	}

	updateClinic(clinic: Clinic): Observable<any> {
		return this.http.put(this.prefix, clinic);
	}

	deleteClinic(id: string): Observable<any> {
		return this.http.delete(this.prefix + id);
	}
}
