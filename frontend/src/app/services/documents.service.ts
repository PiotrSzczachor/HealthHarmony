import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Document } from '../models/documents/document.model';

@Injectable({
    providedIn: 'root'
})
export class DocumentsService {
    private prefix: string = environment.apiUrl + "documents/"

    constructor(private http: HttpClient) { }

    getPatientDocuments(): Observable<Document[]> {
        this.http.get<Document[]>(this.prefix + 'patient').subscribe(x => console.log(x))
        return this.http.get<Document[]>(this.prefix + 'patient');
    }

    getPagedPatientDocuments(): Observable<Document[]> {
        this.http.get<Document[]>(this.prefix + 'patient').subscribe(x => console.log(x))
        return this.http.get<Document[]>(this.prefix + 'patient/paged');
    }

}
