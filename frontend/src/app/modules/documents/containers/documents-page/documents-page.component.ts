import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { DocumentsActions, getPatientDocumentsSelector } from '../../store';
import { Document } from 'src/app/models/documents/document.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-documents-page',
  templateUrl: './documents-page.component.html',
  styleUrls: ['./documents-page.component.scss']
})
export class DocumentsPageComponent implements OnInit {

    documents$!: Observable<Document[]>;

    constructor(private store: Store<AppState>) {
        this.selectDocuments();
    }

    ngOnInit(): void {
        this.dispatchDocuments();
    }

    dispatchDocuments(): void {
        this.store.dispatch(DocumentsActions.getPatientDocuments());
    }

    selectDocuments(): void {
        this.documents$ = this.store.select(getPatientDocumentsSelector);
    }

}
