import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Clinic } from 'src/app/models/clinics/clinic.model';
import { AppState } from 'src/app/store/app.state';
import { ClinicsActions, getClinicsSelector, getPagedClinicsSelector } from '../../store';
import { PagedList } from 'src/app/models/shared/paged-list.model';
import { PaginatorEvent } from 'src/app/models/shared/paginator-event.model';

@Component({
  selector: 'app-clinics-page',
  templateUrl: './clinics-page.component.html',
  styleUrls: ['./clinics-page.component.scss']
})
export class ClinicsPageComponent implements OnInit {

    clinics$!: Observable<PagedList<Clinic> | undefined>

    constructor(private store: Store<AppState>) { 
        this.selectClinics();
    }

    ngOnInit(): void {
        this.dispatchClinics();
    }

    dispatchClinics(): void {
        this.store.dispatch(ClinicsActions.getPagedClinics());
    }

    selectClinics(): void {
        this.clinics$ = this.store.select(getPagedClinicsSelector);
    }

    applyPaginationFilters(pageNumber: number): void {
        const filter: PaginatorEvent = {
            pageIndex: pageNumber
        };
        this.store.dispatch(ClinicsActions.applyPaginationFilters({filter: filter}));
    }
}
