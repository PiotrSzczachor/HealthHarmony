import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Doctor } from '../models/doctors/doctor.model';
import { DoctorsFilters } from '../models/doctors/doctors-filters.model';
import { PagedList } from '../models/shared/paged-list.model';
import { DoctorDto } from '../models/doctors/doctor-dto.model';
import { Specialization } from '../models/doctors/specialization.model';
import { Clinic } from '../models/clinics/clinic.model';

@Injectable({
    providedIn: 'root'
})
export class DoctorsService {
    private prefix: string = environment.apiUrl + "doctors/"

    constructor(private http: HttpClient) { }

    getDoctorById(id: string): Observable<Doctor> {
		return this.http.get<Doctor>(this.prefix + id);
	}

    getPagedDoctors(filters: DoctorsFilters): Observable<PagedList<Doctor>> {
        var url = this.prefix + `pagin?PageIndex=${filters.pageIndex}&PageSize=${filters.pageSize}&OrderDescending=${filters.orderDescending}`
        if (filters.firstName) {
            url += '&firstName=' + filters.firstName;
        }
        if (filters.lastName) {
            url += '&lastName=' + filters.lastName;
        }
        if (filters.acceptsRemotely) {
            url += '&acceptsRemotely=' + filters.acceptsRemotely;
        }
        if (filters.orderBy) {
            url += '&orderBy=' + filters.orderBy;
        }
        return this.http.get<PagedList<Doctor>>(url);
    }

	getAllDoctors(): Observable<Doctor[]> {
		return this.http.get<Doctor[]>(this.prefix);
	}

	addDoctor(Doctor: DoctorDto): Observable<any> {
		return this.http.post(this.prefix, Doctor);
	}

	updateDoctor(Doctor: Doctor): Observable<any> {
		return this.http.put(this.prefix, Doctor);
	}

	deleteDoctor(id: string): Observable<any> {
		return this.http.delete(this.prefix + id);
	}

    getAllSpecializations(): Observable<Specialization[]> {
        return this.http.get<Specialization[]>(this.prefix + "specializations");
    }

    getDoctorClinics(): Observable<Clinic[]> {
        return this.http.get<Clinic[]>(this.prefix + "clinics");
    }

}
